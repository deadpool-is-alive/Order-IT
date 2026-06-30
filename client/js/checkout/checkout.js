import {getCart, clearCart, getFinalBill, getPackagingTotal, getTotalBill} from "../cart/cartStore.js";
import {updateCartBadge, registerCheckoutUpdater, setRoomDelivery} from "../cart/cartUI.js";
import { renderProducts } from "../products/renderProducts.js";
import { getProducts } from "../api/productApi.js";
import {CONFIG} from "../config.js";
import { Auth } from "../auth/auth.js";
import { openAuthModal, refreshAvatarState } from "../auth/authUI.js";
import { isShopOpen } from "../shop/shop.js";

let roomDelivery=0;

function updateCheckoutTotals(roomDelivery){
    document.getElementById("food-total").textContent = `₹${getTotalBill()}`;
    document.getElementById("packaging-total").textContent = roomDelivery ? `₹${getPackagingTotal()}` : "₹0";
    document.getElementById("checkout-total-amount").textContent = `₹${getFinalBill(roomDelivery)}`;
}


function renderCheckout(){
    const container = document.querySelector("#checkout-items");

    container.innerHTML = "";

    const cart = getCart();

    const entries = Object.entries(cart);

    if(entries.length == 0){
        container.innerHTML = `
            <div class = "checkout-empty">
                <svg width="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p>Your cart is empty</p>
                <span style="fond-size:0.82rem; color:var(--clr-charcoal-lt);">Add some items to get started </span>
            </div>`;
        document.getElementById("checkout-total-amount").textContent = "₹0";
        const orderBtn = document.querySelector(".order-now-btn");
        if(orderBtn) orderBtn.disabled = true;
        return;
    }


    const form = document.querySelector(".order-now-form");


    showForm(form);
    setUpFormValidation();

    // const upiUrl = `upi://pay?pa=paytm.s24y6q1@pty&pn=Paytm&am=${getFinalBill(roomDelivery)}&cu=INR`

    // const qrcode = new QRCode(document.getElementById("upiQR"), {
    //     text: upiUrl,
    //     width: 220,
    //     height: 220,
    //     colorDark : "#000000",
    //     colorLight : "#ffffff",
    //     correctLevel : QRCode.CorrectLevel.L
    // });

    // console.log("Making qr ");

    for(const [id,item] of Object.entries(cart)){

        container.innerHTML += `
            <div class="checkout-item" id="checkout-item-${id}">
                <div class="checkout-item-info">
                    <span class="checkout-item__name"> ${item.name} - </span>
                    <span class="checkout-item__price"> ₹${item.price} </span>
                </div>
                
                <div class="checkout-controls">
                    <button class="checkout-minus-btn" data-id=${id}> - </button>
                    <span class = "checkout-item__qty" id = "checkout-qty-${id}"> ${item.quantity} </span>
                    <button class="checkout-plus-btn" data-id=${id}> + </button>
                </div>
                <button class="checkout-remove-btn" data-id="${id}" title="Remove item" aria-label="Remove item">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2.5" 
                        stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                </button>
            </div>
            `;
    }
    updateCheckoutTotals(roomDelivery);
}

async function openCheckout(overlay){

    if(!isShopOpen()){
        alert("Shop is currently closed");
        return;
    }

    if(!Auth.isLoggedIn()){
        alert("Please login to place an order");
        openAuthModal();
        return;
    }

    renderCheckout();
    overlay.classList.add("active");
}

function closeCheckout(overlay,form){
    hideForm(form);
    overlay.classList.remove("active");
    document.getElementById("upiQR").innerHTML = ``;
    renderProducts(products);
}

function showForm(form){

    const user = Auth.user();
    //console.log(user);
    const fname = user?.name || "";
    const roll_num = user?.roll_num || "";
    const phone_number = user?.phone_number || "";


    form.innerHTML = `
        <form id = "customer-form">
            <label class="form-label">Full name</label>
            <input type="text" id="fname" value="${fname}" disabled>
            <label  class="form-label">Roll Number</label>
            <input type="text" id="rollNumber" value="${roll_num}" disabled>
            <label  class="form-label">Phone Number:</label>
            <input type="text" id="phone"value="${phone_number}" maxlength="13" required>
            <div class="delivery-option">
                <input type = "checkbox" id="room_delivery">
                <label for="room_delivery" class="form-label" >Deliver to room </label>
            </div>
            <label class="form-label" >Room Number</label>

            <input type="text" id="address" disabled>

            <div id="form-error" class="form-erorr">
            </div>
        </form>
    `;

}

