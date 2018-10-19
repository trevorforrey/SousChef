import {get_users} from '../mongo_helper'

export async function handle_login_request(req, res) {
  let response = {
    'fulfillmentText':'You\'re not logged in, what\'s your username?'
  }
  const users = await get_users()
  res.status(201);
  res.json(response);
  return;
}

export async function handle_username_response(req, res, username) {
  let response = {
    'fulfillmentText':'Hello ' + username + "! What recipe would you like to make?"
  }
  res.status(201);
  res.json(response);
  return;
}

export async function handle_recipe_response(req, res, recipe) {
  let response = {
    "followupEventInput": {
      "name": "Setup-Intent",
      "parameters": {},
      "languageCode": "en-US"
    }
  };
  //SET SESSION_DATA HERE. Recipe is given and user should be in the outputcontext.
  res.status(201);
  res.json(response);
  return;
}
