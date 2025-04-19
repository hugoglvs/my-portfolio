'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/types';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

export default function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setProgress(100);
  }, [achievement]);

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 25
          }}
          className="fixed top-4 right-4 z-50"
        >
          <div className="relative w-80 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg shadow-2xl overflow-hidden">
            {/* Confetti effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 - 50,
                    y: -100,
                    rotate: Math.random() * 360,
                    opacity: 1
                  }}
                  animate={{ 
                    y: 200,
                    opacity: 0,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute text-yellow-400"
                >
                  ✨
                </motion.div>
              ))}
            </div>

            <div className="relative p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
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
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">Succès Débloqué !</h3>
                  <p className="font-semibold text-white">{achievement.name}</p>
                  <p className="text-sm text-white text-opacity-80">{achievement.description}</p>
                </div>
                
                <button 
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 500);
                  }}
                  className="ml-2 text-white text-opacity-80 hover:text-opacity-100 transition-opacity"
                  aria-label="Fermer la notification"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Progress bar with glow effect */}
            <div className="h-1 bg-white bg-opacity-20 relative overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-white relative"
              >
                <div className="absolute inset-0 bg-white blur-sm opacity-50"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 