'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineSlider from '@/components/TimelineSlider';
import PuzzleModal from '@/components/PuzzleModal';
import AchievementPopup from '@/components/AchievementPopup';
import { getEvents, getTimeframes, getEventById, checkAchievements, saveProgress, loadProgress } from '@/lib/utils';
import { EventLocation, Achievement } from '@/types';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  // State management
  const [currentTimeframe, setCurrentTimeframe] = useState<string>('childhood');
  const [selectedLocation, setSelectedLocation] = useState<EventLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solvedEvents, setSolvedEvents] = useState<string[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  
  // Load events and timeframes
  const events = getEvents();
  const timeframes = getTimeframes();
  
  // Load saved progress on component mount
  useEffect(() => {
    const { solvedEvents: savedEvents, unlockedAchievements: savedAchievements } = loadProgress();
    setSolvedEvents(savedEvents);
    setUnlockedAchievements(savedAchievements);
  }, []);
  
  // Handle timeframe changes
  const handleTimeframeChange = (timeframeId: string) => {
    setCurrentTimeframe(timeframeId);
  };
  
  // Handle marker clicks
  const handleMarkerClick = (locationId: string) => {
    const location = getEventById(locationId);
    if (location) {
      setSelectedLocation(location);
      setIsModalOpen(true);
    }
  };
  
  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLocation(null), 300); // Delay to allow animation
  };
  
  // Handle puzzle solved
  const handlePuzzleSolved = (locationId: string) => {
    if (!solvedEvents.includes(locationId)) {
      const updatedSolvedEvents = [...solvedEvents, locationId];
      setSolvedEvents(updatedSolvedEvents);
      saveProgress(updatedSolvedEvents, unlockedAchievements);
      
      // Check for new achievements
      const newAchievements = checkAchievements(updatedSolvedEvents);
      
      if (newAchievements.length > 0) {
        // Get newly unlocked achievements
        const newlyUnlocked = newAchievements.filter(a => !unlockedAchievements.includes(a.id));
        
        if (newlyUnlocked.length > 0) {
          // Update unlocked achievements
          const updatedUnlockedAchievements = [
            ...unlockedAchievements, 
            ...newlyUnlocked.map(a => a.id)
          ];
          
          setUnlockedAchievements(updatedUnlockedAchievements);
          saveProgress(updatedSolvedEvents, updatedUnlockedAchievements);
          
          // Show achievement popup for the first new achievement
          setNewAchievement(newlyUnlocked[0]);
          
          // Queue additional achievements if there are more than one
          if (newlyUnlocked.length > 1) {
            let index = 1;
            const showNextAchievement = () => {
              if (index < newlyUnlocked.length) {
                setNewAchievement(newlyUnlocked[index]);
                index++;
                setTimeout(showNextAchievement, 6000); // Show next achievement after 6 seconds
              }
            };
            setTimeout(showNextAchievement, 6000);
          }
        }
      }
    }
  };
  
  // Handle closing the achievement popup
  const handleCloseAchievement = () => {
    setNewAchievement(null);
  };
  
  return (
    <>
    <main className="bg-gray-50 flex flex-col lg:flex-row">
      {/* Header - responsive positioning */}
      <header className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-4 lg:p-6 lg:w-64 lg:flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold">My Interactive Journey</h1>
          <p className="mt-2 text-blue-100">Explore my life events, hobbies, and dreams through an interactive map</p>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Timeline slider */}
        <div className="px-8 lg:px-6 py-2 bg-white shadow-sm">
          <TimelineSlider 
            timeframes={timeframes}
            currentTimeframe={currentTimeframe}
            onTimeframeChange={handleTimeframeChange}
          />
        </div>
        
        {/* Map container */}
        <div className="flex-1 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-lg h-[70vh]"
          >
            <Map 
              locations={events}
              onMarkerClick={handleMarkerClick}
              currentTimeframe={currentTimeframe}
            />
          </motion.div>
          
          {/* Legend */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Map Legend</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                <span>Places Visited</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Puzzles Solved: {solvedEvents.length}/{events.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal for puzzles */}
      <PuzzleModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        location={selectedLocation}
        onPuzzleSolved={handlePuzzleSolved}
      />
      
      {/* Achievement popup */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <AchievementPopup 
              achievement={newAchievement}
              onClose={handleCloseAchievement}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </>
  );
}