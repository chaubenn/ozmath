import React from 'react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { InlineMath } from 'react-katex';
import type { Database } from '../types/supabase';

type Problem = Database['public']['Tables']['test_results']['Row']['problems'][number];
type TestAnswer = Database['public']['Tables']['test_results']['Row']['answers'][string];

interface TestReviewProps {
  problems: Problem[];
  answers: Record<string, TestAnswer>;
  onProblemSelect: (problem: Problem) => void;
  onClose: () => void;
}

export default function TestReview({ problems = [], answers = {}, onProblemSelect, onClose }: TestReviewProps) {
  const formatAnswer = (problem: Problem, answer?: TestAnswer) => {
    if (!answer) return '?';
    
    try {
      // Check if it's a JSON string (for multi-part problems)
      const parsed = JSON.parse(answer.answer);
      if (typeof parsed === 'object') {
        return Object.entries(parsed)
          .map(([part, value]) => `Part ${part.toUpperCase()}: ${value}`)
          .join('; ');
      }
    } catch {
      return answer.answer;
    }
    return answer.answer;
  };

  const getScore = (problem: Problem, answer?: TestAnswer) => {
    if (!answer) return '0';
    if (problem.type === 'written') {
      return `${answer.marks || 0}/${problem.marks}`;
    }
    return answer.answer === problem.solution ? '1/1' : '0/1';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Test Review</h2>
          
          <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto">
            {problems.map((problem) => {
              const answer = answers[problem.id];
              const isCorrect = problem.type === 'written' 
                ? (answer?.marks || 0) === (problem.marks || 0)
                : answer?.answer === problem.solution;

              return (
                <div 
                  key={problem.id}
                  className="flex items-center gap-4 bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  onClick={() => onProblemSelect(problem)}
                >
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <CheckIcon className="w-6 h-6 text-green-500" />
                    ) : (
                      <Cross2Icon className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-gray-800 dark:text-white">
                      <InlineMath math={problem.title} />
                    </div>
                    {problem.equation && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <InlineMath math={problem.equation} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-shrink-0 text-sm gap-1">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Score: </span>
                      <span className={`font-medium ${
                        isCorrect 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {getScore(problem, answer)}
                      </span>
                    </div>
                    {problem.type === 'multiple-choice' && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Answer: </span>
                        <span className={`font-medium ${
                          isCorrect 
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {formatAnswer(problem, answer)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Close Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}