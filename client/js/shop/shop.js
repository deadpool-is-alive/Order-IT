import {CONFIG} from "../config.js";

export async function loadShopStatus(){

    const response = await fetch(`${CONFIG.API_URL}/shop/status`);

    const data = await response.json();

    const btn = document.getElementById("shop-status-btn");

    const label = document.getElementById("shop-status-label");

    btn.dataset.open = data.isOpen;

    label.textContent = data.isOpen ? "Open" : "Shop Closed";
}