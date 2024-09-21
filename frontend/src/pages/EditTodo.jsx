import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import LoggedNav from '../components/LoggedNav';
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
        // console.log('Fetched Todo:', response.data);
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
      <div className="h-screen w-screen flex flex-col">
        <LoggedNav action={handleLogout} />
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="bg-slate-300 flex flex-col p-10 rounded-md items-center w-1/3">
            <h2 className="h2">Edit Todo</h2>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="input"
            />
            <button onClick={handleEdit} className="submit-btn">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditTodo;
