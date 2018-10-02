import get_recipe from './mongo_helper'


/*Returns the amount of time it will take to finish the client's recipe.*/
async function getPrepTime(){
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let prepTime = recipe_doc.prep_time;
    let response_text;
    
    if (prepTime == null) {
        response_text = "Hmm, It looks like I don't have a prep-time for this recipe. I'm sorry about that.";
    } else {
        response_text = 'You will need ' + prepTime + ' in order to prepare the recipe.';
    }
    //return the response text back to app.js
    return response_text;
}

export default getPrepTime;