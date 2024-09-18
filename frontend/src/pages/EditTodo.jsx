import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
const EditTodo = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch the specific todo to edit
    axios
      .get(`http://localhost:4000/todos/todo/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token for authentication
      })
      .then((response) => {
        console.log('Fetched Todo:', response.data);
        if (response.data) {
          setTitle(response.data.title || ''); 
        }
      })
      .catch((error) => {
        console.error('Error fetching todo:', error);
      });
  }, [token, navigate, todoId]);

  // Edit Todo
  const handleEdit = () => {
    axios
      .patch(
        `http://localhost:4000/todos/${todoId}`,
        {
          title,
          completed: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    // If the user is not logged in, show the login component
    !localStorage.getItem('authToken') ? (
      <Login />
    ) : (
      <>
        <div className="nav">
          <h1>TodoList</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <div className="edit">
          <h2>Edit Todo</h2>
          <div className="edit-todo">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="edit-todo-title"
            />
            <button onClick={handleEdit} className="edit-todo-btn">
              Save Changes
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default EditTodo;
