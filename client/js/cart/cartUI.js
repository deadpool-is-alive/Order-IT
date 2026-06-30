import {addItem, removeItem, getCart, getTotalBill, getPackagingTotal, getFinalBill} from "./cartStore.js";

let onCheckoutUpdate = null;

export function registerCheckoutUpdater(fn){
    onCheckoutUpdate = fn;
}

let currentRoomDelivery = 0;

export function setRoomDelivery(value) {
    currentRoomDelivery = value;
}

function refreshCheckout(){
    if(onCheckoutUpdate) onCheckoutUpdate();
}

function refreshQR(){
    document.getElementById("upiQR").innerHTML = ``;
    const cart = getCart();
    if (Object.keys(cart).length <= 0){
        
        return;
    }
    const upiUrl = `upi://pay?pa=paytm.s24y6q1@pty&pn=Paytm&am=${getFinalBill(currentRoomDelivery)}&cu=INR`
    
    const qrcode = new QRCode(document.getElementById("upiQR"), {
        text: upiUrl,
        width: 220,
        height: 220,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.L
    });

}

export function updateCartBadge(){
    const badge = document.getElementById("cart-badge");
    const totalItems = Object.values(getCart()).reduce((sum,i) => sum + i.quantity, 0);
    if(totalItems > 0){
        badge.textContent = totalItems > 99 ? "99+" : totalItems;
        badge.classList.add("visible");
    } else{
        badge.classList.remove("visible");
    }
}

function handlePlus(products,index){

    const item = products.find(product => product.id === index);

    addItem(item);

    const quantity =
        getCart()[item.id].quantity;

    document.getElementById(
        `quantity-${index}`
    ).textContent = quantity;

    updateCartBadge();
    refreshQR();
}

function handleMinus(products,index){

    const item = products.find(product => product.id === index);

    removeItem(item);

    const quantity =
        getCart()[item.id]?.quantity || 0;

    document.getElementById(
        `quantity-${index}`
    ).textContent = quantity;

    updateCartBadge();
    refreshQR();
}

function handleCheckoutPlus(products, id){
    const item = products.find(product => product.id === id);
    if(!item) return;
    addItem(item);
    const quantity = getCart()[item.id]?.quantity || 0;
    document.getElementById(`checkout-qty-${id}`).textContent = quantity;

    // Update totals without touching the item list
    updateCheckoutTotals();
    // refreshCheckout();
    updateCartBadge();

    refreshQR();
}

function handleCheckoutMinus(products, id){
    const item = products.find(product => product.id === id);
    if(!item) return;
    removeItem(item);
    const quantity = getCart()[item.id]?.quantity || 0;
    
    if(quantity === 0){
        document.getElementById(`checkout-item-${id}`)?.remove();
        checkIfCartEmpty();
    }
    else{
        document.getElementById(`checkout-qty-${id}`).textContent = quantity;
    }

    // Update totals without touching the item list
    updateCheckoutTotals();
    // refreshCheckout();
    updateCartBadge();

    refreshQR();
}

export function initCartUI(products){

    updateCartBadge();

    document.addEventListener("click", (event) => {
        if(event.target.classList.contains("plus-btn")){
            const index = Number(event.target.dataset.index);

            handlePlus(products, index);
        }

        if(event.target.classList.contains("minus-btn")){
            const index = Number(event.target.dataset.index);
            handleMinus(products, index);
        }

        if(event.target.classList.contains("checkout-plus-btn")){
            const id = Number(event.target.dataset.id);
            handleCheckoutPlus(products, id);
        }

        if(event.target.classList.contains("checkout-minus-btn")){
            const id = Number(event.target.dataset.id);
            handleCheckoutMinus(products, id);
        }

        const removeBtn = event.target.closest(".checkout-remove-btn");
        
        if(removeBtn){
            const id = Number(removeBtn.dataset.id);
            const item = products.find(product => product.id === id);
            // console.log("clicking id = " + id);
            // console.log(item);
            if(!item) return;

            const cart = getCart();
            const qty = cart[id]?.quantity || 0;
            for(let i = 0; i < qty; i++){
                removeItem(item);
            }
            document.getElementById(`checkout-item-${id}`)?.remove();
            checkIfCartEmpty();
            updateCheckoutTotals();
            updateCartBadge();
            refreshQR();
        }
    })

}


function updateCheckoutTotals() {
    const totalEl   = document.getElementById("food-total");
    const packEl    = document.getElementById("packaging-total");
    const finalEl   = document.getElementById("checkout-total-amount");

    if (!totalEl) return;   // checkout panel not open, nothing to update

    totalEl.textContent = `₹${getTotalBill()}`;
    packEl.textContent  = currentRoomDelivery ? `₹${getPackagingTotal()}` : "₹0";
    finalEl.textContent = `₹${getFinalBill(currentRoomDelivery)}`;
}

function checkIfCartEmpty() {
    const cart = getCart();
    if (Object.keys(cart).length > 0) return;

    const container = document.querySelector("#checkout-items");
    if (!container) return;
    const form = document.querySelector(".order-now-form");
    form.innerHTML = ``;
    container.innerHTML = `
        <div class="checkout-empty">
            <svg width="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>Your cart is empty</p>
            <span style="font-size:0.82rem; color:var(--clr-charcoal-lt);">
                Add some items to get started
            </span>
        </div>`;
    document.getElementById("checkout-total-amount").textContent = "₹0";
    const orderBtn = document.querySelector(".order-now-btn");
    if (orderBtn) orderBtn.disabled = true;
}
