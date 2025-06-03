const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const User = require("../models/User");
const auth = require("../middleware/auth");
const isAdminOrUSer = require("../middleware/isAdminOrUSer");
const Post = require("../models/Post");
const Comment = require("../models/Comment");


const updateSchema = Joi.object({
    firstname: Joi.string().required().min(2),
    lastname: Joi.string().required().min(2),
    email: Joi.string().required().min(2).email(),
    profilePicture: Joi.string().optional(),
    gender: Joi.string().optional().valid("male", "female", "custom"),
    _id: Joi.string().optional()
})

// get all user
router.get("/all-users", /* auth */ async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get user by id(current user)
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.payload._id)
        if (!user) return res.status(404).send("User not found")

        res.status(200).send(_.pick(user, ["_id", "firstname", "email", "lastname", "profilePicture", "gender", "birthday"]))
    } catch (error) {
        res.status(400).send(error)
    }
})

// get saved posts
router.get("/saved-posts", auth, async (req, res) => {
    try {
        // find user
        const user = await User.findById(req.payload._id).populate({
            path: "savedPosts",
            populate: {
                path: "userId",
                select: "firstname lastname profilePicture"
            }
        });
        if (!user) return res.status(404).send("User not found");

        res.status(200).send(user.savedPosts);
    } catch (error) {
        res.status(400).send(error.message || "Something went wrong");
    }
});

// get a specifc user, not the current one
router.get("/:userId", auth, async (req, res,) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(404).send("User not found")

        res.status(200).send(_.pick(user, ["_id", "firstname", "email", "lastname", "profilePicture", "gender", "birthday"]))
    } catch (error) {
        res.status(400).send(error)
    }
})

// update user
router.put("/:userId", auth, async (req, res) => {
    try {
        // check if user is the current user or admin
        if (req.payload._id !== req.params.userId && !req.payload.isAdmin) return res.status(403).send("Access denied. Not authorized.");

        const { error } = await updateSchema.validateAsync(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        let user = await User.findByIdAndUpdate({ _id: req.params.userId }, req.body, { new: true })
        if (!user) return res.status(404).send("User not found")
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// save post
router.patch("/save/:postId", auth, async (req, res) => {
    try {
        // get 
        const user = await User.findById(req.payload._id);
        if(!user) return res.status(404).send("User not found")
        // checking to see if the post id is or isn't in the savedPost
    if(user.savedPosts.includes(req.params.postId)) {
        user.savedPosts.pull(req.params.postId) // unsave
    } else {
        user.savedPosts.push(req.params.postId) // save
    };
    await user.save()
        res.status(200).send({savedPosts: user.savedPosts})
    } catch (error) {
        res.status(400).send(error)
        
    }
})

// delete user
router.delete("/:userId", auth, async (req, res) => {
    try {
        // check if user is the current user or admin
        if (req.payload._id !== req.params.userId && !req.payload.isAdmin) return res.status(403).send("Access denied. Not authorized.");

        // delete users posts
        await Post.deleteMany({ userId: req.params.userId })

        // delete users comments
        await Comment.deleteMany({ userId: req.params.userId })

        // delete the user
        const user = await User.findByIdAndDelete(req.params.userId)
        if (!user) res.status(404).send("User not found")
        res.status(200).send("USer was deleted")
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router