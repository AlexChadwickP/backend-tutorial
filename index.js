/**
 * CRUD
 * Create - POST
 * Read   - GET
 * Update - PUT
 * Delete - DELETE
 */

// POST https://google.com:443/posts/how-to-save-a-life

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({
    extended: false 
}));

app.use(express.json());

const dbUrl = 'mongodb+srv://test:test@bugtracker.kcina.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        title: String,
        content: String,
        author: String
    }
);

const Post = mongoose.model('Post', PostSchema);

app.post('/new-post', (req, res) => {
    if (req.body.title === undefined || req.body.content === undefined) return res.status(400);
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author || "anonymous";

    const post = new Post({ title: title, content: content, author: author });

    post.save();
});











// MIDDLEWARE
function logWhenRouteIsRequested(req, res, next) {
    console.log('REQUEST RECEIVED');
    next();
}

app.get('/request', (req, res) => {
    res.send("Hello, world!");
});

app.post('/user', (req, res) => {
    if (req.body.user === undefined) return res.status(400);
    
    console.log(req.body.user);
    return res.status(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});