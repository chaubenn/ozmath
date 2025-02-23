import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cross2Icon } from '@radix-ui/react-icons';
import { LogOut, Pencil, Activity } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useAuth } from '../context/AuthContext';
import { getRateLimitInfo } from '../services/rateLimit';

interface UserSettingsModalProps {
  onClose: () => void;
}

export default function UserSettingsModal({ onClose }: UserSettingsModalProps) {
  const { profile, signOut, updateUsername } = useAuthStore();
  const { closeUserSettings } = useAuth();
  const navigate = useNavigate();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(profile?.username || '');
  const [error, setError] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number;
    total: number;
    nextReset: Date;
  } | null>(null);

  useEffect(() => {
    const fetchRateLimitInfo = async () => {
      const info = await getRateLimitInfo();
      setRateLimitInfo(info);
    };
    fetchRateLimitInfo();
  }, []);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = newUsername.toLowerCase().trim();
    if (!username) return;
    
    if (!/^[a-z0-9_-]+$/.test(username)) {
      setError('Username can only contain lowercase letters, numbers, underscores, and hyphens');
      return;
    }
    
    if (username.length < 3 || username.length > 8) {
      setError('Username must be between 3 and 8 characters');
      return;
    }
    
    try {
      setError('');
      await updateUsername(username);
      setIsEditingUsername(false);
    } catch (error) {
      console.error('Error updating username:', error);
      setError(error instanceof Error ? error.message : 'Failed to update username');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(navigate);
      closeUserSettings();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Cross2Icon className="h-6 w-6" />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                User Settings
              </h2>

              <div className="space-y-6">
                {isEditingUsername ? (
                  <form onSubmit={handleUsernameSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        New Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value.toLowerCase())}
                        placeholder="Enter new username"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                        minLength={3}
                        maxLength={8}
                        pattern="[a-z0-9_-]+"
                        title="Username can only contain lowercase letters, numbers, underscores, and hyphens"
                      />
                      {error && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingUsername(false);
                          setNewUsername(profile?.username || '');
                          setError('');
                        }}
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Current Username
                      </label>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {profile?.username || 'No username set'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditingUsername(true)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Activity className="w-5 h-5" />
                      <span className="font-medium">API Usage</span>
                    </div>
                    {rateLimitInfo && (
                      <div className="space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">
                          {rateLimitInfo.remaining}/{rateLimitInfo.total} requests remaining
                        </p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-gray-900 dark:bg-white h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${(rateLimitInfo.remaining / rateLimitInfo.total) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Request counters reset at 12am AEST everyday
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
