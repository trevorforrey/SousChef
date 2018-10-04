import get_recipe from '../mongo_helper'

async function getStepByIndex(stepDict){
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let response_text;
    let stepParamName = stepDict.name;
    
    
    switch(stepParamName) {
        //Get the next step
        case "nextStep":
            if(stepDict.index == null){
                response_text = "You have not started cooking yet";
            }
            else {
                let firstStep = recipe_doc.directions[stepDict.index];
                if (firstStep != null) {
                    response_text = firstStep;
                }
                else response_text = "End of steps";
            }
            break;
    
        //Get the next step
        case "repeatStep":
            if(stepDict.currentIndex == null){
                response_text = "Which step do you want?";
            }
            else {
                let currentStep = recipe_doc.directions[stepDict.currentIndex];
                if(currentStep != null){
                    response_text = currentStep;
                }
                else response_text = "which step do you want?"
            }
            break;
    
        //Get the previous step
        case "previousStep":
            if(stepDict.previousIndex == null){
                response_text = "Which step to do you want?";
            }
            else{
                let previousStep = recipe_doc.directions[stepDict.previousIndex];
                if(previousStep != null){
                    response_text = previousStep;
                }
                else response_text= "Which step do you want?";
            }
            break;
            
        //Get the specific step that was requested
        case "requestedStep":
            let requested_step_number = stepDict.stepRequest;
            if(isNaN(requested_step_number) || null == requested_step_number){
                response_text = "Sorry I didn't catch that! Can you please repeat?";
            }
            let requested_step = recipe_doc.directions[stepDict.stepRequest];
            if(null != requested_step){
                response_text = requested_step;
            }else{
                response_text = "Unable to fetch the response at this moment, try later!";
            }
            break;
    }
    
    return response_text;
}
export default getStepByIndex;