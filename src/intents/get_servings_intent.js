import {get_recipe, get_user_recipe} from '../mongo_helper'

export async function handle_get_num_servings(req,res,sessionData) {
    let recipe_doc = await get_user_recipe(sessionData.username, sessionData.recipe);
    
    let recipe_servings = recipe_doc.num_servings;

    if (recipe_servings == null || recipe_servings == undefined || recipe_servings <= 0){
        recipe_servings = 1.0
    }

    let proportion = sessionData.serving_proportion;

    let changed_proportion = proportion != 1;

    let servings = proportion * recipe_doc.num_servings
    let response_text;
    if (changed_proportion){
        response_text = "You requested that the ingredient list be adjusted for " + servings + 
        " servings from " + recipe_servings + " servings.";
    } else {
        response_text = "The recipe makes for " + servings + " servings."
    }
    return response_text;
}