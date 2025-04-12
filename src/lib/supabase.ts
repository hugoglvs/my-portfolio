import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

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

export async function updateUserProgress(userId: string, eventId?: string, achievementId?: string) {
  if (!userId) return { success: false, error: 'No user ID provided' };
  
  // Get current user progress
  const { data: userProgress, error: fetchError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is not found
    console.error('Error fetching user progress:', fetchError);
    return { success: false, error: fetchError };
  }
  
  let solved_events = userProgress?.solved_events || [];
  let unlocked_achievements = userProgress?.unlocked_achievements || [];
  
  // Add new event if provided
  if (eventId && !solved_events.includes(eventId)) {
    solved_events = [...solved_events, eventId];
  }
  
  // Add new achievement if provided
  if (achievementId && !unlocked_achievements.includes(achievementId)) {
    unlocked_achievements = [...unlocked_achievements, achievementId];
  }
  
  // Update or insert user progress
  const { error: upsertError } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      solved_events,
      unlocked_achievements,
    });
  
  if (upsertError) {
    console.error('Error updating user progress:', upsertError);
    return { success: false, error: upsertError };
  }
  
  return { success: true };
} 