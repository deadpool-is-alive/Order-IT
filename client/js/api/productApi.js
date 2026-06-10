import { showSkeleton } from "../products/skeleton.js";
import { CONFIG } from "../config.js";

export async function getProducts(){

    showSkeleton(8);
    const response = await fetch(
        `${CONFIG.API_URL}/products`
    );

    return await response.json();
}

export async function searchProducts(query){
    const response = await fetch(
         `${CONFIG.API_URL}/products/search?q=${query}`
    );

    //console.log("Getting response");

    return await response.json();
}