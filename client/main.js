let products = [];

let cart = {};

let totalBill = 0;
// =============================
// Skeleton Loading
// ==============================
function showSkeleton(count = 6){
    const item_container = document.querySelector(".item");
    item_container.innerHTML = "";

    const skHeading = document.createElement("div");
    skHeading.className = "item__type";
    skHeading.innerHTML = `div class="skeleton skeleton-line lg" style="width: 120px; height:14px;></div>`;

    const skWrapper = document.createElement("div");
    skWrapper.className = "item__wrapper";

    for(let i = 0; i < count; i++){
        skWrapper.innerHTML += `
            <div class="skeleton-card">
                <div class="skeleton skeleton-img"></div>
                <div class="skeleton skeleton-line-lg"></div>
                <div class="skeleton skeleton-line-sm"></div>
                <div class="skeleton skeleton-footer"></div>
            </div>`;
    }

    item_container.append(skHeading, skWrapper);
}

async function loadProducts(){

    showSkeleton(8);


    const response = await fetch(
        "http://172.23.17.133:5000/products"
    );

    products = await response.json();

    renderProducts(products);
}

function renderProducts(items){
    const item_container = document.querySelector(".item")
    
    item_container.innerHTML = "";

    items.forEach((item,index) => {
        let container = document.getElementById(item.category.toLowerCase());
       
        if(container == null){
            const newCategory_heading = document.createElement("div");
            newCategory_heading.className = "item__type";
            newCategory_heading.innerHTML = `<h1 class = "item__type__title">${item.category.toLowerCase()}</h1>`;

            const newCategory_items = document.createElement("div");
            newCategory_items.id = item.category.toLowerCase();
            newCategory_items.className = "item__wrapper";

            const Category_container = document.querySelector(".item");
            Category_container.append(newCategory_heading, newCategory_items);

            container = newCategory_items;
        }
        
        container.innerHTML += `
                    <div class = "item__dish">
                        <img src="./public/images/${item.name.toLowerCase()}.png" class = "item__dish__image">
                            
                        <h1 class = "item__dish__name">
                            ${item.name} 
                            <img src="./public/images/label${item.is_veg}.png" class = "item__dish__label">
                        </h1>

                        <div class = "item__dish__footer">
                        
                            <h1 class = "item__dish__rate">
                                ₹ ${item.price}
                            </h1>
                            
                            <div class = "add-to-cart__items">
                                
                                <button class = "plus-btn" 
                                        data-index= "${index}">
                                    +
                                </button>
                                
                                <span class = "add-to-cart__items__quantity" id="quantity-${index}"> 0 
                                </span>
                                
                                <button class = "minus-btn"
                                        data-index= "${index}">
                                    -
                                </button>
                                
                            </div>
                        </div>
                    </div>
                `;
    })
}

let timer;

document.getElementById("search").addEventListener("input",  e => {
    clearTimeout(timer);

    timer = setTimeout( async () => {
        const query = e.target.value;
        
        const response = await fetch(`http://172.23.17.133:5000/products/search?q=${query}`);

        const filtered = await response.json();

        renderProducts(filtered);
    }, 300);
    

});


function updateCartBadge(){
    const badge = document.getElementById("cart-badge");
    const totalItems = Object.values(cart).reduce((sum,i) => sum + i.quantity, 0);
    if(totalItems > 0){
        badge.textContent = totalItems > 99 ? "99+" : totalItems;
        badge.classList.add("visible");
    } else{
        badge.classList.remove("visible");
    }
}



document.addEventListener("click", (event) => {

    if(event.target.classList.contains("plus-btn")){
        const index = event.target.dataset.index;

        const item = products[index];

        if(!cart[item.name]){
            cart[item.name] = {
                quantity: 0,
                price: item.price
            };
        }

        cart[item.name].quantity++;

        totalBill += item.price;

        document.getElementById(
            `quantity-${index}`
        ).textContent = cart[item.name].quantity;

        updateCartBadge();
        console.log(cart);
        console.log("Bill", totalBill);
    }
});

document.addEventListener("click", (event) =>{

    if(event.target.classList.contains("minus-btn")){

        const index = event.target.dataset.index;

        const item = products[index];

        if( cart[item.name] && cart[item.name].quantity > 0){
            cart[item.name].quantity--;

            totalBill -= item.price;

            document.getElementById(
                `quantity-${index}`
            ).textContent = cart[item.name].quantity;

            if(cart[item.name].quantity === 0){
                delete cart[item.name];
            }

            updateCartBadge();
        }
        console.log(cart);
        console.log("Bill: ", totalBill);
    }
});


const orderBtn = document.querySelector(".order_btn");

const overlay = document.querySelector("#checkout-overlay")

const orderNowBtn = document.querySelector(".order-now-btn");

const orderNowForm = document.querySelector(".order-now-form");

document
    .querySelector(".checkout-close")
    .addEventListener("click", () => {

        overlay.classList.remove("active");

    });


function renderCheckout(){
    const container = document.querySelector("#checkout-items");

    container.innerHTML = "";

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

    let total = 0;

    for(const [name,item] of Object.entries(cart)){
        total += item.quantity * item.price;

        container.innerHTML += `
            <div class="checkout-item">
                ${name} x ${item.quantity} - ₹${item.quantity * item.price}
            </div>
            `;
    }

    document.querySelector(".checkout-total").textContent = `₹${total}`;
}

orderBtn.addEventListener("click", () => {
    renderCheckout();

    overlay.classList.add("active");
})


orderNowBtn.addEventListener("click", () => {
    // make the form active;
    orderNowForm.classList.add("active");
})


// ======================
// SHOP TOGGLE 
// ======================

const shopStatusBtn = document.getElementById("shop-status-btn");
const shopStatusLabel = document.getElementById("shop-status-label");

shopStatusBtn.addEventListener("click", ()=> {
    console.log("opened clicked");
    const isOpen = shopStatusBtn.dataset.open === "true";
    shopStatusBtn.dataset.open = (!isOpen).toString();
    shopStatusLabel.textContent = isOpen ? "Closed" : "Open";
});

loadProducts();