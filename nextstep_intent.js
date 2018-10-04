import get_recipe from './mongo_helper'

async function getStepByIndex(index){	
  // Get recipe direction from receipe document 
  let receipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
  let step=receipe_doc.directions[index];     
     
  return step;      
}
export default getStepByIndex;