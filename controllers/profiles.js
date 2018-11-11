const Profile = require('../models/profile');

const sampleProfile = {
    "username": "enviuser",
    "email": "user@envi.com",
    "bio": "I love using envi!"
}

module.exports = function (app) {
    // Root
    app.get('/', (req, res) => {
        res.render('index');
    })
    // Form Page; this is like our /profiles/new route
    app.get('/form', (req, res) => {
        res.render('sign-up');
    })
    // CREATE
    app.post('/profiles', (req, res) => {
        console.log(req.body);
        Profile.create(req.body).then((profile) => {
            console.log(profile);
            res.redirect(`/profiles/${profile._id}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });
    // SHOW
    app.get('/profiles/:id', (req, res) => {
        res.render('profile', {});
    })
}
