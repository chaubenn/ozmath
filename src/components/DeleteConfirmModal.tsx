import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  testTitle: string;
}

export default function DeleteConfirmModal({ onConfirm, onCancel, testTitle }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onCancel} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="absolute top-4 right-4">
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
              <Cross2Icon className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Delete Test Result
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete "{testTitle}"? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}