var User = require('./models/user');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
//
// module.exports = function(app) {
//   app.get('/api/user', function(req, res) {
//         User.find(function(err, user) {
//             if (err)
//                 res.send(err);
//             res.json(user); // return all user in JSON format
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
// picks up routes that end in /user
router.route('/users')
  .post(function(req, res) {

    var user = new User();
    user.name = req.body.name;

    user.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'User created!'});
    });
  }) // close post

    .get(function(req, res) {
      User.find(function(err, users) {
        if (err)
          res.send(err);

        res.json(users);
      });
    });

// picks up routes that end in /users
router.route('/user/:user_id')

  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  })

  .put(function(req, res) {

    User.findById(req.params.user_id, function(err, user) {

      if (err)
        res.send(err);

      user.name = req.body.name;

      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'User updated!'});
      });

    });
  })

  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });

    });
  });
