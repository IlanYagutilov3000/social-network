const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const User = require("../models/User");
const auth = require("../middleware/auth");

const loginSchema = Joi.object({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(6)
})

router.post("/", async (req, res) => {
    try {
        // validate body
        const { error } = await loginSchema.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message)
        // check if user not exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).send("Invalid email or passwrod");

        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(404).send("Invalid email or password");

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWTKEY);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router