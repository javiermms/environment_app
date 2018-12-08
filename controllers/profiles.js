/*
* User Profiles
*/
const Profile = require('../models/profile');
const Food = require('../models/food');

module.exports = (app) => {
  // ROOT
  app.get('/', (req, res) => {
    const currentUser = req.profile;
    res.render('index', { currentUser });
});

  // SHOW
  app.get('/profiles/:id', (req, res) => {
    const currentUser = req.profile;
    Profile.findById(req.params.id, (err, profile) => {
      res.render('profile', {
          profile: profile,
          currentUser
      });
    });
  });

    // UPDATE and ADD FOOD
    app.put('/profiles/:id', (req, res) => {
        const query = req.body.foodSelect
        Food.findById(query)
        .then((food) => {
          Profile.findByIdAndUpdate(req.params.id,
          {$push: { foods: food }})
            .then(profile => {
                console.log(profile)
                res.redirect(`/profiles/${profile._id}`)
                });
            }).catch((err) => {
                console.log(err.message);
            })
      });
      // UPDATE and REMOVE FOOD
      app.put('/profiles/:id/delete', (req, res) => {
          const query = req.body.foodSelect
          console.log(req.body)
          Food.findById(query)
          .then((food) => {
              console.log(food)
              Profile.findByIdAndUpdate(req.params.id,
              {$pull: { foods: food }},
              { safe: true, upsert: true })
              .then(profile => {
                  // console.log(profile.foods)
                  res.redirect(`/profiles/${profile._id}`)
              });
          });
      });

    // EDIT SHOW
    app.get('/profiles/:id/edit', (req, res) => {
        const currentUser = req.profile;
        Profile.findById(req.params.id)
        .then((profile) => {
            Food.find()
            .then((foods) => {
                res.render('edit-index', {
                    currentUser,
                    profile: profile,
                    foods: foods
                })
            });
        });
    });
    // DELETE
    app.delete('/profiles/:id', function (req, res) {
        res.clearCookie('nToken');
        Profile.findByIdAndRemove(req.params.id)
        .then(profile => {
            console.log('sucessfully deleted')
            res.redirect(`/`);
        }).catch((err) => {
            console.log(err.message);
        });
    });
};
