
//Takes a recipe and modifies the recipe to match the serving size.

async function serving_converter(recipe, servingSize) {
    conversionRate = 1.0;
    if (recipe.num_servings == undefined || recipe.num_servings == null || 
        recipe.num_servings <= 0) {
        //console.log("serving size not found for " + recipe.name)
        conversionRate = servingSize;
    } else {
        conversionRate = servingSize / recipe.num_servings;
    }

    recipe.num_servings = servingSize;

    for (i in recipe.ingredients){
        i.quantity = i.quantity * conversionRate;
    }

}

export default serving_converter;