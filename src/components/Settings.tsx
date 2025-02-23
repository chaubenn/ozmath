import React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useForeground } from '../context/ForegroundContext';
import { useSubscriptionStore } from '../stores/subscriptionStore';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { theme: foregroundTheme, setTheme: setForegroundTheme, availableThemes } = useForeground();
  const { isPremium } = useSubscriptionStore();
  const navigate = useNavigate();

  const handleThemeChange = (newTheme: string) => {
    const themeOption = availableThemes.find(t => t.id === newTheme);
    if (!themeOption) return;

    if (themeOption.requiresPremium && !isPremium) {
      if (window.confirm('This theme is only available for premium users. Would you like to upgrade?')) {
        navigate('/premium');
      }
      return;
    }
    setForegroundTheme(newTheme as any);
  };

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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-200">Background Theme</span>
          <select
            value={foregroundTheme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border-0 focus:ring-2 focus:ring-indigo-500"
          >
            {availableThemes.map(theme => (
              <option 
                key={theme.id} 
                value={theme.id}
                disabled={theme.requiresPremium && !isPremium}
              >
                {theme.name} {theme.requiresPremium && !isPremium && '(Premium)'}
              </option>
            ))}
          </select>
        </div>

        {!isPremium && (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
              <Lock className="w-5 h-5" />
              <p className="font-medium">Premium Themes</p>
            </div>
            <p className="text-amber-600 dark:text-amber-300 text-sm">
              Upgrade to premium to unlock additional background themes!
            </p>
            <button
              onClick={() => navigate('/premium')}
              className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
