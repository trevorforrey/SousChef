import get_ingredient from './ingredient_intent'
import update_session_entity from './setup_intent'
import get_ingredient_list from './ingredient-list_intent'
import getFirstStep from'./firststep_intent'
import getCookTime from './cooktime_intent'
import getPrepTime from './prep-time_intent'
import getStepByIndex from'./nextstep_intent'
<<<<<<< HEAD
import getCustomUnitResponse from './get_amount_custom_unit'
=======
import getTotalNumberOfSteps from './total_steps_intent'
>>>>>>> Steps related changes


const shell = require('shelljs');
var express = require('express');
const bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(bodyparser.json());

// Have Heroku set up google auth
if (process.env.GOOGLE_AUTH_CONTENTS != null) {
  shell.exec('./release-tasks.sh');
}

let port = process.env.PORT || 5000; // process.env.PORT used by Heroku
let index=null;
let currentIndex=null;
let previousIndex=null;

app.get('/', function (req, res) {
  res.send('Welcome to the cooking assistant!');
});


app.post('/fulfillment', async function (req,res) {

  console.log('got fulfillment request');
  let response = {};
  let response_text;

  let data = req.body;

  // Match for Ingredient-Intent
  if (data.queryResult.intent.displayName === 'Ingredient-Intent'
    || data.queryResult.intent.displayName === 'Ingredient-Intent-Follow-Up') {
    
    // Get Ingredient asked for from database
    let ingredient = data.queryResult.parameters.ingredient;
    let ingredient_info = await get_ingredient(ingredient);

    // If Ingredient was found, return ingredient info. If not, return error message
    if (ingredient_info != null) {
      
      //check if the client requested specific units
      if ('unit-weight-name' in data.queryResult.parameters){
        //console.log(ingredient_info.name);
        //console.log(data.queryResult.parameters['unit-weight-name']);
        response_text = await getCustomUnitResponse(ingredient_info.name, data.queryResult.parameters['unit-weight-name'])
      } else {

        // If non-plural units, and plural amount, make unit plural
        if (ingredient_info.quantity !== 1 && ingredient_info.unit[ingredient_info.unit.length - 1] !== 's') {
          ingredient_info.unit += "s";

        // If non-plural amount, but plural units
        } else if (ingredient_info.quantity === 1 && ingredient_info.unit[ingredient_info.unit.length - 1] === 's') {
          ingredient_info.unit = ingredient_info.unit.slice(0,-1);
        }

        // Don't say unit if unit is same as name (E.G. 1 egg, 1 orange)
        if (ingredient_info.unit === ingredient_info.name) {
          response_text = 'You need ' + ingredient_info.quantity + ' ' + ingredient_info.unit;
        } else {
          response_text = 'You need ' + ingredient_info.quantity + ' ' + ingredient_info.unit + ' of ' + ingredient_info.name;
        }
      }
    } else {
      response_text = ingredient + ' is not in the recipe';
    }   
  }

  // Match for Full Ingredient List Intent
  else if (data.queryResult.intent.displayName === 'List-Ingredients'){
    response_text = await get_ingredient_list();
  }

  // Match for First Step
  else if (data.queryResult.intent.displayName === 'first.step') {
    let firstStep = await getFirstStep();
    if (firstStep != null) {
      response_text = firstStep;
    }
    else response_text = "I don't know"; 
    index = 1;
    currentIndex=0; 
  } 

  // Match for Next Step
  else if (data.queryResult.intent.displayName === 'next.step'){
    if(index==null){
      response_text="You have not started cooking yet";
    }
    else{
     let step = await getStepByIndex(index);
    currentIndex=index;
    previousIndex=index-1;
    index = index + 1;
    if (step != null) {
      response_text = step;
    }
    else response_text = "End of steps"; 
    }
    
  }
  
  //Match for Repeat step
  else if(data.queryResult.intent.displayName === 'repeat.step'){
    if(currentIndex==null){
      response_text="Which step do you want?";
    }
    else {
      let currentStep = await getStepByIndex(currentIndex);
      if(currentStep!=null){
        response_text=currentStep;
      }
      else response_text="which step do you want?"
    }
    
  }
  
  //Match for previous step
  else if(data.queryResult.intent.displayName === 'previous.step'){
    if(previousIndex==null){
      response_text="Which step to do you want?";
    }
    else{
      let previousStep = await getStepByIndex(previousIndex);
      if(previousStep!=null){
        response_text=previousStep;
      }
      else response_text="Which step do you want?";
      index=previousIndex+1;
      currentIndex=previousIndex;
      previousIndex=previousIndex-1;
    }
    
  }
    
  //Intent for any requested step
  if(data.queryResult.intent.displayName=='requested.step'){
      let requested_step_number = data.queryResult.parameters['STEP_NUMBER']; 
      if(isNaN(requested_step_number) || null == requested_step_number){
          response_text="Sorry I didn't catch that! Can you please repeat?";
      }
      let requested_step = await getStepByIndex(requested_step_number);
      if(null != requested_step){
          response_text = requested_step;
      }else{
          response_text = "Unable to fetch the response at this moment, try later!";
      }
      currentIndex = requested_step_number;
      previousIndex = currentIndex - 1;
      index = currentIndex + 1;
  }

  //Intent to get the remaining number of steps 
  if(data.queryResult.intent.displayName=='remaining.steps'){
      let totalNumberOfSteps = await getTotalNumberOfSteps();
      if(null == totalNumberOfSteps){
         response_text = "Unable to fetch the response at this moment, try later!";
      }
      let remaining_steps = totalNumberOfSteps - currentIndex;
      if(remaining_steps == 0){
          response = "You are in the last step!";
      }else if(remaining_steps == 1){
          response = "You are almost done, just 1 more step!";
      }else{
          response = "You still have "+remaining_steps+" to go";
      }
  }
  
 
  // Match for Set Up Intent
  else if (data.queryResult.intent.displayName === 'Setup-Intent'){
    let projectID = data.session.split('/')[1]
    let sessionID = data.session.split('/')[4]
    update_session_entity(projectID,sessionID);
    response_text = "Let's get cooking!"
  }
    
  // Match for Prep Time Intent
  else if(data.queryResult.intent.displayName === 'Prep-Time-Intent') {
    let prepTime = await getPrepTime();
    if (prepTime == null) {
      response_text = "Hm. It looks like I don't have a prep-time for this recipe. I'm sorry about that.";
    } else {
      response_text = 'You will need ' + prepTime + ' in order to prepare the recipe.';
    }
  }
   
  // Match for the Cook-Time
  else if (data.queryResult.intent.displayName === 'Cook-Time-Intent') {
    // Get the cook time that was asked for from the database
    let cook_time_info = await getCookTime();
    
    // If Ingredient was found, return ingredient info. If not, return error message
    if (cook_time_info != null) {
        response_text = 'The Blueberry pancakes will take ' + cook_time_info + ' to finish cooking';
    } else {
        response_text = 'Unfortunately this recipe does not include a cook time.';
    }
  }

  // Set response text
  response.fulfillmentText = response_text;

  // Send response
  res.json(response);
});

app.listen(port, function () {
  console.log('Cooking server listening on port ' + port);
});
