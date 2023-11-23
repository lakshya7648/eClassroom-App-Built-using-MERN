export const validateEmail = (email)=>{
    return email.length > 5 && email.includes("@") && email.includes(".");
}

export const validatePassword = (password)=>{
    let containsDigit = false, containsSpecialChar = false, containsUpperCase = false;
    if(password.length < 8) {
        return false;
    }
    for(let i = 0; i < password.length; i++) {
        const pchar = password.charAt(i);
        if(pchar >= "A" && pchar <="Z") {
            containsUpperCase = true;
        }
        if(pchar >= 0 && pchar <= 9) {
            containsDigit = true;
        }
        if(pchar == '@' || pchar == '$' || pchar =='#'){
            containsSpecialChar = true;
        }
    }

    return containsDigit && containsUpperCase && containsSpecialChar;
}