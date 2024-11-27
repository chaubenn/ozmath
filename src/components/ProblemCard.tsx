import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface Problem {
  id: number;
  title: string;
  tags: readonly string[];
  type?: 'multiple-choice';
  equation?: string;
  solution: string;
  explanation: string;
  videoUrl: string;
  solved: boolean;
}

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

const tagColors: Record<string, string> = {
  'TA': 'text-blue-500',
  'TF': 'text-green-500',
  '2021': 'text-purple-500',
  '2022': 'text-orange-500',
  '2023': 'text-pink-500',
  'MC': 'text-yellow-500',
  'Written': 'text-cyan-500'
};

export default function ProblemCard({ problem, onClick }: ProblemCardProps) {
  const { title, tags, solved } = problem;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        {solved && (
          <span className="text-green-500 flex-shrink-0">✓</span>
        )}
        <h3 className="text-gray-800 dark:text-white">
          <InlineMath math={title} />
        </h3>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className={`${tagColors[tag] || 'text-gray-500'} font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}