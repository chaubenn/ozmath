import React from 'react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { InlineMath } from 'react-katex';
import type { Database } from '../types/supabase';

type TestResult = Database['public']['Tables']['test_results']['Row'];
type Problem = TestResult['problems'][number];
type TestAnswer = TestResult['answers'][string];

interface TestReviewProps {
  problems: Problem[];
  answers: Record<string, TestAnswer>;
  onProblemSelect: (problem: Problem) => void;
  onClose: () => void;
}

export default function TestReview({ 
  problems = [], 
  answers = {}, 
  onProblemSelect, 
  onClose 
}: TestReviewProps) {
  const formatAnswer = (problem: Problem, answer?: TestAnswer) => {
    if (!answer) return <InlineMath math="\\text{No answer provided}" />;
    
    try {
      // Check if it's a JSON string (for multi-part problems)
      const parsed = JSON.parse(answer.answer);
      if (typeof parsed === 'object') {
        if (problem.parts) {
          return (
            <div className="space-y-2">
              {problem.parts.map(part => (
                <div key={part.id}>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Part {part.id.toUpperCase()}:
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 pl-4">
                    {parsed[part.id] ? (
                      <InlineMath math={parsed[part.id]} />
                    ) : (
                      <InlineMath math="\\text{No answer provided}" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return parsed.main ? 
          <InlineMath math={parsed.main} /> : 
          <InlineMath math="\\text{No answer provided}" />;
      }
    } catch {
      // If not JSON, treat as LaTeX
      return <InlineMath math={answer.answer} />;
    }
  };

  const getTotalMarks = (problem: Problem, answer?: TestAnswer) => {
    if (!answer) return `0/${problem.marks || 1}`;
    
    if (problem.type === 'written') {
      const totalMarks = answer.marks || 0;
      return `${totalMarks}/${problem.marks}`;
    }
    return answer.answer === problem.solution ? '1/1' : '0/1';
  };

  const getChoiceText = (problem: Problem, choiceId: string) => {
    if (problem.type !== 'multiple-choice' || !problem.choices) return '';
    const choice = problem.choices.find(c => c.id === choiceId);
    return choice ? choice.text : '';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
            Test Review
          </h2>
          
          <div className="space-y-3 mb-6 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
            {problems.map((problem) => {
              const answer = answers[problem.id];
              const isCorrect = problem.type === 'written' 
                ? (answer?.marks || 0) === (problem.marks || 0)
                : answer?.answer === problem.solution;

              return (
                <div 
                  key={problem.id}
                  onClick={() => onProblemSelect(problem)}
                  className="flex flex-col bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <Cross2Icon className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-gray-800 dark:text-white">
                        <InlineMath math={problem.title} />
                      </div>
                      {problem.equation && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 hidden md:block overflow-x-auto">
                          <div className="whitespace-nowrap">
                            <InlineMath math={problem.equation} />
                          </div>
                        </div>
                      )}
                      {answer && (
                        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Your Response:
                          </p>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {problem.type === 'multiple-choice' ? (
                              <div>
                                ({answer.answer}) <InlineMath math={getChoiceText(problem, answer.answer)} />
                              </div>
                            ) : (
                              formatAnswer(problem, answer)
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Score: </span>
                        <span className={`font-medium ${
                          isCorrect 
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {getTotalMarks(problem, answer)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
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
