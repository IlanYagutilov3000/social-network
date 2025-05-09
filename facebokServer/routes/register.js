const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const User = require("../models/User");

const registerSchema = Joi.object({
    firstname: Joi.string().required().min(2),
    lastname: Joi.string().required().min(2),
    birthday: Joi.date().required(),
    gender: Joi.string().required().min(2),
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(6),
    isAdmin: Joi.boolean()
})

//register user
router.post("/", async (req, res) => {
    try {
        // body validation
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)
        // chech if User already exists
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(404).send("User all ready exists")
        // if user doesn't exists create a new one
        user = new User(req.body);
        // hash the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        // send token to the client
        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWTKEY)
        res.status(201).send(token)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router