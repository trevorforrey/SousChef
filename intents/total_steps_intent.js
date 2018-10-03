import get_recipe from "../mongo_helper";

let MongoClient = require('mongodb').MongoClient;
async function getTotalNumberOfSteps(){
    //Get the recipe from the database
    let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
 
   let step=null;
   let total_number_of_steps=receipe_doc.directions.length;
   
   return total_number_of_steps;
}
export default getTotalNumberOfSteps;