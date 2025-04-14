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
            if (validatePassword()){
                if (validateDOB()){
                    if (validateGender()){
                        if (validePhone()){
                            if (validateTerms()){
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

function validateName(){
    Name = document.querySelector("#signup-name").value;
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
    email = document.querySelector("#signup-email").value;
    if (email.length == 0){
        incorrectText("Please enter email");
        return 0;
    }
    return 1;
}

function validatePassword(){
    password = document.querySelector("#signup-password").value;
    if (password.length == 0){
        incorrectText("Please enter password");
        return 0;
    }
    if (password.length < 8){
        incorrectText("Password must have 8 characters");
        return 0;
    }
    return 1;
}

function validateDOB(){
    dob = document.querySelector("#signup-dob").value;
    if (dob.length == 0){
        incorrectText("Please enter dob");
        return 0;
    }
    if (dob.slice(0, 4) > "2006"){
        incorrectText("Age must be greater than 18");
        return 0;
    }
    return 1;
}

function validateGender(){
    gender = document.getElementsByName("gender");
    val = 0;
    for(i=0; i<gender.length; i++){
        if (gender[i].checked){
            val = 1;
        }
    }
    if (!val){
        incorrectText("Please select gender");
    }
    return val;
}

function validePhone(){
    phone = document.querySelector("#signup-phone").value;
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

function validateTerms(){
    terms = document.querySelector("#signup-terms");
    if (!terms.checked){
        incorrectText("Please accept terms");
        return 0;
    }
    return 1;
}
