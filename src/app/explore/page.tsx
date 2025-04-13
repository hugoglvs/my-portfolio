'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineSlider from '@/components/TimelineSlider';
import PuzzleModal from '@/components/PuzzleModal';
import AchievementPopup from '@/components/AchievementPopup';
import AchievementModal from '@/components/AchievementModal';
import { getEvents, getTimeframes, getEventById, checkAchievements, saveProgress, loadProgress, resetProgress } from '@/lib/utils';
import { EventLocation, Achievement } from '@/types';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  // State management
  const [currentTimeframe, setCurrentTimeframe] = useState<string>('intemporal');
  const [selectedLocation, setSelectedLocation] = useState<EventLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solvedEvents, setSolvedEvents] = useState<string[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  
  // Load events and timeframes
  const events = getEvents();
  const timeframes = getTimeframes();
  
  // Load saved progress on component mount
  useEffect(() => {
    const progress = loadProgress();
    setSolvedEvents(progress.solvedEvents);
    setUnlockedAchievements(progress.unlockedAchievements);
  }, []);
  
  // Load achievements on component mount and when progress changes
  useEffect(() => {
    const allAchievements = checkAchievements(solvedEvents, unlockedAchievements);
    setAchievements(allAchievements);
  }, [solvedEvents, unlockedAchievements]);
  
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
    // Update local state first
    const updatedSolvedEvents = [...solvedEvents];
    if (!updatedSolvedEvents.includes(locationId)) {
      updatedSolvedEvents.push(locationId);
      setSolvedEvents(updatedSolvedEvents);
      saveProgress(updatedSolvedEvents, unlockedAchievements);
    }

    // Check for new achievements
    const allAchievements = checkAchievements(updatedSolvedEvents, unlockedAchievements);
    const newAchievements = allAchievements.filter(
      achievement => achievement.requirementsMet && !achievement.isUnlocked
    );
    
    if (newAchievements.length > 0) {
      // Update unlocked achievements
      const updatedUnlockedAchievements = [
        ...unlockedAchievements, 
        ...newAchievements.map(a => a.id)
      ];
      
      setUnlockedAchievements(updatedUnlockedAchievements);
      saveProgress(updatedSolvedEvents, updatedUnlockedAchievements);
      
      // Show achievement popup for the first new achievement
      setNewAchievement(newAchievements[0]);
      
      // Queue additional achievements if there are more than one
      if (newAchievements.length > 1) {
        let index = 1;
        const showNextAchievement = () => {
          if (index < newAchievements.length) {
            setNewAchievement(newAchievements[index]);
            index++;
            setTimeout(showNextAchievement, 3000); // Show next achievement after 3 seconds
          }
        };
        setTimeout(showNextAchievement, 3000);
      }
    }
  };
  
  // Handle closing the achievement popup
  const handleCloseAchievement = () => {
    setNewAchievement(null);
  };

  // Handle reset progress
  const handleResetProgress = () => {
    resetProgress();
    setSolvedEvents([]);
    setUnlockedAchievements([]);
  };

  // Handle achievement click
  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };

  // Handle closing achievement modal
  const handleCloseAchievementModal = () => {
    setSelectedAchievement(null);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'map-pin':
        return (
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        );
      case 'cake':
        return (
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        );
      case 'academic-cap':
        return (
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        );
      case 'briefcase':
        return (
          <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        );
      case 'sparkles':
        return (
          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
        );
      case 'trophy':
        return (
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        );
      default:
        return (
          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
        );
    }
  };

  return (
    <main className="h-[calc(100vh-4rem)] bg-[var(--background)] overflow-hidden">
      <div className="h-full max-w-7xl mx-auto p-4">
        <div className="h-full flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <aside className="w-full md:w-80 flex-shrink-0">
            <div className="h-full bg-[var(--card)] rounded-lg shadow-md p-4 space-y-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">Mon Voyage Interactif</h1>
                <p className="mt-1 text-sm text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Explorez les événements de ma vie, mes passions et mes rêves à travers une carte interactive</p>
              </div>

              {/* How to Play Section */}
              <div className="bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Comment Jouer</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 bg-blue-600 rounded-full"></div>
                    <p className="text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Cliquez sur les marqueurs pour découvrir des événements</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Résolvez les énigmes pour débloquer de nouveaux lieux</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 bg-purple-500 rounded-full"></div>
                    <p className="text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Utilisez la timeline pour explorer différentes périodes</p>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-[var(--foreground)] mb-1">Progression</h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[var(--neutral-300)] dark:bg-[var(--neutral-700)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${(solvedEvents.length / events.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{solvedEvents.length}/{events.length}</span>
                </div>
                <p className="mt-2 text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                  {solvedEvents.length === 0 
                    ? "Commencez votre voyage en cliquant sur un marqueur"
                    : solvedEvents.length === events.length
                    ? "Félicitations ! Vous avez découvert tous les lieux"
                    : "Continuez à explorer pour découvrir tous les lieux"}
                </p>
              </div>

              {/* Map Legend */}
              <div className="bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Légende de la Carte</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Lieux Visités</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Énigmes Résolues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">Période Actuelle</span>
                  </div>
                </div>
              </div>

              {/* Achievements List */}
              <div className="bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Succès</h3>
                <div className="grid grid-cols-4 gap-2">
                  {achievements.map((achievement) => (
                    <button
                      key={achievement.id}
                      onClick={() => handleAchievementClick(achievement)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.isUnlocked
                          ? 'bg-green-500'
                          : 'bg-[var(--neutral-400)] dark:bg-[var(--neutral-600)]'
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-white"
                      >
                        {getIcon(achievement.icon)}
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleResetProgress}
                className="w-full bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] hover:bg-[var(--neutral-300)] dark:hover:bg-[var(--neutral-700)] text-[var(--neutral-600)] dark:text-[var(--neutral-400)] text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200"
              >
                Réinitialiser la progression
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col h-full">
            {/* Timeline slider */}
            <div className="bg-[var(--card)] rounded-lg shadow-md p-2 mb-2">
              <TimelineSlider 
                timeframes={timeframes}
                currentTimeframe={currentTimeframe}
                onTimeframeChange={handleTimeframeChange}
              />
            </div>
            
            {/* Map container */}
            <div className="flex-1 bg-[var(--card)] rounded-lg shadow-md p-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden h-full"
              >
                <Map 
                  locations={events}
                  onMarkerClick={handleMarkerClick}
                  currentTimeframe={currentTimeframe}
                  solvedEvents={solvedEvents}
                />
              </motion.div>
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
        isAlreadySolved={selectedLocation ? solvedEvents.includes(selectedLocation.id) : false}
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

      {/* Achievement Modal */}
      {selectedAchievement && (
        <AchievementModal
          isOpen={!!selectedAchievement}
          onClose={handleCloseAchievementModal}
          achievement={selectedAchievement}
        />
      )}
    </main>
  );
}