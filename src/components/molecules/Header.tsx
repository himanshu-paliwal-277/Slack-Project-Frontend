import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-[80px] bg-white shadow-lg">
      {/* Navbar */}
      <nav className="flex gap-2 items-center">
        <Link className="hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md" to="/">
          Home
        </Link>
        <Link className="hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md" to="/signin">
          Sign In
        </Link>
        <Link className="hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md" to="/signup">
          Sign Up
        </Link>
      </nav>
    </div>
  );
};

export default memo(Header);
