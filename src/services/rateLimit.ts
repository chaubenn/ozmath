import { supabase } from '../lib/supabase';

// Rate limits per day
const RATE_LIMITS = {
  free: 50,
  premium: 300
};

export async function getRateLimitInfo(): Promise<{
  remaining: number;
  total: number;
  nextReset: Date;
} | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const rateLimit = profile?.subscription_tier === 'premium' ? RATE_LIMITS.premium : RATE_LIMITS.free;

    const { data: usage } = await supabase
      .from('api_usage')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!usage) {
      // If no usage record exists, create one
      const { data: newUsage, error: createError } = await supabase
        .from('api_usage')
        .insert({ 
          user_id: user.id,
          count: 0,
          last_reset: new Date().toISOString()
        })
        .select()
        .single();

      if (createError) throw createError;

      return {
        remaining: rateLimit,
        total: rateLimit,
        nextReset: new Date(newUsage.last_reset)
      };
    }

    return {
      remaining: Math.max(0, rateLimit - usage.count),
      total: rateLimit,
      nextReset: new Date(usage.last_reset)
    };
  } catch (error) {
    console.error('Error getting rate limit info:', error);
    return null;
  }
}

export async function checkRateLimit(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Get user's subscription tier
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    const rateLimit = profile?.subscription_tier === 'premium' ? RATE_LIMITS.premium : RATE_LIMITS.free;

    // Get or create usage record
    let { data: usage, error } = await supabase
      .from('api_usage')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // If no record exists, create one
    if (error?.code === 'PGRST116') {
      const { data: newUsage, error: createError } = await supabase
        .from('api_usage')
        .insert({ 
          user_id: user.id,
          count: 1,
          last_reset: new Date().toISOString()
        })
        .select()
        .single();

      if (createError) throw createError;
      return true;
    }

    if (error) throw error;

    // Check if user has exceeded their rate limit
    if (usage.count >= rateLimit) {
      return false;
    }

    // Increment counter
    await supabase
      .from('api_usage')
      .update({ 
        count: usage.count + 1
      })
      .eq('user_id', user.id);

    return true;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return false;
  }
}
