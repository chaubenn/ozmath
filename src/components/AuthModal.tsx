import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAuthStore } from '../stores/authStore';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { theme } = useTheme();
  const { user } = useAuthStore();

  // Close modal when user signs in
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose} 
      />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Cross2Icon className="h-6 w-6" />
            </button>

            <div className="p-6">
              <Auth
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
          </div>
        </div>
      </div>
    </>
  );
}