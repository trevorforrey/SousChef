import handle_fulfillment from './fulfillment_controller'

import post_user_recipe from './post_user_recipe'

import get_cookbook from './get_cookbook'

import postRegistration from './views/js/register_login'
import getLoginUser from './views/js/register_login'

const shell = require('shelljs');
var express = require('express');
const bodyparser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let app = express();
var router = express.Router();
app.use(bodyparser.json());

// process.env.PORT used by Heroku
var port = process.env.PORT || 5000;

// Have Heroku set up google auth
if (process.env.GOOGLE_AUTH_CONTENTS != null) {
    shell.exec('./release-tasks.sh');
}

//=======================================================
//Leave this first or all the tests fail for some reason
app.post('/fulfillment', handle_fulfillment);
//=======================================================
app.use(express.static(__dirname+'/views'))

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/home', function (req, res) {
    res.sendFile('home.html');
});

//posting a registered user account
//app.post('/postReg', postRegistration(req, res));

//get a user from the db for logging in.
app.get('/index', getLoginUser);


app.get('/upload',function (req, res) {
    res.sendFile('upload.html');
});



app.post('/postRecipe', post_user_recipe);


app.get('/:userid/cookbook',get_cookbook);


app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});

module.exports = app;
