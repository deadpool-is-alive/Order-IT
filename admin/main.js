// Admin Dashboard main.js

import {CONFIG} from "./config.js";
import { messaging, generateFCMToken, storage } from "./firebase.js";
import {ref, uploadBytes, getDownloadURL}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const API = CONFIG.API_URL;
const socket = io(API);

// ____________STATE______________________
let token = localStorage.getItem('admin_token') || null;
let allOrders = [];
let allProducts = [];
let currentTab = 'new';
let currentOrderId = null;
let refreshTimer = null;







// _______DOM REFS ____________________________
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnMobile = document.getElementById('logoutBtnMobile');
const refreshBtn = document.getElementById('refreshBtn');
const ordersView = document.getElementById('ordersView');
const productsView = document.getElementById('productsView');
const ordersContainer = document.getElementById('ordersContainer');
const productsContainer = document.getElementById('productsContainer');
const orderModal = document.getElementById('orderModal');
const productModal = document.getElementById('productModal');
const shopToggle = document.getElementById('shopToggle');
const shopToggleMobile = document.getElementById('shopToggleMobile');
const shopStatusText = document.getElementById('shopStatusText');
const shopStatusDot = document.getElementById('shopStatusDot');
const shopClosedBanner = document.getElementById('shopClosedBanner');
const newOrdersBadge = document.getElementById('newOrdersBadge');
const toast = document.getElementById('toast');










// ______INIT___________________
window.addEventListener('DOMContentLoaded', () => {
    if(token) showDashboard();
    bindEvents();
})


function bindEvents(){
    // Login
    loginBtn.addEventListener('click', handleLogin);
    loginPassword.addEventListener('keydown', e => {if(e.key == 'Enter') handleLogin(); });

    // Logout
    logoutBtn.addEventListener('click', async () => {

        await removeFCMToken();

        token = null;
        localStorage.removeItem('admin_token');
        localStorage.removeItem('fcm_token');
        clearInterval(refreshTimer);
        allOrders = [];
        dashboard.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    })

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            ordersView.classList.toggle('hidden', view !== 'orders');
            productsView.classList.toggle('hidden', view !== 'products');
            if(view === 'products') loadProducts();
        });
    });

    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            ordersView.classList.toggle('hidden', view !== 'orders');
            productsView.classList.toggle('hidden', view !== 'products');
            if(view === 'products') loadProducts();
        })
    })

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
            renderOrders();
        });
    });

    refreshBtn.addEventListener('click', () => loadOrders(true));

    document.getElementById('modalClose').addEventListener('click', closeOrderModal);

    document.getElementById('productModalClose').addEventListener('click', () => {
        productModal.classList.add('hidden');
    })

    productModal.addEventListener('click', e => { if(e.target === productModal) productModal.classList.add('hidden');});

    document.getElementById('addProductBtn').addEventListener('click', () => openProductModal());
    document.getElementById('saveProductBtn').addEventListener('click', saveProduct);

    shopToggle.addEventListener('change', updateShopStatus);
    if(shopToggleMobile){
        shopToggleMobile.addEventListener('change', updateShopStatus);
    }
    if(logoutBtnMobile){
        logoutBtnMobile.addEventListener('click', () => logoutBtn.click());
    }
}


