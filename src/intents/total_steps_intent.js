import get_recipe from "../mongo_helper";

async function getTotalNumberOfSteps(stepDict){
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let total_number_of_steps = recipe_doc.directions.length;
    let response_text;
    let currentIndex = stepDict.currentIndex;
    
    // if(total_number_of_steps === null){
    //     response_text = "Unable to fetch the response at this moment, try later!";
    // }
    
    let remaining_steps = (total_number_of_steps - currentIndex) - 1;
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