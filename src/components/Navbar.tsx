import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="morph-gradient text-white shadow-lg backdrop-blur-md bg-opacity-80 sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between animate-fade-up">
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-all duration-300"
          >
            <span className="gradient-text">Gihan Pasidu</span>
          </Link>
          <div className="flex space-x-8 items-center">
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
                    ? 'text-white border-b-2 border-white shimmer'
                    : 'text-blue-100 hover:text-white'
                } font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg
                  hover:bg-white/10 backdrop-blur-sm`}
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
