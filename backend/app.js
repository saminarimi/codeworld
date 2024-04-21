const express = require("express");

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "Origin,X-Requested-with,Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();

})
app.use("/api/posts", (req, res, next) => {
    const posts = [{ id: 'abcd', title: 'post1', content: 'post1 content' }, { id: 'abcde', title: 'post2', content: 'post2 content' }]
    res.status(200).json({
        message: "Post fetched successfully",
        posts: posts
    })
});


module.exports = app;