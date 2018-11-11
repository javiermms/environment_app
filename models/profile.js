const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envi', { useNewUrlParser: true });

const ProfileSchema = new mongoose.Schema({
  username: String,
  email: String,
  bio: String
})

module.model = ('Profile', ProfileSchema);
