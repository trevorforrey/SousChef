import get_recipe from "../mongo_helper";

let MongoClient = require('mongodb').MongoClient;
async function getStepByIndex(stepDict){
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let response_text;
    let stepParamName = stepDict.name;
    
    
    switch(stepParamName) {
        case "index":
            if(stepDict.index == null){
                response_text = "You have not started cooking yet";
            }
            else {
                response_text = receipe_doc.directions[stepDict.index];
                if (response_text != null) {
                    response_text = step;
                }
                else response_text = "End of steps";
            }
            break;
            
        case "currentIndex":
            if(stepDict.currentIndex == null){
                response_text = "Which step do you want?";
            }
            else {
                let currentStep = receipe_doc.directions[stepDict.currentIndex];
                if(currentStep != null){
                    response_text = currentStep;
                }
                else response_text = "which step do you want?"
            }
            break;
            
        case "previousIndex":
            if(stepDict.previousIndex == null){
                response_text = "Which step to do you want?";
            }
            else{
                let previousStep = receipe_doc.directions[stepDict.previousIndex];
                if(previousStep != null){
                    response_text = previousStep;
                }
                else response_text= "Which step do you want?";
            }
            break;
    }
    
    return response_text;
}
export default getStepByIndex;