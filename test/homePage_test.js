process.env.NODE_ENV = 'test';

import 'babel-polyfill'

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);


/************* TESTING BEGINS ***************/


// Describes All Tests in this file 
describe('Testing Home Page', () => {


// Test Homepage
describe('/GET on homepage', () => {
    it('it should GET on the homepage with a status of 200', (done) => {
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

});