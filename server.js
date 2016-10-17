var express = require('express'),
        http = require('http');
        config = require('./config')(),
        app = express(),
        MongoClient = require('mongodb').MongoClient;

var bodyParser = require('body-parser');  // allows us to get POST data
var methodOverride = require('method-override');
// var connect = require('connect'),


var db = require('./app/models/db');
var user = require('./app/models/user');

// var port = process.env.PORT || 8080;

MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/book', function(err, db) {
    if(err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {
        var attachDB = function(req, res, next) {
            req.db = db;
            next();
        };
        http.createServer(app).listen(config.port, function(){
            console.log('Magic happens on port ' + config.port);
        });
    }
});


// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/templates');
// routes ==================================================
// require('./app/routes')(app); // configure our routes



// shoutout to the user
// console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
