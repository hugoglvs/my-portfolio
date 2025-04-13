import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for Supabase tables
export type Tables = {
  events: {
    id: string;
    name: string;
    description: string;
    lat: number;
    lng: number;
    timeframe: string;
    puzzle_type: 'trivia' | 'sudoku' | 'crossword' | 'memory' | 'puzzle';
    puzzle_data: {
      title?: string;
      description?: string;
      questions?: Array<{
        question: string;
        options: string[];
        correctAnswer: number;
      }>;
      [key: string]: unknown;
    };
    unlock_content: {
      title: string;
      text: string;
      media_url?: string;
      media_type?: 'image' | 'video' | 'audio';
    };
  };
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    conditions: {
      type: 'solve_events' | 'solve_all_in_timeframe' | 'solve_all';
      timeframe?: string;
      count?: number;
      [key: string]: unknown;
    };
  };
  user_progress: {
    user_id: string;
    solved_events: string[]; // Array of event IDs that were solved
    unlocked_achievements: string[]; // Array of achievement IDs that were unlocked
  };
};

// Helper functions for data fetching

export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*');
  
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data;
}

export async function fetchAchievements() {
  const { data, error } = await supabase
    .from('achievements')
    .select('*');
  
  if (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
  
  return data;
}

export interface UserProgress {
  solvedEvents: string[];
  unlockedAchievements: string[];
}

export async function saveProgress(userId: string, progress: UserProgress) {
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      solved_events: progress.solvedEvents,
      unlocked_achievements: progress.unlockedAchievements,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
}

export async function loadProgress(userId: string): Promise<UserProgress> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('solved_events, unlocked_achievements')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error loading progress:', error);
    return { solvedEvents: [], unlockedAchievements: [] };
  }

  return {
    solvedEvents: data?.solved_events || [],
    unlockedAchievements: data?.unlocked_achievements || [],
  };
} 