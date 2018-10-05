import get_recipe from '../mongo_helper'
import getCustomUnitResponse from '../get_amount_custom_unit'

async function get_ingredient(ingredient_name, data) {
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
    } else response_text = ingredient_name + ' is not in the recipe';
    
  return response_text;
};

// allows us to import the function in app.js
export default get_ingredient;





