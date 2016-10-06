var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');  // allows us to get POST data
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var db = require('./config/db');
var port = process.env.PORT || 8080

var Nerd = require('./app/models/nerd');

mongoose.connect('mongodb://localhost:27017/book');
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

// routes ==================================================
// require('./app/routes')(app); // configure our routes

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for ALL requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something big is happening here...');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
 res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// picks up routes that end in /nerds
router.route('/nerds')
  .post(function(req, res) {

    var nerd = new Nerd();
    nerd.name = req.body.name;

    nerd.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Nerd created!'});
    });
  }) // close post

    .get(function(req, res) {
      Nerd.find(function(err, nerds) {
        if (err)
          res.send(err);

        res.json(nerds);
      });
    });

// picks up routes that end in /nerds
router.route('/nerds/:nerd_id')

  .get(function(req, res) {
    Nerd.findById(req.params.nerd_id, function(err, nerd) {
      if (err)
        res.send(err);
      res.json(nerd);
    });
  })

  .put(function(req, res) {

    Nerd.findById(req.params.nerd_id, function(err, nerd) {

      if (err)
        res.send(err);

      nerd.name = req.body.name;

      nerd.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Nerd updated!'});
      });

    });
  })

  .delete(function(req, res) {
    Nerd.remove({
      _id: req.params.nerd_id
    }, function(err, nerd) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });

    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
