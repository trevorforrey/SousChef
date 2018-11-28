import {get_recipe, get_user_recipe} from '../mongo_helper'
import {set_session_data} from '../session_helper'

export async function handle_get_cooktime(req,res,sessionData, contexts, projectID, sessionID) {
    let response = {};
    let data = req.body;

    let recipe_doc = await get_user_recipe(sessionData.username, sessionData.recipe);

    console.log('recipe from mongo: ' + recipe_doc);

    // Generate Response
    let response_text = "";
    let cook_time = recipe_doc.cook_time;
    
    if (cook_time != null) {
        response_text = sessionData.recipe + ' will take ' + cook_time + ' to cook';
        res.status(201);
    } else {
        response_text = 'Unfortunately this recipe does not include a cook time.';
        res.status(400);
    }

    response.fulfillmentText = response_text;
    response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
    res.json(response);
    return;
}

export async function getCookTime() {
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let response_text;
    // Get the cook time field from the recipe
    let cook_time = recipe_doc.cook_time;
    
    // If Ingredient was found, return ingredient info. If not, return error message
    if (cook_time != null) {
        response_text = 'The Blueberry pancakes will take ' + cook_time + ' to finish cooking';
    } else {
        response_text = 'Unfortunately this recipe does not include a cook time.';
    }
    return response_text;
}


    

