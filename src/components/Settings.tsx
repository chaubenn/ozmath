import React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '../context/ThemeContext';
import { useForeground } from '../context/ForegroundContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { theme: foregroundTheme, setTheme: setForegroundTheme } = useForeground();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Settings</h2>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === 'dark' ? (
            <SunIcon className="w-5 h-5 text-yellow-500" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-200">Background Theme</span>
        <select
          value={foregroundTheme}
          onChange={(e) => setForegroundTheme(e.target.value as any)}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border-0 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="math">Mathematical</option>
          <option value="greek">Greek Letters</option>
          <option value="numbers">Numbers</option>
        </select>
      </div>
    </div>
  );
}