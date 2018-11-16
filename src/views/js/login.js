var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs'); //Encrypt users passwords in the DB


//=========== User Login =================//
async function getLoginUser(req, res) {
    
    let usernameForm = req.body.usernameLogin;
    let passwordForm = req.body.passwordLogin;
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    
    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server – To POST Login");
        
        const db = client.db('sous-chef');
        
        // Get the users collection
        const users = db.collection('users');
    
        //First check if there is a "user session" – a user is already logged in
        // if(req.session && req.session.user) {
        //     res.redirect('/');
        // }
        
        
        //If no user is logged already then Lookup user from document by pulling their username
        users.findOne({username: usernameForm }, function(err, user) {
            if(!user) { //If username is not in the DB then send them back to login page
                req.usernameCheck = true;
                res.render('login_registration.hbs', { usernameCheck: req.usernameCheck, usernameError: usernameForm});
            }
            //Username exists in the Database
            else {
                //Get the hashed password from the db
                const hash = user.pass.toString();
                
                /*Compare the hashed password from the db to the newly
                  hashed password that was entered*/
                bcrypt.compare(passwordForm, hash, function(err, response) {
                    //Username and password are correct, successful login
                    if (usernameForm === user.username && response === true) {
                        req.validationCheck = false;
                        req.session.username = user.username;
                        req.session.firstname = user.firstname;
                        req.checkSessionExists = true;
                        req.welcomeName = user.firstname;
                        res.render('index', { checkSessionExists: req.checkSessionExists,
                            welcomeName: req.welcomeName });
                    }
                    else { //Incorrect password entered
                        req.passwordCheck = true;
                        res.render('login_registration.hbs', { passwordCheck: req.passwordCheck });
                    }
                });
            }
        });
        
        
    } catch (err) {
        res.status(500);
        res.send('failure');
        console.log(err.stack);
        client.close();
    }
    client.close();
    res.status(200);
    //res.json(recipes_response);
    
}

// allows us to import the function in app.js
export default getLoginUser;