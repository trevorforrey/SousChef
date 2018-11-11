var MongoClient = require('mongodb').MongoClient;

//=========== User Login =================//
async function getLoginUser(req, res) {
    
    let usernameForm = req.body.usernameLogin;
    let passwordForm = req.body.passwordLogin;
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    
    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");
        
        const db = client.db('sous-chef');
        
        // Get the users collection
        const users = db.collection('users');
        
        //Lookup user from document by pulling their username
        users.findOne({username: usernameForm }, function(err, user) {
            if(!user) { //If username is not in the DB then send them back to login page
                res.render('login_registration.hbs');
                req.check('email', "Not in the DB");
            }
            else {
                if (usernameForm === user.username && passwordForm === user.pass) {
                    req.session.username = user.username;
                    res.redirect('/');
                }
                else { //Username exists in the DB, Incorrect password entered
                    res.render('login_registration.hbs');
                    //Output error on html page via template
                    let errors = req.validationErrors();
                    if(errors) {
                        req.session.errors = errors;
                    }
                    
                }
            }
        });
        
        //If username is not in the DB or is null then send them back to login page
        /*if (userDB === null || userDB.username !== usernameForm) {
            res.redirect('/login_registration');
            //res.write("The Username or Password you entered was incorrect");
        }*/
        
        //Verify the users login info
        /*if (usernameForm === userDB.username && passwordForm === userDB.pass) {
            req.session.username = userDB.username;
            res.redirect('/');
        }*/
        
        
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