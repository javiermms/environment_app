const Profile = require('../models/profile');

module.exports = function (app) {
    // SIGN-UP GET
    app.get('/sign-up', (req, res) => {
      res.render('sign-up');
    });
    // LOGIN GET
    app.get('/login', (req, res) => {
        res.render('login')
    })
    // LOGIN POST
    app.post('/login', (req, res) => {
        const query = { username: req.body.username }
        Profile.findOne(query).then((profile) => {
            res.redirect(`/profiles/${profile._id}`)
        }).catch((err) => {
            console.log(err.message);
        });
    });
};
