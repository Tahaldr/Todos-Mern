import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import LoggedNav from '../components/LoggedNav';
import { AiFillEdit } from 'react-icons/ai';

import { MdDelete } from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const user_Id = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch all todos
    axios
      .get(`http://localhost:4000/todos/${user_Id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token for authentication
      })
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error.message);
      });
  }, [token, navigate, user_Id]);

  // Adding Todo
  const handleAddTodo = () => {
    if (!title.trim()) {
      return; // Prevent adding empty todos
    }

    const todoData = {
      title,
      userId: user_Id,
    };

    axios
      .post('http://localhost:4000/todos', todoData, {
        headers: { Authorization: `Bearer ${token}` }, // Include token for authentication
      })
      .then((res) => {
        setTodos((prevTodos) => [...prevTodos, res.data]);
        setTitle('');
      })
      .catch((err) => {
        console.error('Error adding todo:', err.message);
      });
  };

  // Deleting Todo
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo:', error.message);
      });
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  // Complete Function
  const handleComplete = (id, currentStatus) => {
    axios
      .patch(
        `http://localhost:4000/todos/${id}/complete`,
        { completed: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo._id === id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          })
        );
      })
      .catch((error) => {
        console.error('Error toggling complete status:', error.message);
      });
  };

  return (
    // If the user is not logged in, show the login component
    !token ? (
      <Login />
    ) : (
      <div className="h-screen w-screen flex flex-col">
        <LoggedNav action={handleLogout} />
        <div className="h-full w-full flex justify-center items-center">
          <div className="bg-slate-300 flex flex-col p-10 rounded-md items-center w-1/3">
            <h2 className="h2">Dashboard</h2>
            <div className="mb-5 w-full">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="input"
              />
              <button onClick={handleAddTodo} className="submit-btn mt-0">
                Add Todo
              </button>
            </div>
            <div className="w-full max-h-60 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mt-4 ">
              <ul className="w-full">
                {todos.map((todo) => (
                  <li
                    key={todo._id}
                    className="flex items-center justify-between p-3 bg-slate-400 mb-3 rounded-sm text-sm overflow-auto gap-2">
                    <div className="flex items-center justify-center gap-3">
                      {/* CHECKBOIX TO COMPLETE TODO */}
                      {/*
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleComplete(todo._id, todo.completed)}
                            className="hidden peer"
                          />
                          <div
                            className="w-3 h-3 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-slate-500 peer-checked:border-none"
                            onClick={() => handleComplete(todo._id, todo.completed)}>
                          </div>
                        </div>
                      */}

                      <span
                        className={`todo-title ${todo.completed ? 'completed' : ''} cursor-pointer`}
                        onClick={() => handleComplete(todo._id, todo.completed)}>
                        {todo.title}
                      </span>
                    </div>
                    <div className="text-lg flex items-center justify-center gap-3">
                      <Link to={`/edit/${todo._id}`}>
                        <AiFillEdit />
                      </Link>
                      <button onClick={() => handleDelete(todo._id)} className="text-red-600">
                        <MdDelete />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
