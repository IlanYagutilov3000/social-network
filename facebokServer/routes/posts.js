const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const User = require("../models/User");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const isAdminOrUSer = require("../middleware/isAdminOrUSer");

const postSchema = Joi.object({
    userId: Joi.string().required(),
    text: Joi.string().required(),
    image: Joi.string().optional().allow(''),
})


// get all posts + sorted(newest / oldest)
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find({}).sort({
            createdAt: req.query.sort === "oldest" ? 1 : -1
        }).populate("userId", "firstname lastname profilePicture");
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get specific post
router.get("/:postId", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate("userId", "firstname lastname");
        if (!post) return res.status(404).send("no such post")
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
});

// creating a new post
router.post("/", auth, async (req, res) => {
    try {
        // validate body
        const { error } = postSchema.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        // create the posts
        const post = new Post({
            userId: req.payload._id,
            text: req.body.text,
            image: req.body.image,
            likes: [],
            comments: []
        })
        await post.save()
        res.status(201).send("post was created")
    } catch (error) {
        res.status(400).send(error)
    }
})


//update post if user is admin or the one who created it
router.put("/:postId", auth, isAdminOrUSer  ,async (req, res) => {
    try {
        // need to use the await the req body with validateAsync as well, don't forget
        const {error} = await postSchema.validateAsync(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const post = await Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true})
        if(!post) return res.status(404).send("no post was found") 
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get posts that belong to the user
router.get("/my-posts/:userId", auth, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }).populate("userId", "firstname lastname profilePicture")
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send(error)
    }
})

//add like and unlike to the posts needs to be patch
router.patch("/:postId", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) return res.status(404).send("post not found")
        // checking to see if the card likes has the user id, if yes and the user clicked again the user id gets removed if no the user id gets saved into the likes array
        if (post.likes.includes(req.payload._id)) {
            post.likes.pull(req.payload._id); // Unlike
        } else {
            post.likes.push(req.payload._id); // Like
        }
        // Save the updated card
        await post.save();
        res.status(200).send({ likes: post.likes.length });
    } catch (error) {
        res.status(400).send(error)
    }
})

// deleting a spesific post
router.delete("/:postId", auth, isAdminOrUSer, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);
        if (!post) return res.status(404).send("no such post")
        res.status(200).send("post was deleted")
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router