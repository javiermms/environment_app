const Profile = require('../models/profile');
const Food = require('../models/food');

module.exports = function auth(app) {
  // ROOT
  app.get('/', (req, res) => {
    res.render('index');
  });

  // CREATE (TODO: Change to /SIGN-UP add real auth and move to AUTH)
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

    // UPDATE and ADD FOOD
    app.put('/profiles/:id', (req, res) => {
      const query = { _id: Object.keys(req.body)[0] }
      console.log(query);
      Food.findOne(query)
      .then((food) => {
          console.log(food);
          Profile.findOneAndUpdate(req.params.id,
          {$push: { foods: food }})
            .then(profile => {
                res.redirect(`/profiles/${profile._id}`)
                });
            });
      });
      // UPDATE and REMOVE FOOD
      app.put('/profiles/:id/delete', (req, res) => {
          const query = { _id: Object.keys(req.body)[0] }
          Food.findOne(query)
          .then((food) => {
              Profile.findOneAndUpdate(req.params.id,
              {$pull: { foods: food }},
              { safe: true, upsert: true })
              .then(profile => {
                  res.redirect(`/profiles/${profile._id}`)
              });
          });
      });

    // EDIT
    app.get('/profiles/:id/edit', (req, res) => {
        Profile.findById(req.params.id)
        .then((profile) => {
            Food.find()
            .then((foods) => {
                res.render('edit-index', { profile: profile, foods: foods })
            });
        });
    });
    // DELETE
    app.delete('/profiles/:id', function (req, res) {
        Profile.findByIdAndRemove(req.params.id)
        .then(profile => {
            console.log('sucessfully deleted')
            res.redirect(`/`);
        }).catch((err) => {
            console.log(err.message);
        });
    });
};
