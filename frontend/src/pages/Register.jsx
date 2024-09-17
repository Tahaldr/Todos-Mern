import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const data = { username, email, password };
    axios
      .post('http://localhost:4000/users/register', data)
      .then((response) => {
        console.log(response.data);
        navigate('/login');
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
      <div className="register">
        <div className="registerMain">
          <h2>Register</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="password"
          />
          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account ?
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
