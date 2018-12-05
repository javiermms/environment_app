/*
* Foods routes
*/

const Food = require('../models/food');
const Profile = require('../models/profile');

module.exports = (app) => {
    // FOOD INDEX
    app.get('/profiles/:id/foods', (req, res) => {
        const currentUser = req.profile;
        Profile.findById(req.params.id)
        .then(profile => {
            Food.find({})
            .then((foods) => {
                res.render('food-index', {
                    profile: profile,
                    foods: foods,
                    currentUser
                });
            }).catch((err) => {
                console.log(err.message);
            });
        });
    });

    // CREATE FOOD
    app.post('/profiles/:id/foods', (req, res) =>{
        Food.create(req.body)
            .then((food) =>{
                res.redirect(`/profiles/:id/foods`);
            })
            .catch((err) =>{
                console.log(err.message);
            })
    });
}
