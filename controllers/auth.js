const Profile = require('../models/profile');
let alreadyUser = true;

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
            console.log("profile:", profile)
            if (profile != null | profile != undefined) {
                res.redirect(`/profiles/${profile._id}`)
            } else {
                let alreadyUser = false;
                console.log("no user")
                res.redirect(`/login`)
            }
        }).catch((err) => {
            console.log(err.message);
        });
    });
};
