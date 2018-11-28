import {get_recipe, get_user_recipe} from "../mongo_helper";
import {set_session_data} from '../session_helper'

export async function handle_get_num_remaining_steps(req,res,sessionData, contexts, projectID, sessionID) {
    let response = {};
    let response_text;
    let data = req.body;

    let recipe_doc = await get_user_recipe(sessionData.username, sessionData.recipe);

    console.log('recipe from mongo: ' + recipe_doc.ingredients);
    
    const steps = recipe_doc.directions;

    let remaining_steps = (steps.length - 1) - sessionData.currentStep;

    if (remaining_steps === 0) {
        response_text = "You are on the last step!";
    }
    else if (remaining_steps === 1) {
        response_text = "You are almost done, just 1 more step!";
    }
    else {
        response_text = "You still have " + remaining_steps + " to go!";
    }

    res.status(201);
    response.fulfillmentText = response_text;
    response.outputContexts = set_session_data(contexts, sessionData, projectID, sessionID);
    res.json(response);
    return;
}


export async function getTotalNumberOfSteps(stepDict){
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let total_number_of_steps = recipe_doc.directions.length;
    let response_text;
    let currentIndex = stepDict.currentIndex;
    let remaining_steps;
    
    // if(total_number_of_steps === null){
    //     response_text = "Unable to fetch the response at this moment, try later!";
    // }
    
    if(currentIndex != null){
          remaining_steps = total_number_of_steps - currentIndex - 1;
    }else{
          remaining_steps = total_number_of_steps;
    }

    if(remaining_steps === 0){
        response_text = "You are on the last step!";
    }
    else if(remaining_steps === 1){
        response_text = "You are almost done, just 1 more step!";
    }
    else{
        response_text = "You still have " + remaining_steps + " to go!";
    }
    
    return response_text;
}
export default getTotalNumberOfSteps;
