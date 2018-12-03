/*
*  Panda Dreams main server
*/
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

/** Instantiate server */
const app = express();
const PORT = process.env.PORT || 3000;

/** Database connection */
const mongoose = require('mongoose');
const MONGOBD_URI = require('mongodb://heroku_hgv48cf6:h09u1ue67ec5piefh7n5h2slsp@ds153352.mlab.com:53352/heroku_hgv48cf6');
mongoose.connect(process.env.MONGOBD_URI || 'mongodb://localhost/envi', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected successfully.')
});

/** Middleware */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json());

/** Load Routes */
app.get('profiles/:id/foods', (req, res) => {
    console.log('got it')
    res.render('food-index');
    // Profile.findById(req.params.id)
    // .then(profile => {
    //     Food.find({})
    //     .then((foods) => {
    //         res.render('food-index', { profile: profile, foods: foods });
    //     }).catch((err) => {
    //         console.log(err.message);
    //     });
    // });
});
require('./controllers/foods.js')(app);
require('./controllers/profiles.js')(app);
require('./controllers/auth.js')(app);

const port = process.env.PORT || 5000;

/** Port listener */
app.listen(PORT, () => {
    console.log('Envi App listening on port', PORT)
})


module.exports = app;
