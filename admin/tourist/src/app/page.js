"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

// React Leaflet dynamic imports with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

const Home = () => {
  const [position, setPosition] = useState(null);
  const [userLocations, setUserLocations] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import leaflet on client side only
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);
      
      // Fix for default markers
      delete leaflet.default.Icon.Default.prototype._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      
      setCustomIcon(new leaflet.default.Icon.Default());
    });
  }, []);

  // Track current user location
  useEffect(() => {
    if (!isClient || !navigator.geolocation) return;

    const watcher = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setPosition([latitude, longitude]);
        socket.emit("send-location", { latitude, longitude });
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [isClient]);

  // Socket listeners
  useEffect(() => {
    if (!isClient) return;

    // Get existing users on connect
    socket.on("init-locations", (users) => setUserLocations(users));

    socket.on("receive-location", (user) => {
      setUserLocations((prev) => ({ ...prev, [user.id]: user }));
    });

    socket.on("user-disconnected", (id) => {
      setUserLocations((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    });

    return () => {
      socket.off("init-locations");
      socket.off("receive-location");
      socket.off("user-disconnected");
    };
  }, [isClient]);

  // Loading state
  if (!isClient || !position || !L || !customIcon) {
    return (
      <div className="m-10 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-10">
      <MapContainer center={position} zoom={13} scrollWheelZoom style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.values(userLocations).map((user) => (
          <Marker key={user.id} position={[user.latitude, user.longitude]} icon={customIcon}>
            <Popup>
              <b>User:</b> {user.id.slice(-4)} <br />
              Lat: {user.latitude.toFixed(5)} <br />
              Lng: {user.longitude.toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Home;