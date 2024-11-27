import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import TestReview from '../components/TestReview';
import ProblemView from '../components/ProblemView';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ResultsPlaceholder from '../components/ResultsPlaceholder';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import type { Database } from '../types/supabase';

type TestResult = Database['public']['Tables']['test_results']['Row'];
type Problem = TestResult['problems'][number];

const TestResultsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { testResults, loading, error, fetchTestResults, deleteTestResult, updateTestTitle } = useProgressStore();
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [showTestReview, setShowTestReview] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchTestResults();
    }
  }, [user, fetchTestResults]);

  const handleCloseTestResults = () => {
    setSelectedTest(null);
    setShowTestReview(false);
    setSelectedProblem(null);
  };

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
    setShowTestReview(false);
  };

  const handleBackToReview = () => {
    setSelectedProblem(null);
    setShowTestReview(true);
  };

  const handleStartTitleEdit = (id: string, currentTitle: string | null) => {
    setEditingTitle(id);
    setNewTitle(currentTitle || '');
  };

  const handleTitleSubmit = async (id: string) => {
    try {
      await updateTestTitle(id, newTitle);
      setEditingTitle(null);
    } catch (error) {
      console.error('Failed to update title:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    
    try {
      await deleteTestResult(deleteConfirm.id);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete test:', error);
    }
  };

  if (!user) {
    return <ResultsPlaceholder />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (selectedProblem && selectedTest !== null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <ProblemView
              problem={selectedProblem}
              onBack={handleBackToReview}
              reviewMode={true}
              userAnswer={testResults[selectedTest].answers[selectedProblem.id]}
              onShowFormulaSheet={() => {}}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Past Test Results</h1>
      
      {loading ? (
        <div className="text-gray-600 dark:text-gray-400">Loading test results...</div>
      ) : testResults.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-400">No tests completed yet.</div>
      ) : (
        <div className="space-y-4">
          {testResults.map((result: TestResult, index) => {
            const percentage = Math.round((result.total_marks / result.max_marks) * 100);
            const date = new Date(result.completed_at).toLocaleDateString();
            const time = new Date(result.completed_at).toLocaleTimeString();
            
            return (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-grow">
                    {editingTitle === result.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleTitleSubmit(result.id);
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTitle(null)}
                          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="text-gray-800 dark:text-white font-medium">
                          {result.title || `Test ${date}`}
                        </h3>
                        <button
                          onClick={() => handleStartTitleEdit(result.id, result.title)}
                          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                          title="Rename test"
                        >
                          <Pencil1Icon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {date} at {time}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Score: {result.total_marks}/{result.max_marks}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {percentage}%
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTest(index);
                          setShowTestReview(true);
                        }}
                        className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({
                          id: result.id,
                          title: result.title || `Test ${date}`
                        })}
                        className="p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete test"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTest !== null && testResults[selectedTest] && showTestReview && (
        <TestReview
          problems={testResults[selectedTest].problems}
          answers={testResults[selectedTest].answers}
          onProblemSelect={handleProblemSelect}
          onClose={handleCloseTestResults}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirmModal
          testTitle={deleteConfirm.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

export default TestResultsPage;