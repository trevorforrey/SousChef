
var MongoClient = require('mongodb').MongoClient;

async function postRegistration(req, res) {
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    //Registration form data
    let registrationData = req.body;
    let fNameReg = registrationData.firstnameReg;
    let lNameReg = registrationData.lastnameReg;
    let emailReg = registrationData.email;
    let uNameReg = registrationData.usernameReg;
    let passReg = registrationData.passwordReg;
    let confirmPassReg = registrationData.confirmPasswordReg;
    
    //Create a JSON object of the registration form data
    var registrationInsert = {
        firstname: fNameReg,
        lastname: lNameReg,
        email: emailReg,
        username: uNameReg,
        pass: passReg,
        confirmPass: confirmPassReg
    };
    
    
    try {
        console.log("Connected correctly to server – To POST Registration");
        const { check, validationResult } = require('express-validator/check');
        const errors = validationResult(req);
        
        
        /*Make the registration page more robust and make sure the user is entering a valid username,
          email and the correct password is being made in the confirm password field*/
        req.check(uNameReg, 'Username field cannot be empty.').notEmpty();
        req.check(uNameReg, 'Username must be between 4-15 characters long.').len(4, 15);
        req.check('email', 'The email you entered is invalid, please try again.').isEmail();
        req.check('passwordReg', 'Password must be between 6-100 characters long.').len(8, 100);
        //Uncomment below when deploying to make Password stronger
        req.check("passwordReg", "Password must include 1 Upper & 1 lowercase character, a" +
            " number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        req.check('confirmPasswordReg', 'Password must be between 6-100 characters long.').len(6, 100);
        req.check(confirmPassReg, 'Passwords do not match, please try again.').equals(confirmPassReg);
        // Additional validation to ensure username is alphanumeric with underscores and dashes
        req.check('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
        console.log('Are there any errors?', errors);
        
        /*Errors in registration so redirect back to registration
          and display error messages before inserting into DB*/
        /*if(errors) {
            console.log('errors ', this.msg);
            res.render('login_registration.hbs', {
                title: 'Registration Error',
                errors: errors.array()
            });
        }*/
        
        
        //Registration is ok post to DB
        await MongoClient.connect(uri, function (err, db) {
            let dbo = db.db('sous-chef');
            dbo.collection('users').insertOne(registrationInsert, function (err, res) {
                db.close();
            })
        });
        res.redirect('/');
        
        
    } catch (err) {
        res.status(500);
        res.send("Error adding user to database");
        console.log(err.stack);
    }
};

// allows us to import the function in app.js
export default postRegistration;



//======================================
//======================================

/*
function loginSubmit(form) {
    //Get the value of the username and password entered to login
    let username = form.usernameLogin.value;
    let password = form.passwordLogin.value;
 
    console.log("Value of username is: ", username);
}


function registerSubmit(reg_form) {
    //Get the values of the registration form
    let fName = reg_form.firstnameReg.value;
    let lName = reg_form.lastnameReg.value;
    let usernameReg = reg_form.usernameReg.value;
    let email = reg_form.email.value;
    let passwordReg = reg_form.passwordReg.value;
}

*/

