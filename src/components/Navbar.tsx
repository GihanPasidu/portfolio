import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between animate-fade-up">
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-all duration-300 transform hover:scale-105"
          >
            Gihan Pasidu
          </Link>
          <div className="flex space-x-8 stagger-animation">
            {[
              { path: '/', label: 'About' },
              { path: '/projects', label: 'Projects' },
              { path: '/contact', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`${
                  isActive(path)
                    ? 'text-blue-200 border-b-2 border-blue-200 glow-effect'
                    : 'text-gray-300 hover:text-white'
                } font-medium transition-all duration-300 hover:scale-105`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
