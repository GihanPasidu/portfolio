import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { 
    path: '/', 
    label: 'About', 
    icon: '👤' // Professional person icon
  },
  { 
    path: '/projects', 
    label: 'Projects', 
    icon: '💼' // Professional briefcase icon
  },
  { 
    path: '/contact', 
    label: 'Contact', 
    icon: '📬' // Professional mailbox icon
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
        ? 'bg-black/30 backdrop-blur-lg' 
        : 'bg-transparent backdrop-blur-sm'}
      border-b border-white/5
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              <div className="flex items-center">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {menuItems.map(({ path, label, icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  isActive={isActive(path)}
                >
                  <span className="text-sm">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/60 backdrop-blur-lg border-t border-white/10">
          {menuItems.map(({ path, label, icon }) => (
            <MobileNavLink
              key={path}
              to={path}
              isActive={isActive(path)}
            >
              <span className="inline-flex items-center space-x-2">
                <span>{icon}</span>
                <span>{label}</span>
              </span>
            </MobileNavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink component with hover effects matching the transparent style
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
        ${isActive 
          ? 'text-white bg-white/5 border border-white/20' 
          : 'text-white/70 hover:text-white hover:bg-white/5'}
      `}
    >
      {children}
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`
        block px-3 py-2 rounded-md text-base font-medium transition-all
        ${isActive 
          ? 'bg-white/5 text-white border-l-4 border-blue-400' 
          : 'text-white/70 hover:text-white hover:bg-white/5'}
      `}
    >
      {children}
    </Link>
  );
};

export default Navbar;
