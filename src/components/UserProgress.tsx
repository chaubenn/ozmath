import React, { useEffect } from 'react';
import { useProgressStore } from '../stores/progressStore';

export default function UserProgress() {
  const { testResults, loading, fetchTestResults } = useProgressStore();

  useEffect(() => {
    fetchTestResults();
  }, [fetchTestResults]);

  if (loading) {
    return <div>Loading progress...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Progress</h2>
      
      {testResults.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No tests completed yet.</p>
      ) : (
        <div className="space-y-4">
          {testResults.map((result) => (
            <div 
              key={result.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    Score: {result.total_marks}/{result.max_marks}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(result.completed_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-2xl font-bold text-indigo-600">
                  {Math.round((result.total_marks / result.max_marks) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}