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

// Check if an achievement is unlocked
export function checkAchievements(
  solvedEvents: string[],
  unlockedAchievements: string[]
): Achievement | null {
  const achievements = eventsData.achievements as Achievement[];
  
  // Check each achievement
  for (const achievement of achievements) {
    // Skip if already unlocked
    if (unlockedAchievements.includes(achievement.id)) continue;
    
    // Check achievement conditions
    switch (achievement.id) {
      case 'premier_puzzle':
        if (solvedEvents.length >= 1) return achievement;
        break;
      case 'tous_enfance':
        if (getEvents().filter(e => e.timeframe === 'enfance').every(e => solvedEvents.includes(e.id))) return achievement;
        break;
      case 'tous_adolescence':
        if (getEvents().filter(e => e.timeframe === 'adolescence').every(e => solvedEvents.includes(e.id))) return achievement;
        break;
      case 'tous_etudes':
        if (getEvents().filter(e => e.timeframe === 'etudes').every(e => solvedEvents.includes(e.id))) return achievement;
        break;
      case 'tous_futur':
        if (getEvents().filter(e => e.timeframe === 'futur').every(e => solvedEvents.includes(e.id))) return achievement;
        break;
      case 'complet':
        if (getEvents().every(e => solvedEvents.includes(e.id))) return achievement;
        break;
    }
  }
  
  return null;
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
  if (typeof window !== 'undefined') {
    localStorage.setItem('solvedEvents', JSON.stringify(solvedEvents));
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
  }
}

// Load progress from localStorage
export function loadProgress() {
  if (typeof window !== 'undefined') {
    const savedEvents = localStorage.getItem('solvedEvents');
    const savedAchievements = localStorage.getItem('unlockedAchievements');
    
    if (savedEvents && savedAchievements) {
      return {
        solvedEvents: JSON.parse(savedEvents),
        unlockedAchievements: JSON.parse(savedAchievements)
      };
    }
  }
  return { solvedEvents: [], unlockedAchievements: [] };
} 