const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envi', { useNewUrlParser: true });

const Profile = mongoose.model('Profile', {
    username: { type: String },
    email: { type: String },
    bio: { type: String },
    foods: Array
    // foods: [Foods]
})

module.exports = Profile;
