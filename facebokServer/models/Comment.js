const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },
    text: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Comment = mongoose.model("comments", commentSchema)
module.exports = Comment