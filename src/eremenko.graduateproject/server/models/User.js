const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    middleName: String,
    position: String,
    isActive : Boolean
});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel
