const items = [
    {
        name: "Burger",
        price: 40,
        image: "../Images/burger.png",
        veg: true
    },
    {
        name: "Maggie",
        price: 30,
        image: "../Images/maggie.png",
        veg: true
    },
    {
        name: "Sandwich",
        price: 50,
        image: "../Images/sandwich.png",
        veg: true
    }
];

let products = [];

async function loadProducts(){
    const response = await fetch(
        "http://localhost:5000/products"
    );

    products = await response.json();

    renderProducts(products);
    // console.log(products);
    // const wrapper = document.querySelector("#snacks");

    // products.forEach((item, index) => {
    //     const dish = document.createElement("div");

    //     dish.className = "item__dish";

    //     dish.innerHTML = `
    //                 
    //                     <img src="../Images/${item.item_name}.png" class = "item__dish__image">
                            
    //                     <h1 class = "item__dish__name">
    //                         ${item.item_name} 
    //                         <img src="../Images/vegLabel.png" class = "item__dish__label">
    //                     </h1>

    //                     <div class = "item__dish__footer">
                        
    //                         <h1 class = "item__dish__rate">
    //                             ₹ ${item.price}
    //                         </h1>
                            
    //                         <div class = "add-to-cart__items">
                                
    //                             <button class = "plus-btn" 
    //                                     data-index= "${index}">
    //                                 +
    //                             </button>
                                
    //                             <span class = "add-to-cart__items__quantity" id="quantity-${index}"> 0 
    //                             </span>
                                
    //                             <button class = "minus-btn"
    //                                     data-index= "${index}">
    //                                 -
    //                             </button>
                                
    //                         </div>
    //                     </div>
    //                 
    //                     `;

    //     wrapper.append(dish);
    // });
}

function renderProducts(items){
    const container = document.getElementById("snacks");
    
    container.innerHTML = "";

    items.forEach((item,index) => {
        container.innerHTML += `
                    <div class = "item__dish">
                        <img src="../Images/${item.item_name}.png" class = "item__dish__image">
                            
                        <h1 class = "item__dish__name">
                            ${item.item_name} 
                            <img src="../Images/vegLabel.png" class = "item__dish__label">
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
        
        const response = await fetch(`http://localhost:5000/products/search?q=${query}`);

        const filtered = await response.json();

        renderProducts(filtered);
    }, 300);
    

});

loadProducts();


// const wrapper = document.querySelector("#snacks");

// products.forEach((item, index) => {
//     const dish = document.createElement("div");

//     dish.className = "item__dish";

//     dish.innerHTML = `
//                     <img src="../Images/${item.item_name}.png" class = "item__dish__image">
                        
//                     <h1 class = "item__dish__name">
//                         ${item.item_name} 
//                         <img src="../Images/vegLabel.png" class = "item__dish__label">
//                     </h1>

//                     <div class = "item__dish__footer">
                    
//                         <h1 class = "item__dish__rate">
//                             ₹ ${item.price}
//                         </h1>
                        
//                         <div class = "add-to-cart__items">
                            
//                             <button class = "plus-btn" 
//                                     data-index= "${index}">
//                                 +
//                             </button>
                            
//                             <span class = "add-to-cart__items__quantity" id="quantity-${index}"> 0 
//                             </span>
                            
//                             <button class = "minus-btn"
//                                     data-index= "${index}">
//                                 -
//                             </button>
                            
//                         </div>
//                     </div>
//             `;

//     wrapper.append(dish);
// });



// for(const item of items){
//     wrapper.innerHTML += `
//     <div class = "item__dish">
//                         <img src=${item.image} class = "item__dish__image">
//                         <h1 class = "item__dish__name">${item.name} <img src="../Images/vegLabel.png" class = "item__dish__label"></h1>
//                         <div class = "item__dish__footer">
//                             <h1 class = "item__dish__rate">₹ ${item.price}</h1>
//                             <div class = "add-to-cart__items">
//                                 <button>+</button> <h1 class = "add-to-cart__items__quantity"> 0 </h1><button>-</button>
//                             </div>
//                         </div>
//                     </div>
//     `;
// }


let cart = {};

totalBill = 0;

document.addEventListener("click", (event) => {

    if(event.target.classList.contains("plus-btn")){
        const index = event.target.dataset.index;

        const item = items[index];

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

        console.log(cart);
        console.log("Bill", totalBill);
    }
});

document.addEventListener("click", (event) =>{

    if(event.target.classList.contains("minus-btn")){

        const index = event.target.dataset.index;

        const item = items[index];

        if( cart[item.name] && cart[item.name].quantity > 0){
            cart[item.name].quantity--;

            totalBill -= item.price;

            document.getElementById(
                `quantity-${index}`
            ).textContent = cart[item.name].quantity;

            if(cart[item.name].quantity === 0){
                delete cart[item.name];
            }
        }
        console.log(cart);
        console.log("Bill: ", totalBill);
    }
});


const orderBtn = document.querySelector(".order_btn");

const overlay = document.querySelector("#checkout-overlay")


document
    .querySelector(".checkout-close")
    .addEventListener("click", () => {

        overlay.classList.remove("active");

    });


function renderCheckout(){
    const container = document.querySelector("#checkout-items");

    container.innerHTML = "";

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