import express from 'express';
import mongoose from 'mongoose';
import { User } from '../models/usersModel.js';

const userRouter = express.Router();

// Route for register
userRouter.post('/register', async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Send all required fields : username, email, password',
      });
    }

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.create(newUser);

    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for login
userRouter.post('/login', async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Send all required fields : email, password',
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare passwords
    if (user.password !== req.body.password) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default userRouter;
