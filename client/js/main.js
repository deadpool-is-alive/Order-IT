import {getProducts} from "./api/productApi.js"
import {showSkeleton} from "./products/skeleton.js";
import {renderProducts} from "./products/renderProducts.js";
import {initCartUI} from "./cart/cartUI.js";
import {initCheckout} from "./checkout/checkout.js";
import {initSearch} from "./search/search.js";
import {loadShopStatus} from "./shop/shop.js";
import { injectAuthUI } from "./auth/authUI.js";
import { initAuthEvents } from "./auth/authEvents.js";
import { CONFIG } from "./config.js";
import { initAnnoucements } from "./annoucement/annoucement.js";

async function init(){

    showSkeleton(8);

    injectAuthUI();
    initAuthEvents();

    const socket = io(CONFIG.API_URL);

    await loadShopStatus(socket);
    initAnnoucements(socket);

    
    const products = await getProducts();

    renderProducts(products);

    console.log(products);

    initCartUI(products);

    initCheckout(products);

    initSearch();
}

init();