// _________ AUTH ____________
async function handleLogin(){
    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    if(!username || !password){
        showLoginError('Please enter both username and password.');
        return;
    }

    loginBtn.textContent = 'Signing in...';
    loginBtn.disabled = true;

    try{
        const res = await fetch(`${API}/auth/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        const data = await res.json();

        if(!res.ok){
            showLoginError(data.message || 'Login failed');
            return;
        }
        
        token = data.token;
        localStorage.setItem('admin_token', token);
        loginError.classList.add('hidden');
        showDashboard();
        const permission = await enableNotifications();

        const fcmToken = await generateFCMToken();
        
        if(fcmToken){
            //console.log("Saving Token");
            await saveFCMToken(fcmToken);
        }

        localStorage.setItem("fcm_token", fcmToken);

        console.log("Generated Token: ", fcmToken);
        console.log('Login Successful');
        console.log("Permission Result:",permission);
    } catch(err){
        showLoginError('Cannot reach server. Check your connection');
    } finally {
        loginBtn.textContent = 'Sign In';
        loginBtn.disabled = false;
    }
}

async function saveFCMToken(fcmToken){
    try{
        const res = await fetch(`${API}/notifications/save-token`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({
                token: fcmToken
            })
        });

        const data = await res.json();

        console.log("Token Saved: ", data);
    } catch(err){
        console.log(err);
    }
}

async function removeFCMToken(){
    const fcmToken = localStorage.getItem("fcm_token");

    try{
        
        await fetch(`${API}/notifications/remove-token`,{
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                token: fcmToken
            })
        });
    } catch(err){
        console.error(err);
    }
}

function showLoginError(msg){
    loginError.textContent = msg;
    loginError.classList.remove('hidden');
}

function showDashboard(){
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadOrders();

    refreshTimer = setInterval(() => loadOrders(), 30000);
}

async function enableNotifications(){
    if(!("Notification" in window)) return "unsupported";

    const permission = await Notification.requestPermission();

    console.log("Notification permission: ", permission);

    return permission;
}

async function loadOrders(manual = false){
    if(manual){
        refreshBtn.style.opacity = '0.5';
        refreshBtn.disabled = true;
    }

    try {
        const res = await fetch(`${API}/orders`, {
            headers: {Authorization: `Bearer ${token}`}
        });

        if(res.status === 401) {handleUnauth(); return;}

        const data = await res.json();
        allOrders = data;
        //console.log(allOrders);
        updateStats();
        //console.log("Updated stats");
        renderOrders();
        //console.log("Rendered");
        updateBadge();
    } catch(err){
        //console.log(err);
        showToast('Failed to load orders.', 'error');
    } finally{
        if(manual){
            refreshBtn.style.opacity = '';
            refreshBtn.disabled = false;
        }
    }
}


function filterOrdersByTab(tab){
    switch(tab){
        case 'new':     return allOrders.filter(o => o.status === 'Pending');
        case 'preparing': return allOrders.filter(o => o.status === 'Preparing');
        case 'ready' : return allOrders.filter(o => o.status === 'Ready');
        case 'paid':    return allOrders.filter(o => o.status === 'Paid');
        case 'credit' : return allOrders.filter(o => o.status === 'Credit');
        case 'cancelled' : return allOrders.filter(o => o.status === 'Cancelled');
        default:        return allOrders;
    }
}

function updateStats(){
    document.getElementById('statNew').textContent       = allOrders.filter(o => o.status === 'Pending').length;
    document.getElementById('statPreparing').textContent = allOrders.filter(o => o.status === 'Preparing').length;
    document.getElementById('statReady').textContent     = allOrders.filter(o => o.status === 'Ready').length;
    document.getElementById('statPaid').textContent = allOrders.filter(o => o.status === 'Paid').length;
    document.getElementById('statCredit').textContent = allOrders.filter(o => o.status === 'Credit').length;
    document.getElementById('statCancelled').textContent = allOrders.filter(o => o.status === 'Cancelled').length;
}

function updateBadge(){
    const count = allOrders.filter(o => o.status === 'Pending').length;
    newOrdersBadge.textContent = count;
    newOrdersBadge.classList.toggle('visible', count > 0);
    const bnb = document.getElementById('bottomNavBadge');
    if(bnb){
        bnb.textContent = count;
        bnb.classList.toggle('visible', count > 0);
    }
}

function renderOrders(){
    const orders = filterOrdersByTab(currentTab);
    //console.log("Current tab = " + currentTab);
    ordersContainer.innerHTML = '';

    if(orders.length === 0){
        ordersContainer.innerHTML = `
        <div class="empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <p>No ${currentTab} orders</p>
            </div>`
        return;
    }

    orders.forEach(order => {
        const card = buildOrderCard(order);
        ordersContainer.appendChild(card);
    });
}

function buildOrderCard(order){
    const card = document.createElement('div');
    card.className = 'order-card';
    card.dataset.id = order.id;

    const statusClass = {
        'Pending'  : 'pill-pending',
        'Preparing' : 'pill-preparing',
        'Ready' : 'pill-ready',
        'Paid' : 'pill-paid',
        'Credit' : 'pill-credit',
        'Cancelled' : 'pill-cancelled'
    }[order.status] || 'pill-pending';

    const timeStr = order.created_at ? new Date(order.created_at).toLocaleTimeString('en-IN',  { hour: '2-digit', minute: '2-digit' }) : '-';

    card.innerHTML = `
        <div class="order-card-top">
            <span class="order-id">#${order.id}</span>
            <span class="order-status-pill ${statusClass}">${order.status}</span>
        </div>
        <div>
            <div class="order-customer">${esc(order.customer_name)} | ${esc(order.customer_rollnum)}</div>
            <div class="order-phone">${esc(order.customer_phone || '-')}</div>
        </div>
        <div class="order-meta">
            <span class="order-price">₹${parseFloat(order.total_price || 0).toFixed(2)}</span>
            <div style="display:flex;align-items:center;gap:8px;">${order.delivery ? '<span class="order-delivery-tag">Delivery</span>' : ''}
                <span class="order-time">${timeStr}</span>
            </div>
        </div>`;
    
    card.addEventListener('click', () => openOrderModal(order));
    return card;
}

// _______ ORDER MODAL __________
async function openOrderModal(order){
    currentOrderId = order.id;
    document.getElementById('modalOrderTitle').textContent = `Order #${order.id}`;

    

    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <div class="detail-section">
            <span class="detail-label">Customer</span>
            <span class="detail-value" style="font-weight:600, font-size:16px;">${esc(order.customer_name)}</span>
        </div>
        <div class="detail-section">
            <span class="detail-label">Phone</span>
            <span class="detail-value">${esc(order.customer_phone || '_')}</span>
        </div>
        ${order.customer_address ? `
            <div class="detail-section">
                <span class="detail-label">Address</span>
                <span class="detail-value">${esc(order.customer_address)}</span>
            </div>` : ''}
        <div class="detail-section">
            <span class="detail-label">Type</span>
            <span class="detail-value">${order.delivery ? '🛵 Delivery' : '🏠 Pickup'}</span>
        </div>
        <div class="detail-section">
            <span class="detail-label">Order Items</span>
            <div id="orderItemsWrap" style="margin-top:6px;">
                <div class="spinner" style="margin:0;width:20px;height:20px;"></div>
            </div>
        <div>
        <div class="total-row">
            <span>Total</span>
            <span>₹${parseFloat(order.total_price || 0).toFixed(2)}</span>
        </div>`;
    
        let items = [];

    try{
        const res = await fetch(`${API}/orders/${order.id}/items`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        items = await res.json();

        renderOrderItems(items);
    } catch(err){
        console.log(err);
        document.getElementById('orderItemsWrap').innerHTML = '<p>Failed to load items</p>';
    }

    const actions = document.getElementById('statusActions');
    const statuses = ['Pending', 'Preparing', 'Ready', 'Paid', 'Credit', 'Cancelled'];
    actions.innerHTML='';
    statuses.forEach(s => {
        const btn = document.createElement('button');
        btn.className = `status-btn ${s.toLowerCase()}`;
        btn.textContent = s;
        if(order.status === s) btn.classList.add('active-status');
        btn.addEventListener('click', () => updateOrderStatus(order.id, s, order.customer_phone, items));
        actions.appendChild(btn);
    })

    orderModal.classList.remove('hidden');

    
}

function renderOrderItems(items){
    const wrap = document.getElementById('orderItemsWrap');

    if(items.length === 0){
        wrap.innerHTML = '<p>No items found </p>';
        return;
    }
    //console.log(items);
    wrap.innerHTML = items.map(item => `
        <div class="order-items">
            <span>${esc(item.name)}</span>
            <span>x${item.quantity} :<span>
            <span>₹${parseFloat(item.price).toFixed(2)}</span>
        </div>`).join('');
}

function closeOrderModal(){
    orderModal.classList.add('hidden');
    currentOrderId = null;
    loadOrders();
}

// _________ UPDATE ORDER STATUS ____________

async function updateOrderStatus(orderId, status, phone, items){
    try {
        const res = await fetch(`${API}/orders/${orderId}/status`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({status})
        });

        if(res.status === 401) {handleUnauth(); return;}
        if(!res.ok) {showToast('Failed to update status.','error'); return;}

        showToast(`Order #${orderId} → ${status}`, 'success');

        if(status === 'Ready' && phone){
            console.log("Sending Notification");
            sendReadyNotification(phone, orderId, items);
        }

        closeOrderModal();
        loadOrders();
    } catch(err){
        showToast('Network error.', 'error');
    }
}

async function sendReadyNotification(phone, orderId, items){

    const itemsText = items.map(item =>
        `• ${item.name} x${item.quantity} - ₹${Number(item.price).toFixed(2)}`
    ).join('\n');

    const message =
                    `Hall 3 Canteen\n Order #${orderId} is ready for pickup.\n\nItems:\n${itemsText}\n\nThank you!`;
    // doing whatsapp

    const cleanPhone = String(phone).replace(/\D/g, '');
    const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    console.log(message);
    console.log(JSON.stringify(message));
    const waMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waPhone}?text=${waMsg}`;
    //console.log(waUrl);
    console.log(decodeURIComponent(waMsg));
    showToast(`Order Ready! Opening WhatsApp...`, 'success');
    setTimeout(() => window.open(waUrl, '_blank'), 800);
}

// _______ PRODUCTS __________

async function loadProducts(){
    productsContainer.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading products…</p></div>`;

    try{
        const res = await fetch(`${API}/products`);
        allProducts = await res.json();
        renderProducts();
    } catch{
        productsContainer.innerHTML = `<div class="empty-state"><p>Failed to load products.</p></div>`;
    }
}

