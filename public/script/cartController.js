// Populate cart in menuContoller.js

cartOpen = false;
totalPrice = 0;

function resetFilter(){
    els = document.querySelectorAll(".filter");
    console.log(els);
    for(i=0; i<els.length; i++){
        els[i].querySelector(".tick").style.visibility = "hidden";
    }
    selected = [0, 0, 0, 0];
    filterApplied = false;
    document.querySelector("#search-item").value = "";
}

function hideCartView(){
    els = document.querySelectorAll(".cart-text");
    for (i=0; i<els.length; i++){
        els[i].classList.add("hide-element");
    }
    document.querySelector(".cart-empty").classList.add("hide-element");
}

function showCartView(){
    els = document.querySelectorAll(".cart-text");
    for (i=0; i<els.length; i++){
        els[i].classList.remove("hide-element");
    }
}

function hideCartItems(){
    els = document.querySelectorAll(".cart-items");
    for (i=0; i<els.length; i++){
        els[i].style.display = "none";
    }
}

function showCartItems(l, entire=false){
    if (l.length == 0 && !entire){
        document.querySelector(".cart-empty").classList.remove("hide-element");
        els = document.querySelectorAll(".cart-text");
        for (i=0; i<els.length; i++){
            els[i].classList.add("hide-element");
        }
    }
    els = document.querySelectorAll(".cart-items");
    for (i=0; i<els.length; i++){
        if (entire || l.includes(i)){
            els[i].style.display = "flex";
        }
    }
}

function refreshCart(){
    l = [];
    els = document.querySelectorAll(".cart-items");
    totalPrice = 0;
    hideCartItems()
    for (i=0; i<ITEMS.length; i++){
        els[i].querySelector("#cart-quantity").innerHTML = cartItems[i];
        els[i].querySelector("#cart-price").innerHTML = "Price: ₹" + (cartItems[i] * ITEMS[i][1]);
        totalPrice += (ITEMS[i][1] * cartItems[i]);
        if (cartItems[i] > 0){
            l.push(i);
        }
    }
    showCartItems(l);
    document.querySelector("#cart-total-items").innerHTML = "Total Items: " + total_items;
    document.querySelector("#grand-total").innerHTML = "Grand Total: ₹" + totalPrice;

}

function toggleCart(){
   if (cartOpen){  // close cart
        hideItems([], false);
        document.getElementById("close").style.display = "none";
        document.querySelector(".filters").style.display = "flex";
        hideCartView();
        hideCartItems();
        forceUpdateQuantity();
        resetFilter();
    }
    else{  // open cart
        document.querySelector(".information").classList.remove("hide-element");
        hideItems([], true);
        document.getElementById("close").style.display = "block";
        document.querySelector(".filters").style.display = "none";
        showCartView();
        refreshCart();
    }
    document.querySelector(".information").classList.toggle("hide-element");
    document.querySelector("#no-searches-matching").innerHTML = "";
    
    cartOpen = !cartOpen;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;    
}

function cartDecreaseQuantity(obj){
    element = obj.parentElement;
    id = parseInt(element.querySelector(".item-id").innerHTML);
    obj.parentElement.querySelector("p").innerHTML = --cartItems[id];
    total_items--;
    refreshCart();
    updateCartItemNumber();
}

function cartIncreaseQuantity(obj){
    element = obj.parentElement;
    id = parseInt(element.querySelector(".item-id").innerHTML);
    obj.parentElement.querySelector("p").innerHTML = ++cartItems[id];
    total_items++;
    refreshCart();
    updateCartItemNumber();
}

