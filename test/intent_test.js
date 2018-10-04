process.env.NODE_ENV = 'test';

import 'babel-polyfill'

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);


//Create json body vars for posting
const ingredientListRequest = {
    "responseId": "ecf2b92a-b67b-41de-b3bc-0da7f961df47",
    "queryResult": {
      "queryText": "What ingredients do I need?",
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
      "intent": {
        "name": "projects/testagent-be9db/agent/intents/5784d9f6-6108-43be-8301-9188a143cef9",
        "displayName": "List-Ingredients"
      },
      "intentDetectionConfidence": 1,
      "languageCode": "en"
    },
    "originalDetectIntentRequest": {
      "payload": {}
    },
    "session": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2"
  };






//Our parent block
describe('Testing Intents', () => {

/*
* Test the /GET route
*/
describe('/GET on homepage', () => {
    it('it should GET on the homepage', (done) => {
    chai.request(app)
        .get('/')
        .end( (error, response, body) => {
            if (error) {
                done(error);
            } else {
                response.should.have.status(200);
                done();
            }
        });
    });
});

/*
* Test the /GET route
*/
describe('Test Ingredient List Intent', () => {
    it('it should get an ingredient list back', (done) => {
    chai.request(app)
        .post('/fulfillment')
        .set('content-type', 'application/json')
        .send(ingredientListRequest)
        .end( (error, response, body) => {
            if (error) {
                done(error);
            } else {
                //response.should.have.status(201);
                console.log(response);
                response.body.fulfillmentText.should.include('For this recipe,');
                done();
            }
        });
    });
});

});