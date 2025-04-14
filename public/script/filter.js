var selected = [0, 0, 0, 0];
var filterApplied = false;
var names = ["veg", "non-veg", "main", "dessert"];

function drawTick(){
    els = document.querySelectorAll(".filter");
    for (i=0; i<4; i++){
        if (selected[i]){
            els[i].querySelector(".tick").style.visibility = 'visible';
        }
        else{
            els[i].querySelector(".tick").style.visibility = 'hidden';
        }
    }
}

function actuallyFilter(){
    list = search(false, "filter");
    l2 = [];
    if (list.length == 0){
        return;
    }
    for (i=0; i<ITEMS.length; i++){
        compare1 = selected[0]? names[0]: names[1];
        compare2 = selected[2]? names[2]: names[3];
        if ((selected[0] || selected[1]) && !(selected[2] || selected[3])){
            if (ITEMS[i][2] == compare1 && list.includes(i)){
                l2.push(i);
            }
        }
        if ((selected[2] || selected[3]) && !(selected[0] || selected[1])){
            if (ITEMS[i][3] == compare2 && list.includes(i)){
                l2.push(i);
            }
        }
        if ((selected[0] || selected[1]) && (selected[2] || selected[3])){
            if (ITEMS[i][2] == compare1 && list.includes(i) && ITEMS[i][3] == compare2){
                l2.push(i);
            }
        }
    }
    if (l2.length == 0){
        search(true, "filter");
    }
    hideItems(l2, true);
}

function Filter(obj){
    id = parseInt(obj.querySelector(".id-invisible").innerHTML);
    if (id == 4){
        resetFilter();
        selected = [0, 0, 0, 0];
        drawTick();
        search(false, "filter");
        return;
    }
    if (selected[id]){
        selected[id] = 0;
    }
    else{
        selected[id] = 1;
        if (id%2==0){
            selected[(id+1)] = 0;
        }
        else{
            selected[(id-1)] = 0;
        }
    }
    drawTick();
    bool = false;
    for (i=0; i<4; i++){
        if (selected[i] == 1){
            bool = true;
        }
    }
    if (bool){
        filterApplied = true;
    }
    else{
        filterApplied = false;
    }
    if (filterApplied){
        actuallyFilter();
    }
    else{
        search(false, "filter");
    }
}