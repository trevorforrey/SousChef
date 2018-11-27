import {set_session_data, get_session_data} from '../session_helper'
import {get_recipe, get_user_recipe} from '../mongo_helper'

export async function handle_adjust_servings(req,res,sessionData, projectID, sessionID){
    let contexts = req.body.queryResult.outputContexts;
    let response = {}
    let servingAmount = req.body.queryResult.parameters.number;
    if (servingAmount == undefined || servingAmount == null){
        response.fulfillmentText = "No serving number found.";
        response.outputContexts = await set_session_data(contexts, sessionData, projectID, sessionID);
    } else {
        let recipe = await get_user_recipe(sessionData.username, sessionData.recipe);

        let adjustment = adjust_serving(recipe, servingAmount, sessionData);

        response.fulfillmentText = adjustment;
        response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
    }
    res.json(response);
}

function adjust_serving(recipe, servingAmount, sessionData){
    let response_text;
    let predefinedServings = true;
    let ns = recipe.num_servings;
    if (ns == undefined || ns == null || ns <= 0 || ns == NaN){
        ns = 1.0;
        predefinedServings = false;
        if (ns == NaN){
            console.log("warning: num_servings invalid for " + recipe.name);
        }
    }

    sessionData.serving_proportion = servingAmount / ns;

    if (!predefinedServings) {
        response_text = "No serving data found; assuming 1 serving. Will relay ingredient amounts for "
         + servingAmount + " servings.";
    } else {
        response_text = "Adjusted ingredient list for " + servingAmount + " servings.";
    }
    return response_text;
}