import handle_fulfillment from './fulfillment_controller'
import get_cookbook from './get_cookbook'

const shell = require('shelljs');
var express = require('express');
const bodyparser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let app = express();
app.use(bodyparser.json());

// process.env.PORT used by Heroku
var port = process.env.PORT || 5000;

// Have Heroku set up google auth
if (process.env.GOOGLE_AUTH_CONTENTS != null) {
    shell.exec('./release-tasks.sh');
}

app.get('/', function (req, res) {
    res.send('Welcome to the cooking assistant!');
});

app.post('/fulfillment', handle_fulfillment);


app.get('/:userid/cookbook',get_cookbook);

app.listen(port, function () {
    console.log('Cooking server listening on port ' + port);
});

module.exports = app;