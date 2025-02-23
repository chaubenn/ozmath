import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shuffle, Crown } from 'lucide-react';
import { useSubscriptionStore } from '../stores/subscriptionStore';
import TopBar from '../components/TopBar';
import ProblemList from '../components/ProblemList';
import ProblemView from '../components/ProblemView';
import { Problem } from '../types/problem';
import { premiumProblems } from '../data/premiumProblems';

const premiumFilterTags = ['All', 'TA', 'TF', 'CU'] as const;

export default function PremiumHub() {
  const navigate = useNavigate();
  const { isPremium } = useSubscriptionStore();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(['All']));
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect non-premium users
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Premium Access Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This section is exclusively available to premium users. Upgrade your account to access premium features.
          </p>
          <button
            onClick={() => navigate('/premium')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-colors"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  }

  const handleTagSelect = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (tag === 'All') {
      setSelectedTags(new Set(['All']));
      return;
    }
    
    newTags.delete('All');

    if (newTags.has(tag)) {
      newTags.delete(tag);
      if (newTags.size === 0) {
        newTags.add('All');
      }
    } else {
      newTags.add(tag);
    }

    setSelectedTags(newTags);
  };

  const filterProblems = (problem: Problem) => {
    // First check tags if not "All"
    if (!selectedTags.has('All')) {
      const matchesTag = Array.from(selectedTags).some(tag => problem.tags.includes(tag));
      if (!matchesTag) return false;
    }

    // Then check search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      if (problem.equation && problem.equation.toLowerCase().includes(query)) {
        return true;
      }
      
      if (problem.title.toLowerCase().includes(query)) {
        return true;
      }
      
      if (problem.tags.some(tag => tag.toLowerCase().includes(query))) {
        return true;
      }
      
      return false;
    }

    return true;
  };

  const handleRandomProblem = () => {
    const filteredProblems = premiumProblems.filter(filterProblems);
    if (filteredProblems.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredProblems.length);
      setSelectedProblem(filteredProblems[randomIndex]);
    }
  };

  const handleNextProblem = () => {
    if (!selectedProblem) return;
    
    const filteredProblems = premiumProblems.filter(filterProblems);
    const currentIndex = filteredProblems.findIndex(p => p.id === selectedProblem.id);
    if (currentIndex < filteredProblems.length - 1) {
      setSelectedProblem(filteredProblems[currentIndex + 1]);
    }
  };

  const filteredProblems = premiumProblems.filter(filterProblems);
  const hasNextProblem = selectedProblem && 
    filteredProblems.findIndex(p => p.id === selectedProblem.id) < filteredProblems.length - 1;

  return (
    <div className="min-h-screen">
      <TopBar 
        currentPage="premium"
        onNavigate={(page) => {
          if (page === 'problems') {
            navigate('/methods');
          } else {
            navigate(`/methods/${page}`);
          }
        }}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterTags={premiumFilterTags}
        onRandomProblem={handleRandomProblem}
        onStartTest={() => {}}
        onLogoClick={() => setSelectedProblem(null)}
        isPremiumHub={true}
      />
      <main className="pt-24 px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {selectedProblem ? (
            <ProblemView 
              problem={selectedProblem}
              onBack={() => setSelectedProblem(null)}
              onNext={handleNextProblem}
              hasNext={hasNextProblem}
              onShowFormulaSheet={() => {}}
            />
          ) : (
            <ProblemList 
              problems={filteredProblems}
              onProblemSelect={setSelectedProblem}
            />
          )}
        </div>
      </main>
    </div>
  );
}
