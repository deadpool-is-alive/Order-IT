import { searchProducts } from "../api/productApi.js";
import { renderProducts } from "../products/renderProducts.js";


export function initSearch(){
    let timer;

    document.getElementById("search").addEventListener("input",  e => {
        clearTimeout(timer);

        timer = setTimeout( async () => {
            const query = e.target.value;
            const filtered = await searchProducts(query);

            renderProducts(filtered);
        }, 300);
    });


}