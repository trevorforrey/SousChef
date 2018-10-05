async function get_recipe(name){
  let MongoClient = require('mongodb').MongoClient;

  let client;
  let mongo_pw = process.env.MONGO_PW;
  let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
  let recipe_doc = null;
  try {
    client = await MongoClient.connect(uri);
    console.log("Connected correctly to server");

    const db = client.db('sous-chef');

    // Get the recipes collection
    const collection = db.collection('recipes');

    // Find recipe document for the recipe name
    const cursor = await collection.find({name : name}).limit(1);

    // Get recipe document from cursor
    recipe_doc = await cursor.next();
  } catch (err) {
    console.log(err.stack);
    client.close();
  }
  client.close();
  return recipe_doc;
}

export default get_recipe;
