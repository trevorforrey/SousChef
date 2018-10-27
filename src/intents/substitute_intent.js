import {get_user_recipe} from '../mongo_helper'

export async function handle_substitute_ingredient(req,res,sessionData) {
    let response = {};
    let response_text;
    let data = req.body;
    let contexts = data.queryResult.outputContexts;
    const ingredientToSubstitute = data.queryResult.parameters.ingredient;

    console.log('ingredient to substitute: ' + ingredientToSubstitute);

    // Get ingredient from recipe to figure out quantity
    const ingredientData = await get_ingredient_from_user(sessionData.username, sessionData.recipe, ingredientToSubstitute, data);

    // Debugging (print out ingredient object)
    console.log(ingredientData);

    // Make API call to find substitute ingredients
    // - Should get amount of substitute too
    
    // Check status of API call
    // if (!ingredientResponse.includes("is not in the recipe")) {
    //     res.status(201);
    // } else {
    //     res.status(400);
    // }

    // Loop through substitutes and grab up to two ingredient substitutes

    if (ingredientData != null) {
        response.fulfillmentText = 'we will try to find a substitute for ' + ingredientToSubstitute;
    } else {
        response.fulfillmentText = 'that ingredient does not exist in the toasty ones red sauce recipe';
    }
    response.contextOut = data.queryResult.outputContexts;
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
        console.log(`Comparing ${recipe_ingredient.name} to ${ingredient_name}`);
        if (recipe_ingredient.name === ingredient_name) {
            ingredient_info = recipe_ingredient;
        }
    });
    
    return ingredient_info;
};


