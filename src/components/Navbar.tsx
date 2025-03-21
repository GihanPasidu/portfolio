import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="gradient-bg text-white shadow-lg backdrop-blur-sm bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-all duration-300"
          >
            <span className="gradient-text">Gihan Pasidu</span>
          </Link>
          <div className="flex space-x-8">
            {[
              { path: '/', label: 'About', icon: '👨‍💻' },
              { path: '/projects', label: 'Projects', icon: '🚀' },
              { path: '/contact', label: 'Contact', icon: '📧' }
            ].map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`${
                  isActive(path)
                    ? 'text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white'
                } font-medium transition-all duration-300 flex items-center space-x-2 px-3 py-1 rounded-lg
                  ${!isActive(path) && 'hover:bg-white hover:bg-opacity-10'}`}
              >
                <span className="text-sm">{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
