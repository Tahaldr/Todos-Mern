import React from 'react';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LoggedNav = ({ action }) => {
  return (
    <div className="w-full p-5 flex justify-between items-center shadow-sm">
      <Link to={'/'}>
        <h1 className="font-semibold cursor-pointer">
          Todo<span className="text-blue-600">List</span>
        </h1>
      </Link>
      <button onClick={action} className="logout-btn">
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default LoggedNav;
