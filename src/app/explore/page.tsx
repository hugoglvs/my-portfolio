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
    <div className="flex flex-col md:flex-row">
    <aside className="flex-1 hidden md:block bg-gradient-to-br from-cyan-700 to-cyan-900 text-white p-4 lg:p-6 lg:w-64 lg:flex-shrink-0">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-left">Mon Voyage Interactif</h1>
            <p className="mt-2 text-blue-100">Explorez les événements de ma vie, mes passions et mes rêves à travers une carte interactive</p>
          </div>

          {/* Progress Section */}
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-blue-100 mb-2">Progression</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${(solvedEvents.length / events.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{solvedEvents.length}/{events.length}</span>
            </div>
          </div>

          {/* Map Legend */}
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-blue-100 mb-3">Légende de la Carte</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Lieux Visités</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                <span className="text-sm">Énigmes Résolues</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    <main className="flex-4">
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

          {/* Mobile Progress and Legend */}
          <div className="md:hidden mt-6 space-y-4">
            {/* Mobile Progress */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700 mb-2">Progression</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${(solvedEvents.length / events.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">{solvedEvents.length}/{events.length}</span>
              </div>
            </div>

            {/* Mobile Legend */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700 mb-3">Légende de la Carte</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Lieux Visités</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Énigmes Résolues</span>
                </div>
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
    </div>
  );
}