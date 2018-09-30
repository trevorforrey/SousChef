import get_recipe from './mongo_helper'

async function getCookTime() {
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    
    // Get the cook time field from the recipe
    let cook_time = recipe_doc.cook_time;
   
    return cook_time;
}

// allows us to import the function in app.js
export default getCookTime;


    

