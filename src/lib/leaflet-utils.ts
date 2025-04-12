'use client';

import L from 'leaflet';

// Fix Leaflet default icon issue in Next.js
export function fixLeafletIcon() {
  // Only run on client
  if (typeof window === 'undefined') return;

  // @ts-expect-error - Leaflet's types are not perfect with this method
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
} 