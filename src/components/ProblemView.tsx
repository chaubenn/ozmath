import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, VideoIcon, CheckIcon, Cross2Icon, BookmarkIcon, ArrowRightIcon, ReloadIcon } from '@radix-ui/react-icons';
import { AlertCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import VideoPlayer from './VideoPlayer';
import { gradeAnswer } from '../services/openai';
import type { Problem, TestAnswer } from '../types/problem';
import MathInput from './MathInput';

interface RateLimitError {
  message: string;
  isRateLimit: boolean;
}

interface ProblemViewProps {
  problem: Problem;
  onBack: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  isTestMode?: boolean;
  onTestAnswer?: (answer: string, marks?: number, partMarks?: Record<string, number>, writtenAnswers?: Record<string, string>) => void;
  currentProblem?: number;
  totalProblems?: number;
  reviewMode?: boolean;
  userAnswer?: TestAnswer;
  onEndTest?: () => void;
  onShowFormulaSheet: () => void;
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
  onEndTest,
  onShowFormulaSheet
}: ProblemViewProps) {
  const [answer, setAnswer] = useState(userAnswer?.answer || '');
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [error, setError] = useState<RateLimitError | null>(null);
  const [aiGrading, setAiGrading] = useState<{
    marks: number;
    partMarks?: Record<string, number>;
  } | null>(null);
  const [partAnswers, setPartAnswers] = useState<Record<string, string>>({});

  // Reset states when problem changes
  useEffect(() => {
    setAnswer('');
    setShowSolution(false);
    setIsCorrect(null);
    setShowVideo(false);
    setIsSubmitting(false);
    setIsAnswerSubmitted(false);
    setError(null);
    setAiGrading(null);
    setPartAnswers({});
  }, [problem.id]);

  // Parse written answers from userAnswer if in review mode
  const writtenAnswers = React.useMemo(() => {
    if (!userAnswer?.answer) return null;
    try {
      return JSON.parse(userAnswer.answer);
    } catch {
      return { main: userAnswer.answer };
    }
  }, [userAnswer]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (isTestMode && onTestAnswer) {
      setIsSubmitting(true);
      try {
        if (problem.type === 'written') {
          let totalMarks = 0;
          const partMarks: Record<string, number> = {};
          const writtenAnswers: Record<string, string> = {};

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
                writtenAnswers[part.id] = partAnswers[part.id] || '';
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
              writtenAnswers['main'] = answer;
            } catch (error) {
              if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
                setError({ message: error.message, isRateLimit: true });
                return;
              }
              throw error;
            }
          }
          onTestAnswer(
            problem.parts ? JSON.stringify(writtenAnswers) : answer,
            totalMarks,
            partMarks,
            writtenAnswers
          );
        } else {
          onTestAnswer(answer);
        }
      } catch (error) {
        console.error('Error grading answer:', error);
        onTestAnswer(
          problem.parts ? JSON.stringify(partAnswers) : answer,
          0,
          undefined,
          problem.parts ? partAnswers : { main: answer }
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

  const getSubmitButtonStyle = () => {
    if (isSubmitting) {
      return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-wait";
    }
    if (isAnswerSubmitted) {
      return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-default";
    }
    return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600";
  };

  const isLastProblem = currentProblem === totalProblems;

  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8 ${
      isTestMode || reviewMode ? 'mt-0' : 'mt-4 md:mt-12'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              <InlineMath math={problem.title} />
            </h2>
            {(isTestMode || reviewMode) && totalProblems && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Problem {currentProblem} of {totalProblems}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onShowFormulaSheet}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors text-sm md:text-base"
          >
            <BookmarkIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Formula Sheet</span>
          </button>
          {hasNext && !isTestMode && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors text-sm md:text-base"
            >
              <span className="hidden md:inline">Next Problem</span>
              <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-8">
        {problem.equation && (
          <div className="text-lg md:text-xl text-gray-800 dark:text-white mb-4 overflow-x-auto">
            <div className="whitespace-nowrap">
              <InlineMath math={problem.equation} />
            </div>
          </div>
        )}
        {problem.pdfUrl && (
          <div className="flex justify-center">
            <div className="w-full md:w-[600px] h-[300px] md:h-[400px] rounded-lg overflow-hidden">
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
                Please try again in an hour or upgrade your user plan.
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
                  <div className="overflow-x-auto flex-1">
                    <div className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      ({choice.id}) <InlineMath math={choice.text} />
                    </div>
                  </div>
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
          ) : (
            <div className="space-y-6">
              {problem.parts ? (
                problem.parts.map((part) => (
                  <div key={part.id} className="space-y-4">
                    <div className="text-gray-800 dark:text-white">
                      <div className="flex items-center gap-3 mb-2">
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
                      <div className="mb-4 overflow-x-auto">
                        <div className="whitespace-nowrap">
                          <InlineMath math={part.question} />
                        </div>
                      </div>
                    </div>
                    
                    {reviewMode ? (
                      writtenAnswers && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Answer:
                          </p>
                          <div className="text-gray-600 dark:text-gray-400">
                            {writtenAnswers[part.id] ? (
                              <InlineMath math={writtenAnswers[part.id]} />
                            ) : (
                              'No answer provided'
                            )}
                          </div>
                        </div>
                      )
                    ) : (
                      <MathInput
                        value={partAnswers[part.id] || ''}
                        onChange={(latex) => handlePartAnswerChange(part.id, latex)}
                        placeholder="Enter your answer..."
                        className="w-full"
                      />
                    )}
                  </div>
                ))
              ) : (
                <>
                  {!reviewMode ? (
                    <MathInput
                      value={answer}
                      onChange={handleAnswerChange}
                      placeholder="Enter your answer..."
                      className="w-full"
                    />
                  ) : writtenAnswers && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Answer:
                      </p>
                      <div className="text-gray-600 dark:text-gray-400">
                        <InlineMath math={writtenAnswers.main || ''} />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {!reviewMode && (
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={isSubmitting || (isAnswerSubmitted && isTestMode)}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors flex items-center gap-2 ${getSubmitButtonStyle()}`}
            >
              {isSubmitting && <ReloadIcon className="w-4 h-4 animate-spin" />}
              <span>{isAnswerSubmitted ? 'Submitted' : 'Submit Answer'}</span>
            </button>
            {isTestMode && (
              <button
                type="button"
                onClick={isLastProblem ? onEndTest : onNext}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <span>{isLastProblem ? 'Finalise Test' : 'Next Problem'}</span>
                {!isLastProblem && <ArrowRightIcon className="w-5 h-5" />}
              </button>
            )}
            {!isTestMode && (
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
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
                    <div className="overflow-x-auto">
                      <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                        {part.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto mb-4">
                  <div className="whitespace-nowrap">
                    <InlineMath math={problem.solution} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {problem.explanation}
                  </div>
                </div>
              </>
            )}
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
    </div>
  );
}
