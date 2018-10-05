import get_recipe from '../mongo_helper'

async function getCookTime() {
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

// allows us to import the function in app.js
export default getCookTime;


    

