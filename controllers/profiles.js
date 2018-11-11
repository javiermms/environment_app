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
    // Form Page
    app.get('/form', (req, res) => {
        res.render('form');
    })
    // Profile Show
    app.get('/profiles/:id', (req, res) => {
        res.render('profile', {});
    })
}
