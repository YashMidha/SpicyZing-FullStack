const ITEMS = [
    ["Pizza", "150", "veg", "main"],
    ["Paneer Roll", "100", "veg", "main"],
    ["Chicken Roll", "120", "non-veg", "main"],
    ["Chocolate Icecream", "80", "veg", "dessert"],
    ["Strawberry Icecream", "70", "veg", "dessert"],
    ["Vanilla Icecream", "60", "veg", "dessert"],
    ["Chicken Sandwich", "120", "non-veg", "main"],
    ["Veg Sandwich", "100", "veg", "main"],
    ["Grilled Sandwich", "120", "veg", "main"],
    ["Cup Cake", "30", "veg", "dessert"],
    ["Red Velvet Cake", "70", "non-veg", "dessert"],
    ["Vanilla Cake", "60", "non-veg", "dessert"],
    ["Butter Coach Cake", "70", "non-veg", "dessert"],
    ["Redsauce Pasta", "100", "veg", "main"],
    ["Whitesauce Pasta", "100", "veg", "main"],
    ["Veg Noodles", "100", "veg", "main"],
    ["Chicken Noodles", "150", "non-veg", "main"],
];

var cartItems = {};
var total_items = 0;

function resetCart(){
    for (i=0; i<ITEMS.length; i++){
        cartItems[i] = 0;
    }
    total_items = 0;
}

function populateCart(){
    const template = document.querySelector("#cart-template");
    var target = document.querySelector(".cart-container");
    for (i=0; i<ITEMS.length; i++){
        newNode = document.importNode(template.content, true);
        newNode.querySelector("img").src = "../assets/food_" + (i+1) + ".png";
        newNode.querySelector("#cart-name").innerHTML = ITEMS[i][0];
        newNode.querySelector("#cart-price").innerHTML = "Price: ₹" + ITEMS[i][1];
        newNode.querySelector("#cart-quantity").innerHTML = 0;
        newNode.querySelector(".item-id").innerHTML = i;
        target.appendChild(newNode);
    }
    els = document.querySelectorAll(".cart-items");
    for(i=0; i<ITEMS.length; i++){
        els[i].style.display = "none";
    }
}

function loadItems(){
    const template = document.querySelector("#items-template");
    var target = document.getElementById("target");
    for (i=0; i<ITEMS.length; i++){
        newNode = document.importNode(template.content, true);
        newNode.querySelector("img").src = "../assets/food_" + (i+1) + ".png";
        newNode.querySelector("h3").innerHTML = ITEMS[i][0];
        newNode.querySelector(".item-info p").innerHTML = "Price: ₹" + ITEMS[i][1];
        newNode.querySelector(".control-item-count .item-id").innerHTML = i;
        target.appendChild(newNode);
    }
    resetCart();
    populateCart();
}

function toggleQuantityButtons(obj){
    childrens = obj.children;
    for (i=0; i<childrens.length; i++){
        childrens[i].classList.toggle("hide-element");
    }
}

function updateCartItemNumber(){
    obj = document.querySelector(".number-of-items");
    obj.innerHTML = total_items;
    if (total_items == 1){
        obj.classList.remove("hide-element");
    }
    else if(total_items == 0){
        obj.classList.add("hide-element");
    }
}

function decreaseQuantity(obj){
    element = obj.parentElement;
    id = parseInt(element.querySelector(".item-id").innerHTML);
    obj.parentElement.querySelector("p").innerHTML = --cartItems[id];
    if (cartItems[id] == 0){
        toggleQuantityButtons(element);
    }
    total_items--;
    updateCartItemNumber();
}

function increaseQuantity(obj){
    element = obj.parentElement;
    id = parseInt(element.querySelector(".item-id").innerHTML);
    obj.parentElement.querySelector("p").innerHTML = ++cartItems[id];
    if (cartItems[id] == 1){
        toggleQuantityButtons(element);
    }
    total_items++;
    updateCartItemNumber();
}

function forceUpdateQuantity(){
    els = document.querySelectorAll(".items");
    for (i=0; i<ITEMS.length; i++){
        els[i].querySelector(".item-quan").innerHTML = cartItems[i];
        if (cartItems[i] == 0){
            controls = els[i].querySelector(".control-item-count").children;
            for (j=0; j<controls.length; j++){
                controls[j].classList.add("hide-element");
            }
        }
    }
}

window.onload = loadItems();
