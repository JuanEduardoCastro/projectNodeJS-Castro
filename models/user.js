const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    eMail: {type: String, require: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    photo: {type: String, require: true},
    job: {type: String, require: true},
    country: {type: String, require: true},
    likes: {type: Array},
})

const User = mongoose.model('User', userSchema);
module.exports = User;