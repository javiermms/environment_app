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
    Profile.create(req.body).then((profile) => {
      // console.log(profile);
      res.redirect(`/profiles/${profile._id}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // SHOW
  app.get('/profiles/:id', (req, res) => {
    Profile.findById(req.params.id, (err, profile) => {
      res.render('profile', { profile: profile });
    });
  });
};
