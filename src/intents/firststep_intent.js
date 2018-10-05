import get_recipe from '../mongo_helper'

async function getFirstStep(stepDict){
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let first_step = recipe_doc.directions[0];
    let response_text;
    
    if (first_step != null) {
        response_text = first_step;
    }
    else
        response_text = "I don't know";
    stepDict.index = 1;
    stepDict.currentIndex = 0;
    console.log("stepDict inside firstStep.js", stepDict);
    return response_text;
}
export default getFirstStep;