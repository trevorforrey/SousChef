let MongoClient = require('mongodb').MongoClient;

async function get_cookbook(req,res) {

    let data = req.body;
    let recipes_response = {};

    // const user = req.session.username; *** Will need to uncomment come merge with develop ***
    const user = req.session.username;

    console.log(`Getting cookbook for user ${user}`);
  
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
    res.jsonp(recipes_response);
  }
  
  export default get_cookbook;