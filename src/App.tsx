import React from 'react';
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
import { supabase } from './lib/supabase';
import { useAuthStore } from './stores/authStore';
import { methodsProblems } from './data/problems';
import About from './components/About';
import Settings from './components/Settings';
import Layout from './components/Layout';

export default function App() {
  const { setUser, setSession, fetchProfile } = useAuthStore();

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
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/methods/*" element={<MethodsApp problems={methodsProblems} />}>
                <Route path="results" element={<TestResultsPage />} />
                <Route path="about" element={<About />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/specialist/*" element={<SpecialistApp />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/social" element={<SocialPage />} />
              <Route path="/social/profile/:userId" element={<UserProfilePage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ForegroundProvider>
    </ThemeProvider>
  );
}