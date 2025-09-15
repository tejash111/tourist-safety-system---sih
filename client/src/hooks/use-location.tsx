import { useState, useEffect } from "react";

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  accuracy: number;
}

export default function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        try {
          // In a real app, you would use a geocoding service
          // For now, we'll use a mock address based on coordinates
          const address = await getMockAddress(latitude, longitude);

          setLocation({
            lat: latitude,
            lng: longitude,
            address,
            accuracy: accuracy || 5,
          });
          setError(null);
        } catch (err) {
          setError("Failed to get address information");
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError(`Location error: ${err.message}`);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const getMockAddress = async (lat: number, lng: number): Promise<string> => {
    // Mock geocoding - in a real app, use a service like Google Maps Geocoding API
    if (lat >= 25.0 && lat <= 26.0 && lng >= 91.0 && lng <= 92.0) {
      return "Shillong, Meghalaya, India";
    }
    return `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`;
  };

  useEffect(() => {
    // Get initial location
    getCurrentLocation();

    // Watch location changes
    let watchId: number;
    if (navigator.geolocation) {
      // First, try to get a quick location without high accuracy
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const address = await getMockAddress(latitude, longitude);

          setLocation({
            lat: latitude,
            lng: longitude,
            address,
            accuracy: accuracy || 5,
          });
          setIsLoading(false);
        },
        () => {
          // If quick location fails, continue with watch
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 600000,
        }
      );

      // Then set up watching for more accurate location
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const address = await getMockAddress(latitude, longitude);

          setLocation({
            lat: latitude,
            lng: longitude,
            address,
            accuracy: accuracy || 5,
          });
          setIsLoading(false);
        },
        (err) => {
          console.warn("Location watch error:", err.message);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000, // Increased to 30 seconds
          maximumAge: 300000, // 5 minutes instead of 1 minute
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
  };
}
