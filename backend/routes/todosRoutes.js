import express from 'express';
import mongoose from 'mongoose';
import { Todo } from '../models/todosModel.js';
import { User } from '../models/usersModel.js';

const todoRouter = express.Router();

// Route for creating Todos
todoRouter.post('/', async (req, res) => {
  try {
    const { title, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    const newTodo = {
      title,
      completed: false,
      userId,
    };

    const todo = await Todo.create(newTodo);

    return res.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all todos
todoRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({ userId });
    res.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get Todo using todoId
todoRouter.get('/todo/:todoId', async (req, res) => {
  const { todoId } = req.params; 
  try {
    const todo = await Todo.findById(todoId); 
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
});

// Route to Update A Todo
todoRouter.patch('/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, completed } = req.body;
    if (!title || completed === undefined) {
      return res.status(400).send({
        message: 'Please add both title and complted status',
      });
    }

    const result = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).send({
      message: 'Todo updated successfully',
      updatedTodo: result,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to Delete A Todo
todoRouter.delete('/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;

    const result = await Todo.findByIdAndDelete(todoId);
    if (!result) {
      return res.status(404).send({ message: 'Todo not found' });
    }

    return res.status(200).send({
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to Mark Todo as Completed
todoRouter.patch('/:todoId/complete', async (req, res) => {
  try {
    const { todoId } = req.params;

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { completed: true }, { new: true });

    if (!updatedTodo) {
      return res.status(404).send({ message: 'Todo not found' });
    }

    return res.status(200).send({
      message: 'Todo marked as complete successfully',
      updatedTodo,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default todoRouter;
