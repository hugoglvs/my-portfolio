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

  // Create custom icons
  const blueIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const goldGreenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

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
        const isSolved = events.every(event => solvedEvents.includes(event.id));
        const isIntemporal = location.timeframe === 'intemporal';
        
        // Choose the appropriate icon based on the event type and solved status
        let icon;
        if (isIntemporal) {
          icon = isSolved ? goldGreenIcon : goldIcon;
        } else {
          icon = isSolved ? greenIcon : blueIcon;
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