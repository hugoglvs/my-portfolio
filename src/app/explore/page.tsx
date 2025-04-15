'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PuzzleModal from '@/components/PuzzleModal';
import AchievementPopup from '@/components/AchievementPopup';
import AchievementModal from '@/components/AchievementModal';
import { getEvents, loadProgress, getTimeframes, getAchievements } from '@/lib/utils';
import { EventLocation, Achievement, Timeframe } from '@/types';
import { 
  MapPin,
  Trophy,
  Sparkles,
  Star,
  Medal,
  Crown,
  Brain,
  Heart,
  Briefcase,
  GraduationCap,
  Globe,
  Lightbulb,
  Rocket,
  BookOpen,
  Code2,
  Music,
  Camera,
  Palette,
  Gamepad2,
  Languages,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  Map as MapIcon
} from 'lucide-react';
import Map from '@/components/Map';
import TimelineSlider from '@/components/TimelineSlider';
import React from 'react';

export default function Explore() {
  // State management
  const [selectedLocation, setSelectedLocation] = useState<EventLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solvedLocations, setSolvedLocations] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [currentTimeframe, setCurrentTimeframe] = useState<string>('all');
  const [timeframes, setTimeframes] = useState<Timeframe[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showAchievements, setShowAchievements] = useState(false);
  
  // Load saved progress and timeframes on component mount
  useEffect(() => {
    const progress = loadProgress();
    if (progress) {
      setSolvedLocations(progress.solvedEvents);
      setUnlockedAchievements(progress.unlockedAchievements);
    }
    setTimeframes(getTimeframes());
    setAchievements(getAchievements());
  }, []);
  
  // Handle location clicks
  const handleLocationClick = (id: string) => {
    const location = getEvents().find(event => event.id === id);
    if (location) {
      setSelectedLocation(location);
      setIsModalOpen(true);
    }
  };
  
  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };
  
  // Handle puzzle solved
  const handlePuzzleSolved = (locationId: string) => {
    setSolvedLocations(prev => [...prev, locationId]);
  };
  
  // Handle closing the achievement popup
  const handleCloseAchievement = () => {
    setNewAchievement(null);
  };

  // Handle closing achievement modal
  const handleCloseAchievementModal = () => {
    setSelectedAchievement(null);
  };

  // Handle timeframe change
  const handleTimeframeChange = (timeframeId: string) => {
    setCurrentTimeframe(timeframeId);
  };

  // Handle achievement click
  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };

  // Handle toggle achievements visibility
  const toggleAchievements = () => {
    setShowAchievements(!showAchievements);
  };

  const solvedCount = solvedLocations.length;
  const totalLocations = getEvents().length;
  const unlockedCount = unlockedAchievements.length;
  const totalAchievements = achievements.length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 -mt-24 bg-gradient-to-b from-blue-600/20 via-blue-600/10 to-transparent h-[120vh]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-6xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight py-2">
                  Explorez mon Univers
                </h1>
                <p className="text-2xl text-[var(--neutral-600)] dark:text-[var(--neutral-400)] max-w-3xl mb-8">
                  Découvrez mon parcours à travers une expérience interactive et ludique. 
                  Résolvez les énigmes pour débloquer des contenus exclusifs.
                </p>
              </div>
              <button
                onClick={() => {
                  const mapSection = document.getElementById('map-section');
                  if (mapSection) {
                    mapSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
              >
                <MapIcon className="h-5 w-5 mr-2" />
                Voir la carte
              </button>
            </div>
            
            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-[var(--card)] rounded-xl p-6 shadow-lg border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Progression</h2>
                  </div>
                  <span className="text-lg font-medium text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                    {solvedCount}/{totalLocations}
                  </span>
                </div>
                <div className="w-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(solvedCount / totalLocations) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                </div>
              </div>

              <div className="bg-[var(--card)] rounded-xl p-6 shadow-lg border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Succès</h2>
                  </div>
                  <span className="text-lg font-medium text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                    {unlockedCount}/{totalAchievements}
                  </span>
                </div>
                <div className="w-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[var(--card)] rounded-xl p-6 shadow-lg border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] mb-8"
            >
              <button
                onClick={toggleAchievements}
                className="w-full flex items-center justify-between gap-3 mb-4"
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-xl font-semibold text-[var(--foreground)]">Succès débloqués</h2>
                </div>
                {showAchievements ? (
                  <ChevronUp className="w-5 h-5 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]" />
                )}
              </button>
              
              <AnimatePresence>
                {showAchievements && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement) => {
                        const isUnlocked = unlockedAchievements.includes(achievement.id);
                        const getIcon = (type: string) => {
                          switch (type) {
                            case 'first_puzzle':
                              return Medal;
                            case 'all_puzzles':
                              return Trophy;
                            case 'timeframe':
                              return Clock;
                            case 'skill':
                              return Brain;
                            case 'passion':
                              return Heart;
                            case 'experience':
                              return Briefcase;
                            case 'education':
                              return GraduationCap;
                            case 'travel':
                              return Globe;
                            case 'idea':
                              return Lightbulb;
                            case 'project':
                              return Rocket;
                            case 'reading':
                              return BookOpen;
                            case 'coding':
                              return Code2;
                            case 'music':
                              return Music;
                            case 'photography':
                              return Camera;
                            case 'art':
                              return Palette;
                            case 'gaming':
                              return Gamepad2;
                            case 'language':
                              return Languages;
                            case 'community':
                              return Users;
                            default:
                              return Star;
                          }
                        };

                        const Icon = getIcon(achievement.id);
                        
                        return (
                          <motion.button
                            key={achievement.id}
                            onClick={() => handleAchievementClick(achievement)}
                            className={`p-4 rounded-lg border transition-all ${
                              isUnlocked
                                ? 'bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] border-[var(--neutral-200)] dark:border-[var(--neutral-700)] hover:border-[var(--neutral-300)] dark:hover:border-[var(--neutral-600)]'
                                : 'bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] border-[var(--neutral-100)] dark:border-[var(--neutral-800)] opacity-50'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                isUnlocked
                                  ? 'bg-purple-100 dark:bg-purple-900/30'
                                  : 'bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)]'
                              }`}>
                                {React.createElement(Icon, {
                                  className: `w-5 h-5 ${
                                    isUnlocked
                                      ? 'text-purple-500'
                                      : 'text-[var(--neutral-400)]'
                                  }`
                                })}
                              </div>
                              <div className="flex-1">
                                <h3 className={`font-medium ${
                                  isUnlocked
                                    ? 'text-[var(--foreground)]'
                                    : 'text-[var(--neutral-400)]'
                                }`}>
                                  {achievement.name}
                                </h3>
                                <p className={`text-sm ${
                                  isUnlocked
                                    ? 'text-[var(--neutral-600)] dark:text-[var(--neutral-400)]'
                                    : 'text-[var(--neutral-400)]'
                                }`}>
                                  {achievement.description}
                                </p>
                              </div>
                              {isUnlocked && (
                                <div className="text-green-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Instructions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-[var(--card)] rounded-xl p-6 shadow-lg border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">Comment jouer</h3>
                </div>
                <ul className="space-y-3 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Cliquez sur les points d&apos;intérêt sur la carte
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Résolvez les énigmes pour débloquer des contenus
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Collectez tous les badges pour compléter l&apos;exploration
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card)] rounded-xl p-6 shadow-lg border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">Récompenses</h3>
                </div>
                <ul className="space-y-3 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    Découvrez des contenus exclusifs sur mon parcours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    Apprenez-en plus sur mes compétences et expériences
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    Débloquez des informations sur mes centres d&apos;intérêt
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="max-w-7xl mx-auto px-6">
        <TimelineSlider
          timeframes={timeframes}
          currentTimeframe={currentTimeframe}
          onTimeframeChange={handleTimeframeChange}
        />
      </div>

      {/* Map Section */}
      <div id="map-section" className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] overflow-hidden"
        >
          <Map 
            locations={getEvents()} 
            onMarkerClick={handleLocationClick}
            currentTimeframe={currentTimeframe}
            solvedEvents={solvedLocations}
          />
        </motion.div>
      </div>

      {/* Modal */}
      {selectedLocation && (
        <PuzzleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          location={selectedLocation}
          onPuzzleSolved={handlePuzzleSolved}
          isAlreadySolved={solvedLocations.includes(selectedLocation.id)}
        />
      )}

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
    </div>
  );
}