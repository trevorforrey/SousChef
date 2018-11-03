process.env.NODE_ENV = 'test';

import 'babel-polyfill'

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);


//Create json example POST body for testing
const ingredientAmountRequestSugar = {
    "responseId": "a631f795-526a-45ee-99f3-97c33f596296",
    "queryResult": {
      "queryText": "How much sugar do I need?",
      "parameters": {
        "ingredient": "sugar"
      },
      "allRequiredParamsPresent": true,
      "fulfillmentText": "You need 4 lbs of $any.",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "You need 4 lbs of $any."
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2/contexts/ingredient-amount",
          "lifespanCount": 5,
          "parameters": {
            "ingredient": "sugar",
            "unit-weight-name.original": "",
            "unit-weight-name": "",
            "unit-volume-name.original": "",
            "unit-volume-name": "",
            "ingredient.original": "sugar"
          }
        }
      ],
      "intent": {
        "name": "projects/testagent-be9db/agent/intents/651f9aa1-7cfc-49f9-b6f8-5679942c4d48",
        "displayName": "Ingredient-Intent-Follow-Up"
      },
      "intentDetectionConfidence": 1,
      "languageCode": "en"
    },
    "originalDetectIntentRequest": {
      "payload": {}
    },
    "session": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2"
};

const ingredientAmountRequestFlour = {
    "responseId": "a631f795-526a-45ee-99f3-97c33f596296",
    "queryResult": {
        "queryText": "How much flour do I need?",
        "parameters": {
        "ingredient": "flour"
        },
        "allRequiredParamsPresent": true,
        "fulfillmentText": "You need 4 lbs of $any.",
        "fulfillmentMessages": [
        {
            "text": {
            "text": [
                "You need 4 lbs of $any."
            ]
            }
        }
        ],
        "outputContexts": [
        {
            "name": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2/contexts/ingredient-amount",
            "lifespanCount": 5,
            "parameters": {
            "ingredient": "sugar",
            "unit-weight-name.original": "",
            "unit-weight-name": "",
            "unit-volume-name.original": "",
            "unit-volume-name": "",
            "ingredient.original": "sugar"
            }
        }
        ],
        "intent": {
        "name": "projects/testagent-be9db/agent/intents/651f9aa1-7cfc-49f9-b6f8-5679942c4d48",
        "displayName": "Ingredient-Intent-Follow-Up"
        },
        "intentDetectionConfidence": 1,
        "languageCode": "en"
    },
    "originalDetectIntentRequest": {
        "payload": {}
    },
    "session": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2"
};

const ingredientAmountRequestBlueberries = {
    "responseId": "a631f795-526a-45ee-99f3-97c33f596296",
    "queryResult": {
        "queryText": "How many blueberries do I need?",
        "parameters": {
        "ingredient": "blueberries"
        },
        "allRequiredParamsPresent": true,
        "fulfillmentText": "You need 4 lbs of $any.",
        "fulfillmentMessages": [
        {
            "text": {
            "text": [
                "You need 4 lbs of $any."
            ]
            }
        }
        ],
        "outputContexts": [
        {
            "name": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2/contexts/ingredient-amount",
            "lifespanCount": 5,
            "parameters": {
            "ingredient": "sugar",
            "unit-weight-name.original": "",
            "unit-weight-name": "",
            "unit-volume-name.original": "",
            "unit-volume-name": "",
            "ingredient.original": "sugar"
            }
        }
        ],
        "intent": {
        "name": "projects/testagent-be9db/agent/intents/651f9aa1-7cfc-49f9-b6f8-5679942c4d48",
        "displayName": "Ingredient-Intent-Follow-Up"
        },
        "intentDetectionConfidence": 1,
        "languageCode": "en"
    },
    "originalDetectIntentRequest": {
        "payload": {}
    },
    "session": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2"
};


/************* TESTING BEGINS ***************/


// Describes All Tests in this file 
describe('Testing Ingredient Amount Intent', () => {


// Test getting amount of sugar
describe('Test Getting amount of sugar', () => {
    it('it should get amount of sugar back', (done) => {
    chai.request(app)
        .post('/fulfillment')
        .set('content-type', 'application/json')
        .send(ingredientAmountRequestSugar)
        .end( (error, response, body) => {
            if (error) {
                done(error);
            } else {
                response.should.have.status(400);
                console.log('Fulfillment Text: ' + response.body.fulfillmentText);
                response.body.fulfillmentText.should.include('please ask to log in');
                done();
            }
        });
    });
});

// Test getting amount of flour
describe('Test Getting amount of flour', () => {
    it('it should get amount of flour back', (done) => {
    chai.request(app)
        .post('/fulfillment')
        .set('content-type', 'application/json')
        .send(ingredientAmountRequestFlour)
        .end( (error, response, body) => {
            if (error) {
                done(error);
            } else {
                response.should.have.status(400);
                console.log('Fulfillment Text: ' + response.body.fulfillmentText);
                response.body.fulfillmentText.should.include('please ask to log in');
                done();
            }
        });
    });
});

// Test getting amount of blueberries
describe('Test Getting amount of blueberries', () => {
    it('it should get amount of blueberries back', (done) => {
    chai.request(app)
        .post('/fulfillment')
        .set('content-type', 'application/json')
        .send(ingredientAmountRequestBlueberries)
        .end( (error, response, body) => {
            if (error) {
                done(error);
            } else {
                response.should.have.status(400);
                console.log('Fulfillment Text: ' + response.body.fulfillmentText);
                response.body.fulfillmentText.should.include('please ask to log in');
                done();
            }
        });
    });
});

});