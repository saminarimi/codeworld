const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb://localhost:27017/node-angular").then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection failed')
})



app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
app.use(cors({
    origin: ['http://localhost:4200'],
    "methods": "GET,PUT,POST",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
}));

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save();
    console.log(post);
    res.status(201).json({ message: "post added successfully" });
})
app.get("/api/posts", (req, res, next) => {
    const posts = Post.find({}).then((document) => {
        console.log(document)
        res.status(200).json({
            message: "Post fetched successfully",
            posts: document
        })
    }).catch((error) => {
        console.log(error);
    });
    //console.log(posts);

});


module.exports = app;