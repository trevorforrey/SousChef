process.env.NODE_ENV = 'test';

import 'babel-polyfill'

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);


//Create json example POST body for testing
const cookTimeRequest = {
    "responseId": "a7fc60de-cd3b-46ff-9a69-619517396924",
    "queryResult": {
        "queryText": "How long will the recipe take to cook?",
        "parameters": {
            "recipe_indicator": "",
            "Cook-Time-Entity": "cook"
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
            "name": "projects/testagent-be9db/agent/intents/c7af74ff-b6d1-4a0f-9d1d-a2edf70c8d70",
            "displayName": "Cook-Time-Intent"
        },
        "intentDetectionConfidence": 0.67,
        "languageCode": "en"
    },
    "originalDetectIntentRequest": {
        "payload": {}
    },
    "session": "projects/testagent-be9db/agent/sessions/12fcb68c-9097-7fc5-450b-3fb341e32ddb"
}



/************* TESTING BEGINS ***************/


// Describes All Tests in this file
describe('Testing the Cook Time Intent', () => {


// Test Cook Time Intent
    describe('Test Cook Time Intent', () => {
        it('it should get a response with the cook time of the recipe', (done) => {
            chai.request(app)
                .post('/fulfillment')
                .set('content-type', 'application/json')
                .send(cookTimeRequest)
                .end( (error, response, body) => {
                    if (error) {
                        done(error);
                    } else {
                        response.should.have.status(201);
                        console.log('Fulfillment Text: ' + response.body.fulfillmentText);
                        response.body.fulfillmentText.should.include('The Blueberry pancakes will take 18 minutes to finish cooking');
                        done();
                    }
                });
        });
    });
    
});