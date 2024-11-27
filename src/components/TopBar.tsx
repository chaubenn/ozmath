import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  Cross2Icon,
  SunIcon,
  MoonIcon,
  HamburgerMenuIcon
} from '@radix-ui/react-icons';
import { Shuffle, ClipboardList } from 'lucide-react';
import FilterModal from './FilterModal';
import TestModal from './TestModal';
import UserMenu from './UserMenu';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../stores/authStore';

interface TopBarProps {
  currentPage: 'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans';
  onNavigate: (page: 'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans') => void;
  selectedTags: Set<string>;
  onTagSelect: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterTags: readonly string[];
  onRandomProblem: () => void;
  onStartTest: () => void;
  onLogoClick: () => void;
  isTestMode?: boolean;
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
  isTestMode
}: TopBarProps) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuthStore();

  const handleStartTest = () => {
    setShowTestModal(false);
    onStartTest();
  };

  const handleNavigate = (page: 'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans') => {
    if (page === 'plans') {
      navigate('/premium');
    } else if (page === 'problems') {
      onNavigate(page);
      onLogoClick();
    } else {
      onNavigate(page);
    }
    setShowMobileMenu(false);
  };

  const navigationItems = [
    { id: 'problems', label: 'Problems' },
    ...(user ? [
      { id: 'results', label: 'Results' },
      { id: 'social', label: 'Social' }
    ] : []),
    { id: 'plans', label: 'User Plans' },
    { id: 'about', label: 'About' },
    { id: 'settings', label: 'Settings' }
  ] as const;

  return (
    <div className="fixed top-0 right-0 left-0 z-50">
      {/* Main Navigation Bar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <span className="text-3xl">∑</span>
                <span>OzMath</span>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex ml-10 space-x-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`px-4 py-3 rounded-md text-sm font-medium ${
                      currentPage === item.id
                        ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              <UserMenu />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          {currentPage === 'problems' && !isTestMode && (
            <div className="px-4 py-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
              {/* Search Input */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
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

              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2">
                {filterTags.slice(0, 4).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagSelect(tag)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      selectedTags.has(tag)
                        ? 'bg-indigo-600 text-white'
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
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={onRandomProblem}
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Shuffle className="w-5 h-5" />
                  <span>Random</span>
                </button>
                <button
                  onClick={() => setShowTestModal(true)}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ClipboardList className="w-5 h-5" />
                  <span>Test</span>
                </button>
              </div>
            </div>
          )}

          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Search and Filters Bar */}
      {currentPage === 'problems' && !isTestMode && !showMobileMenu && (
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
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
                <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                  {filterTags.slice(0, 4).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onTagSelect(tag)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        selectedTags.has(tag)
                          ? 'bg-indigo-600 text-white'
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
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <Shuffle className="w-5 h-5" />
                    <span>Random</span>
                  </button>
                  <button
                    onClick={() => setShowTestModal(true)}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <ClipboardList className="w-5 h-5" />
                    <span>Test</span>
                  </button>
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