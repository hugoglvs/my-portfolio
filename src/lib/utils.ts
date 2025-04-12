import { EventLocation, Achievement, Timeframe } from '@/types';
import eventsData from '@/data/events.json';
import L from 'leaflet';

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

// Check if an achievement should be unlocked based on solved puzzles
export function checkAchievements(solvedEvents: string[]): Achievement[] {
  const achievements = getAchievements();
  const events = getEvents();
  const unlockedAchievements: Achievement[] = [];

  // First puzzle solved
  if (solvedEvents.length > 0) {
    const firstPuzzleAchievement = achievements.find(a => a.id === 'first_puzzle');
    if (firstPuzzleAchievement && !firstPuzzleAchievement.isUnlocked) {
      unlockedAchievements.push({
        ...firstPuzzleAchievement,
        isUnlocked: true
      });
    }
  }

  // All puzzles in a timeframe
  const timeframes = ['childhood', 'university', 'career', 'future'];
  
  timeframes.forEach(timeframe => {
    const eventsInTimeframe = events.filter(e => e.timeframe === timeframe);
    const solvedInTimeframe = eventsInTimeframe.filter(e => solvedEvents.includes(e.id));
    
    if (eventsInTimeframe.length > 0 && solvedInTimeframe.length === eventsInTimeframe.length) {
      const timeframeAchievement = achievements.find(a => a.id === `all_${timeframe}`);
      if (timeframeAchievement && !timeframeAchievement.isUnlocked) {
        unlockedAchievements.push({
          ...timeframeAchievement,
          isUnlocked: true
        });
      }
    }
  });

  // All puzzles completed
  if (solvedEvents.length === events.length) {
    const completeAchievement = achievements.find(a => a.id === 'complete');
    if (completeAchievement && !completeAchievement.isUnlocked) {
      unlockedAchievements.push({
        ...completeAchievement,
        isUnlocked: true
      });
    }
  }

  return unlockedAchievements;
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

// Save progress to localStorage (for development without Supabase)
export function saveProgress(solvedEvents: string[], unlockedAchievements: string[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('solvedEvents', JSON.stringify(solvedEvents));
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
  }
}

// Load progress from localStorage (for development without Supabase)
export function loadProgress(): { solvedEvents: string[], unlockedAchievements: string[] } {
  if (typeof window !== 'undefined') {
    const solvedEvents = JSON.parse(localStorage.getItem('solvedEvents') || '[]');
    const unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    return { solvedEvents, unlockedAchievements };
  }
  return { solvedEvents: [], unlockedAchievements: [] };
}

// Fix Leaflet default icon issue in Next.js
export function fixLeafletIcon() {
  // Only run on client
  if (typeof window === 'undefined') return;

  // @ts-expect-error - Leaflet's types are not perfect with this method
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
} 