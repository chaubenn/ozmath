import React from 'react';
import { ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ResultsPlaceholder() {
  const { openAuthModal } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <ClipboardList className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Test Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Sign in to track your progress, save test results, and review your performance over time.
          </p>
          <button
            onClick={openAuthModal}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In / Sign up
          </button>
        </div>
      </div>
    </div>
  );
}