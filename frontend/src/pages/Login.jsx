import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:4000/users/login', data)
      .then((response) => {
        console.log(response.data);

        // LocalStoorage is just like session
        const token = response.data.token;
        const userId = response.data._id;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);

        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="nav">
        <h1>TodoList</h1>
      </div>
      <div className="login">
        <div className="loginMain">
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="email"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="password"
            placeholder="Enter your password"
          />
          <button onClick={handleLogin}>Login</button>
          <p>
            Dont have an account?
            <span>
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
