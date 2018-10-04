import get_recipe from './mongo_helper'
async function getFirstStep(){
	
  	let receipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
  	let first_step=receipe_doc.directions[0];     
    return first_step;        
}
export default getFirstStep;