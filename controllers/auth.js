/*
* Authentication routes
*/

const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    // SIGN-UP GET
    app.get('/sign-up', (req, res) => {
      res.render('sign-up');
    });

    // SIGN-UP POST
    app.post('/sign-up', (req, res) => {
        // CREATE USER
        const profile = new Profile(req.body);
        profile.save()
            .then(profile => {
                var token = jwt.sign({
                    _id: profile._id
                }, process.env.SECRET, {
                    expiresIn: '60 days'
                });
                res.cookie('nToken', token, {
                    maxAge: 900000,
                    httpOnly: true
                });
                res.redirect(`/profiles/${profile._id}`);
            })
        .catch(err => {
            console.log(err.message)
            return res.status(400).send({
                err: err
            });
        })
    })

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

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
}
