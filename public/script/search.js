function hideItems(list, hide_items_which_not_specified=true){
    elements = document.querySelector(".container").children;
    for (i=0; i<ITEMS.length; i++){
        if (hide_items_which_not_specified){
            if (!list.includes(i)){
                elements[i].style.display = "none";
            }
            else{
                elements[i].style.display = "flex";
            }
        }
        else{
            if (list.includes(i)){
                elements[i].style.display = "none";
            }
            else{
                elements[i].style.display = "flex";
            }
        }
    }
}

function search(simulate_failed_search=false, caller="function"){
    if (caller == "function" && filterApplied){
        actuallyFilter();
        return;
    }
    if (cartOpen && !(simulate_failed_search)){
        return [-1];
    }
    filter = document.querySelector("#search-item").value;
    if (simulate_failed_search){
        filter = "XYZABC";
    }
    noSearch = document.getElementById("no-searches-matching");
    noSearch.innerHTML = "";
    document.querySelector(".information").classList.remove("hide-element");
    document.querySelector(".filters").style.marginTop = "initial";
    document.querySelector(".filters").style.display = "flex";
    if (filter == ""){
        hideItems([], false);
        list = []
        for (i=0; i<ITEMS.length; i++){
            list.push(i);
        }
        return list;
    }
    filter = filter.toLowerCase();
    list = [];
    if (filter == "veg" || filter == "non-veg"){
        for (i=0; i<ITEMS.length; i++){
            if (ITEMS[i][2] == filter){
                list.push(i);
            }
        }
        hideItems(list, true);
        return list;
    }
    if (filter == "main" || filter == "dessert"){
        for (i=0; i<ITEMS.length; i++){
            if (ITEMS[i][3] == filter){
                list.push(i);
            }
        }
        hideItems(list, true);
        return list;
    }
    for (i=0; i<ITEMS.length; i++){
        item_name = ITEMS[i][0];
        item_name = item_name.toLowerCase();
        if (item_name.includes(filter)){
            list.push(i);
        }
    }
    if (list.length == 0){
        hideItems(list, true);
        noSearch = document.getElementById("no-searches-matching");
        noSearch.innerHTML = "No Result Found";
        document.querySelector(".information").classList.add("hide-element");
        document.querySelector(".filters").style.marginTop = "255px";
        return [-1];
    }
    hideItems(list, true)
    return list;
}

/* Reset filter in cart contoller */
