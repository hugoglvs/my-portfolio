'use client';

import { useState, useEffect } from 'react';
import { Timeframe } from '@/types';

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
    <div className="w-full px-3 py-8">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 right-0 h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
        
        {/* Timeline markers */}
        <div className="flex justify-between relative">
          {timeframes
            .filter(timeframe => timeframe.id !== 'intemporal')
            .map((timeframe, index) => (
            <div key={timeframe.id} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => handleTimeframeClick(timeframe.id, index)}
                className={`w-5 h-5 rounded-full mb-2 transition-all ${
                  index <= activeIndex 
                    ? 'bg-cyan-500 border-2 border-cyan-700' 
                    : 'bg-gray-400 border-2 border-gray-500'
                } ${
                  index === activeIndex 
                    ? 'transform scale-125 shadow-lg' 
                    : ''
                }`}
                aria-label={`View ${timeframe.name}`}
              />
              
              <div className={`absolute top-5 whitespace-nowrap text-sm font-medium transform -translate-x-1/2 left-1/2 transition-opacity ${
                index === activeIndex ? 'opacity-100' : 'opacity-60'
              }`}>
                <p className="font-bold text-center">{timeframe.name}</p>
                <p className="text-xs text-center text-gray-600">{timeframe.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 