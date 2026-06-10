export function renderProducts(items){
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
        if(Number(item.is_available) == 0){
            return;
        }
        
        container.innerHTML += `
                    <div class = "item__dish">
                        <img src="./public/images/${item.image_url}" class = "item__dish__image">
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