import get_recipe from "../mongo_helper";

let MongoClient = require('mongodb').MongoClient;
async function getFirstStep(){
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let first_step = receipe_doc.directions[0];
    
    return first_step;
    
}
export default getFirstStep;