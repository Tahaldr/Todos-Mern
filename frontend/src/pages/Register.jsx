import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';

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
    <div className="h-screen w-screen flex flex-col">
      <Nav />
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-slate-300 flex flex-col p-10 rounded-md items-center w-96">
          <h2 className="h2">Sign Up</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="input"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input"
          />
          <button onClick={handleRegister} className="submit-btn">
            Register
          </button>
          <div className="mt-5 text-sm flex gap-2">
            <p>Already have an account ?</p>
            <span className="text-blue-600 hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
