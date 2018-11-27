let MongoClient = require('mongodb').MongoClient;

export async function get_recipe(name){
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

export async function get_user_recipe(user, recipe) {
  let client;
  let mongo_pw = process.env.MONGO_PW;
  let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
  let user_doc = null;
  let recipe_doc;
  try {
    client = await MongoClient.connect(uri);
    console.log("Connected correctly to server");

    const db = client.db('sous-chef');

    // Get the users collection
    const collection = db.collection('users');

    // Find recipe document for the recipe name
    const cursor = await collection.find({
      username: user,
      recipes: {$elemMatch: {name: recipe}}
    }).limit(1);

    // Get user document from cursor
    user_doc = await cursor.next();

    user_doc.recipes.forEach((user_recipe) => {
      if (user_recipe.name == recipe) {
        recipe_doc = user_recipe;
      }
    });

  } catch (err) {
    console.log(err.stack);
    client.close();
  }
  client.close();
  return recipe_doc;
}

export async function get_users() {
  let client;
  let mongo_pw = process.env.MONGO_PW;
  let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
  let user_doc = null;
  let users = [];
  try {
    client = await MongoClient.connect(uri);
    console.log("Connected correctly to server");

    const db = client.db('sous-chef');

    // Get all users
    user_doc = await db.collection('users').find().toArray();

    user_doc.forEach( function(user) { users.push(user["username"]); } )

  } catch (err) {
    console.log(err.stack);
    client.close();
  }
  client.close();
  return users;
}

export async function get_user_recipes(username) {
  let client;
  let mongo_pw = process.env.MONGO_PW;
  let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
  let user_doc = null;
  let recipes = [];
  try {
    client = await MongoClient.connect(uri);
    console.log("Connected correctly to server");

    const db = client.db('sous-chef');

    // Get specific user
    user_doc = await db.collection('users').find({username: username}).limit(1).next();

    user_doc.recipes.forEach( function(recipe) { recipes.push(recipe); } )

  } catch (err) {
    console.log("No Recipes found!");
    client.close();
  }
  client.close();
  return recipes;
}
