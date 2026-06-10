/* ═══════════════════════════════════════════════════════
   OrderIt — Admin Dashboard
   main.js
═══════════════════════════════════════════════════════ */
import {CONFIG} from "./config.js";

const API = CONFIG.API_URL; // ← change to your server URL

/* ─── STATE ───────────────────────────────────────── */
let token       = localStorage.getItem('admin_token') || null;
let allOrders   = [];
let allProducts = [];
let currentTab  = 'new';
let currentOrderId = null;
let refreshTimer   = null;

/* ─── DOM REFS ────────────────────────────────────── */
const loginScreen    = document.getElementById('loginScreen');
const dashboard      = document.getElementById('dashboard');
const loginUsername  = document.getElementById('loginUsername');
const loginPassword  = document.getElementById('loginPassword');
const loginBtn       = document.getElementById('loginBtn');
const loginError     = document.getElementById('loginError');
const logoutBtn      = document.getElementById('logoutBtn');
const refreshBtn     = document.getElementById('refreshBtn');
const ordersView     = document.getElementById('ordersView');
const productsView   = document.getElementById('productsView');
const ordersContainer    = document.getElementById('ordersContainer');
const productsContainer  = document.getElementById('productsContainer');
const orderModal     = document.getElementById('orderModal');
const productModal   = document.getElementById('productModal');
const shopToggle     = document.getElementById('shopToggle');
const shopStatusText = document.getElementById('shopStatusText');
const shopStatusDot  = document.getElementById('shopStatusDot');
const shopClosedBanner = document.getElementById('shopClosedBanner');
const newOrdersBadge = document.getElementById('newOrdersBadge');
const toast          = document.getElementById('toast');

/* ─── INIT ────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
    if (token) showDashboard();
    bindEvents();
});

function bindEvents() {
    // Login
    loginBtn.addEventListener('click', handleLogin);
    loginPassword.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });

    // Logout
    logoutBtn.addEventListener('click', () => {
        token = null;
        localStorage.removeItem('admin_token');
        clearInterval(refreshTimer);
        allOrders = [];
        dashboard.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    });

    // Nav
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            ordersView.classList.toggle('hidden', view !== 'orders');
            productsView.classList.toggle('hidden', view !== 'products');
            if (view === 'products') loadProducts();
        });
    });

    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
            renderOrders();
        });
    });

    // Refresh
    refreshBtn.addEventListener('click', () => loadOrders(true));

    // Order modal close
    document.getElementById('modalClose').addEventListener('click', closeOrderModal);
    orderModal.addEventListener('click', e => { if (e.target === orderModal) closeOrderModal(); });

    // Product modal
    document.getElementById('productModalClose').addEventListener('click', () => {
        productModal.classList.add('hidden');
    });
    productModal.addEventListener('click', e => { if (e.target === productModal) productModal.classList.add('hidden'); });

    document.getElementById('addProductBtn').addEventListener('click', () => openProductModal());
    document.getElementById('saveProductBtn').addEventListener('click', saveProduct);

    // Shop toggle
    shopToggle.addEventListener('change', updateShopStatus);
}

/* ─── AUTH ────────────────────────────────────────── */
async function handleLogin() {
    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    if (!username || !password) {
        showLoginError('Please enter both username and password.');
        return;
    }

    loginBtn.textContent = 'Signing in…';
    loginBtn.disabled = true;

    try {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            showLoginError(data.message || 'Login failed.');
            return;
        }

        token = data.token;
        localStorage.setItem('admin_token', token);
        loginError.classList.add('hidden');
        showDashboard();

    } catch (err) {
        showLoginError('Cannot reach server. Check your connection.');
    } finally {
        loginBtn.textContent = 'Sign In';
        loginBtn.disabled = false;
    }
}

function showLoginError(msg) {
    loginError.textContent = msg;
    loginError.classList.remove('hidden');
}

function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadOrders();
    // Auto-refresh every 30 seconds
    refreshTimer = setInterval(() => loadOrders(), 30000);
}

