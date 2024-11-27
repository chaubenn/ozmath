import React, { createContext, useContext, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import AuthModal from '../components/AuthModal';

interface AuthContextType {
  showAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <AuthContext.Provider value={{ showAuthModal, openAuthModal, closeAuthModal }}>
      {children}
      {showAuthModal && <AuthModal onClose={closeAuthModal} />}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}