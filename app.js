const express = require('express');
const methodOverride = require('method-override');

const bodyParser =require('body-parser');

const exphbs = require('express-handlebars');

const app = express();

const mongoose = require('mongoose');
mongooose.connect(process.env.MONGODB_URI || 'mongodb://localhost/envi', { useNewUrlParser: true });

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Envi App listening on port 3000!')
})

module.exports = app; 
