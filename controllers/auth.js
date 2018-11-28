const Profile = require('../models/profile');

module.exports = function (app) {
    // Render Login Template
    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/login', (req, res) => {
        const query = { username: req.body.username }
        Profile.findOne(query).then((profile) => {
            res.redirect(`/profiles/${profile._id}`)
        }).catch((err) => {
            console.log(err.message);
        });
    });
};
