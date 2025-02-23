import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type TestResult = Database['public']['Tables']['test_results']['Row'];
type InsertTestResult = Database['public']['Tables']['test_results']['Insert'];

interface ProgressState {
  testResults: TestResult[];
  loading: boolean;
  error: string | null;
  saveTestResult: (result: Omit<InsertTestResult, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  fetchTestResults: () => Promise<void>;
  deleteTestResult: (id: string) => Promise<void>;
  updateTestTitle: (id: string, title: string) => Promise<void>;
  clearError: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  testResults: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  saveTestResult: async (result) => {
    try {
      set({ loading: true, error: null });
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Validate the data before inserting
      if (!Array.isArray(result.problems) || !result.problems.length) {
        throw new Error('Invalid problems data');
      }

      // Ensure answers is a valid object
      if (typeof result.answers !== 'object' || result.answers === null) {
        throw new Error('Invalid answers data');
      }

      const { error: insertError } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          title: result.title || 'New Test',
          total_marks: result.total_marks,
          max_marks: result.max_marks,
          completed_at: result.completed_at || new Date().toISOString(),
          answers: result.answers,
          problems: result.problems
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(insertError.message);
      }
      
      await get().fetchTestResults();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save test results';
      console.error('Error saving test results:', error);
      set({ error: message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteTestResult: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('test_results')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        testResults: state.testResults.filter(result => result.id !== id)
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete test result';
      console.error('Error deleting test result:', error);
      set({ error: message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateTestTitle: async (id: string, title: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('test_results')
        .update({ title })
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        testResults: state.testResults.map(result =>
          result.id === id ? { ...result, title } : result
        )
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update test title';
      console.error('Error updating test title:', error);
      set({ error: message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchTestResults: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ testResults: [], error: 'User not authenticated' });
        return;
      }

      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      
      set({ testResults: data || [] });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch test results';
      console.error('Error fetching test results:', error);
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },
}));