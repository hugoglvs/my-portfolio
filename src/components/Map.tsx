'use client';

import dynamic from 'next/dynamic';
import { EventLocation } from '@/types';

// Dynamically import the Map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface MapProps {
  locations: EventLocation[];
  onMarkerClick: (id: string) => void;
  currentTimeframe: string;
  solvedEvents: string[];
}

export default function Map({ locations, onMarkerClick, currentTimeframe, solvedEvents }: MapProps) {
  return (
    <div className="h-[70vh] w-full rounded-lg overflow-hidden">
      <MapComponent
        locations={locations}
        onMarkerClick={onMarkerClick}
        currentTimeframe={currentTimeframe}
        solvedEvents={solvedEvents}
      />
    </div>
  );
} 