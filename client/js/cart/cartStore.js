const cart = {};

let totalBill = 0;

export function addItem(item){
    if(!cart[item.id]){
            cart[item.id] = {
                name: item.name,
                quantity: 0,
                price: item.price,
                packaging_cost: item.packaging_cost
            };
        }

        cart[item.id].quantity++;
        totalBill += Number(item.price);
}

export function removeItem(item){
    if( cart[item.id] && cart[item.id].quantity > 0){
            
        cart[item.id].quantity--;

        totalBill -= Number(item.price);


        if(cart[item.id].quantity === 0){
            delete cart[item.id];
        }
    }
}

export function getCart(){
    return cart;
}

export function getTotalBill(){
    return totalBill;
}

export function getFinalBill(roomDelivery){
    let total = 0;

    for(const item of Object.values(cart)){
        total += item.quantity *  item.price;

        if(roomDelivery == 1){
            total += item.quantity * item.packaging_cost;
        }
    }

    return total;
}