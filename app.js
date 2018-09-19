import config from './config'

var express = require('express');
var MongoClient = require('mongodb').MongoClient;

(async function() {
  let client;
  let mongo_pw = config.MONGO_PW;
  var uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
  try {
    client = await MongoClient.connect(uri);
    console.log("Connected correctly to server");

    const db = client.db('sous-chef');

    // Get the collection
    const collection = db.collection('recipes');

    // Get all recipes and print to console
    let all_recipes = await collection.find({}).toArray();
    console.log(all_recipes);

  } catch (err) {
    client.close();
    console.log(err.stack);
  }

  // Close connection
  client.close();
  console.log('connection closed');
})();

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
