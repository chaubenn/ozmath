import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Video, LineChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAuthStore } from '../stores/authStore';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, HamburgerMenuIcon, Cross2Icon, PersonIcon } from '@radix-ui/react-icons';
import { CSSTransition } from 'react-transition-group';

export default function LandingPage() {
  const navigate = useNavigate();
  const { openAuthModal } = useAuth();
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      setIsMenuAnimating(true);
      const timer = setTimeout(() => setIsMenuAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [showMobileMenu]);

  const navigationItems = [
    { id: 'methods', label: 'Methods' },
    { id: 'specialist', label: 'Specialist' },
    { id: 'about', label: 'About' },
    { id: 'settings', label: 'Settings' }
  ] as const;

  const handleNavigate = (id: string) => {
    setShowMobileMenu(false);
    if (id === 'methods' || id === 'specialist') {
      navigate(`/${id.toLowerCase()}`);
    } else if (id === 'about') {
      navigate('/methods/about');
    } else if (id === 'settings') {
      navigate('/methods/settings');
    }
  };

  return (
    <CSSTransition
      in={show}
      timeout={600}
      classNames="homepage"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div 
                  onClick={() => navigate('/')}
                  className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <span className="text-3xl">∑</span>
                  <span>OzMath</span>
                </div>
                <div className="hidden md:flex ml-6 space-x-2">
                  {navigationItems.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!user && (
                  <button 
                    onClick={openAuthModal}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <PersonIcon className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
                )}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {showMobileMenu ? (
                    <Cross2Icon className="w-5 h-5" />
                  ) : (
                    <HamburgerMenuIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div 
              className={`md:hidden bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm transform transition-all duration-200 ${
                isMenuAnimating ? 'mobile-menu-enter' : ''
              }`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Master QCAA Mathematics with our comprehensive practice platform
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Access past papers, video solutions, and detailed explanations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/methods')}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Mathematical Methods
                </button>
                <button
                  onClick={() => navigate('/specialist')}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Specialist Mathematics
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative w-full max-w-xl mx-auto aspect-[4/3]">
              {/* Desktop Image */}
              <div className="relative w-[85%] mx-auto">
                <img
                  src="/images/desktopmock.png"
                  alt="OzMath Desktop View"
                  className="w-full h-full object-contain rounded-lg"
                  loading="eager"
                />
              </div>
              
              {/* Mobile Mockup - Positioned absolutely */}
              <div className="absolute -bottom-4 -right-4 w-[40%] transform translate-x-1/8 translate-y-1/8">
                <img
                  src="/images/mockup.png"
                  alt="OzMath Mobile View"
                  className="w-full h-auto object-contain rounded-lg"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Book className="w-10 h-10 text-gray-900 dark:text-white mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Past Papers</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Practice with real QCAA exam questions from previous years
                </p>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Video className="w-10 h-10 text-gray-900 dark:text-white mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Video Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Watch detailed video explanations for complex problems
                </p>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <LineChart className="w-10 h-10 text-gray-900 dark:text-white mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor your improvement with detailed analytics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="text-3xl">∑</span>
                <span>OzMath</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your comprehensive mathematics learning platform
              </p>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Methods', 'Specialist'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => navigate(`/${item.toLowerCase()}`)}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <button 
                    onClick={() => navigate('/methods/about')}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/methods/about')}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/ozmathau/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © 2025 OzMath. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </CSSTransition>
  );
}
