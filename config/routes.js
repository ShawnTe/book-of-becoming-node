var Nerd = require('./models/nerd');
// var Nerd = require('./app/models/nerd');

//
// module.exports = function(app) {
//   app.get('/api/nerds', function(req, res) {
//         Nerd.find(function(err, nerds) {
//             if (err)
//                 res.send(err);
//             res.json(nerds); // return all nerds in JSON format
//         });
//     });
//
//     app.get('*', function(req, res) {
//            res.sendfile('./public/views/index.html'); // load our public/index.html file
//        });
//    };

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
