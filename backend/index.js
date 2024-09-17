import express from 'express';
import cors from 'cors';
import nodemon from 'nodemon';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todosRoutes.js';
import { PORT, MongoURL } from './config.js';

// MiddleWares
const app = express();

app.use(express.json());
app.use(cors());

// connect to dataBase
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to mern stack tutorial');
});

// Routes
app.use('/users', userRouter);
app.use('/todos', todoRouter);

// Start the server
mongoose
  .connect(MongoURL)
  .then(() => {
    console.log('App connected to dataBase');
    app.listen(PORT, () => {
      console.log(`Server is listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
