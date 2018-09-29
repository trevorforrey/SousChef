import get_recipe from './mongo_helper'

async function get_ingredient_list() {
  // Load up a recipe
  let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
  let ingredients = recipe_doc.ingredients;

  // Generate Response
  let response = "For this recipe, you'll need ";

  // Iterate through the ingredient array
  ingredients.forEach( (ingredient) => {
    
    // Add "and" to start of last ingredient
    if (ingredient == ingredients[ingredients.length - 1]) {
        response += "and ";
    }

    // Handles items like eggs, oranges (name is unit)
    if (ingredient.unit == ingredient.name) {
        response += ingredient.quantity + " " + ingredient.name + ". ";

    // Handles items where it's natural to say quantity, units, and name
    } else {
        response += ingredient.quantity + " " + ingredient.unit + " of " + ingredient.name + ". ";
    }
  });
  return response;
};

// allows us to import the function in app.js
export default get_ingredient_list;
