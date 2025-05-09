const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const commentSchema = Joi.object({
    text: Joi.string().required(),
    /*  postId: Joi.string().required() */
})

// get the comments for a spesific post
router.get("/:postId", auth, async (req, res) => {
    try {
        // get the postId to find the comments that have the post id in them
        const comments = await Comment.find({ postId: req.params.postId }).populate("userId", "firstname lastname")
        res.status(200).send(comments)
    } catch (error) {
        res.status(500).send(error)
    }
})

// create a comment
router.post("/:postId", auth, async (req, res) => {
    try {
        const { error } = commentSchema.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).send("post not found")

        const comment = new Comment({
            text: req.body.text,
            postId: req.params.postId,
            userId: req.payload._id
        })
        await comment.save()

        post.comments.push(comment._id)
        await post.save()

        res.status(201).send("comment was created")
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete comment
router.delete("/:commentId", auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).send("Comment not found");

        if (comment.userId.toString() !== req.payload._id) return res.status(400).send("Unauthorized")

        const post = await Post.findByIdAndUpdate(
            comment.postId,
            { $pull: { comments: comment._id } },
            { new: true }
        );
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).send("comment was deleted")
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router