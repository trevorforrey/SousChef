//Show user a message if they don't enter the correct password and confirm passwrod
function checkPasswords() {
    if (document.getElementById('passwordReg').value ==
        document.getElementById('confirm-passwordReg').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Passwords Match!';
        document.getElementById('registerSubmit').disabled = false;
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Passwords Do not match!';
        document.getElementById('registerSubmit').disabled = true;
        
    }
}