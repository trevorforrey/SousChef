import {get_recipe, get_user_recipe} from '../mongo_helper'
import {set_session_data} from '../session_helper'

export async function handle_get_num_servings(req,res,sessionData, projectID, sessionID) {
    let response = {}
    let recipe_doc = await get_user_recipe(sessionData.username, sessionData.recipe);
    
    let contexts = req.body.queryResult.outputContexts;

    let recipe_servings = recipe_doc.num_servings;

    if (recipe_servings == null || recipe_servings == undefined || recipe_servings <= 0 || recipe_servings == NaN){
        recipe_servings = 1.0;
        console.log("Warning: no serving size in recipe:  " + recipe_doc.name);
    }

    let proportion = sessionData.serving_proportion;

    if (proportion == null || proportion == undefined || proportion <= 0){
        proportion = 1.0;
        console.log("Warning: no defined proportion in sessionData.");
    }

    let changed_proportion = proportion != 1;

    let servings = proportion * recipe_servings;
    let response_text;
    if (changed_proportion){
        response_text = "You requested that the ingredient list be adjusted for " + servings + 
        " servings from " + recipe_servings + " servings.";
    } else {
        response_text = "The recipe makes for " + servings + " servings."
    }
    response.fulfillmentText = response_text;
    response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);

    res.json(response);
    return;
}