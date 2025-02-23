import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useAuth } from '../context/AuthContext';
import { PersonIcon } from '@radix-ui/react-icons';
import { User, Crown } from 'lucide-react';
import { useSubscriptionStore } from '../stores/subscriptionStore';

export default function UserMenu() {
  const { user, profile, signOut } = useAuthStore();
  const { openAuthModal, openUserSettings } = useAuth();
  const { isPremium } = useSubscriptionStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <button
        onClick={openAuthModal}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <PersonIcon className="w-5 h-5" />
        <span>Sign In</span>
      </button>
    );
  }

  return (
    <button
      onClick={openUserSettings}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
    >
      <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      <span className="text-gray-800 dark:text-white font-medium">
        {profile?.username || 'User'}
      </span>
      {isPremium && (
        <Crown className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
      )}
    </button>
  );
}
