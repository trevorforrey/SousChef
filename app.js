import get_ingredient from './ingredient_intent'
import update_session_entity from './setup_intent'
import get_ingredient_list from './ingredient-list_intent'
import getFirstStep from'./firststep_intent'
import getCookTime from './cooktime_intent'
import getPrepTime from './prep-time_intent'
import getStepByIndex from'./nextstep_intent'

var express = require('express');
const bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(bodyparser.json());

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
    
    let displayName = data.queryResult.intent.displayName;
    
    switch (displayName) {
        //Match for Ingredient and Follow up ingredients
        case "Ingredient-Intent":
        case "Ingredient-Intent-Follow-Up":
            // Get Ingredient asked for from database
            let ingredient = data.queryResult.parameters.ingredient;
            response_text = await get_ingredient(ingredient);
            break;
        
        //Match for List of all ingredients
        case "List-Ingredients":
            response_text = await get_ingredient_list();
            break;
        
        //Match for first step
        case "first.step":
            let firstStep = await getFirstStep();
            if (firstStep != null) {
                response_text = firstStep;
            }
            else response_text = "I don't know";
            index = 1;
            currentIndex=0;
            break;
        
        //Match for next step
        case "next.step":
            if(index==null){
                response_text="You have not started cooking yet";
            }
            else{
                let step = await getStepByIndex(index);
                currentIndex = index;
                previousIndex = index-1;
                index = index + 1;
                if (step != null) {
                    response_text = step;
                }
                else response_text = "End of steps";
            }
            break;
        
        //Match for repeating step
        case "repeat.step":
            if(currentIndex == null){
                response_text="Which step do you want?";
            }
            else {
                let currentStep = await getStepByIndex(currentIndex);
                if(currentStep != null){
                    response_text=currentStep;
                }
                else response_text = "which step do you want?"
            }
            break;
        
        //Match for the previous step
        case "previous.step":
            if(previousIndex == null){
                response_text="Which step to do you want?";
            }
            else{
                let previousStep = await getStepByIndex(previousIndex);
                if(previousStep != null){
                    response_text=previousStep;
                }
                else response_text="Which step do you want?";
                index=previousIndex+1;
                currentIndex=previousIndex;
                previousIndex=previousIndex-1;
            }
            break;
        
        //Match for set up intent
        case "Setup-Intent":
            let projectID = data.session.split('/')[1]
            let sessionID = data.session.split('/')[4]
            update_session_entity(projectID,sessionID);
            response_text = "Let's get cooking!"
            break;
        
        //Match for cook time intent
        case "Cook-Time-Intent":
            // Get the cook time and the response text
            response_text = await getCookTime();
            break;
        
        //Match for prep time intent
        case "Prep-Time-Intent":
            // Get the prep time and the response text
            let prepTime = await getPrepTime();
            break;
    }
    
    
    // Set response text
    response.fulfillmentText = response_text;
    
    // Send response message back
    res.json(response);
});

app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});
