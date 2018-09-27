let MongoClient = require('mongodb').MongoClient;
const projectID = process.env.PROJ_ID;
const dialogflow = require('dialogflow');

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

async function get_ingredient(ingredient_name) {
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    let ingredient_info = null;

    try {
      client = await MongoClient.connect(uri);
      console.log("Connected correctly to server");

      const db = client.db('sous-chef');

      // Get the recipes collection
      const collection = db.collection('recipes');

      // Find recipe document for Blueberry Pancakes
      const cursor = await collection.find({name : "Todd's Favorite Blueberry Pancakes"}).limit(1);

      // Get recipe document from cursor
      const recipe_doc = await cursor.next();

      // Get ingredients array from recipe
      let recipe_ingredients = recipe_doc.ingredients;

      // Iterate through the recipe array
      recipe_ingredients.forEach( (recipe_ingredient) => {
        // If the ingredient exists, update ingredient_info with ingredient info
        if (recipe_ingredient.name == ingredient_name) {
          ingredient_info = recipe_ingredient;
        }
      });

    } catch (err) {
      console.log(err.stack);
      client.close();
    }

    // Close connection before returning
    client.close();
    console.log('connection closed');

    return ingredient_info
};

// allows us to import the function in app.js
export default get_ingredient;