function hideForm(form){
    form.innerHTML = "";
}

function setUpFormValidation(){
    const checkbox = document.getElementById("room_delivery");

    const roomInput = document.getElementById("address");

    const phoneInput = document.getElementById("phone");

    checkbox.addEventListener("change", () =>{
        roomInput.disabled = !checkbox.checked;

        if(checkbox.checked){
            roomDelivery = 1;
        }
        else{
            roomDelivery = 0;
        }

        setRoomDelivery(roomDelivery);
        updateCheckoutTotals(roomDelivery);


        if(!checkbox.checked){
            roomInput.value = "";
        }
        validateForm();
    });

    document.getElementById("fname").addEventListener("input", validateForm);
    document.getElementById("phone").addEventListener("input", validateForm);
    
    phoneInput.addEventListener("input", validateForm);
    roomInput.addEventListener("input", validateForm);

    validateForm();


}

function validateForm(){

    let phone = document.getElementById("phone").value.trim();
    phone = phone.replace(/\D/g, "");

    const room = document.getElementById("address").value.trim();

    const checkbox = document.getElementById("room_delivery")

    const orderBtn = document.querySelector(".order-now-btn");

    let valid = true;

    if (phone.length === 12 && phone.startsWith("91")) {
        phone = phone.slice(2);
    }

    if(!/^\d{10}$/.test(phone)){
        valid = false;
        console.log("Phone number not matching");
    }

    if(checkbox.checked && room.length == 0){
        valid = false;
        console.log("room delivery not valid");
    }

    orderBtn.disabled = !valid;

    return valid;
}

async function orderNow(){

    if(!isShopOpen()){
        closeCheckout(document.querySelector("#checkout-overlay"),document.querySelector(".order-now-form"));
        alert("Shop is currently closed");
        return;
    }

    if(!validateForm()){
        return;
    }
    if(Object.keys(getCart()).length == 0){
        console.log("Add something to cart first");
        return;
    }
    console.log(getCart());


    const orderData = {
        customer_name: document.getElementById("fname").value,
        customer_rollnum: document.getElementById("rollNumber").value,
        customer_phone: document.getElementById("phone").value,
        customer_address: document.getElementById("address").value,
        delivery: document.getElementById("room_delivery").checked,
        total_price: getFinalBill(roomDelivery),
        cart: getCart()
    };

    console.log(orderData);

    // POST /orders
    try{
        
        const response = await fetch(`${CONFIG.API_URL}/orders`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${Auth.token()}`
                },
                body: JSON.stringify(orderData)
            }
        );

        if(response.status === 401) {
            closeCheckout(document.querySelector("#checkout-overlay"),document.querySelector(".order-now-form"));
            Auth.clear(); 
            refreshAvatarState();
            alert("Your session is expired! Please login again!"); 
            openAuthModal();
            return;
        }

        if(response.ok){
            const data = await response.json();
            console.log(data);
            alert(`Order Placed! ID ${data.orderId}`);
            
            updateCheckoutClose();
        }
    }
    catch(err){
        console.error(err);

        alert("Failed to placer order");
    }
}

async function updateCheckoutClose(){
    clearCart();
    roomDelivery = 0;

    setRoomDelivery(0);
    
    closeCheckout(document.querySelector("#checkout-overlay"),document.querySelector(".order-now-form"));
    updateCartBadge();

    updateCheckoutTotals(roomDelivery);

    const products = await getProducts();
    renderProducts(products);
    

}


let products = [];

export function initCheckout(allProducts){

    products = allProducts;

    registerCheckoutUpdater(renderCheckout);

    const orderBtn = document.querySelector(".order_btn");
    const closeBtn = document.querySelector(".checkout-close");

    const form = document.querySelector(".order-now-form");

    const orderNowBtn = document.querySelector(".order-now-btn");

    const overlay = document.querySelector("#checkout-overlay");

    const clearCartBtn = document.querySelector(".clr-cart-btn");

    orderBtn.addEventListener("click", openCheckout.bind(null,overlay));
    closeBtn.addEventListener("click", closeCheckout.bind(null,overlay,form));
    orderNowBtn.addEventListener("click", orderNow);
    clearCartBtn.addEventListener("click", updateCheckoutClose);
}

export function getRoomDelivery(){
    return roomDelivery;
}