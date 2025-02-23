import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  Cross2Icon,
  SunIcon,
  MoonIcon,
  HamburgerMenuIcon
} from '@radix-ui/react-icons';
import { Shuffle, ClipboardList, Settings } from 'lucide-react';
import FilterModal from './FilterModal';
import TestModal from './TestModal';
import UserMenu from './UserMenu';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptionStore } from '../stores/subscriptionStore';

interface TopBarProps {
  currentPage: 'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans' | 'premium';
  onNavigate: (page: 'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans' | 'premium') => void;
  selectedTags: Set<string>;
  onTagSelect: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterTags: readonly string[];
  onRandomProblem: () => void;
  onStartTest: () => void;
  onLogoClick: () => void;
  isTestMode?: boolean;
  isPremiumHub?: boolean;
}

export default function TopBar({ 
  currentPage, 
  onNavigate, 
  selectedTags,
  onTagSelect,
  searchQuery,
  setSearchQuery,
  filterTags,
  onRandomProblem,
  onStartTest,
  onLogoClick,
  isTestMode,
  isPremiumHub
}: TopBarProps) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isPremium } = useSubscriptionStore();

  useEffect(() => {
    if (showMobileMenu) {
      setIsMenuAnimating(true);
      const timer = setTimeout(() => setIsMenuAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [showMobileMenu]);

  const handleStartTest = () => {
    setShowTestModal(false);
    onStartTest();
  };

  const handleNavigate = (page: 'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans' | 'premium') => {
    if (page === 'plans') {
      navigate('/premium');
    } else if (page === 'problems') {
      onNavigate(page);
      onLogoClick();
    } else if (page === 'premium') {
      navigate('/premium-hub');
    } else {
      onNavigate(page);
    }
    setShowMobileMenu(false);
  };

  const navigationItems = [
    { id: 'problems', label: 'Problems' },
    ...(isPremium ? [{ id: 'premium', label: 'Premium Hub' }] : []),
    { id: 'results', label: 'Results' },
    { id: 'social', label: 'Social' },
    { id: 'about', label: 'About' },
    { id: 'plans', label: 'User Plans' }
  ] as const;

  return (
    <div className="fixed inset-x-0 top-0 z-40">
      {/* Main Navigation Bar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <span className="text-3xl">∑</span>
                <span>OzMath</span>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex ml-6 space-x-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === item.id
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    } transition-colors`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">
              <div className="relative z-50">
                <UserMenu />
              </div>
              <div className="hidden md:block">
                <button
                  onClick={() => handleNavigate('settings')}
                  className={`p-2 rounded-lg ${
                    currentPage === 'settings'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  } transition-colors`}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div 
          className={`md:hidden bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm transform transition-all duration-200 ${
            isMenuAnimating ? 'mobile-menu-enter' : ''
          }`}
        >
          {/* Search and Filters for Problems Page */}
          {(currentPage === 'problems' || currentPage === 'premium') && !isTestMode && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              {/* Search Input */}
              <div className="relative mb-4">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                  >
                    <Cross2Icon className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter and Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilterModal(true)}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span>Filters</span>
                </button>
                <button
                  onClick={onRandomProblem}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Shuffle className="w-5 h-5" />
                  <span>Random</span>
                </button>
                {!isPremiumHub && (
                  <button
                    onClick={() => setShowTestModal(true)}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ClipboardList className="w-5 h-5" />
                    <span>Test</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                } transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Search and Filters Bar */}
      {(currentPage === 'problems' || currentPage === 'premium') && !isTestMode && !showMobileMenu && (
        <div className="hidden md:block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-3">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 max-w-xl">
                  {/* Search Input */}
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search problems..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                      >
                        <Cross2Icon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Tags and Actions */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                  {filterTags.slice(0, 4).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onTagSelect(tag)}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        selectedTags.has(tag)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowFilterModal(true)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="More filters"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onRandomProblem}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <Shuffle className="w-5 h-5" />
                    <span>Random</span>
                  </button>
                  {!isPremiumHub && (
                    <button
                      onClick={() => setShowTestModal(true)}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <ClipboardList className="w-5 h-5" />
                      <span>Test</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showFilterModal && (
        <FilterModal
          filterTags={filterTags}
          selectedTags={selectedTags}
          onTagSelect={onTagSelect}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {showTestModal && (
        <TestModal
          filterTags={filterTags}
          selectedTags={selectedTags}
          onTagSelect={onTagSelect}
          onClose={() => setShowTestModal(false)}
          onStartTest={handleStartTest}
        />
      )}
    </div>
  );
}
