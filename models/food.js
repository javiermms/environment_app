const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String },
    description: { type: String },
    CO2e: { type: Number }
});

module.exports = mongoose.model('food', FoodSchema);
