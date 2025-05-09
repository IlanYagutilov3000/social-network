const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: []
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        default: []
    }],
}, { timestamps: true })

const Post = mongoose.model("posts", postSchema)
module.exports = Post