import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col relative">
      <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-screen">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl text-indigo-600 dark:text-indigo-400">∑</span>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              OzMath
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Practice QCAA Mathematics Problems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          <button
            onClick={() => navigate('/methods')}
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              QCAA Methods
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Practice Mathematical Methods problems from past papers
            </p>
          </button>

          <button
            onClick={() => navigate('/specialist')}
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              QCAA Specialist
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Practice Specialist Mathematics problems from past papers
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}