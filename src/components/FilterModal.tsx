import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface FilterModalProps {
  filterTags: readonly string[];
  selectedTags: Set<string>;
  onTagSelect: (tag: string) => void;
  onClose: () => void;
}

export default function FilterModal({
  filterTags,
  selectedTags,
  onTagSelect,
  onClose
}: FilterModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Filter Problems
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagSelect(tag)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedTags.has(tag)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}