import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Navbar from "./Navbar.jsx"
import FTD from "./images/FTD.png"
import FKMbg from "./FKMbg.jsx"
// Register all necessary components
Chart.register(...registerables);

function FastKmCalculator() {
  const [connected, setConnected] = useState(false);
  const [serverResponse, setServerResponse] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);
  const [userInput, setUserInput] = useState('Y');
  const [graphData, setGraphData] = useState({ labels: [], distances: [] });
  const [networkSpeed, setNetworkSpeed] = useState(0);
  const speedInKmH = 161; // Hyperloop speed in km/h
  const speedInKmS = speedInKmH / 3600; // Convert speed to km/s

  const simulateServerResponse = () => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      setTimeout(() => {
        const endTime = Date.now();
        const timeTaken = endTime - startTime; // Calculate time taken
        resolve(timeTaken);
      }, 500); // Simulating a 500ms delay
    });
  };

  const handleSendMessage = async () => {
    if (userInput.toLowerCase() === 'n') {
      setConnected(false);
      resetData(); // Reset data when disconnected
      return;
    }

    const timeTaken = await simulateServerResponse();
    setServerResponse('Message received');

    // Calculate network speed in requests per second
    const speed = 1000 / timeTaken; // Requests per second
    setNetworkSpeed(speed.toFixed(2));

    // Record the current total distance to the graph without resetting it
    setGraphData((prevData) => ({
      labels: [...prevData.labels, new Date().toLocaleTimeString()],
      distances: [...prevData.distances, totalDistance],
    }));
  };

  // Reset function to clear distance and graph data
  const resetData = () => {
    setTotalDistance(0);
    setGraphData({ labels: [], distances: [] });
    setUserInput('Y');
  };

  useEffect(() => {
    let interval;

    if (connected) {
      handleSendMessage(); // Initial message to simulate connection

      interval = setInterval(() => {
        setTotalDistance((prevDistance) => {
          const newDistance = prevDistance + speedInKmS; // Increase distance based on speed
          // Update graph continuously without resetting
          setGraphData((prevData) => ({
            labels: [...prevData.labels, new Date().toLocaleTimeString()],
            distances: [...prevData.distances, newDistance],
          }));
          return newDistance;
        });
      }, 1000); // Update distance every second
    }

    return () => {
      clearInterval(interval);
    };
  }, [connected]);

  return (
    <>
    <div className="bg-[#6366F1] h-20" >< Navbar/></div>
    <div className="min-h-screen flex items-center justify-center">
      <FKMbg />
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">🚄 Fast Km Calculator</h1>
        <p className="text-gray-700 text-center mb-2">
          Calculate distance covered by hyperloop trains in real-time!
        </p>
        {!connected ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
            onClick={() => setConnected(true)}
          >
            Connect to Server
          </button>
        ) : (
          <>
            <p className="mb-4 text-gray-800">Server Response: {serverResponse}</p>
            <p className="mb-4 text-gray-800">Total Distance: {totalDistance.toFixed(2)} km</p>
            <p className="mb-4 text-gray-800">Network Speed: {networkSpeed} requests/second</p>
            <div className="mb-4 w-full">
              <label htmlFor="userInput" className="block text-gray-700 mb-2">
                Continue? (Y/N):
              </label>
              <input
                type="text"
                id="userInput"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
              onClick={handleSendMessage}
            >
              Send Message
            </button>
            <div className="mt-6 w-full h-64">
              <Line
                data={{
                  labels: graphData.labels,
                  datasets: [
                    {
                      label: 'Distance Over Time',
                      data: graphData.distances,
                      borderColor: 'rgba(75,192,192,1)',
                      backgroundColor: 'rgba(75,192,192,0.2)',
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Distance (km)',
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Time',
                      },
                    },
                  },
                }}
              />
            </div>
          </>
        )}
        <footer className="mt-6 text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Train Tracking System
        </footer>
      </div>
    </div>
    </>
  );
}

export default FastKmCalculator;
