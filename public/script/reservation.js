function incorrectText(msg){
    el = document.querySelector(".red-incorrect");
    el.style.display = "flex"
    el.querySelector("p").innerHTML = msg;
}

function correctText(){
    el = document.querySelector(".red-incorrect");
    el.querySelector("p").innerHTML = "";
    el.style.display = "none"
}

function validate(){
    if (validateName()){
        if (validePhone()){
            if (validateDate()){
                if (validateTime()){
                    if (validateNumber()){
                        window.location.href="../index.html";
                    }
                }
            }
        }
    }
}

function validateName(){
    Name = document.querySelector("#res-name").value;
    if (Name.length == 0){
        incorrectText("Please enter name");
        return 0;
    }
    for (i=0; i<Name.length; i++){
        if (Name[i] >= '0' && Name[i] <= '9'){
            incorrectText("Name cannout contain numbers");
            return 0;
        }
    }
    correctText();
    return 1;
}

function validePhone(){
    phone = document.querySelector("#res-phone").value;
    if (phone.length == 0){
        incorrectText("Please enter phone");
        return 0;
    }
    if (!(phone.length >= 8 && phone.length <= 12)){
        incorrectText("Invalid Phone Number");
        return 0;
    }
    for (i=0; i<phone.length; i++){
        if (!(phone[i] >= '0' && phone[i] <= '9')){
            incorrectText("Phone cannout have letters");
            return 0;
        }
    }
    return 1;
}


function validateDate(){
    date = document.querySelector("#res-date").value;
    if (date.length == 0){
        incorrectText("Please enter date");
        return 0;
    }
    const today = new Date();
    d = String(today.getDate()).padStart(2, '0');
    m = String(today.getMonth()+1).padStart(2, '0');
    y = String(today.getFullYear());
    if (date.slice(5, 7) == m){
        if (date.slice(8, 10) < d){
            incorrectText("Invalid Date");
            return 0;
        }
    }
    if (date.slice(5,7) < m){
        incorrectText("Invalid Date");
        return 0;
    }
    return 1;
}

function validateTime(){
    time = document.querySelector("#res-time").value;
    if (time.length == 0){
        incorrectText("Please enter time");
        return 0;
    }
    if (time.slice(0, 2) < "06"){
        incorrectText("Restaurnant opens at 6:00 AM");
        return 0;
    }
    if (time.slice(0, 2) > "22"){
        incorrectText("Restaurnant closes at 11:00 PM");
        return 0;
    }
    return 1;
}

function validateNumber(){
    num = document.querySelector("#res-number").value;
    if (num.length == 0){
        incorrectText("Please enter number of people");
        return 0;
    }
    num = parseInt(num);
    if (num <=0){
        incorrectText("Invalid number of people");
        return 0;
    }
    return 1;
}
