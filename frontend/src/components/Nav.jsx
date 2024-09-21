import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="w-full p-5 text-left shadow-sm">
      <h1 className="font-semibold cursor-pointer">
        <Link to={'/'}>
          Todo<span className='text-blue-600'>List</span>
        </Link>
      </h1>
    </div>
  );
};

export default Nav;
