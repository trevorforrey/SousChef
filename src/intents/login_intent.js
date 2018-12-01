import {get_users, get_user_recipes} from '../mongo_helper'
import {set_session_data} from '../session_helper'

export async function handle_login_request(req, res, projectId) {
  let response = {
    'fulfillmentText':'You\'re not logged in, what\'s your username?'
  }
  const users = await get_users()

  // Set the recipes a user has loaded
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();
  // The path to the agent the session entity types belong to.
  const entityPath = entityTypesClient.entityTypePath(
      projectId,'c620dfbc-50bf-4297-b634-2bd9bc0191bd'
  );
  console.log(entityPath);

  // Places the ingredients into an entity list.
  const entities = [];
  users.forEach(user => {
    if(user != "") {
      entities.push({
        value: user,
        synonyms: [user],
      });
    }
  });

  //Creates a CreateSessionEntityTypes request
  // const request = {
  //     name: entityPath,
  //     displayName: 'username',
  //     kind: 2,
  //     entities: entities
  // };
  const request = {
    entityType: {
        name: entityPath,
        displayName: 'username',
        kind: 2,
        entities: entities
    }
  };
  // Call the client library to create a new session entity
  return entityTypesClient
    .updateEntityType(request).then(responses => {
        console.log("Added possible users!")
    })
    .then(() => {
      // success creating ingredient session entities
      res.status(201);
      res.json(response);
    })
    .catch(err => {
      // failure creating ingredient session entities
      console.error(err);
      res.status(500);
      res.json(response);
    });
}

export async function handle_username_response(req, res, projectId, session, username) {
  let response = {
    'fulfillmentText':'Hello ' + username + "! What recipe would you like to make?"
  }

  const recipes = await get_user_recipes(username);
  if (recipes.length > 0) {
    // Set the recipes a user has loaded
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();

    // The path to the agent the session entity types belong to.
    const sessionEntityPath = sessionEntityTypesClient.sessionEntityTypePath(
        projectId,session,'recipe'
    );

    // The path to the agent that the session exists in
    const sessionPath = sessionEntityTypesClient.sessionPath(
        projectId,session
    );

    // Places the ingredients into an entity list.
    const entities = [];
    recipes.forEach(recipe => {
      if (recipe.name != "" && recipe.ingredients.length > 0 && recipe.directions.length > 0) {
        entities.push({
          value: recipe.name,
          synonyms: [recipe.name],
        });
      }
    });
    if(entities.length > 0) {
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
            console.log("Added recipes!")
        })
        .then(() => {
          // success creating ingredient session entities.
          res.status(201);
          res.json(response);
        })
        .catch(err => {
          // failure creating ingredient session entities
          console.error(err);
          res.status(500);
          res.json(response);
      });
    }
  }
  res.status(201);
  res.json({'fulfillmentText': username + ", you don't have any valid recipes to load! Go to our web client to upload recipes and try again."});
  return;
}

export async function handle_recipe_response(req, res) {
  let response = {
    "followupEventInput": {
      "name": "Setup-Intent",
      "parameters": {},
      "languageCode": "en-US"
    }
  };

  res.status(201);
  res.json(response);
  return;
}
