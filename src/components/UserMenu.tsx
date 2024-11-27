import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useAuth } from '../context/AuthContext';
import { PersonIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { User } from 'lucide-react';

export default function UserMenu() {
  const { user, profile, signOut, updateUsername } = useAuthStore();
  const { openAuthModal } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = newUsername.toLowerCase().trim();
    if (!username) return;
    
    if (!/^[a-z0-9_-]+$/.test(username)) {
      setError('Username can only contain lowercase letters, numbers, underscores, and hyphens');
      return;
    }
    
    if (username.length < 3 || username.length > 20) {
      setError('Username must be between 3 and 20 characters');
      return;
    }
    
    try {
      setError('');
      await updateUsername(username);
      setIsEditingUsername(false);
      setNewUsername('');
      setShowDropdown(false);
    } catch (error) {
      console.error('Error updating username:', error);
      setError(error instanceof Error ? error.message : 'Failed to update username');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowDropdown(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {!user ? (
        <button
          onClick={openAuthModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PersonIcon className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-white font-medium">
              {profile?.username || 'User'}
            </span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
              {isEditingUsername ? (
                <form onSubmit={handleUsernameSubmit} className="p-3">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value.toLowerCase())}
                      placeholder="Enter new username"
                      className="w-full px-3 py-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                      minLength={3}
                      maxLength={20}
                      pattern="[a-z0-9_-]+"
                      title="Username can only contain lowercase letters, numbers, underscores, and hyphens"
                    />
                    {error && (
                      <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingUsername(false);
                          setError('');
                        }}
                        className="flex-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditingUsername(true)}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Pencil1Icon className="w-4 h-4" />
                    <span>Edit Username</span>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}