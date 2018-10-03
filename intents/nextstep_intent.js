import get_recipe from "../mongo_helper";

let MongoClient = require('mongodb').MongoClient;
async function getStepByIndex(index){
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let step = receipe_doc.directions[index]; ;
    
    return step;
}
export default getStepByIndex;