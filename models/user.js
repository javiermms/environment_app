const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envi', { useNewUrlParser: true });

const Profile = mongoose.model('Profile', {
    username: String,
    other: String
})

module.exports = Profile;
