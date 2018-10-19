
var MongoClient = require('mongodb').MongoClient;

async function postRegistration(req, res) {
    console.log("==========================================\n", req.body);
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    
    //Registration form data
    let registrationData = req.body;
    // let usernameForm = registrationData.usernameReg;
    // let firstnameForm = registrationData.firstnameReg;
    // let lastnameameForm= registrationData.email;
    // let passForm = registrationData.passwordReg;
    // let confirmPassForm = registrationData.confirmPasswordReg;
    
    //Create a JSON object of the registration form data
    var registrationInsert = {
        firstname: registrationData.firstnameReg,
        lastnameame: registrationData.email,
        username: registrationData.usernameReg,
        pass: registrationData.passwordReg,
        confirmPass: registrationData.confirmPasswordReg
    };
    
    
    
    try {
        //client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");
        
        //const db = client.db('sous-chef');
        
        // Get the users collection
        //const users = db.collection('users');
        
        // let result = await users.updateOne(
        //     {username: user}, // Filter
        //     {$push: {recipes: recipe}} // Append recipe to user's recipes array
        // );
        
        
        await MongoClient.connect(uri, function(err, db) {
            let dbo = db.db('sous-chef');
            dbo.collection('users').insertOne(registrationInsert, function(err, res) {
                db.close();
            })
        });
        
        
    } catch (err) {
        console.log(err.stack);
    }
    res.status(201);
    res.send("success")
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

