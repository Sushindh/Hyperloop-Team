import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './Navbar.jsx';

const CHENNAI_COORDS = [13.0827, 80.2707];
const MUMBAI_COORDS = [19.0760, 72.8777];

const TRAIN_ROUTE = [
  CHENNAI_COORDS,
  [17.3850, 78.4867], // Hyderabad
  [18.5204, 73.8567], // Pune
  MUMBAI_COORDS
];

const createIcon = (url) => new L.Icon({
  iconUrl: url,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const trainIcon = createIcon('https://cdn-icons-png.flaticon.com/128/713/713309.png');

const AnimatedMarker = ({ route, icon, duration }) => {
  const [position, setPosition] = useState(route[0]);
  const map = useMap();

  useEffect(() => {
    let start = null;
    let requestId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;

      if (progress < 1) {
        const index = Math.floor(progress * (route.length - 1));
        const nextIndex = Math.min(index + 1, route.length - 1);
        const ratio = progress * (route.length - 1) - index;

        const newLat = route[index][0] + (route[nextIndex][0] - route[index][0]) * ratio;
        const newLng = route[index][1] + (route[nextIndex][1] - route[index][1]) * ratio;

        setPosition([newLat, newLng]);
        requestId = requestAnimationFrame(animate);
      } else {
        setPosition(route[route.length - 1]);
      }
    };

    requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [route, duration, map]);

  return <Marker position={position} icon={icon} />;
};

const HyperloopRouteMap = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-[#6366F1] h-20"><Navbar /></div>
      <header className="text-indigo-600 p-4 ">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Chennai to Mumbai Train Route</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px]">
            <MapContainer
              center={[(CHENNAI_COORDS[0] + MUMBAI_COORDS[0]) / 2, (CHENNAI_COORDS[1] + MUMBAI_COORDS[1]) / 2]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Polyline positions={TRAIN_ROUTE} color="#3B82F6" weight={3}>
                <Popup>Train Route</Popup>
              </Polyline>
              <Marker position={CHENNAI_COORDS}><Popup>Chennai</Popup></Marker>
              <Marker position={MUMBAI_COORDS}><Popup>Mumbai</Popup></Marker>
              <AnimatedMarker route={TRAIN_ROUTE} icon={trainIcon} duration={40000} />
            </MapContainer>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 Train Route Map. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HyperloopRouteMap;