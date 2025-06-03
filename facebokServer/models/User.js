const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2
    },
    birthday: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: "https://painrehabproducts.com/wp-content/uploads/2014/10/facebook-default-no-profile-pic.jpg"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    savedPosts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        default: []
    }]
});

const User = mongoose.model("users", userSchema);
module.exports = User;