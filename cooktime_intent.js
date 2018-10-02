import get_recipe from './mongo_helper'

async function getCookTime() {
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let cook_time;
    // Get the cook time field from the recipe
     cook_time = recipe_doc.cook_time;
     
     return cook_time;
}

// allows us to import the function in app.js
export default getCookTime;


    

