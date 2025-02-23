import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ProblemList from '../components/ProblemList';
import ProblemView from '../components/ProblemView';
import TestResults from '../components/TestResults';
import TestReview from '../components/TestReview';
import TestNavigation from '../components/TestNavigation';
import { useProgressStore } from '../stores/progressStore';
import { Problem, TestAnswer } from '../types/problem';
import { filterTags, typeTags, formatTags, yearTags } from '../data/tags';
import { methodsProblems } from '../data/problems';

interface MethodsAppProps {
  onShowFormulaSheet: () => void;
}

const MethodsApp: React.FC<MethodsAppProps> = ({ onShowFormulaSheet }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(['All']));
  const [currentPage, setCurrentPage] = useState<'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans'>('problems');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);
  const [testAnswers, setTestAnswers] = useState<Record<number, TestAnswer>>({});
  const [showTestResults, setShowTestResults] = useState(false);
  const [showTestReview, setShowTestReview] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  const { saveTestResult } = useProgressStore();

  // Update currentPage based on location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/methods') {
      setCurrentPage('problems');
    } else if (path === '/methods/settings') {
      setCurrentPage('settings');
    } else if (path === '/methods/about') {
      setCurrentPage('about');
    } else if (path === '/methods/results') {
      setCurrentPage('results');
    } else if (path === '/social') {
      setCurrentPage('social');
    } else if (path === '/premium') {
      setCurrentPage('plans');
    }
  }, [location]);

  const resetProblemsState = () => {
    setSelectedProblem(null);
    setIsTestMode(false);
    setTestAnswers({});
    setShowTestResults(false);
    setShowTestReview(false);
    setCurrentTestIndex(0);
    setReviewMode(false);
    setSearchQuery('');
    setSelectedTags(new Set(['All']));
  };

  const handlePageChange = (page: 'problems' | 'settings' | 'about' | 'results' | 'social' | 'plans') => {
    setCurrentPage(page);
    if (page === 'problems') {
      resetProblemsState();
      navigate('/methods');
    } else if (page === 'social') {
      navigate('/social');
    } else if (page === 'plans') {
      navigate('/premium');
    } else {
      navigate(`/methods/${page}`);
    }
  };

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
      if (typeTags.includes(tag as typeof typeTags[number])) {
        typeTags.forEach(typeTag => newTags.delete(typeTag));
      }
      if (formatTags.includes(tag as typeof formatTags[number])) {
        formatTags.forEach(formatTag => newTags.delete(formatTag));
      }
      newTags.add(tag);
    }

    setSelectedTags(newTags);
  };

  const filterProblems = (problem: Problem) => {
    // First check tags if not "All"
    if (!selectedTags.has('All')) {
      const selectedTypes = Array.from(selectedTags).filter(tag => typeTags.includes(tag as typeof typeTags[number]));
      const selectedYears = Array.from(selectedTags).filter(tag => yearTags.includes(tag as typeof yearTags[number]));
      const selectedFormats = Array.from(selectedTags).filter(tag => formatTags.includes(tag as typeof formatTags[number]));

      const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => problem.tags.includes(type));
      const matchesYear = selectedYears.length === 0 || selectedYears.some(year => problem.tags.includes(year));
      const matchesFormat = selectedFormats.length === 0 || selectedFormats.some(format => problem.tags.includes(format));

      if (!matchesType || !matchesYear || !matchesFormat) {
        return false;
      }
    }

    // Then check search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      // Check equation text first
      if (problem.equation && problem.equation.toLowerCase().includes(query)) {
        return true;
      }
      
      // Then check title
      if (problem.title.toLowerCase().includes(query)) {
        return true;
      }
      
      // Finally check tags
      if (problem.tags.some(tag => tag.toLowerCase().includes(query))) {
        return true;
      }
      
      return false;
    }

    return true;
  };

  const handleRandomProblem = () => {
    const filteredProblems = methodsProblems.filter(filterProblems);
    if (filteredProblems.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredProblems.length);
      setSelectedProblem(filteredProblems[randomIndex]);
    }
  };

  const handleStartTest = () => {
    setIsTestMode(true);
    setTestAnswers({});
    setCurrentTestIndex(0);
    setReviewMode(false);
    const filteredProblems = methodsProblems.filter(filterProblems);
    if (filteredProblems.length > 0) {
      setSelectedProblem(filteredProblems[0]);
    }
  };

  const handleTestAnswer = (answer: string, marks?: number, partMarks?: Record<string, number>) => {
    if (!selectedProblem) return;
    
    setTestAnswers(prev => ({
      ...prev,
      [selectedProblem.id]: { answer, marks, partMarks }
    }));
  };

  const handleNextTestProblem = () => {
    const filteredProblems = methodsProblems.filter(filterProblems);
    if (currentTestIndex < filteredProblems.length - 1) {
      setCurrentTestIndex(prev => prev + 1);
      setSelectedProblem(filteredProblems[currentTestIndex + 1]);
    }
  };

  const handleNavigateTest = (index: number) => {
    const filteredProblems = methodsProblems.filter(filterProblems);
    setCurrentTestIndex(index);
    setSelectedProblem(filteredProblems[index]);
  };

  const handleEndTest = async () => {
    const results = getTestResults();
    const selectedProblems = methodsProblems.filter(filterProblems);
    
    try {
      await saveTestResult({
        total_marks: results.totalMarks,
        max_marks: results.maxMarks,
        completed_at: new Date().toISOString(),
        answers: testAnswers,
        problems: selectedProblems.map(problem => ({
          id: problem.id,
          title: problem.title,
          tags: [...problem.tags],
          type: problem.type,
          equation: problem.equation,
          choices: problem.choices,
          solution: problem.solution,
          explanation: problem.explanation,
          marks: problem.marks,
          parts: problem.parts
        }))
      });
    } catch (error) {
      console.error('Error saving test results:', error);
    }

    setIsTestMode(false);
    setShowTestResults(false);
    setShowTestReview(false);
    setSelectedProblem(null);
    setCurrentTestIndex(0);
    setTestAnswers({});
    setReviewMode(false);
  };

  const handleViewReview = () => {
    setShowTestResults(false);
    setShowTestReview(true);
  };

  const handleReviewProblemSelect = (problem: Problem) => {
    setShowTestReview(false);
    setReviewMode(true);
    setSelectedProblem(problem);
    const filteredProblems = methodsProblems.filter(filterProblems);
    setCurrentTestIndex(filteredProblems.findIndex(p => p.id === problem.id));
  };

  const getTestResults = () => {
    const filteredProblems = methodsProblems.filter(filterProblems);
    let totalMarks = 0;
    let maxMarks = 0;

    filteredProblems.forEach(problem => {
      const userAnswer = testAnswers[problem.id];
      if (problem.type === 'written') {
        if (userAnswer?.marks !== undefined) {
          totalMarks += userAnswer.marks;
        }
        maxMarks += problem.marks || 0;
      } else {
        if (userAnswer?.answer === problem.solution) {
          totalMarks += 1;
        }
        maxMarks += 1;
      }
    });

    return {
      totalMarks,
      maxMarks
    };
  };

  const handleNextProblem = () => {
    if (!selectedProblem) return;
    
    const filteredProblems = methodsProblems.filter(filterProblems);
    const currentIndex = filteredProblems.findIndex(p => p.id === selectedProblem.id);
    if (currentIndex < filteredProblems.length - 1) {
      setSelectedProblem(filteredProblems[currentIndex + 1]);
    }
  };

  const filteredProblems = methodsProblems.filter(filterProblems);
  const hasNextProblem = selectedProblem && 
    filteredProblems.findIndex(p => p.id === selectedProblem.id) < filteredProblems.length - 1;

  return (
    <div className="min-h-screen">
      <TopBar 
        currentPage={currentPage} 
        onNavigate={handlePageChange}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterTags={filterTags}
        onRandomProblem={handleRandomProblem}
        onStartTest={handleStartTest}
        onLogoClick={resetProblemsState}
        isTestMode={isTestMode}
      />
      <main className="pt-24 px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {location.pathname === '/methods' ? (
            selectedProblem ? (
              <>
                <ProblemView 
                  problem={selectedProblem}
                  onBack={() => {
                    if (isTestMode) {
                      setShowTestResults(true);
                    } else if (reviewMode) {
                      setShowTestReview(true);
                    } else {
                      setSelectedProblem(null);
                    }
                  }}
                  onNext={isTestMode ? handleNextTestProblem : handleNextProblem}
                  hasNext={!isTestMode && hasNextProblem}
                  isTestMode={isTestMode}
                  onTestAnswer={handleTestAnswer}
                  currentProblem={currentTestIndex + 1}
                  totalProblems={filteredProblems.length}
                  reviewMode={reviewMode}
                  userAnswer={testAnswers[selectedProblem.id]}
                  onEndTest={() => setShowTestResults(true)}
                  onShowFormulaSheet={onShowFormulaSheet}
                />
                {(isTestMode || reviewMode) && selectedProblem && (
                  <TestNavigation
                    currentProblem={currentTestIndex + 1}
                    totalProblems={filteredProblems.length}
                    answers={testAnswers}
                    problemIds={filteredProblems.map(p => p.id)}
                    onNavigate={handleNavigateTest}
                    onEndTest={() => setShowTestResults(true)}
                    reviewMode={reviewMode}
                    onViewReview={() => setShowTestReview(true)}
                  />
                )}
              </>
            ) : (
              <ProblemList 
                problems={filteredProblems}
                onProblemSelect={setSelectedProblem}
              />
            )
          ) : (
            <Outlet />
          )}
        </div>
      </main>

      {showTestResults && (
        <TestResults
          {...getTestResults()}
          onClose={handleEndTest}
          onViewReview={handleViewReview}
        />
      )}

      {showTestReview && (
        <TestReview
          problems={filteredProblems}
          answers={testAnswers}
          onProblemSelect={handleReviewProblemSelect}
          onClose={handleEndTest}
        />
      )}
    </div>
  );
};

export default MethodsApp;