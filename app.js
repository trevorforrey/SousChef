import get_ingredient from './ingredient_intent'
import getFirstStep from'./firststep_intent'

var express = require('express');
const bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(bodyparser.json());

let port = process.env.PORT || 5000; // process.env.PORT used by Heroku

app.get('/', function (req, res) {
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
    let ingredient_info =await  get_ingredient(ingredient);

    // If Ingredient was found, return ingredient info. If not, return error message
    if (ingredient_info != null) {
      response_text = 'You need ' + ingredient_info.quantity + ' ' + ingredient_info.unit + ' of ' + ingredient_info.name;
    } else {
      response_text = ingredient + ' is not in the recipe';
    }
    
    // Set response text
    response.fulfillmentText = response_text;
  }
   else if(data.queryResult.intent.displayName =='first.step'){
    let firstStep= await getFirstStep();
    if(firstStep!=null){
      response_text=firstStep;
    }
    else response_text="I don't know";
    response.fulfillmentText = response_text;
  } 

  // Send response
  res.json(response);
});

app.listen(port, function () {
  console.log('Cooking server listening on port ' + port);
});
