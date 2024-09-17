import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    // If the user is not logged in, show the login component
    !localStorage.getItem('authToken') ? (
      <Login />
    ) : (
      <>
        <div className="nav">
          <h1>TodoList</h1>
        </div>
        <div className="home">
          <h2>Dashboard</h2>
          <div className='todolist'>
            
          </div>
        </div>
      </>
    )
  );
};

export default Home;
