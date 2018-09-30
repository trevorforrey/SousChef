import get_recipe from './mongo_helper'

/*
    Returns the amount of time it will take to finish the client's recipe.
*/

async function getPrepTime(){
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let prepTime = "";

    if (recipe_doc == null){
        prepTime = null;
    } else {
        prepTime = recipe_doc.prep_time
    }

    return prepTime;
}

export default getPrepTime;