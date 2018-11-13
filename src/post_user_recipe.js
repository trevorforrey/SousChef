let MongoClient = require('mongodb').MongoClient;

async function post_user_recipe(req, res) {

    let recipe = req.body;

    // TODO get recipe and username from request body sent
    if (recipe == null) {
        console.log('recipe in data.recipe was null');
        return;
    }

    // TODO get this data from a session object, or pass it in on the request
    let user = req.session.username;
    console.log(req.session.username)
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";

    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");
    
        const db = client.db('sous-chef');
    
        // Get the users collection
        const users = db.collection('users');
    
        let result = await users.updateOne(
            {username: user}, // Filter
            {$push: {recipes: recipe}} // Append recipe to user's recipes array
        );
    
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
export default post_user_recipe;
