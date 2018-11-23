const Profile = require('../models/profile');

module.exports = function auth(app) {
  // Root
  app.get('/', (req, res) => {
    res.render('index');
  });

  // Form Page; this is like our /profiles/new route
  app.get('/form', (req, res) => {
    res.render('sign-up');
  });

  // CREATE
  app.post('/profiles', (req, res) => {
      const query = { username: req.body.username }
      Profile.findOne(query).then((profile) => {
          const userExists = req.body.id;
          console.log(userExists);
          // check if the username already exists in database
          if (req.body.id == undefined || req.body.id == null) {
              Profile.findById(req.params.id, (err, profile) => {
                  console.log(req.params.id)
              })
          // if it doesn't, then create profile and render it
          } else {
              Profile.create(req.body).then((profile) => {
                res.redirect(`/profiles/${profile._id}`);
              }).catch((err) => {
                console.log(err.message);
                })
            }
        })
    })

  // SHOW
  app.get('/profiles/:id', (req, res) => {
    Profile.findById(req.params.id, (err, profile) => {
      res.render('profile', { profile: profile });
    });
  });
};
