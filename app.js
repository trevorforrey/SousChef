import get_ingredient from './ingredient_intent'
import listEntityTypes from './setup_intent'

var express = require('express');
const bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(bodyparser.json());

let port = process.env.PORT || 5000; // process.env.PORT used by Heroku

app.get('/', function (req, res) {
  listEntityTypes('fd69b65c-df02-43fe-a94d-b755c9a5dd6c');
  res.send('Welcome to the cooking assistant!');
});
app.post('/fulfillment', async function (req,res) {
  console.log('got fulfillment request');

  let response = {};
  let response_text;

  let data = req.body;

  // Match for Ingredient-Intent
  if (data.queryResult.intent.displayName == 'Ingredient-Intent'
    || data.queryResult.intent.displayName == 'Ingredient-Intent-Follow-Up') {

    // Get Ingredient asked for from database
    let ingredient = data.queryResult.parameters.any;
    let ingredient_info = await get_ingredient(ingredient);

    // If Ingredient was found, return ingredient info. If not, return error message
    if (ingredient_info != null) {

      // If non-plural units, and plural amount, make unit plural
      if (ingredient_info.quantity != 1 && ingredient_info.unit[ingredient_info.unit.length - 1] != 's') {
        ingredient_info.unit += "s";

      // If non-plural amount, but plural units
      } else if (ingredient_info.quantity == 1 && ingredient_info.unit[ingredient_info.unit.length - 1] == 's') {
        ingredient_info.unit = ingredient_info.unit.slice(0,-1);
      }

      // Don't say unit if unit is same as name (E.G. 1 egg, 1 orange)
      if (ingredient_info.unit == ingredient_info.name) {
        response_text = 'You need ' + ingredient_info.quantity + ' ' + ingredient_info.unit;
      } else {
        response_text = 'You need ' + ingredient_info.quantity + ' ' + ingredient_info.unit + ' of ' + ingredient_info.name;
      }
    } else {
      response_text = ingredient + ' is not in the recipe';
    }

    // Set response text
    response.fulfillmentText = response_text;
  }

  // Send response
  res.json(response);
});

app.listen(port, function () {
  console.log('Cooking server listening on port ' + port);
});
