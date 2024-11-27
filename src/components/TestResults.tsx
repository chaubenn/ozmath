import React from 'react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

interface TestResultsProps {
  totalMarks: number;
  maxMarks: number;
  onClose: () => void;
  onViewReview: () => void;
}

export default function TestResults({ 
  totalMarks,
  maxMarks,
  onClose,
  onViewReview 
}: TestResultsProps) {
  const percentage = Math.round((totalMarks / maxMarks) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Test Results</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center">
              <div className="text-4xl font-bold text-indigo-600">
                {percentage}%
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-lg">
              <span className="text-gray-600 dark:text-gray-300">Total Score:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {totalMarks} / {maxMarks}
              </span>
            </div>

            <div className="flex justify-center">
              {percentage >= 50 ? (
                <div className="flex items-center text-green-500">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  <span>Passed!</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <Cross2Icon className="w-5 h-5 mr-2" />
                  <span>Keep practicing!</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onViewReview}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View Test Review
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Return to Problems
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}