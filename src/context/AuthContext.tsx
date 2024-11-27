import React, { createContext, useContext, useState, useCallback } from 'react';
import AuthModal from '../components/AuthModal';
import UserSettingsModal from '../components/UserSettingsModal';

interface AuthContextType {
  showAuthModal: boolean;
  showUserSettings: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openUserSettings: () => void;
  closeUserSettings: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);

  const openAuthModal = useCallback(() => setShowAuthModal(true), []);
  const closeAuthModal = useCallback(() => setShowAuthModal(false), []);
  const openUserSettings = useCallback(() => setShowUserSettings(true), []);
  const closeUserSettings = useCallback(() => setShowUserSettings(false), []);

  return (
    <AuthContext.Provider 
      value={{ 
        showAuthModal, 
        showUserSettings,
        openAuthModal, 
        closeAuthModal,
        openUserSettings,
        closeUserSettings
      }}
    >
      {children}
      {showAuthModal && (
        <div className="fixed inset-0 z-50">
          <AuthModal onClose={closeAuthModal} />
        </div>
      )}
      {showUserSettings && (
        <div className="fixed inset-0 z-50">
          <UserSettingsModal onClose={closeUserSettings} />
        </div>
      )}
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