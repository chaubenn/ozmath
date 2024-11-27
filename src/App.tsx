import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MethodsApp from './pages/MethodsApp';
import SpecialistApp from './pages/SpecialistApp';
import TestResultsPage from './pages/TestResultsPage';
import PremiumPage from './pages/PremiumPage';
import SocialPage from './pages/SocialPage';
import UserProfilePage from './pages/UserProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import { ForegroundProvider } from './context/ForegroundContext';
import { AuthProvider } from './context/AuthContext';
import { useAuthStore } from './stores/authStore';
import { supabase } from './lib/supabase';
import { methodsProblems } from './data/problems';
import About from './components/About';
import Settings from './components/Settings';
import Foreground from './components/Foreground';
import FormulaSheet from './components/FormulaSheet';

export default function App() {
  const { setUser, setSession, fetchProfile } = useAuthStore();
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, fetchProfile]);

  return (
    <ThemeProvider>
      <ForegroundProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Background Layer */}
            <div className="fixed inset-0 z-0">
              <Foreground />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route 
                  path="/methods/*" 
                  element={
                    <MethodsApp 
                      problems={methodsProblems} 
                      onShowFormulaSheet={() => setShowFormulaSheet(true)} 
                    />
                  }
                >
                  <Route path="results" element={<TestResultsPage />} />
                  <Route path="about" element={<About />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/specialist/*" element={<SpecialistApp />} />
                <Route path="/premium" element={<PremiumPage />} />
                <Route path="/social" element={<SocialPage />} />
                <Route path="/social/profile/:userId" element={<UserProfilePage />} />
              </Routes>
            </div>

            {/* Modal Layer */}
            {showFormulaSheet && (
              <FormulaSheet onClose={() => setShowFormulaSheet(false)} />
            )}
          </div>
        </AuthProvider>
      </ForegroundProvider>
    </ThemeProvider>
  );
}