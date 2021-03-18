const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String},
    firstName: {type: String, unique:true},
    surname:{type: String, unique: false},
    dateOfBirth: Date,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
