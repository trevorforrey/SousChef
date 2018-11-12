process.env.NODE_ENV = 'test';

import 'babel-polyfill'

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);


//Create json example POST body for testing
const getFirstStep = {
    "responseId": "5ff201f3-e52f-4cf5-8395-630a7132f627",
    "queryResult": {
      "queryText": "What is the first step?",
      "parameters": {
        "first-step": [
          "first"
        ],
        "first-step1": ""
      },
      "allRequiredParamsPresent": true,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              ""
            ]
          }
        }
      ],
      "intent": {
        "name": "projects/testagent-be9db/agent/intents/be3ea258-57fc-413e-9540-6da397ca7535",
        "displayName": "first-step"
      },
      "intentDetectionConfidence": 1,
      "languageCode": "en"
    },
    "originalDetectIntentRequest": {
      "payload": {}
    },
    "session": "projects/testagent-be9db/agent/sessions/ca8047bf-9fb2-3a6b-88b0-f610254dc8b2"
};

const getNextStep = {
    "responseId": "d0d892cd-82a8-4296-ab2e-27c6da2c0776",
    "queryResult": {
      "queryText": "What is the next step?",
      "parameters": {
        "next-step": "next"
      },
      "allRequiredParamsPresent": true,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              ""
            ]
          }
        }
      ],
      "intent": {
        "name": "projects/testagent-be9db/agent/intents/0d8bb2a2-fd9c-47f4-b0c7-c87b06c58a2b",
        "displayName": "next-step"
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
describe('Testing First and Next Step Intent', () => {


// Test getting amount of sugar
describe('Test Getting First Step', () => {
    it('it should return the first step', (done) => {
    chai.request(app)
        .post('/fulfillment')
        .set('content-type', 'application/json')
        .send(getFirstStep)
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
describe('Test Getting the next step', () => {
    it('it should return the next step', (done) => {
    chai.request(app)
        .post('/fulfillment')
        .set('content-type', 'application/json')
        .send(getNextStep)
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