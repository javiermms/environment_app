const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envi', { useNewUrlParser: true });

const Food = mongoose.model('Food', {
    title: String,
    other: String
})

module.exports = Food; 
