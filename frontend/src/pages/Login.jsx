import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

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
    <div className="h-screen w-screen flex flex-col">
      <Nav />
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-slate-300 flex flex-col p-10 rounded-md items-center w-96">
          <h2 className="h2">Log in</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input"
            placeholder="Enter your password"
          />
          <button onClick={handleLogin} className='submit-btn'>Login</button>
          <div className="mt-5 text-sm flex gap-2">
            <p>Dont have an account ?</p>
            <span className="text-blue-600 hover:underline">
              <Link to="/register">signup</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
