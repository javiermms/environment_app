const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    foods: Array
});

ProfileSchema.pre('save', function(next) {
    // SET createdAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    // ENCRYPT PASSWORD
    const profile = this;
    if (!profile.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(profile.password, salt, (err, hash) => {
            profile.password = hash;
            next();
        });
    });
});

// Need to use function to enable this.password to work
ProfileSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('Profile', ProfileSchema);
