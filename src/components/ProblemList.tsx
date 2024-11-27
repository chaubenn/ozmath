import React from 'react';
import { InlineMath } from 'react-katex';
import { CheckCircle2, Video } from 'lucide-react';
import type { Problem } from '../types/problem';

interface ProblemListProps {
  problems: readonly Problem[];
  onProblemSelect: (problem: Problem) => void;
}

export default function ProblemList({ problems, onProblemSelect }: ProblemListProps) {
  return (
    <div className="md:mt-12">
      <div className="grid gap-4">
        {problems.map((problem) => (
          <button
            key={problem.id}
            onClick={() => onProblemSelect(problem)}
            className="w-full text-left bg-white dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group relative overflow-hidden"
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                {problem.solved && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <h3 className="text-gray-900 dark:text-white font-medium truncate">
                    <InlineMath math={problem.title} />
                  </h3>
                  {/* Hide equation on mobile, show on desktop */}
                  {problem.equation && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate hidden md:block">
                      <InlineMath math={problem.equation} />
                    </p>
                  )}
                  {problem.videoUrl && (
                    <div className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                      <Video className="w-4 h-4" />
                      <span>Video solution</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                {problem.tags.map((tag) => {
                  // Define tag colors
                  const tagColors: Record<string, { bg: string; text: string }> = {
                    'TA': { 
                      bg: 'bg-blue-100 dark:bg-blue-900/20', 
                      text: 'text-blue-700 dark:text-blue-400' 
                    },
                    'TF': { 
                      bg: 'bg-green-100 dark:bg-green-900/20', 
                      text: 'text-green-700 dark:text-green-400' 
                    },
                    '2021': { 
                      bg: 'bg-purple-100 dark:bg-purple-900/20', 
                      text: 'text-purple-700 dark:text-purple-400' 
                    },
                    '2022': { 
                      bg: 'bg-orange-100 dark:bg-orange-900/20', 
                      text: 'text-orange-700 dark:text-orange-400' 
                    },
                    '2023': { 
                      bg: 'bg-pink-100 dark:bg-pink-900/20', 
                      text: 'text-pink-700 dark:text-pink-400' 
                    },
                    'MC': { 
                      bg: 'bg-yellow-100 dark:bg-yellow-900/20', 
                      text: 'text-yellow-700 dark:text-yellow-400' 
                    },
                    'Written': { 
                      bg: 'bg-cyan-100 dark:bg-cyan-900/20', 
                      text: 'text-cyan-700 dark:text-cyan-400' 
                    }
                  };

                  const { bg, text } = tagColors[tag] || {
                    bg: 'bg-gray-100 dark:bg-gray-700',
                    text: 'text-gray-700 dark:text-gray-400'
                  };

                  return (
                    <span 
                      key={tag}
                      className={`${bg} ${text} text-sm font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}