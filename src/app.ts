import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Routes
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import commentsRouter from './routes/comments';

dotenv.config();

const app: Express = express();

// DB Configuration
const mongoUri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/default';

mongoose.connect(mongoUri);
const db: mongoose.Connection = mongoose.connection;

db.on('error', (error: Error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Routes
app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
