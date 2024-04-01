const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    middleName: String,
    isActive : Boolean,
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'position' // ссылка на модель 
    }
});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel


