import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
    },
    // userId foreign key to link the two collections
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', todoSchema);
export { Todo };
