let MongoClient = require('mongodb').MongoClient;

async function post_user_story(req, res) {

    let data = req.body;

    console.log(data);

    let recipe;

    // TODO get recipe and username from request body sent
    if (data.recipe != null) {
        recipe = data.recipe;
    } else {
        console.log('recipe in data.recipe was null');
        recipe = {"name":"Tony's Kentucky Chicken","make_time":"40000","num_servings":4,"prep_time":"25 minutes","cook_time":"30 minutes","ingredients":[{"name":"chicken","quantity":1.25,"unit":"breasts"},{"name":"salt","quantity":1,"unit":"teaspoons"},{"name":"canola oil","quantity":1,"unit":"quart"}],"directions":["Start up the fryer and season up yo' chicken","Lay those bad boys down and wait for them to be done"]};
    }

    // TODO get this data from a session object, or pass it in on the request
    let user = 'Tony Gunk';

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
