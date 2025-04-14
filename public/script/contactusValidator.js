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
        if (validateEmail()){
            if (validatePhone()){
                if (validateContacted()){
                    window.location.href="../index.html";
                }
            }
        }
    }
}

function validateName(){
    Name = document.querySelector("#contact-name").value;
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

function validateEmail(){
    email = document.querySelector("#contact-email").value;
    if (email.length == 0){
        incorrectText("Please enter email");
        return 0;
    }
    return 1;
}

function validatePhone(){
    phone = document.querySelector("#contact-phone").value;
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

function validateContacted(){
    contacted = document.getElementById("check-input");
    if (contacted.checked){
        val = 0;
        radio = document.getElementsByName("contact-through");
        for (i=0; i<radio.length; i++){
            if (radio[i].checked){
                val = 1;
            }
        }
        if (val == 0){
            incorrectText("Please select contact option");
            return 0;
        }
        return 1;
    }
    return 1;
}


function validateTerms(){
    terms = document.querySelector("#signup-terms");
    if (!terms.checked){
        incorrectText("Please accept terms");
        return 0;
    }
    return 1;
}
