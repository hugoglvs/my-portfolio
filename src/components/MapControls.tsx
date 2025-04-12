import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapControls() {
  const map = useMap();

  useEffect(() => {
    // Add any map control initialization here
    // For now, we'll just return null as we don't need any specific controls
    return () => {
      // Cleanup if needed
    };
  }, [map]);

  return null;
} 