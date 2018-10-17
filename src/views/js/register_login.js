
var MongoClient = require('mongodb').MongoClient;

async function postRegistration(req, res) {
    console.log("==========================================\n", req.body);
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    
    //Registration form data
    let registrationData = req.body;
    
    
    //Create a JSON object of the registration form data
    var registrationInsert = {
        username: registrationData.usernameReg,
        fName: registrationData.firstnameReg,
        lName: registrationData.email,
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
            var dbo = db.db('sous-chef');
            dbo.collection('users').insertOne(registrationInsert, function(err, result) {
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


/*async function getLoginUser(req, res) {
    let data = req.body;
    let recipes_response = {};
    
    let user = 'Tony Gunk';
    
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    let recipe_doc = null;
    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");
        
        const db = client.db('sous-chef');
        
        // Get the users collection
        const users = db.collection('users');
        
        // Get user document
        let user_doc = await users.findOne(
            {
                username: { $eq: user }
            }
        );
        
        // Add user recipes to response json
        recipes_response.recipes = user_doc.recipes;
        
    } catch (err) {
        res.status(500);
        res.send('failure');
        console.log(err.stack);
        client.close();
    }
    client.close();
    res.status(200);
    res.json(recipes_response);

}
// allows us to import the function in app.js
export default getLoginUser;*/



//======================================
//FROM app.js
/*app.post('/register_login', function(req, res, next) {
   var itemInsert = {
       username: res.body.usernameLogin.value
   }
   
   MongoClient.connect(url, function(err, db) {
       assert.equal(null, err);
       db.collection('users').insertOne(itemInsert, function(err, result) {
           assert.equal(null, err);
       })
   })
});*/
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

