export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          updated_at: string | null;
          created_at: string;
          subscription_tier: 'free' | 'premium' | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          updated_at?: string | null;
          created_at?: string;
          subscription_tier?: 'free' | 'premium' | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          updated_at?: string | null;
          created_at?: string;
          subscription_tier?: 'free' | 'premium' | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
      };
      test_results: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          total_marks: number;
          max_marks: number;
          completed_at: string;
          answers: Record<string, {
            answer: string;
            marks?: number;
            partMarks?: Record<string, number>;
          }>;
          problems: Array<{
            id: number;
            title: string;
            tags: string[];
            type?: 'multiple-choice' | 'written';
            equation?: string;
            choices?: Array<{ id: string; text: string }>;
            solution: string;
            explanation: string;
            marks?: number;
            parts?: Array<{
              id: string;
              question: string;
              marks: number;
              solution: string;
              explanation: string;
            }>;
          }>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          total_marks: number;
          max_marks: number;
          completed_at?: string;
          answers: Record<string, {
            answer: string;
            marks?: number;
            partMarks?: Record<string, number>;
          }>;
          problems: Array<{
            id: number;
            title: string;
            tags: string[];
            type?: 'multiple-choice' | 'written';
            equation?: string;
            choices?: Array<{ id: string; text: string }>;
            solution: string;
            explanation: string;
            marks?: number;
            parts?: Array<{
              id: string;
              question: string;
              marks: number;
              solution: string;
              explanation: string;
            }>;
          }>;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          total_marks?: number;
          max_marks?: number;
          completed_at?: string;
          answers?: Record<string, {
            answer: string;
            marks?: number;
            partMarks?: Record<string, number>;
          }>;
          problems?: Array<{
            id: number;
            title: string;
            tags: string[];
            type?: 'multiple-choice' | 'written';
            equation?: string;
            choices?: Array<{ id: string; text: string }>;
            solution: string;
            explanation: string;
            marks?: number;
            parts?: Array<{
              id: string;
              question: string;
              marks: number;
              solution: string;
              explanation: string;
            }>;
          }>;
          created_at?: string;
        };
      };
    };
    Functions: {
      ensure_test_results_table: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
