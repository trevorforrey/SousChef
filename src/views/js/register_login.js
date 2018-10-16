let MongoClient = require('mongodb').MongoClient;

async function post_username(req, res) {
    
    let data = req.body;
    
    console.log(data);
    
    // TODO get recipe and username from request body sent
    
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    
    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");
        
        const db = client.db('sous-chef');
        
        // Get the users collection
        const users = db.collection('users');
        
        // let result = await users.updateOne(
        //     {username: user}, // Filter
        //     {$push: {recipes: recipe}} // Append recipe to user's recipes array
        // );
        var itemInsert = {
            username: res.body.usernameLogin
        };
        
        let result = await users.insertOne(itemInsert, function(err, result) {
        });
        
    } catch (err) {
        console.log(err.stack);
        res.status(500);
        res.send("failure");
        client.close();
    }
    client.close();
    res.status(201);
    res.send("success")
};

// allows us to import the function in app.js
export default post_username;


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

