import get_recipe from './mongo_helper'

async function get_ingredient(ingredient_name) {
  //Load up a recipe
  let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
  let ingredient_info = null;

  // Iterate through the recipe array
  recipe_doc.ingredients.forEach( (recipe_ingredient) => {
    // If the ingredient exists, update ingredient_info with ingredient info
    if (recipe_ingredient.name == ingredient_name) {
      ingredient_info = recipe_ingredient;
    }
  });
  return ingredient_info
};

// allows us to import the function in app.js
export default get_ingredient;
