import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { getStripe } from '../lib/stripe';

interface SubscriptionState {
  isLoading: boolean;
  error: string | null;
  isPremium: boolean;
  subscriptionStatus: 'active' | 'canceling' | null;
  subscriptionEndsAt: string | null;
  startSubscription: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
  checkSubscriptionStatus: () => Promise<void>;
  clearSubscriptionState: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  isLoading: false,
  error: null,
  isPremium: false,
  subscriptionStatus: null,
  subscriptionEndsAt: null,

  clearSubscriptionState: () => {
    set({
      isPremium: false,
      subscriptionStatus: null,
      subscriptionEndsAt: null,
      error: null
    });
  },

  startSubscription: async () => {
    try {
      set({ isLoading: true, error: null });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if we're in development environment
      if (!import.meta.env.PROD) {
        console.warn('Subscription features are not available in development');
        return;
      }

      // Create checkout session
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to create checkout session');
      }

      const data = await response.json();
      if (!data.sessionId) throw new Error('No session ID returned');

      // Get Stripe instance
      const stripe = await getStripe();
      if (!stripe) throw new Error('Failed to load Stripe');

      // Redirect to checkout
      const { error: redirectError } = await stripe.redirectToCheckout({ 
        sessionId: data.sessionId 
      });
      if (redirectError) throw redirectError;

    } catch (error) {
      console.error('Error starting subscription:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to start subscription' });
    } finally {
      set({ isLoading: false });
    }
  },

  cancelSubscription: async () => {
    try {
      set({ isLoading: true, error: null });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if we're in development environment
      if (!import.meta.env.PROD) {
        console.warn('Subscription features are not available in development');
        return;
      }

      const response = await fetch('/.netlify/functions/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to cancel subscription');
      }

      await get().checkSubscriptionStatus();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to cancel subscription' });
    } finally {
      set({ isLoading: false });
    }
  },

  checkSubscriptionStatus: async () => {
    try {
      set({ isLoading: true, error: null });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        get().clearSubscriptionState();
        return;
      }

      // In development, just check the subscription_tier from the profile
      if (!import.meta.env.PROD) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        set({
          isPremium: profile?.subscription_tier === 'premium',
          subscriptionStatus: profile?.subscription_tier === 'premium' ? 'active' : null,
          subscriptionEndsAt: null,
        });
        return;
      }

      // Production environment - full Stripe integration
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('subscription_tier, stripe_subscription_id')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (profile?.stripe_subscription_id) {
        const response = await fetch('/.netlify/functions/get-subscription-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscriptionId: profile.stripe_subscription_id,
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch subscription status');
        
        const { status, current_period_end, cancel_at_period_end } = await response.json();
        
        set({
          isPremium: profile?.subscription_tier === 'premium',
          subscriptionStatus: cancel_at_period_end ? 'canceling' : 'active',
          subscriptionEndsAt: new Date(current_period_end * 1000).toISOString(),
        });
      } else {
        set({
          isPremium: profile?.subscription_tier === 'premium',
          subscriptionStatus: null,
          subscriptionEndsAt: null,
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      // Don't set error in development to avoid UI noise
      if (import.meta.env.PROD) {
        set({ error: error instanceof Error ? error.message : 'Failed to check subscription' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
