import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, UserCheck, Clock, XCircle, CheckCircle2, Crown } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import AuthModal from '../components/AuthModal';
import TopBar from '../components/TopBar';
import SocialPlaceholder from '../components/SocialPlaceholder';

interface UserProfile {
  id: string;
  username: string;
  test_count: number;
  friendship_status?: 'pending' | 'accepted' | 'declined' | null;
  is_sender?: boolean;
  subscription_tier?: 'free' | 'premium' | null;
}

export default function SocialPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRequests, setPendingRequests] = useState<UserProfile[]>([]);
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddFriends, setShowAddFriends] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFriendsAndRequests();
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery && showAddFriends) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchUsers = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, subscription_tier')
        .ilike('username', `%${searchQuery}%`)
        .neq('id', user?.id)
        .limit(10);

      if (profilesError) throw profilesError;
      if (!profiles) return;

      const profilesWithStatus = await Promise.all(
        profiles.map(async (profile) => {
          const { count: testCount } = await supabase
            .from('test_results')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', profile.id);

          let friendshipStatus = null;
          let isSender = false;

          if (user) {
            const { data: friendship } = await supabase
              .from('friendships')
              .select('status, sender_id')
              .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
              .or(`sender_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
              .single();

            if (friendship) {
              friendshipStatus = friendship.status;
              isSender = friendship.sender_id === user.id;
            }
          }

          return {
            ...profile,
            test_count: testCount || 0,
            friendship_status: friendshipStatus,
            is_sender: isSender
          };
        })
      );

      setSearchResults(profilesWithStatus);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendsAndRequests = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch pending requests
      const { data: pendingData, error: pendingError } = await supabase
        .from('friendships')
        .select('sender_id, receiver_id')
        .eq('receiver_id', user.id)
        .eq('status', 'pending');

      if (pendingError) throw pendingError;

      if (pendingData) {
        const pendingIds = pendingData.map(p => p.sender_id);
        const { data: pendingProfiles } = await supabase
          .from('profiles')
          .select('id, username, subscription_tier')
          .in('id', pendingIds);

        if (pendingProfiles) {
          const pendingWithCounts = await Promise.all(
            pendingProfiles.map(async (profile) => {
              const { count } = await supabase
                .from('test_results')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', profile.id);

              return {
                ...profile,
                test_count: count || 0,
                friendship_status: 'pending',
                is_sender: false
              };
            })
          );

          setPendingRequests(pendingWithCounts);
        }
      }

      // Fetch accepted friends
      const { data: friendships, error: friendshipsError } = await supabase
        .from('friendships')
        .select('sender_id, receiver_id')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (friendshipsError) throw friendshipsError;

      if (friendships) {
        const friendIds = friendships.map(f => 
          f.sender_id === user.id ? f.receiver_id : f.sender_id
        );

        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, username, subscription_tier')
          .in('id', friendIds);

        if (profiles) {
          const friendsWithCounts = await Promise.all(
            profiles.map(async (profile) => {
              const { count } = await supabase
                .from('test_results')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', profile.id);

              return {
                ...profile,
                test_count: count || 0,
                friendship_status: 'accepted'
              };
            })
          );

          setFriends(friendsWithCounts);
        }
      }
    } catch (error) {
      console.error('Error fetching friends and requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (friendId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('friendships')
        .insert([
          { sender_id: user.id, receiver_id: friendId }
        ]);

      if (error) throw error;

      setSearchResults(results => 
        results.map(u => 
          u.id === friendId 
            ? { ...u, friendship_status: 'pending', is_sender: true }
            : u
        )
      );
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const handleFriendRequest = async (friendId: string, action: 'accept' | 'decline') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('friendships')
        .update({ status: action === 'accept' ? 'accepted' : 'declined' })
        .match({ sender_id: friendId, receiver_id: user.id });

      if (error) throw error;

      await fetchFriendsAndRequests();
    } catch (error) {
      console.error(`Error ${action}ing friend request:`, error);
    }
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/social/profile/${userId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <TopBar 
          currentPage="social"
          onNavigate={(page) => {
            if (page === 'social') {
              return;
            }
            if (page === 'problems') {
              navigate('/methods');
            } else {
              navigate(`/methods/${page}`);
            }
          }}
          selectedTags={new Set()}
          onTagSelect={() => {}}
          searchQuery=""
          setSearchQuery={() => {}}
          filterTags={[]}
          onRandomProblem={() => {}}
          onStartTest={() => {}}
          onLogoClick={() => {}}
        />
        <main className="pt-24 px-8 pb-12">
          <SocialPlaceholder />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar 
        currentPage="social"
        onNavigate={(page) => {
          if (page === 'social') {
            return;
          }
          if (page === 'problems') {
            navigate('/methods');
          } else {
            navigate(`/methods/${page}`);
          }
        }}
        selectedTags={new Set()}
        onTagSelect={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
        filterTags={[]}
        onRandomProblem={() => {}}
        onStartTest={() => {}}
        onLogoClick={() => {}}
      />

      <main className="pt-24 px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {showAddFriends ? 'Add Friends' : 'Friends'}
              </h1>
              <button
                onClick={() => setShowAddFriends(!showAddFriends)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {showAddFriends ? (
                  <>
                    <UserCheck className="w-5 h-5" />
                    <span>View Friends</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Add Friends</span>
                  </>
                )}
              </button>
            </div>

            {showAddFriends ? (
              <>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((profile) => (
                      <div
                        key={profile.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewProfile(profile.id)}
                              className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                              {profile.username}
                            </button>
                            {profile.subscription_tier === 'premium' && (
                              <Crown className="w-5 h-5 text-amber-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {profile.test_count} tests saved
                          </p>
                        </div>
                        {profile.friendship_status === 'accepted' ? (
                          <button
                            onClick={() => handleViewProfile(profile.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg"
                          >
                            <UserCheck className="w-5 h-5" />
                            <span>Friends</span>
                          </button>
                        ) : profile.friendship_status === 'pending' ? (
                          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg">
                            <Clock className="w-5 h-5" />
                            <span>{profile.is_sender ? 'Request Sent' : 'Pending'}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddFriend(profile.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            <UserPlus className="w-5 h-5" />
                            <span>Add Friend</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : searchQuery && (
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    No users found
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                {pendingRequests.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Pending Requests
                    </h2>
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                              {request.username}
                            </span>
                            {request.subscription_tier === 'premium' && (
                              <Crown className="w-5 h-5 text-amber-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Wants to be your friend
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFriendRequest(request.id, 'accept')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => handleFriendRequest(request.id, 'decline')}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-5 h-5" />
                            <span>Decline</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Your Friends
                  </h2>
                  {friends.length > 0 ? (
                    friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewProfile(friend.id)}
                              className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                              {friend.username}
                            </button>
                            {friend.subscription_tier === 'premium' && (
                              <Crown className="w-5 h-5 text-amber-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {friend.test_count} tests saved
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewProfile(friend.id)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          View Profile
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      You haven't added any friends yet
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
