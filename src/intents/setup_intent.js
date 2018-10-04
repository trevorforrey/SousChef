import get_recipe from '../mongo_helper'

async function update_session_entity(projectId,session) {
  //Gets the recipe
  let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes")

  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();
  // The path to the agent the session entity types belong to.
  const sessionEntityPath = sessionEntityTypesClient.sessionEntityTypePath(
      projectId,session,'ingredient'
  );
  // The path to the agent that the session exists in
  const sessionPath = sessionEntityTypesClient.sessionPath(
      projectId,session
  );

  // Places the ingredients into an entity list.
  const entities = [];
  recipe_doc.ingredients.forEach(ingredient => {
    entities.push({
      value: ingredient.name.replace(/_/g," "),
      synonyms: [ingredient.name.replace(/_/g," ")],
    });
  });

  //Creates a CreateSessionEntityTypes request
  const request = {
    parent: sessionPath,
    sessionEntityType: {
        name: sessionEntityPath,
        entityOverrideMode: 1,
        entities: entities
    }
  };

  // Call the client library to create a new session entity
  return sessionEntityTypesClient
    .createSessionEntityType(request).then(responses => {
        const response = responses[0];
        console.log("Added ingredients!")
     })
    .catch(err => {
      console.error(err);
    });
}

export default update_session_entity;