/* ─── ORDERS ──────────────────────────────────────── */
async function loadOrders(manual = false) {
    if (manual) {
        refreshBtn.style.opacity = '0.5';
        refreshBtn.disabled = true;
    }

    try {
        const res = await fetch(`${API}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 401) { handleUnauth(); return; }

        const data = await res.json();
        allOrders = data;
        updateStats();
        renderOrders();
        updateBadge();

    } catch (err) {
        showToast('Failed to load orders.', 'error');
    } finally {
        if (manual) {
            refreshBtn.style.opacity = '';
            refreshBtn.disabled = false;
        }
    }
}

function filterOrdersByTab(tab) {
    switch (tab) {
        case 'new':     return allOrders.filter(o => o.status === 'Pending');
        case 'ongoing': return allOrders.filter(o => o.status === 'Preparing' || o.status === 'Ready');
        case 'past':    return allOrders.filter(o => o.status === 'Delivered');
        default:        return allOrders;
    }
}

function updateStats() {
    document.getElementById('statNew').textContent       = allOrders.filter(o => o.status === 'Pending').length;
    document.getElementById('statPreparing').textContent = allOrders.filter(o => o.status === 'Preparing').length;
    document.getElementById('statReady').textContent     = allOrders.filter(o => o.status === 'Ready').length;
    document.getElementById('statDelivered').textContent = allOrders.filter(o => o.status === 'Delivered').length;
}

function updateBadge() {
    const count = allOrders.filter(o => o.status === 'Pending').length;
    newOrdersBadge.textContent = count;
    newOrdersBadge.classList.toggle('visible', count > 0);
}

function renderOrders() {
    const orders = filterOrdersByTab(currentTab);
    ordersContainer.innerHTML = '';

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <p>No ${currentTab} orders</p>
            </div>`;
        return;
    }

    orders.forEach(order => {
        const card = buildOrderCard(order);
        ordersContainer.appendChild(card);
    });
}

function buildOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.dataset.id = order.id;

    const statusClass = {
        'Pending':   'pill-pending',
        'Preparing': 'pill-preparing',
        'Ready':     'pill-ready',
        'Delivered': 'pill-delivered'
    }[order.status] || 'pill-pending';

    const timeStr = order.created_at
        ? new Date(order.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        : '—';

    card.innerHTML = `
        <div class="order-card-top">
            <span class="order-id">#${order.id}</span>
            <span class="order-status-pill ${statusClass}">${order.status}</span>
        </div>
        <div>
            <div class="order-customer">${esc(order.customer_name)}</div>
            <div class="order-phone">${esc(order.customer_phone || '—')}</div>
        </div>
        <div class="order-meta">
            <span class="order-price">₹${parseFloat(order.total_price || 0).toFixed(2)}</span>
            <div style="display:flex;align-items:center;gap:8px;">
                ${order.delivery ? '<span class="order-delivery-tag">Delivery</span>' : ''}
                <span class="order-time">${timeStr}</span>
            </div>
        </div>`;

    card.addEventListener('click', () => openOrderModal(order));
    return card;
}

/* ─── ORDER MODAL ─────────────────────────────────── */
function openOrderModal(order) {
    currentOrderId = order.id;
    document.getElementById('modalOrderTitle').textContent = `Order #${order.id}`;

    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <div class="detail-section">
            <span class="detail-label">Customer</span>
            <span class="detail-value" style="font-weight:600;font-size:16px;">${esc(order.customer_name)}</span>
        </div>
        <div class="detail-section">
            <span class="detail-label">Phone</span>
            <span class="detail-value">${esc(order.customer_phone || '—')}</span>
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
        </div>
        <div class="total-row">
            <span>Total</span>
            <span>₹${parseFloat(order.total_price || 0).toFixed(2)}</span>
        </div>`;

    // Status actions
    const actions = document.getElementById('statusActions');
    const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered'];
    actions.innerHTML = '';
    statuses.forEach(s => {
        const btn = document.createElement('button');
        btn.className = `status-btn ${s.toLowerCase()}`;
        btn.textContent = s;
        if (order.status === s) btn.classList.add('active-status');
        btn.addEventListener('click', () => updateOrderStatus(order.id, s, order.customer_phone));
        actions.appendChild(btn);
    });

    orderModal.classList.remove('hidden');
}

function closeOrderModal() {
    orderModal.classList.add('hidden');
    currentOrderId = null;
}

/* ─── UPDATE ORDER STATUS ─────────────────────────── */
async function updateOrderStatus(orderId, status, phone) {
    try {
        const res = await fetch(`${API}/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (res.status === 401) { handleUnauth(); return; }
        if (!res.ok) { showToast('Failed to update status.', 'error'); return; }

        showToast(`Order #${orderId} → ${status}`, 'success');

        // If status is Ready, send SMS notification
        if (status === 'Ready' && phone) {
            sendReadyNotification(phone, orderId);
        }

        closeOrderModal();
        loadOrders();

    } catch (err) {
        showToast('Network error.', 'error');
    }
}

