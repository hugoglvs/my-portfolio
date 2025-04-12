'use client';

import { useState, useEffect } from 'react';
import { Achievement } from '@/types';

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      
      // Automatically hide the popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500); // Call onClose after exit animation
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 max-w-md transform transition-all duration-500 ease-in-out z-[1100]
      ${isVisible 
        ? 'translate-x-0 opacity-100' 
        : 'translate-x-full opacity-0'}`}
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 mr-4">
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
                <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 text-white">
            <h3 className="font-bold text-lg">Achievement Unlocked!</h3>
            <p className="font-semibold">{achievement.title}</p>
            <p className="text-sm text-white text-opacity-80">{achievement.description}</p>
          </div>
          
          <button 
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 500);
            }}
            className="ml-2 text-white text-opacity-80 hover:text-opacity-100"
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Progress bar that counts down */}
        <div className="h-1 bg-white bg-opacity-20">
          <div 
            className="h-full bg-white transition-all duration-5000 ease-linear"
            style={{ width: '100%', animationName: isVisible ? 'shrink' : 'none' }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        .duration-5000 {
          animation-duration: 5000ms;
        }
      `}</style>
    </div>
  );
} 