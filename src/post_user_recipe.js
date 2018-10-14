let MongoClient = require('mongodb').MongoClient;

async function postUserRecipe(recipe) {
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
            {username: 'Tony Gunk'}, // Filter
            {$push: {recipes: recipe}} // Append recipe to user's recipes array
        );
    
    } catch (err) {
        console.log(err.stack);
        client.close();
    }
    client.close();
    return 'a-oh-kay';
};

// allows us to import the function in app.js
export default postUserRecipe;
