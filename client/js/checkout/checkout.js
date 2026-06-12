import {getCart, clearCart, getFinalBill, getPackagingTotal, getTotalBill} from "../cart/cartStore.js";
import {updateCartBadge} from "../cart/cartUI.js";
import { renderProducts } from "../products/renderProducts.js";
import { getProducts } from "../api/productApi.js";
import {CONFIG} from "../config.js";

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
        return;
    }


    const form = document.querySelector(".order-now-form");


    showForm(form);
    setUpFormValidation();


    for(const [id,item] of Object.entries(cart)){

        container.innerHTML += `
            <div class="checkout-item">
                ${item.name} x ${item.quantity} - ₹${item.quantity * item.price}
                <div class = "add-to-cart__items"> 
                </div>
            </div>
            `;
    }
    updateCheckoutTotals(roomDelivery);
}

async function openCheckout(overlay){

    const response = await fetch(`${CONFIG.API_URL}/shop/status`);

    const data = await response.json();

    if(!data.isOpen){
        alert("Shop is currently closed");
        return;
    }

    renderCheckout();
    overlay.classList.add("active");
}

function closeCheckout(overlay,form){
    hideForm(form);
    overlay.classList.remove("active");
}

function showForm(form){
    form.innerHTML = `
        <form id = "customer-form">
            <label>Full name</label><br>
            <input type="text" id="fname" required><br>
            <label>Roll Number</label><br>
            <input type="text" id="rollNumber" required><br>
            <label >Phone Number:</label><br>
            <input type="text" id="phone" maxlength="10" required><br>
            <div class="delivery-option">
                <input type = "checkbox" id="room_delivery">
                <label for="room_delivery">Deliver to room </label><br>
            </div>
            <label>Room Number</label><br>

            <input type="text" id="address" disabled><br>

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

    checkbox.addEventListener("change", () =>{
        roomInput.disabled = !checkbox.checked;

        if(checkbox.checked){
            roomDelivery = 1;
        }
        else{
            roomDelivery = 0;
        }
        updateCheckoutTotals(roomDelivery);


        if(!checkbox.checked){
            roomInput.value = "";
        }
        validateForm();
    });

    document.getElementById("fname").addEventListener("input", validateForm);
    document.getElementById("phone").addEventListener("input", validateForm);
    
    roomInput.addEventListener("input", validateForm);

    validateForm();


}

function validateForm(){

    const name = document.getElementById("fname").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const room = document.getElementById("address").value.trim();

    const checkbox = document.getElementById("room_delivery")

    const orderBtn = document.querySelector(".order-now-btn");

    let valid = true;

    if(name.length < 2){
        valid = false;
        console.log("Name is too short!");
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
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(orderData)
            }
        );

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
    closeCheckout(document.querySelector("#checkout-overlay"),document.querySelector(".order-now-form"));
    updateCartBadge();

    updateCheckoutTotals(roomDelivery);

    const products = await getProducts();
    renderProducts(products);
    

}

export function initCheckout(){

    const orderBtn = document.querySelector(".order_btn");
    const closeBtn = document.querySelector(".checkout-close");

    const form = document.querySelector(".order-now-form");

    const orderNowBtn = document.querySelector(".order-now-btn");

    const overlay = document.querySelector("#checkout-overlay");

    const clearCart = document.querySelector(".clr-cart-btn");

    orderBtn.addEventListener("click", openCheckout.bind(null,overlay));
    closeBtn.addEventListener("click", closeCheckout.bind(null,overlay,form));
    orderNowBtn.addEventListener("click", orderNow);
    clearCart.addEventListener("click", updateCheckoutClose);
}

export function getRoomDelivery(){
    return roomDelivery;
}