function renderProducts(){
    productsContainer.innerHTML = '';

    if(allProducts.length === 0){
        productsContainer.innerHTML = `<div class="empty-state"><p>No products yet. Add your first item.</p></div>`;
        return;
    }

    allProducts.forEach(p => {
        const card = buildProductCard(p);
        productsContainer.appendChild(card);
    });
}

function buildProductCard(product){
    const card = document.createElement('div');
    card.className = 'product-card';

    const isAvail = product.available == 1 || product.available === true;

    card.innerHTML = `
        <div class="product-top">
            <span class="product-name">${esc(product.name)}</span>
            ${product.category ? `<span class="product-category">${esc(product.category)}</span>` : ''}
        </div>
        ${product.description ? `<p class="product-desc">${esc(product.description)}</p>` : ''}
        <div class="product-footer">
            <span class="product-price">₹${parseFloat(product.price).toFixed(2)}</span>
            <div class="product-actions">
                <label class="avail-toggle ${isAvail ? 'available' : ''}">
                    <label class="toggle-sm">
                        <input type="checkbox" class="avail-check" data-id="${product.id}" ${isAvail ? 'checked' : ''} />
                        <span class="toggle-slider"></span>
                    </label>
                    ${isAvail ? 'Available' : 'Unavailable'}
                </label>
                <button class="btn-icon edit-product-btn" data-id="${product.id}" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="btn-icon del del-product-btn" data-id="${product.id}" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </button>
            </div>
        </div>`;

    // Availiability Toggle
    card.querySelector('.avail-check').addEventListener('change', async (e) =>{
        const pid = e.target.dataset.id;
        const checked = e.target.checked;
        const product = allProducts.find(p => p.id == pid)

        if(!product) return;

        await updateProduct(pid, {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            available: checked ? 1 : 0
        });

        const wrap = e.target.closest('.avail-toggle');
        wrap.classList.toggle('available', checked);
        wrap.lastChild.textContent = checked ? ' Available ' : ' Unavailable';
    });

    // Edit
    card.querySelector('.edit-product-btn').addEventListener('click', () => {
        openProductModal(product);
    })

    // Delete
    card.querySelector('.del-product-btn').addEventListener('click', () => {
        deleteProduct(product.id, product.name);
    });

    return card;
}

