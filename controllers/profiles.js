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

  // CREATE (TODO: Change to /SIGN-UP and move to AUTH)
  app.post('/profiles', (req, res) => {
      const query = { username: req.body.username }
      console.log(query)
      Profile.findOne(query).then((profile) => {
          let userExists = req.body._id;
          console.log(userExists);
          // check if the username already exists in database
          if (req.body._id) {
              Profile.findById(req.params.id, (err, profile) => {
                  console.log(req.params.id)
                  let userExists = true
                  res.redirect(`/form`);
              }).catch((err) => {
                  console.log(err.message);
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

  // UPDATE PROFILE
  app.put('/profiles/:id', (req, res) => {
      Profile.findbyIdAndUpdate(req.params.id)
        .then(profile => {
            // find the foods
            Food.find({ id: req.body._id })
            console.log("_id:", req.body._id)
        })
        .catch((err) => {
            console.log(err.message)
        })
  })

};
