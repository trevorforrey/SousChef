import {get_recipe, get_user_recipe} from '../mongo_helper'
import getCustomUnitResponse from '../get_amount_custom_unit'
import {set_session_data, get_session_data} from '../session_helper'

export async function handle_get_ingredient(req,res,sessionData, contexts, projectID, sessionID) {
    let response = {};
    let response_text;
    let data = req.body;

    let ingredientResponse = await get_ingredient_from_user(sessionData.username, sessionData.recipe, data.queryResult.parameters.ingredient, data);

    console.log('ingredient response: ' + ingredientResponse);

    if (!ingredientResponse.includes("is not in the recipe")) {
        res.status(201);
    } else {
        res.status(400);
    }
    response.fulfillmentText = ingredientResponse;
    response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
    res.json(response);
    return;
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
        if (recipe_ingredient.name === ingredient_name) {
            ingredient_info = recipe_ingredient;
        }
    });
    
    // If Ingredient was found, return ingredient info. If not, return error message
    if (ingredient_info != null) {
        let sessionData = get_session_data(data.queryResult.outputContexts);
        console.log('session data');
        console.log(sessionData);
        if ('unit-weight-name' in data.queryResult.parameters &&
            data.queryResult.parameters['unit-weight-name'] != null &&
            data.queryResult.parameters['unit-weight-name'] !== "") {
            response_text = await getCustomUnitResponse(ingredient_info, data.queryResult.parameters['unit-weight-name'], data)
        }
        if (response_text == null &&
            'unit-volume-name' in data.queryResult.parameters &&
            data.queryResult.parameters['unit-volume-name'] != null &&
            data.queryResult.parameters['unit-volume-name'] !== "") {
            response_text = await getCustomUnitResponse(ingredient_info, data.queryResult.parameters['unit-volume-name'], data)
        }
        if (response_text == null){
            //check if user has defined the amount of servings they want.
            let sp = sessionData.serving_proportion
            if (sp == undefined || sp == null || sp <= 0){
                sp = 1.0
            }

            let quant = ingredient_info.quantity * sp;

            // If non-plural units, and plural amount, make unit plural
            if (quant != 1 && ingredient_info.unit[ingredient_info.unit.length - 1] !== 's') {
                ingredient_info.unit += "s";
            }
            // If non-plural amount, but plural units
            else if (quant == 1 && ingredient_info.unit[ingredient_info.unit.length - 1] ==='s') {
                ingredient_info.unit = ingredient_info.unit.slice(0,-1);
            }
            // Don't say unit if unit is same as name (E.G. 1 egg, 1 orange)
            if (ingredient_info.unit === ingredient_info.name) {
                response_text = 'You need ' + quant + ' ' + ingredient_info.unit;
            }
            else {
                response_text = 'You need ' + quant + ' ' + ingredient_info.unit + ' of ' + ingredient_info.name;
            }
        } 
    } else response_text = ingredient_name + ' is not in the recipe';
    return response_text;
};



export async function get_ingredient(ingredient_name, data) {

    //Load up a recipe
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let ingredient_info = null;
    let response_text;
    
    // Iterate through the recipe array
    recipe_doc.ingredients.forEach( (recipe_ingredient) => {
        // If the ingredient exists, update ingredient_info with ingredient info
        if (recipe_ingredient.name === ingredient_name) {
            ingredient_info = recipe_ingredient;
        }
    });
    
    // If Ingredient was found, return ingredient info. If not, return error message
    if (ingredient_info != null) {
        //check if the client requested specific units
        if ('unit-weight-name' in data.queryResult.parameters &&
            data.queryResult.parameters['unit-weight-name'] != null &&
            data.queryResult.parameters['unit-weight-name'] !== "") {
            response_text = await getCustomUnitResponse(ingredient_info, data.queryResult.parameters['unit-weight-name'])
        }
        if (response_text == null &&
            'unit-volume-name' in data.queryResult.parameters &&
            data.queryResult.parameters['unit-volume-name'] != null &&
            data.queryResult.parameters['unit-volume-name'] !== "") {
            response_text = await getCustomUnitResponse(ingredient_info, data.queryResult.parameters['unit-volume-name'])
        }
        if (response_text == null){
            // If non-plural units, and plural amount, make unit plural
            if (ingredient_info.quantity !== 1 && ingredient_info.unit[ingredient_info.unit.length - 1] !== 's') {
                ingredient_info.unit += "s";
            }
            // If non-plural amount, but plural units
            else if (ingredient_info.quantity === 1 && ingredient_info.unit[ingredient_info.unit.length - 1] ==='s') {
                ingredient_info.unit = ingredient_info.unit.slice(0,-1);
            }
            // Don't say unit if unit is same as name (E.G. 1 egg, 1 orange)
            if (ingredient_info.unit === ingredient_info.name) {
                response_text = 'You need ' + ingredient_info.quantity + ' ' + ingredient_info.unit;
            }
            else {
                response_text = 'You need ' + ingredient_info.quantity + ' ' + ingredient_info.unit + ' of ' + ingredient_info.name;
            }
        } 
    } else response_text = ingredient_name + ' is not in the recipe';
    return response_text;
};





