import * as intent from './intents/intents'

var express = require('express');
const bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(bodyparser.json());
var port = process.env.PORT || 5000; // process.env.PORT used by Heroku
var stepDict = {name: "", index: null, currentIndex: null, previousIndex: null, stepRequest: null};

app.get('/', function (req, res) {
    res.send('Welcome to the cooking assistant!');
});

app.post('/fulfillment', async function (req,res) {
    console.log('got fulfillment request');
    let response = {};
    let response_text;
    let data = req.body;
    let displayName = data.queryResult.intent.displayName;
    
    /*Switch to route all the different Intents to their specific
    functions and retrieve the response message*/
    switch (displayName) {
        //Match for Ingredient and Follow up ingredients
        case "Ingredient-Intent":
        case "Ingredient-Intent-Follow-Up":
            // Get Ingredient asked for from database
            let ingredient = data.queryResult.parameters.ingredient;
            response_text = await intent.get_ingredient(ingredient, data);
            break;
        //Match for List of all ingredients and retrieve the response text
        case "List-Ingredients":
            response_text = await intent.get_ingredient_list();
            break;
        //Match for first step and retrieve the response text
        case "first-step":
            response_text = await intent.getFirstStep(stepDict);
            break;
        //Match for next step and retrieve the response text
        case "next-step":
            stepDict.name = "nextStep";
            response_text = await intent.getStepByIndex(stepDict);
            break;
        //Match for repeating step
        case "repeat-step":
            stepDict.name = "repeatStep";
            response_text = await intent.getStepByIndex(stepDict);
            break;
        //Match for the previous step
        case "previous-step":
            stepDict.name = "previousStep";
            response_text = await intent.getStepByIndex(stepDict);
            break;
        //Match for any requested step
        case "requested-step":
            stepDict.name = "requestedStep";
            stepDict.stepRequest = data.queryResult.parameters.number;
            response_text = await intent.getStepByIndex(stepDict);
            break;
        //Match for getting the remaining number of steps
        case "remaining-steps":
            response_text = await intent.getTotalNumberOfSteps(stepDict);
            break;
        //Match for set up intent
        case "Setup-Intent":
            let projectID = data.session.split('/')[1];
            let sessionID = data.session.split('/')[4];
            update_session_entity(projectID, sessionID);
            response_text = "Let's get cooking!";
            break;
        //Match for cook time intent and retrieve the response text
        case "Cook-Time-Intent":
            response_text = await intent.getCookTime();
            break;
        //Match for prep time intent and retrieve the response text
        case "Prep-Time-Intent":
            response_text = await intent.getPrepTime();
            break;
    }
    // Set response text
    response.fulfillmentText = response_text;
    console.log("stepDict inside app.js", stepDict);
    // Send response message back
    res.json(response);
});

app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});