import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { 
    path: '/', 
    label: 'About', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  { 
    path: '/projects', 
    label: 'Projects', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    path: '/contact', 
    label: 'Contact', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Track scrolling to adjust transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-black/40 backdrop-blur-xl shadow-lg shadow-black/20' 
        : 'bg-transparent backdrop-blur-sm'}
      border-b ${isScrolled ? 'border-white/10' : 'border-white/5'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-2">
            {menuItems.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                isActive={isActive(path)}
                icon={icon}
              >
                {label}
              </NavLink>
            ))}
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/60 backdrop-blur-xl border-t border-white/10">
          {menuItems.map(({ path, label, icon }) => (
            <MobileNavLink
              key={path}
              to={path}
              isActive={isActive(path)}
              icon={icon}
            >
              {label}
            </MobileNavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink component with modern design
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
  icon: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive, icon }) => {
  return (
    <Link
      to={to}
      className={`
        group flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
        ${isActive 
          ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20' 
          : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'}
      `}
    >
      <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      <span>{children}</span>
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, isActive, icon }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all
        ${isActive 
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400' 
          : 'text-white/70 hover:text-white hover:bg-white/10'}
      `}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;
