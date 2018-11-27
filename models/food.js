const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envi', { useNewUrlParser: true });

const Food = mongoose.model('Foods', {
    name: String,
    description: String,
    CO2e: Number
})

module.exports = Food;
