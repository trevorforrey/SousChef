async function json_load(intent_name){

	switch(intent_name){
		case "ingredient_list": return 		{
						  "responseId": "70425ec9-5593-415d-ba20-ccf79a1e15a6",
						  "queryResult": {
						    "queryText": "ingredient list",
						    "parameters": {},
						    "allRequiredParamsPresent": true,
						    "fulfillmentText": "Your ingredients for blueberry pancakes are",
						    "fulfillmentMessages": [
						      {
						        "text": {
						          "text": [
						            "Your ingredients for blueberry pancakes are"
						          ]
						        }
						      }
						    ],
						    "outputContexts": [
						      {
						        "name": "projects/testagent-be9db/agent/sessions/32b99be0-190b-7b68-53fa-8c151a12489a/contexts/login-requestuser-followup",
						        "parameters": {
						          "recipe.original": "bread and butter",
						          "recipe": "Bread and Butter",
						          "username.original": "thetoastyone",
						          "username": "thetoastyone"
						        }
						      },
						      {
						        "name": "projects/testagent-be9db/agent/sessions/32b99be0-190b-7b68-53fa-8c151a12489a/contexts/session_data",
						        "lifespanCount": 4,
						        "parameters": {
						          "recipe": "Bread and Butter",
						          "username": "thetoastyone"
						        }
						      }
						    ],
						    "intent": {
						      "name": "projects/testagent-be9db/agent/intents/5784d9f6-6108-43be-8301-9188a143cef9",
						      "displayName": "List-Ingredients"
						    },
						    "intentDetectionConfidence": 0.45,
						    "languageCode": "en"
						  },
						  "originalDetectIntentRequest": {
						    "payload": {}
						  },
						  "session": "projects/testagent-be9db/agent/sessions/32b99be0-190b-7b68-53fa-8c151a12489a"
						}

		case "ingd_follow_up": return {
					  "responseId": "6b0b5b54-13ce-4eb8-9259-ba49904ce060",
					  "queryResult": {
					    "queryText": "how much tomato?",
					    "parameters": {
					      "ingredient": "tomato",
					      "unit-volume-name": "",
					      "unit-weight-name": ""
					    },
					    "allRequiredParamsPresent": true,
					    "fulfillmentText": "You need 5 lbs of $any",
					    "fulfillmentMessages": [
					      {
					        "text": {
					          "text": [
					            "You need 5 lbs of $any"
					          ]
					        }
					      }
					    ],
					    "outputContexts": [
					      {
					        "name": "projects/testagent-be9db/agent/sessions/32b99be0-190b-7b68-53fa-8c151a12489a/contexts/session_data",
					        "lifespanCount": 1,
					        "parameters": {
					          "ingredient": "tomato",
					          "recipe": "Bread and Butter",
					          "unit-weight-name.original": "",
					          "unit-weight-name": "",
					          "unit-volume-name.original": "",
					          "unit-volume-name": "",
					          "ingredient.original": "tomato?",
					          "username": "thetoastyone"
					        }
					      },
					      {
					        "name": "projects/testagent-be9db/agent/sessions/32b99be0-190b-7b68-53fa-8c151a12489a/contexts/ingredient-intent-followup",
					        "lifespanCount": 2,
					        "parameters": {
					          "ingredient": "tomato",
					          "unit-weight-name.original": "",
					          "unit-weight-name": "",
					          "unit-volume-name.original": "",
					          "unit-volume-name": "",
					          "ingredient.original": "tomato?"
					        }
					      },
					      {
					        "name": "projects/testagent-be9db/agent/sessions/32b99be0-190b-7b68-53fa-8c151a12489a/contexts/ingredient-amount",
					        "lifespanCount": 5,
					        "parameters": {
					          "ingredient": "tomato",
					          "unit-weight-name.original": "",
					          "unit-weight-name": "",
					          "unit-volume-name.original": "",
					          "unit-volume-name": "",
					          "ingredient.original": "tomato?"
					        }
					      }
					    ],
					    "intent": {
					      "name": "projects/testagent-be9db/agent/intents/16ecc5c6-0f50-4340-8ea8-ca60f1f806ac",
					      "displayName": "Ingredient-Intent"
					    },
					    "intentDetectionConfidence": 1,
					    "languageCode": "en"
					  },
					  "originalDetectIntentRequest": {
					    "payload": {}
					  },
					  "session": "projects/testagent-be9db/agent/sessions/32b99be0-190b-7b68-53fa-8c151a12489a"
					}


	}
	

}

export default json_load;