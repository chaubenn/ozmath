import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Check } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useAuth } from '../context/AuthContext';
import TopBar from '../components/TopBar';

export default function PremiumPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { openAuthModal } = useAuth();

  return (
    <div className="min-h-screen">
      <TopBar 
        currentPage="plans"
        onNavigate={(page) => {
          if (page === 'social') {
            navigate('/social');
          } else if (page === 'problems') {
            navigate('/methods');
          } else {
            navigate(`/methods/${page}`);
          }
        }}
        selectedTags={new Set()}
        onTagSelect={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
        filterTags={[]}
        onRandomProblem={() => {}}
        onStartTest={() => {}}
        onLogoClick={() => {}}
      />

      <main className="pt-24 px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/methods')}
            className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Problems</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              User Plans
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose the plan that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                No Account
              </h2>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                $0
                <span className="text-base font-normal text-gray-500">/forever</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span>Basic problem access</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span>0 requests/hour</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span>No progress tracking</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span>No social features</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Free Account
              </h2>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                $0
                <span className="text-base font-normal text-gray-500">/forever</span>
              </p>
              <ul className="space-y-4 flex-grow">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Basic problem access</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>50 requests/hour</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Track test history</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Connect with friends</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>View friends' progress</span>
                </li>
              </ul>
              {!user && (
                <button
                  onClick={openAuthModal}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mt-8"
                >
                  Sign Up / Login
                </button>
              )}
            </div>

            <div className="bg-gradient-to-b from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 rounded-lg shadow-lg p-6 relative border-2 border-amber-500 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 rounded-full flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span>Premium</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                OzPremium Account
              </h2>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                $10
                <span className="text-base font-normal text-gray-500">/year</span>
              </p>
              <ul className="space-y-4 flex-grow">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span>Everything in Free Account, plus:</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span>300 requests/hour</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span>Access to all problems</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span>Scanning AI feature</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span>Extra themes</span>
                </li>
              </ul>
              {!user ? (
                <button
                  onClick={openAuthModal}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mt-8"
                >
                  Sign Up / Login
                </button>
              ) : (
                <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-colors mt-8">
                  Go Premium
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}