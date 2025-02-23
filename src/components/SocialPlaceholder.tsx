import React from 'react';
import { Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SocialPlaceholder() {
  const { openAuthModal } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Users className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Social Hub
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Sign in to connect with other students, share progress, and view friends' test results.
          </p>
          <button
            onClick={openAuthModal}
            className="mt-4 px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Sign In / Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
