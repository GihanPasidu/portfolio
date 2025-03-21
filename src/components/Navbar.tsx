import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="morph-gradient text-white shadow-lg backdrop-blur-md bg-opacity-80 sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight hover:text-blue-200 transition-all duration-300">
            <span className="gradient-text">Gihan Pasidu</span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
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

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'max-h-48' : 'max-h-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="pt-2 pb-3 space-y-1">
            {[
              { path: '/', label: 'About', icon: '👨‍💻' },
              { path: '/projects', label: 'Projects', icon: '🚀' },
              { path: '/contact', label: 'Contact', icon: '📧' }
            ].map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  isActive(path)
                    ? 'text-white bg-white/10 border-l-4 border-white'
                    : 'text-blue-100 hover:text-white hover:bg-white/5'
                } block px-4 py-2 text-base font-medium transition-all duration-300`}
              >
                <span className="inline-flex items-center space-x-2">
                  <span>{icon}</span>
                  <span>{label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
