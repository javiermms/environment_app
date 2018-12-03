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
mongoose.connect(process.env.MONGOBD_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/envi', { useNewUrlParser: true });
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

/** Port listener */
app.listen(PORT, () => {
    console.log('Envi App listening on port', PORT)
})

module.exports = app;