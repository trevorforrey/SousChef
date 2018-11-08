import handle_fulfillment from './fulfillment_controller'
import post_user_recipe from './post_user_recipe'
import get_cookbook from './get_cookbook'
import postRegistration from './views/js/registration'
import getLoginUser from './views/js/login'
import update_recipe from './update_recipe'
import update_recipe_in_db from './handle_update'


var session = require('express-session');
const shell = require('shelljs');
var express = require('express');
const bodyparser = require('body-parser');
let path = require('path');
let MongoClient = require('mongodb').MongoClient;

let app = express();
var router = express.Router();
app.use(bodyparser.json());
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secret: 'our super duper secret',
    resave: false,
    ephemeral: true,
    saveUninitialized: false, /*False is useful for implementing login sessions, reducing
                                server storage usage and helping with race conditions.*/
    cookie: {
        secure: false, //When true ensure cookie only used over https
        maxAge: 30 * 60 * 1000, //Define user session length (ms) so not indefinite
        httpOnly: true, //prevents browser JS from accessing cookies
    },
    rolling: true //Lengthen user session by activity
}));

// process.env.PORT used by Heroku
var port = process.env.PORT || 5000;

// Have Heroku set up google auth
if (process.env.GOOGLE_AUTH_CONTENTS != null) {
    shell.exec('./release-tasks.sh');
}

app.use(express.static(__dirname + '/views'))

app.post('/fulfillment', handle_fulfillment);

app.get('/', function (req, res) {
    console.log("session data work?");
    console.log(req.session.username);
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/login_registration', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/login_registration.html'));
});

app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/test.html'));
});

//posting a registered user account
app.post('/postReg', postRegistration);

//get a user from the db for logging in.
app.post('/getLogin', getLoginUser);


app.get('/upload',function (req, res) {
    res.sendFile(path.join(__dirname + '/views/upload.html'));
    console.log('hit the upload handler');
});

app.post('/postRecipe', post_user_recipe);

app.post('/updateRecipe', update_recipe);

app.post('/update', update_recipe_in_db);

app.get('/cookbook', get_cookbook);


app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});

module.exports = app;
