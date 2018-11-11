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
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var router = express.Router();
let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({
    secret: 'our111super222duper333secret444',
    resave: false,
    saveUninitialized: false, /*False is useful for implementing login sessions, reducing
                                server storage usage and helping with race conditions.*/
    cookie: {
        secure: false, //When true ensure cookie only used over https
        maxAge: 30 * 60 * 1000, //Define user session length (ms) so not indefinite
        ephemeral: true,
        //httpOnly: true, //prevents browser JS from accessing cookies
    },
    rolling: true //Lengthen user session by activity
}));


// process.env.PORT used by Heroku
var port = process.env.PORT || 5000;

// Have Heroku set up google auth
if (process.env.GOOGLE_AUTH_CONTENTS != null) {
    shell.exec('./release-tasks.sh');
}

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, '/views')); //Need this line for template *Do not remove*
app.set('view engine', 'hbs');


app.post('/fulfillment', handle_fulfillment);

app.get('/', function (req, res) {
    console.log("session data work?");
    console.log(req.session.username);
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/login_registration.html', function (req, res) {
    res.render('login_registration.hbs', { title: 'Form Validation', success: req.session.success, errors: req.session.errors }); //Render because we're using handlebars for this page
});

app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/test.html'));
});


app.get('/upload',function (req, res) {
    res.sendFile(path.join(__dirname + '/views/upload.html'));
    console.log('hit the upload handler');
});


app.post('/postReg', postRegistration); //posting a registered user account
app.post('/getLogin', getLoginUser); //get a user from the db for logging in.
app.post('/postRecipe', post_user_recipe); //POST a recipe
app.post('/updateRecipe', update_recipe); //POST a recipe update
app.post('/update', update_recipe_in_db); //POST a recipe update?????
app.get('/cookbook', get_cookbook); //GET users cookbook


app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});

module.exports = app;
