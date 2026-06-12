const CART_KEY = "canteen_cart";

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};

let totalBill = calculateTotalBill();

function saveCart(){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function calculateTotalBill(){
    let total = 0;

    for(const item of Object.values(cart)){
        total += item.quantity * Number(item.price);
    }

    return total;
}



export function addItem(item){
    if(!cart[item.id]){
            cart[item.id] = {
                name: item.name,
                quantity: 0,
                price: item.price,
                packaging_cost: item.packaging_cost
            };
        }
        console.log("Adding item: " + item.name + " item id = " + item.id);
        cart[item.id].quantity++;
        totalBill += Number(item.price);
    saveCart();
}

export function removeItem(item){
    if( cart[item.id] && cart[item.id].quantity > 0){
            
        cart[item.id].quantity--;

        totalBill -= Number(item.price);

        console.log("Adding item: " + item.namej + " item id = " + item.id);

        if(cart[item.id].quantity === 0){
            delete cart[item.id];
        }
        saveCart();
    }
}

export function clearCart(){
    cart = {};
    totalBill = 0;

    localStorage.removeItem(CART_KEY);
}

export function getCart(){
    return cart;
}

export function getTotalBill(){ 
    return totalBill;
}

export function getPackagingTotal(){
    let total = 0;

    for(const item of Object.values(cart)){
        //console.log(typeof item.quantity);
        //console.log(typeof item.packaging_cost);
        total += item.quantity * item.packaging_cost;
    }

    return total;
}

export function getFinalBill(roomDelivery){
    //console.log("Getting the bill");
    return getTotalBill() + Math.min((roomDelivery ? getPackagingTotal() : 0),50);
}
