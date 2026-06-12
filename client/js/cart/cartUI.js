import {addItem, removeItem, getCart} from "./cartStore.js";

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

    const item = products[index-1];

    addItem(item);

    const quantity =
        getCart()[item.id].quantity;

    document.getElementById(
        `quantity-${index}`
    ).textContent = quantity;

    updateCartBadge();
}

function handleMinus(products,index){

    const item = products[index-1];

    removeItem(item);

    const quantity =
        getCart()[item.id]?.quantity || 0;

    document.getElementById(
        `quantity-${index}`
    ).textContent = quantity;

    updateCartBadge();
}

export function initCartUI(products){

    updateCartBadge();

    document.addEventListener("click", (event) => {
        if(event.target.classList.contains("plus-btn")){
            const index = event.target.dataset.index;

            handlePlus(products, index);
        }

        if(event.target.classList.contains("minus-btn")){
            const index = event.target.dataset.index;
            handleMinus(products, index);
        }
    })

}