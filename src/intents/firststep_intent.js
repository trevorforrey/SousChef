import get_recipe from '../mongo_helper'

async function getFirstStep(){
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let first_step = recipe_doc.directions[0];
    let response_text;
    
    if (first_step != null) {
        response_text = first_step;
    }
    else
        response_text = "I don't know";
    
    return response_text;
}
export default getFirstStep;