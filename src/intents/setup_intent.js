import {get_recipe, get_user_recipe, get_users} from '../mongo_helper'
import {set_session_data} from '../session_helper'


export async function handle_update_session_entity(req, res, sessionData, projectID, session) {

  let response = {};

  //Gets the recipe
  let recipe_doc = await get_user_recipe(sessionData.username, sessionData.recipe);

  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();
  // The path to the agent the session entity types belong to.
  const sessionEntityPath = sessionEntityTypesClient.sessionEntityTypePath(
      projectID,session,'ingredient'
  );
  // The path to the agent that the session exists in
  const sessionPath = sessionEntityTypesClient.sessionPath(
      projectID,session
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
    .then(() => {
      // success creating ingredient session entities
      res.status(201);
      response.fulfillmentText = 'We\'re cooking: ' + sessionData.recipe + '. Lets start cooking!';
      response.outputContexts = set_session_data(req.body.queryResult.outputContexts, sessionData, projectID, session);
      res.json(response);
    })
    .catch(err => {
      // failure creating ingredient session entities
      console.error(err);
      res.status(500);
      response.fulfillmentText = 'There was an error setting up your ingredient session entities';
      response.outputContexts = req.body.queryResult.outputContexts;
      res.json(response);
    });
}

export async function follow_up_login_request(req, res) {
 let response = {
    "followupEventInput": {
      "name": "login-request",
      "parameters": {
          },
      "languageCode": "en-US"
    }
  };
  res.status(201);
  res.json(response);
  return;
}
