import { supabase } from '../lib/supabase';

const RATE_LIMIT = 50; // Maximum requests per hour
const RESET_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

export async function checkRateLimit(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Get or create usage record
    let { data: usage, error } = await supabase
      .from('api_usage')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const now = new Date();

    // If no record exists, create one
    if (error?.code === 'PGRST116') {
      const { data: newUsage, error: createError } = await supabase
        .from('api_usage')
        .insert({ 
          user_id: user.id,
          count: 1,
          last_reset: now.toISOString()
        })
        .select()
        .single();

      if (createError) throw createError;
      return true;
    }

    if (error) throw error;

    const lastReset = new Date(usage.last_reset);
    
    // Reset counter if interval has passed
    if (now.getTime() - lastReset.getTime() >= RESET_INTERVAL) {
      await supabase
        .from('api_usage')
        .update({ 
          count: 1,
          last_reset: now.toISOString()
        })
        .eq('user_id', user.id);
      return true;
    }

    // Check if user has exceeded rate limit
    if (usage.count >= RATE_LIMIT) {
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