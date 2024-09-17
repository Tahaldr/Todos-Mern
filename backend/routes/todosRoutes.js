import express from 'express';
import mongoose from 'mongoose';
// import { Todo } from '../models/todosModel';

const todoRouter = express.Router();

todoRouter.post('/', (req, res) => {
  // Your logic for handling the post request
  res.send('Todo created');
});
// Route for creating Todos

// todoRouter.post('/', async (req, res) => {



//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

export default todoRouter;
