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

    // Render Login Template
    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/login', (req, res) => {
        const query = { username: req.body.username }
        Profile.findOne(query).then((profile) => {
            // console.log(profile);
            res.redirect(`/profiles/${profile._id}`)
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // Form Page; this is like our /profiles/new route
    app.get('/form', (req, res) => {
        res.render('sign-up');
    })

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
        // const user = { username: req.body.username }
        Profile.findById(req.params.id, (err, profile) => {
            res.render('profile', { profile: profile });
        })

    })
}
