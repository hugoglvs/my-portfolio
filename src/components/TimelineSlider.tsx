'use client';

import { useState, useEffect } from 'react';
import { Timeframe } from '@/types';
import { motion } from 'framer-motion';

interface TimelineSliderProps {
  timeframes: Timeframe[];
  currentTimeframe: string;
  onTimeframeChange: (timeframeId: string) => void;
}

export default function TimelineSlider({ 
  timeframes, 
  currentTimeframe, 
  onTimeframeChange 
}: TimelineSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Find the index of the current timeframe when it changes
  useEffect(() => {
    const index = timeframes.findIndex(t => t.id === currentTimeframe);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [currentTimeframe, timeframes]);

  const handleTimeframeClick = (timeframeId: string, index: number) => {
    setActiveIndex(index);
    onTimeframeChange(timeframeId);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="relative overflow-x-auto overflow-y-hidden">
        <div className="min-w-[600px]">
          {/* Slider container */}
          <div className="relative h-[60px] flex items-center">
            {/* Timeline line with gradient */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 top-1/2 transform -translate-y-1/2 rounded-full"></div>
            
            {/* Timeline markers */}
            <div className="flex justify-between relative w-full">
              {timeframes
                .filter(timeframe => timeframe.id !== 'intemporal')
                .map((timeframe, index) => {
                  const isActive = index === activeIndex;
                  const isPast = index < activeIndex;
                  
                  return (
                    <div key={timeframe.id} className="relative z-10 flex flex-col items-center min-w-[120px]">
                      <motion.button
                        onClick={() => handleTimeframeClick(timeframe.id, index)}
                        className={`w-8 h-8 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50' 
                            : isPast
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50'
                              : 'bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)]'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isPast ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : isActive ? (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-[var(--neutral-400)]"></div>
                          )}
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Text container */}
          <div className="flex justify-between relative w-full mt-4">
            {timeframes
              .filter(timeframe => timeframe.id !== 'intemporal')
              .map((timeframe, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <div key={timeframe.id} className="relative z-10 flex flex-col items-center min-w-[120px] px-2">
                    <motion.div 
                      className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'opacity-100 scale-110' 
                          : 'opacity-60 scale-100'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className={`font-bold text-center ${
                        isActive 
                          ? 'text-[var(--foreground)]' 
                          : 'text-[var(--neutral-600)] dark:text-[var(--neutral-400)]'
                      }`}>
                        {timeframe.name}
                      </p>
                      <p className={`text-xs text-center ${
                        isActive 
                          ? 'text-[var(--neutral-600)] dark:text-[var(--neutral-400)]' 
                          : 'text-[var(--neutral-400)]'
                      }`}>
                        {timeframe.period}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
} 