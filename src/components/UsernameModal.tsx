import React, { useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAuthStore } from '../stores/authStore';

interface UsernameModalProps {
  onClose: () => void;
}

export default function UsernameModal({ onClose }: UsernameModalProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { updateUsername } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    try {
      setError('');
      await updateUsername(username);
      onClose();
    } catch (error) {
      console.error('Error setting username:', error);
      setError(error instanceof Error ? error.message : 'Failed to set username');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <Cross2Icon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Choose a Username</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  minLength={3}
                  maxLength={8}
                  pattern="[a-zA-Z0-9_-]+"
                  title="Username can only contain letters, numbers, underscores, and hyphens"
                />
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}