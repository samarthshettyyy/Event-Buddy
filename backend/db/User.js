const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePic: String
});

module.exports = mongoose.model("users", userSchema);