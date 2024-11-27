import React, { useState, useEffect } from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../stores/authStore';

export default function Auth() {
  const { theme } = useTheme();
  const { user, profile } = useAuthStore();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { updateUsername } = useAuthStore();

  // Show username form if user exists but has no username
  const showUsernameForm = user && (!profile?.username);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    try {
      setError('');
      await updateUsername(username);
    } catch (error) {
      console.error('Error setting username:', error);
      setError(error instanceof Error ? error.message : 'Failed to set username');
    }
  };

  if (showUsernameForm) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleUsernameSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Choose a Username</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              minLength={3}
              maxLength={8}
              pattern="[a-zA-Z0-9_-]+"
              title="Username can only contain letters, numbers, underscores, and hyphens"
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <SupabaseAuth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#4F46E5',
                brandAccent: '#4338CA',
              },
            },
          },
          className: {
            container: 'flex flex-col gap-4',
            button: 'px-4 py-2 rounded-lg font-medium transition-colors',
            input: 'w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600',
            anchor: 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300',
          },
        }}
        theme={theme}
        providers={[]}
        view="sign_in"
      />
    </div>
  );
}