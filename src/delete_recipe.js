let MongoClient = require('mongodb').MongoClient;

async function delete_recipe(req, res) {
    let username = req.session.username;
    let recipe = req.body.recipeName;

    console.log(`Going to delete ${recipe} from ${username}`);

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
            {username: username}, // Filter
            {$pull: {recipes: {name: recipe}}},{multi:false} // Pull (remove recipe from users recipe array)
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
export default delete_recipe;
