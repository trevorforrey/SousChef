import handle_fulfillment from './fulfillment_controller'
import post_username from './views/js/register_login'


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

app.use(express.static(__dirname+"/views"))
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/views/register_login', function (req, res) {
    res.sendFile('views/register_login.html', { root : __dirname});
});

app.post('/:users', post_username);
/*app.post('/register_login', function(req, res, next) {
   var itemInsert = {
       username: res.body.usernameLogin.value
   }
   
   MongoClient.connect(url, function(err, db) {
       assert.equal(null, err);
       db.collection('users').insertOne(itemInsert, function(err, result) {
           assert.equal(null, err);
       })
   })
});*/

app.get('/upload',function (req, res) {
    res.sendFile('upload.html');
});

app.post('/fulfillment', handle_fulfillment);

app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});

module.exports = app;