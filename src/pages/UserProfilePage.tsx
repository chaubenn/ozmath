import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserMinus, Crown, ClipboardList } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import TopBar from '../components/TopBar';
import TestReview from '../components/TestReview';
import ProblemView from '../components/ProblemView';
import type { Database } from '../types/supabase';
import type { Problem } from '../types/problem';

type TestResult = Database['public']['Tables']['test_results']['Row'];

interface UserProfile {
  id: string;
  username: string | null;
  subscription_tier?: 'free' | 'premium' | null;
  test_count?: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [showTestReview, setShowTestReview] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchTestResults();
      checkFriendship();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, username, subscription_tier')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    }
  };

  const fetchTestResults = async () => {
    try {
      const { data: results, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setTestResults(results || []);
    } catch (error) {
      console.error('Error fetching test results:', error);
      setError('Failed to load test results');
    } finally {
      setLoading(false);
    }
  };

  const checkFriendship = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('friendships')
        .select('status')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .eq('status', 'accepted')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setIsFriend(!!data);
    } catch (error) {
      console.error('Error checking friendship:', error);
    }
  };

  const handleRemoveFriend = async () => {
    if (!user || !userId) return;

    try {
      const { error } = await supabase
        .from('friendships')
        .delete()
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

      if (error) throw error;
      setIsFriend(false);
      navigate('/social');
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen">
        <TopBar 
          currentPage="social"
          onNavigate={(page) => {
            if (page === 'social') {
              return;
            }
            if (page === 'problems') {
              navigate('/methods');
            } else {
              navigate(`/methods/${page}`);
            }
          }}
          selectedTags={new Set()}
          onTagSelect={() => {}}
          searchQuery=""
          setSearchQuery={() => {}}
          filterTags={[]}
          onRandomProblem={() => {}}
          onStartTest={() => {}}
          onLogoClick={() => {}}
        />
        <main className="pt-24 px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-600 rounded" />
                          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
                        </div>
                        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen">
        <TopBar 
          currentPage="social"
          onNavigate={(page) => {
            if (page === 'social') {
              return;
            }
            if (page === 'problems') {
              navigate('/methods');
            } else {
              navigate(`/methods/${page}`);
            }
          }}
          selectedTags={new Set()}
          onTagSelect={() => {}}
          searchQuery=""
          setSearchQuery={() => {}}
          filterTags={[]}
          onRandomProblem={() => {}}
          onStartTest={() => {}}
          onLogoClick={() => {}}
        />
        <main className="pt-24 px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
              {error || 'Failed to load profile'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!testResults.length) {
    return (
      <div className="min-h-screen">
        <TopBar 
          currentPage="social"
          onNavigate={(page) => {
            if (page === 'social') {
              return;
            }
            if (page === 'problems') {
              navigate('/methods');
            } else {
              navigate(`/methods/${page}`);
            }
          }}
          selectedTags={new Set()}
          onTagSelect={() => {}}
          searchQuery=""
          setSearchQuery={() => {}}
          filterTags={[]}
          onRandomProblem={() => {}}
          onStartTest={() => {}}
          onLogoClick={() => {}}
        />
        <main className="pt-24 px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/social')}
              className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Social</span>
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <ClipboardList className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  No Tests Completed
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.username} hasn't completed any tests yet.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (selectedProblem && selectedTest !== null) {
    return (
      <div className="min-h-screen">
        <TopBar 
          currentPage="social"
          onNavigate={(page) => {
            if (page === 'social') {
              return;
            }
            if (page === 'problems') {
              navigate('/methods');
            } else {
              navigate(`/methods/${page}`);
            }
          }}
          selectedTags={new Set()}
          onTagSelect={() => {}}
          searchQuery=""
          setSearchQuery={() => {}}
          filterTags={[]}
          onRandomProblem={() => {}}
          onStartTest={() => {}}
          onLogoClick={() => {}}
        />
        <main className="pt-24 px-8 pb-12">
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
    <div className="min-h-screen">
      <TopBar 
        currentPage="social"
        onNavigate={(page) => {
          if (page === 'social') {
            return;
          }
          if (page === 'problems') {
            navigate('/methods');
          } else {
            navigate(`/methods/${page}`);
          }
        }}
        selectedTags={new Set()}
        onTagSelect={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
        filterTags={[]}
        onRandomProblem={() => {}}
        onStartTest={() => {}}
        onLogoClick={() => {}}
      />
      <main className="pt-24 px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/social')}
            className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Social</span>
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile?.username}'s Profile
                  </h1>
                  {profile?.subscription_tier === 'premium' && (
                    <Crown className="w-6 h-6 text-amber-500" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {testResults.length} tests completed
                </p>
              </div>
              {isFriend && (
                <button
                  onClick={handleRemoveFriend}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <UserMinus className="w-5 h-5" />
                  <span>Remove Friend</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Test History
              </h2>
              {testResults.map((result, index) => {
                const percentage = Math.round((result.total_marks / result.max_marks) * 100);
                const date = formatDate(result.completed_at);
                const time = formatTime(result.completed_at);
                
                return (
                  <div
                    key={result.id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          {result.title || `Test ${date}`}
                        </h3>
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
                        <button
                          onClick={() => {
                            setSelectedTest(index);
                            setShowTestReview(true);
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {selectedTest !== null && testResults[selectedTest] && showTestReview && (
        <TestReview
          problems={testResults[selectedTest].problems}
          answers={testResults[selectedTest].answers}
          onProblemSelect={handleProblemSelect}
          onClose={handleCloseTestResults}
        />
      )}
    </div>
  );
}
