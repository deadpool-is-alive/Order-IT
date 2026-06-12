import {getProducts} from "./api/productApi.js"
import {showSkeleton} from "./products/skeleton.js";
import {renderProducts} from "./products/renderProducts.js";
import {initCartUI} from "./cart/cartUI.js";
import {initCheckout} from "./checkout/checkout.js";
import {initSearch} from "./search/search.js";
import {loadShopStatus} from "./shop/shop.js";

async function init(){
    showSkeleton(8);

    await loadShopStatus();

    const products = await getProducts();

    renderProducts(products);

    console.log(products);

    initCartUI(products);

    initCheckout();

    initSearch();
}

init();