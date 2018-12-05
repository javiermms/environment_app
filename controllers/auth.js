/*
* Authentication routes
*/

const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    // SIGN-UP GET
    app.get('/sign-up', (req, res) => {
        const currentUser = req.profile;
        res.render('sign-up', { currentUser });
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
        const currentUser = req.profile;
        res.render('login', { currentUser })
    })

    // LOGIN POST
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Find this username
        Profile.findOne({ username }, 'username password')
            .then(profile => {
                if(!profile) {
                    // User not found
                    return res.status(401).send({
                        message: 'Wrong username or password!'
                    });
                }
                // Check the password
                profile.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send({
                            message: "Wrong password!"
                        });
                    }
                    // Create a token
                    const token = jwt.sign({
                        _id: profile._id,
                        username: profile.username
                    }, process.env.SECRET, {
                        expiresIn: '60 days'
                    });
                    // Set a cookie and redirect to the root
                    res.cookie('nToken', token, {
                        maxAge: 900000,
                        httpOnly: true
                    });
                    res.redirect(`/profiles/${profile._id}`);
                });
            })
            .catch(err => {
                console.log(err);
            });
        });

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
}

/*
*
// OLD LOGIN POST
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

// CREATE (TODO: Change to /SIGN-UP add real auth and move to AUTH)
app.post('/profiles', (req, res) => {
    const query = { username: req.body.username }
    console.log(query)
    Profile.findOne(query).then((profile) => {
        let userExists = req.body._id;
        console.log(userExists);
        // check if the username already exists in database
        if (req.body._id) {
            Profile.findById(req.params.id, (err, profile) => {
                console.log(req.params.id)
                let userExists = true
                res.redirect(`/form`);
            }).catch((err) => {
                console.log(err.message);
            })
        // if it doesn't, then create profile and render it
        } else {
            Profile.create(req.body).then((profile) => {
              res.redirect(`/profiles/${profile._id}`);
            }).catch((err) => {
              console.log(err.message);
              })
          }
      })
  })
*/
