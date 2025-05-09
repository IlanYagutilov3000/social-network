const Post = require("../models/Post")

module.exports = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if(!post) return res.status(404).send("Post not found")

        if (req.payload.isAdmin || post.userId.toString() === req.payload._id) return next()
        res.status(403).send("Access denied. Not authorized.")
    } catch (error) {
        res.status(400).send(error)
    }
}

// this middle check if he user is admin or the user who created the post, I want to allow the user who created the post to delete the post and to admin to delete as well