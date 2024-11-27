import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, VideoIcon, CheckIcon, Cross2Icon, BookmarkIcon, ArrowRightIcon, ReloadIcon } from '@radix-ui/react-icons';
import { AlertCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import VideoPlayer from './VideoPlayer';
import FormulaSheet from './FormulaSheet';
import { gradeAnswer } from '../services/openai';
import type { Problem, TestAnswer } from '../types/problem';

interface ProblemViewProps {
  problem: Problem;
  onBack: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  isTestMode?: boolean;
  onTestAnswer?: (answer: string, marks?: number, partMarks?: Record<string, number>) => void;
  currentProblem?: number;
  totalProblems?: number;
  reviewMode?: boolean;
  userAnswer?: TestAnswer;
  onEndTest?: () => void;
}

interface RateLimitError {
  message: string;
  isRateLimit: boolean;
}

export default function ProblemView({
  problem,
  onBack,
  onNext,
  hasNext,
  isTestMode,
  onTestAnswer,
  currentProblem,
  totalProblems,
  reviewMode,
  userAnswer,
  onEndTest
}: ProblemViewProps) {
  const [answer, setAnswer] = useState(userAnswer?.answer || '');
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [error, setError] = useState<RateLimitError | null>(null);
  const [aiGrading, setAiGrading] = useState<{
    marks: number;
    partMarks?: Record<string, number>;
  } | null>(null);
  const [partAnswers, setPartAnswers] = useState<Record<string, string>>(() => {
    if (userAnswer?.answer && problem.parts) {
      try {
        return JSON.parse(userAnswer.answer);
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    if (userAnswer) {
      if (problem.parts) {
        try {
          setPartAnswers(JSON.parse(userAnswer.answer));
        } catch {
          setPartAnswers({});
        }
      } else {
        setAnswer(userAnswer.answer);
      }
      setIsAnswerSubmitted(true);
    } else {
      setAnswer('');
      setPartAnswers({});
      setIsAnswerSubmitted(false);
    }
    setShowSolution(false);
    setIsCorrect(null);
    setShowVideo(false);
    setAiGrading(null);
    setIsSubmitting(false);
    setError(null);
  }, [problem.id, userAnswer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (isTestMode && onTestAnswer) {
      setIsSubmitting(true);
      try {
        if (problem.type === 'written') {
          let totalMarks = 0;
          const partMarks: Record<string, number> = {};

          if (problem.parts) {
            for (const part of problem.parts) {
              try {
                const result = await gradeAnswer(
                  partAnswers[part.id] || '',
                  part.solution,
                  part.marks,
                  part.question
                );
                totalMarks += result.marks;
                partMarks[part.id] = result.marks;
              } catch (error) {
                if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
                  setError({ message: error.message, isRateLimit: true });
                  return;
                }
                throw error;
              }
            }
          } else {
            try {
              const result = await gradeAnswer(
                answer,
                problem.solution,
                problem.marks || 0,
                problem.equation
              );
              totalMarks = result.marks;
            } catch (error) {
              if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
                setError({ message: error.message, isRateLimit: true });
                return;
              }
              throw error;
            }
          }
          onTestAnswer(
            problem.parts ? JSON.stringify(partAnswers) : answer,
            totalMarks,
            partMarks
          );
        } else {
          onTestAnswer(answer);
        }
      } catch (error) {
        console.error('Error grading answer:', error);
        onTestAnswer(
          problem.parts ? JSON.stringify(partAnswers) : answer,
          0
        );
      } finally {
        setIsSubmitting(false);
        setIsAnswerSubmitted(true);
      }
      return;
    }

    if (problem.type === 'written') {
      setIsSubmitting(true);
      try {
        let totalMarks = 0;
        const partMarks: Record<string, number> = {};

        if (problem.parts) {
          for (const part of problem.parts) {
            try {
              const result = await gradeAnswer(
                partAnswers[part.id] || '',
                part.solution,
                part.marks,
                part.question
              );
              totalMarks += result.marks;
              partMarks[part.id] = result.marks;
            } catch (error) {
              if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
                setError({ message: error.message, isRateLimit: true });
                return;
              }
              throw error;
            }
          }
        } else {
          try {
            const result = await gradeAnswer(
              answer,
              problem.solution,
              problem.marks || 0,
              problem.equation
            );
            totalMarks = result.marks;
          } catch (error) {
            if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
              setError({ message: error.message, isRateLimit: true });
              return;
            }
            throw error;
          }
        }

        setAiGrading({ marks: totalMarks, partMarks });
        setIsCorrect(totalMarks === (problem.marks || 0));
      } catch (error) {
        console.error('Error grading answer:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const normalizedAnswer = answer.trim().toLowerCase();
      const normalizedSolution = problem.solution.toLowerCase();
      setIsCorrect(normalizedAnswer === normalizedSolution);
    }
    setIsAnswerSubmitted(true);
  };

  const handlePartAnswerChange = (partId: string, value: string) => {
    setPartAnswers(prev => ({
      ...prev,
      [partId]: value
    }));
    setIsAnswerSubmitted(false);
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    setIsAnswerSubmitted(false);
  };

  const getSubmitButtonStyle = () => {
    if (isSubmitting) {
      return "bg-yellow-500 hover:bg-yellow-600 cursor-wait";
    }
    if (isAnswerSubmitted) {
      return "bg-green-600 hover:bg-green-700 cursor-default";
    }
    return "bg-indigo-600 hover:bg-indigo-700";
  };

  const isLastProblem = currentProblem === totalProblems;

  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8 ${
      isTestMode || reviewMode ? 'mt-0' : 'mt-12'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              <InlineMath math={problem.title} />
            </h2>
            {(isTestMode || reviewMode) && totalProblems && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Problem {currentProblem} of {totalProblems}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFormulaSheet(true)}
            className="flex items-center gap-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <BookmarkIcon className="w-5 h-5" />
            <span>Formula Sheet</span>
          </button>
          {hasNext && !isTestMode && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <span>Next Problem</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-8">
        {problem.equation && (
          <div className="text-xl text-gray-800 dark:text-white mb-4">
            <InlineMath math={problem.equation} />
          </div>
        )}
        {problem.pdfUrl && (
          <div className="flex justify-center">
            <div className="w-[600px] h-[400px] rounded-lg overflow-hidden">
              <img
                src={problem.pdfUrl}
                alt="Problem diagram"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p>{error.message}</p>
            </div>
            {error.isRateLimit && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                Please try again in an hour or use the basic grading system.
              </p>
            )}
          </div>
        )}

        <div className="mb-6">
          {problem.type === 'multiple-choice' ? (
            <div className="space-y-4">
              {problem.choices?.map((choice) => (
                <label
                  key={choice.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer relative ${
                    answer === choice.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={choice.id}
                    checked={answer === choice.id}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    disabled={reviewMode}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    ({choice.id}) <InlineMath math={choice.text} />
                  </span>
                  {(reviewMode || (showSolution && !isTestMode)) && (
                    <span className="absolute right-3">
                      {choice.id === problem.solution ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      ) : (answer === choice.id) ? (
                        <Cross2Icon className="w-5 h-5 text-red-500" />
                      ) : null}
                    </span>
                  )}
                </label>
              ))}
            </div>
          ) : problem.parts ? (
            <div className="space-y-6">
              {problem.parts.map((part) => (
                <div key={part.id} className="space-y-4">
                  <div className="text-gray-800 dark:text-white flex items-center gap-3">
                    <span className="font-medium">Part {part.id.toUpperCase()}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      [{part.marks} marks]
                    </span>
                    {reviewMode && userAnswer?.partMarks && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({userAnswer.partMarks[part.id] || 0}/{part.marks} marks awarded)
                      </span>
                    )}
                  </div>
                  <div className="text-gray-800 dark:text-white">
                    <InlineMath math={part.question} />
                  </div>
                  <div>
                    <textarea
                      value={partAnswers[part.id] || ''}
                      onChange={(e) => handlePartAnswerChange(part.id, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your answer..."
                      rows={3}
                      disabled={reviewMode}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Answer
              </label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your answer..."
                rows={3}
                disabled={reviewMode}
              />
            </>
          )}
        </div>

        {!reviewMode && (
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting || (isAnswerSubmitted && isTestMode)}
              className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center gap-2 ${getSubmitButtonStyle()}`}
            >
              {isSubmitting && <ReloadIcon className="w-4 h-4 animate-spin" />}
              <span>{isAnswerSubmitted ? 'Submitted' : 'Submit Answer'}</span>
            </button>
            {isTestMode && (
              <button
                type="button"
                onClick={isLastProblem ? onEndTest : onNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <span>{isLastProblem ? 'Finalise Test' : 'Next Problem'}</span>
                {!isLastProblem && <ArrowRightIcon className="w-5 h-5" />}
              </button>
            )}
            {!isTestMode && (
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
            )}
          </div>
        )}
      </form>

      {isCorrect !== null && !isTestMode && (
        <div className={`mb-6 p-4 rounded-md ${
          isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
        }`}>
          <div className="flex items-center">
            {isCorrect ? (
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <Cross2Icon className="w-5 h-5 text-red-500 mr-2" />
            )}
            <span className={
              isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
            }>
              {problem.type === 'written' && aiGrading 
                ? `Score: ${aiGrading.marks}/${problem.marks}`
                : isCorrect ? 'Correct!' : 'Incorrect. Try again!'
              }
            </span>
          </div>
        </div>
      )}

      {(showSolution || reviewMode) && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Solution</h3>
          <div className="prose dark:prose-invert">
            {problem.type === 'multiple-choice' ? (
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The correct answer is ({problem.solution})
              </p>
            ) : problem.parts ? (
              <div className="space-y-4">
                {problem.parts.map((part) => (
                  <div key={part.id}>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Part {part.id.toUpperCase()}
                    </h4>
                    <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {part.explanation}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4">
                <InlineMath math={problem.solution} />
              </div>
            )}
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{problem.explanation}</p>
          </div>
          {problem.videoUrl && (
            <div className="mt-6">
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-4"
              >
                <VideoIcon className="w-5 h-5 mr-2" />
                <span>{showVideo ? 'Hide Video' : 'Show Video Explanation'}</span>
              </button>
              {showVideo && <VideoPlayer src={problem.videoUrl} />}
            </div>
          )}
        </div>
      )}

      {showFormulaSheet && (
        <FormulaSheet onClose={() => setShowFormulaSheet(false)} />
      )}
    </div>
  );
}