import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './Navbar';

const CHENNAI_COORDS = [13.0827, 80.2707];
const MUMBAI_COORDS = [19.0760, 72.8777];
const JOURNEY_DISTANCE = 1338; // Distance in KM

const TRAIN_ROUTE = [
  CHENNAI_COORDS,
  [17.3850, 78.4867], // Hyderabad
  [18.5204, 73.8567], // Pune
  MUMBAI_COORDS
];

const ROAD_ROUTE = [
  CHENNAI_COORDS,
  [15.829, 78.0368], // Kurnool
  // [17.3850, 78.4867], // Hyderabad
  [17.666, 75.905], //Solapur
  [18.5204, 73.8567], // Pune
  MUMBAI_COORDS
];

const createIcon = (url) => new L.Icon({
  iconUrl: url,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const trainIcon = createIcon('https://cdn-icons-png.flaticon.com/128/713/713309.png')
const carIcon = createIcon('https://cdn-icons-png.flaticon.com/512/744/744465.png');
const hyperloopIcon = createIcon('https://cdn-icons-png.flaticon.com/128/8397/8397575.png');

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

const TransportRouteMap = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedMode, setSelectedMode] = useState('hyperloop');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-[#6366F1] h-20"><Navbar /></div>
      <header className="text-indigo-600 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Chennai to Mumbai Route Comparison</h1>
          <p className="mt-2 text-indigo-500">Comparing different modes of transportation</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 px-4 text-lg font-medium ${activeTab === 'map' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => handleTabChange('map')}
              >
                Interactive Map
              </button>
              <button
                className={`flex-1 py-3 px-4 text-lg font-medium ${activeTab === 'comparison' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => handleTabChange('comparison')}
              >
                Mode Comparison
              </button>
            </div>

            {activeTab === 'map' && (
              <div className="h-[600px]">
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
                    <Popup>Train Route via Hyderabad and Pune</Popup>
                  </Polyline>
                  <Polyline positions={ROAD_ROUTE} color="#EF4444" weight={3}>
                    <Popup>Road Route via Major Cities</Popup>
                  </Polyline>
                  <Polyline positions={[CHENNAI_COORDS, MUMBAI_COORDS]} color="#8B5CF6" weight={3}>
                    <Popup>Hyperloop Direct Route</Popup>
                  </Polyline>
                  <Marker position={CHENNAI_COORDS}>
                    <Popup>Chennai</Popup>
                  </Marker>
                  <Marker position={MUMBAI_COORDS}>
                    <Popup>Mumbai</Popup>
                  </Marker>
                  <AnimatedMarker route={TRAIN_ROUTE} icon={trainIcon} duration={50000} />
                  <AnimatedMarker route={ROAD_ROUTE} icon={carIcon} duration={40000} />
                  <AnimatedMarker route={[CHENNAI_COORDS, MUMBAI_COORDS]} icon={hyperloopIcon} duration={10000} />
                </MapContainer>
              </div>
            )}

            {activeTab === 'comparison' && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Comparison of Travel Modes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {['hyperloop', 'train', 'car'].map((mode) => (
                    <button
                      key={mode}
                      className={`p-4 rounded-lg shadow transition-colors ${
                        selectedMode === mode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-800 hover:bg-indigo-100'
                      }`}
                      onClick={() => handleModeChange(mode)}
                    >
                      <h4 className="text-lg font-semibold mb-2 capitalize">{mode}</h4>
                      <p className="text-sm">
                        {mode === 'hyperloop' && 'Future of transportation'}
                        {mode === 'train' && 'Traditional rail network'}
                        {mode === 'car' && 'Personal vehicle'}
                      </p>
                    </button>
                  ))}
                </div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Metric</th>
                      <th className="text-left py-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Travel Time</td>
                      <td>
                        {selectedMode === 'hyperloop' && '2.5 hours'}
                        {selectedMode === 'train' && '24-26 hours'}
                        {selectedMode === 'car' && '20-22 hours'}
                      </td>
                    </tr>
                    <tr>
                      <td>Average Speed</td>
                      <td>
                        {selectedMode === 'hyperloop' && '600 km/h'}
                        {selectedMode === 'train' && '55-60 km/h'}
                        {selectedMode === 'car' && '65-70 km/h'}
                      </td>
                    </tr>
                    <tr>
                      <td>Cost</td>
                      <td>
                        {selectedMode === 'hyperloop' && '₹5000-7000 (estimated)'}
                        {selectedMode === 'train' && '₹1500-3000'}
                        {selectedMode === 'car' && '₹6000-8000 (fuel + tolls)'}
                      </td>
                    </tr>
                    <tr>
                      <td>Environmental Impact</td>
                      <td>
                        {selectedMode === 'hyperloop' && 'Low (electric powered)'}
                        {selectedMode === 'train' && 'Medium'}
                        {selectedMode === 'car' && 'High (fossil fuel dependent)'}
                      </td>
                    </tr>
                    <tr>
                      <td>Stops</td>
                      <td>
                        {selectedMode === 'hyperloop' && 'Direct route'}
                        {selectedMode === 'train' && 'Multiple stops via Hyderabad, Pune'}
                        {selectedMode === 'car' && 'Flexible stops via major cities'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Key Highlights</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Total distance between Chennai and Mumbai: {JOURNEY_DISTANCE} km</li>
              <li>Hyperloop could reduce travel time by up to 90% compared to traditional modes</li>
              <li>Train route offers comfortable overnight journey options</li>
              <li>Road journey provides flexibility but takes the longest time</li>
              <li>Each mode offers different trade-offs between cost, time, and convenience</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 Transport Route Comparison. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TransportRouteMap;