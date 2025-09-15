import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface UserLocation {
  id: string;
  latitude: number;
  longitude: number;
}

const Maps: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [userLocations, setUserLocations] = useState<Record<string, UserLocation>>({});
  const [isClient, setIsClient] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [leafletMap, setLeafletMap] = useState<any>(null);

  // Initialize client side
  // Add markers when position or userLocations change
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isClient || !mapContainer || isMapLoaded) return;

    const initMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');
        
        // Fix for default markers
        delete (L as any).Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Create map
        const map = L.map(mapContainer).setView([28.9845, 77.7064], 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        setLeafletMap(map);
        setIsMapLoaded(true);

      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    initMap();
  }, [isClient, mapContainer, isMapLoaded]);

  // Get user location
  useEffect(() => {
    if (!isClient || !navigator.geolocation) {
      setPosition([28.9845, 77.7064]); // Fallback to Meerut
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const newPosition: [number, number] = [latitude, longitude];
        setPosition(newPosition);
        
        // Update map center if map is loaded
        if (leafletMap) {
          leafletMap.setView(newPosition, 13);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setPosition([28.9845, 77.7064]); // Fallback to Meerut
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [isClient, leafletMap]);

  // Add markers when position or userLocations change
  useEffect(() => {
    if (!leafletMap || !position) return;

    const L = (window as any).L;
    if (!L) return;

    // Clear existing markers
    leafletMap.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        leafletMap.removeLayer(layer);
      }
    });

    // Add current user marker
    const currentMarker = L.marker(position).addTo(leafletMap);
    currentMarker.bindPopup(`
      <div class="text-center">
        <b>Your Location</b><br>
        Lat: ${position[0].toFixed(5)}<br>
        Lng: ${position[1].toFixed(5)}
      </div>
    `);

    // Add other user markers
    Object.values(userLocations).forEach((user) => {
      const marker = L.marker([user.latitude, user.longitude]).addTo(leafletMap);
      marker.bindPopup(`
        <div class="text-center">
          <b>User:</b> ${user.id.slice(-4)}<br>
          Lat: ${user.latitude.toFixed(5)}<br>
          Lng: ${user.longitude.toFixed(5)}
        </div>
      `);
    });
  }, [leafletMap, position, userLocations]);

  // Handle SOS button
  const handleSOS = () => {
    setIsEmergency(true);
    console.log('Emergency SOS activated!');
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsEmergency(false);
    }, 3000);
  };

  // Loading state
  if (!isClient || !position) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* Leaflet CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" 
      />
      
      {/* Map Container */}
      <div 
        ref={setMapContainer}
        className="h-full w-full"
        style={{ height: '100vh', width: '100%' }}
      />
      
      {/* SOS Button */}
      <button
        onClick={handleSOS}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full font-bold text-white shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
          isEmergency 
            ? 'bg-red-700 animate-pulse scale-110' 
            : 'bg-red-600 hover:bg-red-700 hover:scale-105'
        }`}
      >
        {isEmergency ? (
          <span className="text-sm">HELP!</span>
        ) : (
          <Shield size={24} />
        )}
      </button>

      {/* Emergency Alert */}
      {isEmergency && (
        <div className="fixed top-4 left-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="text-center font-bold">
            🚨 EMERGENCY ALERT SENT! 🚨
          </div>
        </div>
      )}
    </div>
  );
};

export default Maps;