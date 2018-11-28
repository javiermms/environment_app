const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envi', { useNewUrlParser: true });

const Relationship = mongoose.model('Relationship', {
    profile: Schema.Types.ObjectId,
    food: Schema.Types.ObjectId
})

module.exports = Relationship;
