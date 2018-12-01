import * as intent from './intents/intents'
import {get_session_data, get_initial_session_data, handle_no_session_data} from './session_helper'

async function handle_fulfillment(req, res) {
    let data = req.body;
    let displayName = data.queryResult.intent.displayName;
    let contexts = data.queryResult.outputContexts;
    let projectID = data.session.split('/')[1];
    let sessionID = data.session.split('/')[4];

    // Get session data (returns null if it doesn't exist)
    let sessionData = get_session_data(contexts);

    // Example of how session data should look
    // data.queryResult.outputContexts = [
    //     {...},
    //     {...},
    //     {  name: "XXX/XXX/.../session_data",
    //        lifespanCount: 5,
    //        parameters: {
    //          "username": "Tony Gunk",
    //          "recipe": "Tony's Kentucky Chicken",
    //          "currentStep": 1
    //        }
    // ]

    /*Switch to route all the different Intents to their specific
    functions and retrieve the response message*/
    switch (displayName) {
        //Match for Ingredient and Follow up ingredients
        case "Ingredient-Intent":
        case "Ingredient-Intent-Follow-Up":
            // Get Ingredient asked for from database
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                await intent.handle_get_ingredient(req, res, sessionData, contexts, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for List of all ingredients and retrieve the response text
        case "List-Ingredients":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                await intent.handle_get_ingredient_list(req, res, sessionData, contexts, projectID, sessionID);
            }
            break;
        case "Substitute-Ingredient":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                await intent.handle_substitute_ingredient(req, res, sessionData, contexts, projectID, sessionID);
            }
            break;
        //Match for first step and retrieve the response text
        case "first-step":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                sessionData.currentStep = 0;
                await intent.handle_get_step_by_index(req, res, sessionData, contexts, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for next step and retrieve the response text
        case "next-step":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                sessionData.currentStep++;
                await intent.handle_get_step_by_index(req, res, sessionData, contexts, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for repeating step
        case "repeat-step":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
              await intent.handle_get_step_by_index(req, res, sessionData, contexts, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for the previous step
        case "previous-step":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                sessionData.currentStep--;
                await intent.handle_get_step_by_index(req, res, sessionData, contexts, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for any requested step
        case "requested-step":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                sessionData.currentStep = data.queryResult.parameters.number - 1; // Because of zero index
                await intent.handle_get_step_by_index(req, res, sessionData, contexts, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for getting the remaining number of steps
        case "remaining-steps":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                await intent.handle_get_num_remaining_steps(req, res, sessionData, contexts, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for set up intent
        case "Setup-Intent":
            if (sessionData == null) {
              sessionData = get_initial_session_data(contexts)
            }
            if (sessionData == null) {
                intent.follow_up_login_request(req, res);
            } else {
                console.log("Setup-Intent, session not null block");
                await intent.handle_update_session_entity(req, res, sessionData, projectID, sessionID); // should be the only function called once session data set
            }
            break;
        //Match for cook time intent and retrieve the response text
        case "Cook-Time-Intent":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                await intent.handle_get_cooktime(req, res, sessionData);
            }
            break;
        //Match for prep time intent and retrieve the response text
        case "Prep-Time-Intent":
            if (sessionData == null) {
                handle_no_session_data(req,res,sessionData);
            } else {
                await intent.handle_get_preptime(req, res, sessionData);
            }
            break;
        case "login-request":
            await intent.handle_login_request(req,res,projectID);
            break;
        case "login-request user":
            let username = data.queryResult.parameters.username;
            await intent.handle_username_response(req,res,projectID,sessionID,username);
            break;
        case "login-request recipe":
            await intent.handle_recipe_response(req,res);
            break;
        case "Get-Servings-Intent":
            if (sessionData == null) {
                handle_no_session_data(req, res, sessionData);
            } else {
                await intent.handle_get_num_servings(req, res, sessionData, projectID, sessionID);
            }
            break;
        case "Adjust-Serving-Size-Intent":
            if (sessionData == null){
                handle_no_session_data(req, res, sessionData);
            } else {
                await intent.handle_adjust_servings(req, res, sessionData, projectID, sessionID);
            }
    }
}

export default handle_fulfillment;
