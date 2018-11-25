import {get_recipe, get_user_recipe} from '../mongo_helper'
import {set_session_data} from '../session_helper'

export async function handle_get_preptime(req,res,sessionData, contexts, projectID, sessionID) {
    let response = {};
    let data = req.body;

    let recipe_doc = await get_user_recipe(sessionData.username, sessionData.recipe);

    console.log('user recipe from mongo: ' + recipe_doc);

    let prepTime = recipe_doc.prep_time;
    let response_text;

    // Generate Response
    if (prepTime == null) {
        response_text = "Hmm, It looks like I don't have a prep-time for this recipe. I'm sorry about that.";
        res.status(201);
    } else {
        response_text = 'You will need ' + prepTime + ' in order to prepare ' + sessionData.recipe;
        res.status(400);
    }
    response.fulfillmentText = response_text;
    response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
    res.json(response);
    return;
}

/*Returns the amount of time it will take to finish the client's recipe.*/
export async function getPrepTime(){
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