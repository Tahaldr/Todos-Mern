import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

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
      <>
        <div className="nav">
          <h1>TodoList</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <div className="home">
          <h2>Dashboard</h2>
          <div className="add-todo">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="add-todo-title"
            />
            <button onClick={handleAddTodo} className="add-todo-btn">
              Add Todo
            </button>
          </div>
          <div className="todo-list">
            <ul>
              {todos.map((todo) => (
                <li key={todo._id} className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleComplete(todo._id, todo.completed)} // Pass the current completion status
                    className="complete-checkbox"
                  />
                  <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                  </span>
                  <div className="todo-options">
                    <Link to={`/edit/${todo._id}`}>Edit</Link>
                    <button onClick={() => handleDelete(todo._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  );
};

export default Home;
