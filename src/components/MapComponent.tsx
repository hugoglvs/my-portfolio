'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fixLeafletIcon } from '@/lib/leaflet-utils';
import 'leaflet/dist/leaflet.css';
import { EventLocation } from '@/types';

interface MapComponentProps {
  locations: EventLocation[];
  onMarkerClick: (id: string) => void;
  currentTimeframe: string;
}

export default function MapComponent({ locations, onMarkerClick, currentTimeframe }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    fixLeafletIcon();
  }, []);

  // Filter locations based on the current timeframe
  const visibleLocations = locations.filter(location => 
    location.timeframe === currentTimeframe || location.timeframe === 'all'
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

  if (!isMounted) return <div className="h-full w-full bg-gray-200 animate-pulse"></div>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2.3}
      maxZoom={18}
      scrollWheelZoom={true}
      className="h-full w-full"
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
        return (
          <Marker 
            key={key}
            position={[location.lat, location.lng]}
          >
            <Popup>
              <div className="p-2">
                {events.length > 1 ? (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Multiple Events</h3>
                    <div className="space-y-2">
                      {events.map(event => (
                        <button
                          key={event.id}
                          onClick={() => onMarkerClick(event.id)}
                          className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                        >
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-lg">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.description}</p>
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