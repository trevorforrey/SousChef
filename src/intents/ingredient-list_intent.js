import {get_recipe, get_user_recipe} from '../mongo_helper'
import {set_session_data} from '../session_helper'

export async function handle_get_ingredient_list(req,res,sessionData, contexts, projectID, sessionID) {
    let response = {};
    let data = req.body;

    let recipe_doc = await get_user_recipe(sessionData.username, sessionData.recipe);

    console.log('ingredient list from mongo: ' + recipe_doc.ingredients);

    // Generate Response
    let response_text = "For this recipe, you'll need ";
    let ingredients = recipe_doc.ingredients;
    
    let sp = sessionData.serving_proportion;

    if (sp == undefined || sp == null || sp <= 0){
        sp = 1.0;
    }

    // Iterate through the ingredient array
    ingredients.forEach( (ingredient) => {
        
        let quant = ingredient.quantity * sp;

        // Add "and" to start of last ingredient
        if (ingredient === ingredients[ingredients.length - 1]) {
            response_text += "and ";
        }
        
        // Handles items like eggs, oranges (name is unit)
        if (ingredient.unit === ingredient.name) {
            response_text += quant + " " + ingredient.name + ". ";
            
            // Handles items where it's natural to say quantity, units, and name
        } else {
            response_text += quant + " " + ingredient.unit + " of " + ingredient.name + ". ";
        }
    });
    response.fulfillmentText = response_text;
    response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
    res.status(201);
    res.json(response);
    return;
}

export async function get_ingredient_list() {
    // Load up a recipe
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let ingredients = recipe_doc.ingredients;
    
    // Generate Response
    let response = "For this recipe, you'll need ";
    
    // Iterate through the ingredient array
    ingredients.forEach( (ingredient) => {
        
        // Add "and" to start of last ingredient
        if (ingredient === ingredients[ingredients.length - 1]) {
            response += "and ";
        }
        
        // Handles items like eggs, oranges (name is unit)
        if (ingredient.unit === ingredient.name) {
            response += ingredient.quantity + " " + ingredient.name + ". ";
            
            // Handles items where it's natural to say quantity, units, and name
        } else {
            response += ingredient.quantity + " " + ingredient.unit + " of " + ingredient.name + ". ";
        }
    });
    return response;
};
