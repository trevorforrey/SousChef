import {get_user_recipe} from '../mongo_helper'
import {set_session_data} from '../session_helper'
let unirest = require('unirest');

export async function handle_substitute_ingredient(req,res,sessionData, contexts, projectID, sessionID) {
    let response = {};
    let response_text;
    let data = req.body;
    const ingredientToSubstitute = data.queryResult.parameters.ingredient;

    console.log('ingredient to substitute: ' + ingredientToSubstitute);

    let apiResult;

    // Make API call to find substitute ingredients
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/substitutes?ingredientName=" + ingredientToSubstitute)
    .header("X-Mashape-Key", "WHvwtmMxRlmshM0D4WoKnup1PMxop1H8k7zjsnTy224VfXki0B")
    .header("Accept", "application/json")
    .end(function (result) {
        console.log('made api call');
        console.log(result.status, result.headers, result.body);
        apiResult = result;

        // If error in api request
        if (apiResult.status != 200) {
            res.status(500);
            response.fulfillmentText = 'there was an error using the recipe substitute api. Please try something else';
            response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
            res.json(response);
            return;
        }

        // If no substitutions found for the ingredient
        if (apiResult.body.status === 'failure') {
            res.status(404);
            response.fulfillmentText = "Sorry, we couldn't find a substitution for " + ingredientToSubstitute;
        } else {
            response.fulfillmentText = "";
            res.status(201);
            const substitutions = apiResult.body.substitutes;
            for (let i = 0; i < 2 && i < substitutions.length; i++) {
                const currentSubstitution = substitutions[i];
                const splitSub = currentSubstitution.split("=");
                response.fulfillmentText += "You can substitute " + splitSub[0] + " of " + ingredientToSubstitute + " with " + splitSub[1] + ". ";
                if (i + 1 < 2 && i + 1 < substitutions.length) {
                    response.fulfillmentText += "Also, ";
                }
            }
        }

        response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
        res.json(response);
        return;
    });
    
    
}


async function get_ingredient_from_user(user_name, recipe_name, ingredient_name, data) {

    //Load up a recipe
    let recipe_doc = await get_user_recipe(user_name, recipe_name);
    console.log('Searched for ' + user_name + 's recipe: ' + recipe_name);
    let ingredient_info = null;
    let response_text;
    
    // Iterate through the recipe array
    recipe_doc.ingredients.forEach( (recipe_ingredient) => {
        // If the ingredient exists, update ingredient_info with ingredient info
        console.log(`Comparing ${recipe_ingredient.name} to ${ingredient_name}`);
        if (recipe_ingredient.name === ingredient_name) {
            ingredient_info = recipe_ingredient;
        }
    });
    
    return ingredient_info;
};


