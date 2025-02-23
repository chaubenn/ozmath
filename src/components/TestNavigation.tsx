import React from 'react';
import { Cross2Icon, CheckIcon } from '@radix-ui/react-icons';

interface TestAnswer {
  answer: string;
  marks?: number;
  partMarks?: Record<string, number>;
}

interface TestNavigationProps {
  currentProblem: number;
  totalProblems: number;
  answers: Record<number, TestAnswer>;
  problemIds: number[];
  onNavigate: (index: number) => void;
  onEndTest: () => void;
  reviewMode?: boolean;
  onViewReview?: () => void;
}

export default function TestNavigation({
  currentProblem,
  totalProblems,
  answers,
  problemIds,
  onNavigate,
  onEndTest,
  reviewMode,
  onViewReview
}: TestNavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Show Review Test button in review mode or after test is completed
  if ((reviewMode || Object.keys(answers).length === totalProblems) && onViewReview) {
    return (
      <button
        onClick={onViewReview}
        className="fixed bottom-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
      >
        Test Review
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
      >
        Navigate Test ({currentProblem}/{totalProblems})
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="absolute top-4 right-4">
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <Cross2Icon className="w-6 h-6" />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Test Navigation
              </h2>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {problemIds.map((id, index) => (
                  <button
                    key={id}
                    onClick={() => {
                      onNavigate(index);
                      setIsOpen(false);
                    }}
                    className={`p-3 rounded-lg font-medium transition-colors ${
                      index + 1 === currentProblem
                        ? 'bg-indigo-600 text-white'
                        : answers[id]
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {index + 1}
                    {answers[id] && (
                      <CheckIcon className="w-3 h-3 inline-block ml-1" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Continue Test
                </button>
                <button
                  onClick={onEndTest}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  End Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}