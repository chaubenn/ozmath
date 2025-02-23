import React, { useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import LandingPage from './pages/LandingPage';
import MethodsApp from './pages/MethodsApp';
import SpecialistApp from './pages/SpecialistApp';
import TestResultsPage from './pages/TestResultsPage';
import PremiumPage from './pages/PremiumPage';
import PremiumHub from './pages/PremiumHub';
import SocialPage from './pages/SocialPage';
import UserProfilePage from './pages/UserProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import { ForegroundProvider } from './context/ForegroundContext';
import { AuthProvider } from './context/AuthContext';
import { useAuthStore } from './stores/authStore';
import { useSubscriptionStore } from './stores/subscriptionStore';
import { supabase } from './lib/supabase';
import { methodsProblems } from './data/problems';
import About from './components/About';
import Settings from './components/Settings';
import Foreground from './components/Foreground';
import FormulaSheet from './components/FormulaSheet';

function App() {
  const { setUser, setSession, fetchProfile } = useAuthStore();
  const { checkSubscriptionStatus } = useSubscriptionStore();
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  const location = useLocation();
  const nodeRef = useRef(null);

  // Only animate between landing and exact methods page
  const shouldAnimate = location.pathname === '/' || 
    (location.pathname === '/methods' && !location.search && !location.hash);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile();
        checkSubscriptionStatus();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile();
        checkSubscriptionStatus();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, fetchProfile, checkSubscriptionStatus]);

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
              {shouldAnimate ? (
                <SwitchTransition mode="out-in">
                  <CSSTransition
                    key={location.pathname}
                    nodeRef={nodeRef}
                    timeout={75}
                    classNames="page"
                  >
                    <div ref={nodeRef}>
                      <Routes location={location}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/methods" element={<MethodsApp problems={methodsProblems} onShowFormulaSheet={() => setShowFormulaSheet(true)} />} />
                      </Routes>
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              ) : (
                <Routes location={location}>
                  <Route path="/methods/*" element={<MethodsApp problems={methodsProblems} onShowFormulaSheet={() => setShowFormulaSheet(true)} />}>
                    <Route path="results" element={<TestResultsPage />} />
                    <Route path="about" element={<About />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                  <Route path="/specialist/*" element={<SpecialistApp />} />
                  <Route path="/premium" element={<PremiumPage />} />
                  <Route path="/premium-hub" element={<PremiumHub />} />
                  <Route path="/social" element={<SocialPage />} />
                  <Route path="/social/profile/:userId" element={<UserProfilePage />} />
                </Routes>
              )}
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

export default App;
