import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { useAuth } from '../context/AuthContext';
import { PersonIcon } from '@radix-ui/react-icons';
import { User } from 'lucide-react';

export default function UserMenu() {
  const { user, profile } = useAuthStore();
  const { openAuthModal, openUserSettings } = useAuth();

  if (!user) {
    return (
      <button
        onClick={openAuthModal}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <PersonIcon className="w-5 h-5" />
        <span>Sign In</span>
      </button>
    );
  }

  return (
    <button
      onClick={openUserSettings}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      <span className="text-gray-800 dark:text-white font-medium">
        {profile?.username || 'User'}
      </span>
    </button>
  );
}