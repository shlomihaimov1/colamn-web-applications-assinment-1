const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRouter = require('./routes/posts');
// const commentsRouter = require('../comments');

const app = express();

// DB Configuration
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

// Routes
app.use(express.json());
app.use('/posts', postsRouter);
// app.use('/comments', commentsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
