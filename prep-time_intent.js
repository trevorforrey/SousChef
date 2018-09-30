let MongoClient = require('mongodb').MongoClient;

/*
    Returns the amount of time it will take to finish the client's recipe.
*/

async function getPrepTime(){
    let client;
    let pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    try{
        //connect to database and retrieve recipe
        client = await MongoClient.connect(uri);
        const dbo = client.db('sous-chef');
        const recipes = dbo.collection('recipes');
        //This step will need to be updated in phase 2 to retrieve any recipe
        var prepTimeQuery = await recipes.findOne({name : "Todd's Favorite Blueberry Pancakes"}, {prep_time: 1});
        if (prepTimeQuery == null){
            return null;
        } else {
            return prepTimeQuery.prep_time
        }
    }

}