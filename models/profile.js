const mongoose = require('mongoose');
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
    // foods: [Foods]
});

ProfileSchema.pre('save', function(next) {
    // SET createdAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