/* ─── SMS NOTIFICATION ────────────────────────────── */
/**
 * Sends a WhatsApp/SMS notification when order is Ready.
 * 
 * You have 3 integration options — pick one and configure below.
 * 
 * OPTION A: Twilio SMS API (recommended)
 *   1. Sign up at twilio.com, get Account SID, Auth Token, and a Twilio number
 *   2. Add a /notify endpoint to your server.js (see comment below)
 * 
 * OPTION B: Fast2SMS (India-friendly, cheaper)
 *   1. Sign up at fast2sms.com
 *   2. Add a /notify endpoint to your server.js
 * 
 * OPTION C: WhatsApp deep-link (no backend needed, opens WhatsApp on admin device)
 *   - Works offline, but admin must manually send
 * 
 * ─── Add this to your server.js for Option A/B: ─────────────
 * 
 *   app.post('/notify', verifyToken, async (req, res) => {
 *     const { phone, message } = req.body;
 *     // Twilio example:
 *     // const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
 *     // await client.messages.create({ body: message, from: process.env.TWILIO_PHONE, to: `+91${phone}` });
 *     res.json({ sent: true });
 *   });
 * ─────────────────────────────────────────────────────────────
 */
async function sendReadyNotification(phone, orderId) {
    const message = `Hi! Your OrderIt order #${orderId} is ready for ${phone.delivery ? 'delivery' : 'pickup'}. Thank you! 🍽️`;

    // ── Try server-side notification endpoint first ──
    try {
        const res = await fetch(`${API}/notify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ phone, message })
        });

        if (res.ok) {
            showToast(`📱 SMS sent to ${phone}`, 'success');
            return;
        }
    } catch (_) {
        // Server notify endpoint not configured — fall back
    }

    // ── Fallback: open WhatsApp on admin's device ──
    const cleanPhone = String(phone).replace(/\D/g, '');
    const waPhone    = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const waMsg      = encodeURIComponent(message);
    const waUrl      = `https://wa.me/${waPhone}?text=${waMsg}`;

    showToast(`ℹ️ No SMS backend found — opening WhatsApp…`, 'success');
    setTimeout(() => window.open(waUrl, '_blank'), 800);
}

/* ─── PRODUCTS ────────────────────────────────────── */
async function loadProducts() {
    productsContainer.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading products…</p></div>`;

    try {
        const res = await fetch(`${API}/products`);
        allProducts = await res.json();
        renderProducts();
    } catch {
        productsContainer.innerHTML = `<div class="empty-state"><p>Failed to load products.</p></div>`;
    }
}

function renderProducts() {
    productsContainer.innerHTML = '';

    if (allProducts.length === 0) {
        productsContainer.innerHTML = `<div class="empty-state"><p>No products yet. Add your first item.</p></div>`;
        return;
    }

    allProducts.forEach(p => {
        const card = buildProductCard(p);
        productsContainer.appendChild(card);
    });
}

function buildProductCard(product) {
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

    // Availability toggle
    card.querySelector('.avail-check').addEventListener('change', async (e) => {
        const pid      = e.target.dataset.id;
        const checked  = e.target.checked;
        const product  = allProducts.find(p => p.id == pid);
        if (!product) return;

        await updateProduct(pid, {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            available: checked ? 1 : 0
        });
        // Update label
        const wrap = e.target.closest('.avail-toggle');
        wrap.classList.toggle('available', checked);
        wrap.lastChild.textContent = checked ? ' Available' : ' Unavailable';
    });

    // Edit
    card.querySelector('.edit-product-btn').addEventListener('click', () => {
        openProductModal(product);
    });

    // Delete
    card.querySelector('.del-product-btn').addEventListener('click', () => {
        deleteProduct(product.id, product.name);
    });

    return card;
}

function openProductModal(product = null) {
    document.getElementById('productModalTitle').textContent = product ? 'Edit Product' : 'Add Product';
    document.getElementById('productId').value       = product ? product.id : '';
    document.getElementById('productName').value     = product ? product.name : '';
    document.getElementById('productDesc').value     = product ? (product.description || '') : '';
    document.getElementById('productPrice').value    = product ? product.price : '';
    document.getElementById('productCategory').value = product ? (product.category || '') : '';
    document.getElementById('productFormError').classList.add('hidden');
    productModal.classList.remove('hidden');
    document.getElementById('productName').focus();
}

async function saveProduct() {
    const id       = document.getElementById('productId').value;
    const name     = document.getElementById('productName').value.trim();
    const desc     = document.getElementById('productDesc').value.trim();
    const price    = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value.trim();
    const errEl    = document.getElementById('productFormError');

    if (!name || isNaN(price) || price < 0) {
        errEl.textContent = 'Name and a valid price are required.';
        errEl.classList.remove('hidden');
        return;
    }

    const body = { name, description: desc, price, category };
    const url  = id ? `${API}/products/${id}` : `${API}/products`;
    const method = id ? 'PUT' : 'POST';

    const saveBtn = document.getElementById('saveProductBtn');
    saveBtn.textContent = 'Saving…';
    saveBtn.disabled = true;

    try {
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (res.status === 401) { handleUnauth(); return; }
        if (!res.ok) { errEl.textContent = 'Failed to save. Try again.'; errEl.classList.remove('hidden'); return; }

        productModal.classList.add('hidden');
        showToast(id ? 'Product updated!' : 'Product added!', 'success');
        loadProducts();

    } catch {
        errEl.textContent = 'Network error.';
        errEl.classList.remove('hidden');
    } finally {
        saveBtn.textContent = 'Save Product';
        saveBtn.disabled = false;
    }
}

async function updateProduct(id, body) {
    try {
        await fetch(`${API}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        showToast('Availability updated', 'success');
    } catch {
        showToast('Update failed.', 'error');
    }
}

async function deleteProduct(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    try {
        const res = await fetch(`${API}/products/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) { showToast('Delete failed.', 'error'); return; }
        showToast(`"${name}" deleted.`, 'success');
        loadProducts();
    } catch {
        showToast('Network error.', 'error');
    }
}

/* ─── SHOP STATUS ─────────────────────────────────── */
function updateShopStatus() {
    const isOpen = shopToggle.checked;
    shopStatusText.textContent = isOpen ? 'Shop Open' : 'Shop Closed';
    shopStatusDot.className    = `status-dot ${isOpen ? 'green' : 'red'}`;
    shopClosedBanner.classList.toggle('hidden', isOpen);

    // Persist across refresh
    localStorage.setItem('shop_open', isOpen ? '1' : '0');

    // ── Optional: POST to a backend /shop/status endpoint ──
    // fetch(`${API}/shop/status`, { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ open: isOpen }) });

    showToast(isOpen ? '✅ Shop is now Open' : '🔴 Shop is now Closed', isOpen ? 'success' : 'error');
}

// Restore shop status on load
const savedShopStatus = localStorage.getItem('shop_open');
if (savedShopStatus === '0') {
    shopToggle.checked = false;
    shopStatusText.textContent = 'Shop Closed';
    shopStatusDot.className    = 'status-dot red';
    shopClosedBanner.classList.remove('hidden');
}

/* ─── TOAST ───────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, type = '') {
    toast.textContent = msg;
    toast.className   = `toast ${type}`;
    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}

/* ─── UTILS ───────────────────────────────────────── */
function esc(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function handleUnauth() {
    token = null;
    localStorage.removeItem('admin_token');
    clearInterval(refreshTimer);
    dashboard.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    showLoginError('Session expired. Please log in again.');
}