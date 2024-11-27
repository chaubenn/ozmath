import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpecialistApp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          QCAA Specialist Mathematics problems will be available soon!
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}