import {CONFIG} from "../config.js";

let shopOpen = true;

export function isShopOpen(){
    return shopOpen;
}

export async function loadShopStatus(socket){

    const response = await fetch(`${CONFIG.API_URL}/shop/status`);
    const data = await response.json();

    applyStatus(data.isOpen);

    socket.on("shop:status", (data) => applyStatus(data.isOpen));
}

function applyStatus(isOpen) {
    shopOpen = isOpen;
    
    const btn   = document.getElementById("shop-status-btn");
    const label = document.getElementById("shop-status-label");
    btn.dataset.open      = isOpen;
    label.textContent     = isOpen ? "Open" : "Shop Closed";
}