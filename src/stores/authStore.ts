import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useSubscriptionStore } from './subscriptionStore';

interface Profile {
  username: string | null;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setSession: (session: Session | null) => void;
  signOut: (navigate: (path: string) => void) => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  loading: false,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setSession: (session) => set({ session }),
  signOut: async (navigate) => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null });
    useSubscriptionStore.getState().clearSubscriptionState();
    navigate('/methods');
  },
  fetchProfile: async () => {
    const { user } = get();
    if (!user) {
      set({ profile: null, loading: false });
      return;
    }

    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      set({ 
        profile: { 
          username: data?.username || null
        },
        loading: false 
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ 
        profile: { 
          username: null
        },
        loading: false 
      });
    }
  },
  updateUsername: async (username: string) => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .neq('id', user.id)
      .maybeSingle();

    if (checkError) throw checkError;
    if (existingUser) throw new Error('Username already taken');

    // Update profile in the database
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        id: user.id,
        username,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (profileError) throw profileError;

    // Update user metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: { username },
    });

    if (authError) throw authError;
    
    set(state => ({
      profile: {
        ...state.profile!,
        username
      }
    }));
  }
}));
