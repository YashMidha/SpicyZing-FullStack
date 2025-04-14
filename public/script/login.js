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
    if (validateEmail()){
        if (validatePassword()){
            return true;
        }
    }
    return false;
}

function validateEmail(){
    email = document.querySelector("#login-email").value;
    if (email.length == 0){
        incorrectText("Please enter email");
        return 0;
    }
    return 1;
}

function validatePassword(){
    password = document.querySelector("#login-password").value;
    if (password.length == 0){
        incorrectText("Please enter password");
        return 0;
    }
    return 1;
}