import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Portfolio</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/projects" className="hover:text-gray-300">Projects</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
