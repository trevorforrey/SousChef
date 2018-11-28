
var MongoClient = require('mongodb').MongoClient;
var expressValidator = require('express-validator');
var passport = require('passport');

//Seems to be an issue with Bcrypt
var bcrypt = require('bcryptjs'); //Encrypt users passwords in the DB
const saltRounds = 10;


async function postRegistration(req, res) {
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    const errors = req.validationErrors();
    //Registration form data
    let registrationData = req.body;
    let fNameReg = registrationData.firstnameReg;
    let lNameReg = registrationData.lastnameReg;
    let emailReg = registrationData.email;
    let uNameReg = registrationData.usernameReg;
    let passReg = registrationData.passwordReg;
    let confirmPassReg = registrationData.confirmPasswordReg;
    
    //Encrypt password before sending to MongoDB
    const hash = await bcrypt.hash(passReg, saltRounds);
    
    //Create a JSON object of the registration form data
    var registrationInsert = {
        firstname: fNameReg,
        lastname: lNameReg,
        email: emailReg,
        username: uNameReg,
        pass: hash,
        confirmPass: hash
    };
    
    try {
        /*Make the registration page more robust and make sure the user is entering a valid username,
          email and the correct password is being made in the confirm password field*/
        req.checkBody('usernameReg', 'Username field cannot be empty.').notEmpty();
        req.checkBody('usernameReg', 'Username must be between 4-15 characters long.').len(4, 15);
        req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
        req.checkBody('passwordReg', 'Password must be between 6-100 characters long.').len(8, 100);
        //Uncomment below when deploying to make Password stronger
        req.checkBody("passwordReg", "Password must include 1 Upper & 1 lowercase character, a" +
            " number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        req.checkBody('confirmPasswordReg', 'Password must be between 6-100 characters long.').len(6, 100);
        req.checkBody('confirmPasswordReg', 'Passwords do not match, please try again.').equals(confirmPassReg);
        // Additional validation to ensure username is alphanumeric with underscores and dashes
        req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
        console.log('req.body', req.checkBody);
        console.log('Are there any errors?', errors);
        
        //-------------Uncomment when we can get express-validator working correctly -----------
        /*Errors in registration so redirect back to registration
          and display error messages before inserting into DB*/
        /*if(errors) {
            console.log('errors ', errors);
            req.session.errors = errors;
            res.render('login_registration.hbs', {
                title: 'Registration Error',
                errors: errors
            });
        }*/
        //-------------Uncomment when we can get express-validator working correctly -----------
        
        await MongoClient.connect(uri, function (err, db) {
            console.log("Connected correctly to server – To POST Registration");
            let dbo = db.db('sous-chef');
            dbo.collection('users').findOne({username: uNameReg }, function (err, user) {
                if(user) { //If username is not in the DB then send them back to login page
                    req.usernameCheckReg = true;
                    res.render('registration.hbs', { usernameCheckReg: req.usernameCheckReg, usernameExists: uNameReg});
                    db.close();
                }
                else {
                    dbo.collection('users').insertOne(registrationInsert, function (err, res) {
                        db.close();
                    });
                    req.session.username = uNameReg;
                    req.session.firstname = fNameReg;
                    req.checkSessionExists = true;
                    req.welcomeName = fNameReg;
                    res.render('index', { checkSessionExists: req.checkSessionExists,
                        welcomeName: req.welcomeName });
                }
            })
        });
        
        
        //Registration is ok post to DB
        /*await MongoClient.connect(uri, function (err, db) {
            let dbo = db.db('sous-chef');
            dbo.collection('users').insertOne(registrationInsert, function (err, res) {
                db.close();
            })
        });
        res.render('login_registration.hbs');*/
        
        
    } catch (err) {
        res.status(500);
        res.send("Error adding user to database");
        console.log(err.stack);
    }
};

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

// allows us to import the function in app.js
export default postRegistration;