function openProductModal(product = null){
    document.getElementById('productModalTitle').textContent = product ? 'Edit Product' : 'Add Product';
    document.getElementById('productId').value = product ? product.id : '';
    document.getElementById('productName').value = product ? product.name : '';
    document.getElementById('productDesc').value = product ? (product.description || '') : '';
    document.getElementById('productPrice').value = product ? product.price : '';
    document.getElementById('productCategory').value = product ? (product.category || ''): '';
    document.getElementById('productPackaging').value = product ? product.packaging_cost : '';
    document.getElementById('productImageURL').value = product ? product.image_url : '';
    document.getElementById('productFormError').classList.add('hidden');
    productModal.classList.remove('hidden');
    document.getElementById('productName').focus();
}

async function saveProduct(){
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const desc = document.getElementById('productDesc').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value.trim();
    const packaging_cost = parseFloat(document.getElementById('productPackaging').value);
    const errEl = document.getElementById('productFormError');

    const file = document.getElementById("productImage").files[0];

    const imageURL = document.getElementById('productImageURL').value.trim();

    

    // if(file){
    //     imageURL = await uploadImage(file);
    // }

    // if(imageURL == ''){
    //     alert("Select Image");
    //     return;
    // }
    

    if(!name || isNaN(price) || price < 0 || packaging_cost < 0){
        errEl.textContent = 'Name and a valid price and packaging are required';
        errEl.classList.remove('hidden');
        return;
    }
    // taking avaible from global list
    const existingProduct = id ? allProducts.find(p => String(p.id) === String(id)) : null;
    let available = existingProduct ? existingProduct.available : 1;

    const body = {name, description:desc, price, image_url: imageURL, category, available, packaging_cost};
    const url = id ? `${API}/products/${id}` : `${API}/products`;
    const method = id ? 'PUT' : 'POST';

    const saveBtn = document.getElementById('saveProductBtn');
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
        const res = await fetch(url, {
            method,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if(res.status === 401) {handleUnauth(); return;}
        if(!res.ok){ errEl.textContent = 'Failed to save. Try again.', errEl.classList.remove('hidden'); return;}

        productModal.classList.add('hidden');
        console.log("body for changes: ", body);
        showToast(id ? 'Product updated' : 'Product added!', 'success');
        loadProducts();
    } catch{
        errEl.textContent = 'Network error.';
        errEl.classList.remove('hidden');
    } finally {
        saveBtn.textContent = 'Save Product';
        saveBtn.disabled = false;
    }
}

async function updateProduct(id, body){
    try{
        await fetch(`${API}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        showToast('Availiability updated', 'success');
    } catch {
        showToast('Update failed', 'error');
    }
}

async function deleteProduct(id, name){
    if(!confirm(`Delete "${name}"? This cannot be undone..`)) return;

    try{
        const res = await fetch(`${API}/products/${id}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(!res.ok) {showToast('Delete failed.','error'); return;}
        showToast(`"${name}" deleted.`, 'success');
        loadProducts();
    } catch {
        showToast('Network error', 'error');
    }
}

async function updateShopStatus(e){
    const sourceToggle = e.target;
    const isOpen = sourceToggle.checked;

    shopToggle.checked = isOpen;
    if(shopToggleMobile){
        shopToggleMobile.checked = isOpen;
    }
    

    shopStatusText.textContent = isOpen ? 'Shop Open' : 'Shop Closed';
    shopStatusDot.className = `status-dot ${isOpen ? 'green' : 'red'}`;
    shopClosedBanner.classList.toggle('hidden', isOpen);

    localStorage.setItem('shop_open', isOpen ? '1' : '0');

    // To do POST it to backend 
    const res = await fetch(`${API}/shop/status`, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({isOpen})
    });

    showToast(isOpen ? '✅ Shop is now Open' : '🔴 Shop is now Closed', isOpen ? 'success' : 'error');
}

const savedShopStatus = localStorage.getItem('shop_open');
if(savedShopStatus === '0'){
    shopToggle.checked = false;
    shopStatusText.textContent = 'Shop Closed';
    shopStatusDot.className = 'status-dot red';
    shopClosedBanner.classList.remove('hidden');
}

let toastTimer = null;
function showToast(msg, type = ''){
    toast.textContent = msg;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}


// ______ UTILS ________

function esc(str){
    if(!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function handleUnauth(){
    token = null;
    localStorage.removeItem('admin_token');
    clearInterval(refreshTimer);
    dashboard.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    showLoginError('Session expired. Please log in again');
}

async function uploadImage(file){

    try{
        
        const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
        
        console.log("Uploading...");

        const snapshot = await uploadBytes(storageRef, file);
        
        console.log("Uploaded", snapshot);

        const url = await getDownloadURL(storageRef);

        console.log("URL: ", url);

        return url;
    } catch(err){
        console.error(err);

        throw err;
    }
}

socket.on("new-order", (data) => {

    document.getElementById("orderSound")?.play().catch(() => {});

    showToast(
        `New Order #${data.orderId}`,
        "success"
    );

    if(Notification.permission === "granted"){
        new Notification("New Order Received", {
            body: `${data.customer} placed Order #${data.orderId}`,
            icon: "./public/images/logo.png"
        });
    }

    loadOrders();
});

