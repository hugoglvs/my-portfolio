'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fixLeafletIcon } from '@/lib/leaflet-utils';
import 'leaflet/dist/leaflet.css';
import { EventLocation } from '@/types';
import L from 'leaflet';

interface MapComponentProps {
  locations: EventLocation[];
  onMarkerClick: (id: string) => void;
  currentTimeframe: string;
  solvedEvents: string[];
}

export default function MapComponent({ locations, onMarkerClick, currentTimeframe, solvedEvents }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    fixLeafletIcon();
  }, []);

  // Create custom icons with modern design
  const createCustomIcon = (color: string, isSolved: boolean = false) => {
    const size = isSolved ? 32 : 28;
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="${color}" fill-opacity="0.2"/>
        <circle cx="12" cy="12" r="6" fill="${color}"/>
        ${isSolved ? `
          <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        ` : ''}
      </svg>
    `;
    
    return new L.DivIcon({
      html: svg,
      className: 'custom-marker',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -size/2]
    });
  };

  // Define icon colors based on status
  const unsolvedIcon = createCustomIcon('#3B82F6'); // blue-500
  const solvedIcon = createCustomIcon('#10B981', true); // green-500
  const intemporalIcon = createCustomIcon('#F59E0B'); // amber-500
  const intemporalSolvedIcon = createCustomIcon('#10B981', true); // green-500

  // Filter locations based on the current timeframe
  const visibleLocations = locations.filter(location => 
    location.timeframe === currentTimeframe || 
    location.timeframe === 'intemporal'
  );

  // Group events by location
  const locationGroups = visibleLocations.reduce((groups, location) => {
    const key = `${location.lat},${location.lng}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(location);
    return groups;
  }, {} as Record<string, EventLocation[]>);

  if (!isMounted) return <div className="h-[70vh] w-full bg-gray-200 animate-pulse"></div>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2.3}
      maxZoom={18}
      scrollWheelZoom={true}
      className="h-[70vh] w-full"
      worldCopyJump={false}
      maxBounds={[[-85, -180], [85, 180]]}
      maxBoundsViscosity={0.5}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />
      
      {Object.entries(locationGroups).map(([key, events]) => {
        const location = events[0];
        const isSolved = events.every(event => solvedEvents.includes(event.id));
        const isIntemporal = location.timeframe === 'intemporal';
        
        // Choose the appropriate icon based on the event type and solved status
        let icon;
        if (isIntemporal) {
          icon = isSolved ? intemporalSolvedIcon : intemporalIcon;
        } else {
          icon = isSolved ? solvedIcon : unsolvedIcon;
        }

        return (
          <Marker 
            key={key}
            position={[location.lat, location.lng]}
            icon={icon}
          >
            <Popup>
              <div className="min-w-[200px]">
                {events.length > 1 ? (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Multiple Events</h3>
                    <div className="space-y-2">
                      {events.map(event => (
                        <button
                          key={event.id}
                          onClick={() => onMarkerClick(event.id)}
                          className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors relative"
                        >
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <div className="absolute top-2 right-2">
                            {solvedEvents.includes(event.id) ? (
                              <div className="text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              </div>
                            ) : (
                              <div className="text-gray-400">—</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div onClick={() => onMarkerClick(location.id)} className="cursor-pointer relative">
                    <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.description}</p>
                    <div className="absolute top-2 right-2">
                      {solvedEvents.includes(location.id) ? (
                        <div className="text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      ) : (
                        <div className="text-gray-400">—</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
} 