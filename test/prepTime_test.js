process.env.NODE_ENV = 'test';

import 'babel-polyfill'

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);


//Create json example POST body for testing
const prepTimeRequest = {
    "responseId": "59941f85-76b3-4297-b3c3-88145d540c3e",
    "queryResult": {
        "queryText": "How long will the recipe take to prepare?",
        "parameters": {
            "recipe_indicator": "",
            "action": "",
            "Prep-Time-Entity": "prepare"
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
            "name": "projects/testagent-be9db/agent/intents/26eaf56d-3019-4047-bc85-6c93adca5c64",
            "displayName": "Prep-Time-Intent"
        },
        "intentDetectionConfidence": 1,
        "languageCode": "en"
    },
    "originalDetectIntentRequest": {
        "payload": {}
    },
    "session": "projects/testagent-be9db/agent/sessions/12fcb68c-9097-7fc5-450b-3fb341e32ddb"
}



/************* TESTING BEGINS ***************/


// Describes All Tests in this file
describe('Testing the Prep Time Intent', () => {


// Test Prep Time Intent
    describe('Test Prep Time Intent', () => {
        it('it should get a response with the preparation time of the recipe', (done) => {
            chai.request(app)
                .post('/fulfillment')
                .set('content-type', 'application/json')
                .send(prepTimeRequest)
                .end( (error, response, body) => {
                    if (error) {
                        done(error);
                    } else {
                        response.should.have.status(201);
                        console.log('Fulfillment Text: ' + response.body.fulfillmentText);
                        response.body.fulfillmentText.should.include('You will need 12 minutes in order to prepare the recipe.');
                        done();
                    }
                });
        });
    });
    
});