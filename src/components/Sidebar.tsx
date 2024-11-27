import React from 'react';
import { Home, Settings } from 'lucide-react';

interface SidebarProps {
  currentPage: 'problems' | 'settings';
  onNavigate: (page: 'problems' | 'settings') => void;
}

const navigation = [
  { name: 'Problems', icon: Home, id: 'problems' as const },
  { name: 'Settings', icon: Settings, id: 'settings' as const }
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen shadow-lg fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <span className="text-3xl">∑</span> MathCode
        </h1>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left ${
              currentPage === item.id
                ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            } transition-colors duration-200`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}