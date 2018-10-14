import handle_fulfillment from './fulfillment_controller'
import postUserRecipe from './post_user_recipe'

const shell = require('shelljs');
var express = require('express');
const bodyparser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let app = express();
app.use(bodyparser.json());

// process.env.PORT used by Heroku
var port = process.env.PORT || 5000;

// Have Heroku set up google auth
if (process.env.GOOGLE_AUTH_CONTENTS != null) {
    shell.exec('./release-tasks.sh');
}

app.get('/', function (req, res) {
    res.send('Welcome to the cooking assistant!');
});

app.post('/fulfillment', handle_fulfillment);

app.post('/postRecipe', async function(req,res) {
    let data = req.body;

    console.log(data);

    let recipe = {"name":"Tony's Kentucky Chicken","make_time":"40000","num_servings":4,"prep_time":"25 minutes","cook_time":"30 minutes","ingredients":[{"name":"chicken","quantity":1.25,"unit":"breasts"},{"name":"salt","quantity":1,"unit":"teaspoons"},{"name":"canola oil","quantity":1,"unit":"quart"}],"directions":["Start up the fryer and season up yo' chicken","Lay those bad boys down and wait for them to be done"]};

    let result = await postUserRecipe(recipe);

    res.send("success");

});

app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});

module.exports = app;