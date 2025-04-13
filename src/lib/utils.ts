import { EventLocation, Achievement, Timeframe } from '@/types';
import eventsData from '@/data/events.json';

// Get all events data from the mock JSON file (for development)
export function getEvents(): EventLocation[] {
  return eventsData.events as EventLocation[];
}

// Get all timeframes from the mock JSON file
export function getTimeframes(): Timeframe[] {
  return eventsData.timeframes as Timeframe[];
}

// Get all achievements from the mock JSON file
export function getAchievements(): Achievement[] {
  return eventsData.achievements as Achievement[];
}

// Get a specific event by ID
export function getEventById(id: string): EventLocation | undefined {
  return getEvents().find(event => event.id === id);
}

// Check for new achievements
export function checkAchievements(solvedEvents: string[], unlockedAchievements: string[]): Achievement[] {
  const allAchievements = getAchievements();
  
  return allAchievements.map(achievement => {
    const isUnlocked = unlockedAchievements.includes(achievement.id);
    const requirementsMet = achievement.requirements.every(req => {
      if (req.type === 'events') {
        return req.ids.every(id => solvedEvents.includes(id));
      }
      return false;
    });
    
    return {
      ...achievement,
      isUnlocked,
      requirementsMet
    };
  });
}

// Format date for display
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Save progress to localStorage
export function saveProgress(solvedEvents: string[], unlockedAchievements: string[]) {
  try {
    localStorage.setItem('solvedEvents', JSON.stringify(solvedEvents));
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
}

// Load progress from localStorage
export function loadProgress(): { solvedEvents: string[]; unlockedAchievements: string[] } {
  try {
    const solvedEvents = JSON.parse(localStorage.getItem('solvedEvents') || '[]');
    const unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    return { solvedEvents, unlockedAchievements };
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
    return { solvedEvents: [], unlockedAchievements: [] };
  }
}

// Reset progress in localStorage
export function resetProgress() {
  try {
    localStorage.setItem('solvedEvents', JSON.stringify([]));
    localStorage.setItem('unlockedAchievements', JSON.stringify([]));
  } catch (error) {
    console.error('Error resetting progress in localStorage:', error);
  }
} 