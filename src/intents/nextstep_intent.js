import get_recipe from '../mongo_helper'

async function getStepByIndex(stepDict){
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let response_text;
    let stepParamName = stepDict.name;
    let total_number_of_steps = recipe_doc.directions.length;
    
    switch(stepParamName) {
        //Get the next step
        case "nextStep":
            if(stepDict.index == null){
                response_text = "You have not started cooking yet";
            }
            else {
                let step = recipe_doc.directions[stepDict.index];
                stepDict.currentIndex = stepDict.index;
                stepDict.previousIndex = stepDict.index - 1;
                stepDict.index = stepDict.index + 1;
                if (step != null) {
                    response_text = step;
                }
                else {
                    response_text = "You have reached the end of the recipes steps.  Enjoy!!";
                    stepDict.index = total_number_of_steps + 1;
                    stepDict.currentIndex = total_number_of_steps;
                    stepDict.previousIndex = total_number_of_steps - 1;
                }
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
            else if(stepDict.previousIndex === -1){
                response_text = "Which step do you want?";
                stepDict.index = 1;
                stepDict.currentIndex = 0;
            }
            else{
                let previousStep = recipe_doc.directions[stepDict.previousIndex];
                if(previousStep != null){
                    response_text = previousStep;
                }
                else response_text= "Which step do you want?";
                stepDict.index = stepDict.previousIndex + 1;
                stepDict.currentIndex = stepDict.previousIndex;
                stepDict.previousIndex = stepDict.previousIndex - 1;
            }
            break;
        
        //Get the specific step that was requested
        case "requestedStep":
            let requested_step_number = stepDict.stepRequest - 1;
            let requested_step = recipe_doc.directions[requested_step_number];
            if(isNaN(requested_step_number) || requested_step_number == null){
                response_text = "Sorry I didn't catch that! Can you please repeat?";
            }
            
            else if(requested_step !== null){
                if(requested_step_number >= total_number_of_steps || requested_step_number < 0) {
                    response_text = "I'm sorry there is no step " + (requested_step_number + 1) + " in the recipe!";
                }
                else response_text = requested_step;
            }
            else{
		  response_text = "That is an invalid request. Can you please repeat?";
            }
            stepDict.currentIndex = stepDict.stepRequest - 1;
            stepDict.previousIndex = stepDict.currentIndex - 1;
            stepDict.index = stepDict.currentIndex + 1;
            break;
    }
    console.log("stepDict inside nextStep.js", stepDict);
    return response_text;
}
export default getStepByIndex;
