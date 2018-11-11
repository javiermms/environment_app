const Profile = require('../models/profile');

module.exports = function (app) {
    // Root
    app.get('/', (req, res) => {
        res.render('index');
    })
    // Form Page
    app.get('/form', (req, res) => {
        res.render('sign-up');
    })
    // Profile Show
    app.get('/profiles/:id', (req, res) => {
        res.render('profile', {});
    })
}
