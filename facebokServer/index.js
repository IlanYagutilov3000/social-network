const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const register = require("./routes/register")
const login = require("./routes/login")
const users = require("./routes/users")
const post = require("./routes/posts")
const comment = require("./routes/comments")

const app = express()
const port = process.env.PORT || 5000;

const logger = (req, res, next) => {
    console.log(req.method + req.url);
    next()
}

mongoose.connect(process.env.DB).then(() => {
    console.log("Connected to MongoDB server");
}).catch((error) => {
    console.log(error)
})

app.use(cors())
app.use(express.json())
app.use(logger)
app.use("/users/register", register)
app.use("/users/login", login)
app.use("/users", users)
app.use("/post", post)
app.use("/comment", comment)

app.listen(port, () => console.log("Server is running on port", port))