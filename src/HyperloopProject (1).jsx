'use client'
import {Link} from "react-router-dom"
import HP1 from "./HyperloopProject (1).jsx"
import Map from "./Map12.jsx"
import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { motion } from "framer-motion"
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Navbar from './Navbar.jsx'

// Constants
const MAX_SPEED = 600
const ACCELERATION = 30
const DECELERATION = 20
const MIN_SPEED = 10
const BASE_DATA_RATE = 100
const SIGNAL_SPEED = 200000
const BASE_LATENCY = 0.5
const JOURNEY_DISTANCE = 350
const MAX_PASSENGERS = 28

// Chennai coordinates
const CHENNAI_COORDS = [13.0827, 80.2707]
// Bangalore coordinates
const BANGALORE_COORDS = [12.9716, 77.5946]

// Stations
const STATIONS = [
  { name: "Chennai", coords: CHENNAI_COORDS, distance: 0 },
  { name: "Vellore", coords: [12.9165, 79.1325], distance: 120 },
  { name: "Krishnagiri", coords: [12.5266, 78.2141], distance: 230 },
  { name: "Bangalore", coords: BANGALORE_COORDS, distance: JOURNEY_DISTANCE }
]

// Calculate intermediate point
const calculateIntermediatePoint = (start, end, fraction) => [
  start[0] + (end[0] - start[0]) * fraction,
  start[1] + (end[1] - start[1]) * fraction
]

// Custom train icon
const trainIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/8397/8397575.png',
  iconSize: [30, 30],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
})

function MapComponent({ totalDistance, weather }) {
  const map = useMap()
  const fraction = totalDistance / JOURNEY_DISTANCE
  const currentPosition = calculateIntermediatePoint(CHENNAI_COORDS, BANGALORE_COORDS, fraction)

  useEffect(() => {
    map.setView(currentPosition, map.getZoom())
  }, [map, currentPosition])

  // Add a click handler to zoom in on the train
  useMapEvents({
    click(e) {
      const clickedPoint = e.latlng
      const trainPoint = L.latLng(currentPosition)
      if (clickedPoint.distanceTo(trainPoint) <= 50000) { // 50km radius for easier clicking
        map.setView(currentPosition, Math.max(map.getZoom() + 2, 12))
      }
    },
  })

  return (
    <>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={[CHENNAI_COORDS, BANGALORE_COORDS]} color="#007AFF" weight={3} />
      {STATIONS.map((station, index) => (
        <Marker key={index} position={station.coords}>
          <Popup>
            <strong>{station.name}</strong><br />
            Distance: {station.distance} km
          </Popup>
        </Marker>
      ))}
      <Marker position={currentPosition} icon={trainIcon}>
        <Popup>
          <div className="p-2">
            <div className="font-bold mb-1">Current Position</div>
            <div className="flex items-center text-sm">
              <div className="mr-2">Weather:</div>
              <span className="ml-1">{weather}</span>
            </div>
            <button 
              className="mt-2 bg-[#007AFF] text-white px-3 py-1 rounded-md text-sm"
              onClick={() => map.setView(currentPosition, 12)}
            >
              Zoom to Train
            </button>
          </div>
        </Popup>
      </Marker>
    </>
  )
}

MapComponent.propTypes = {
  totalDistance: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
}

function RealtimeClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    })
  }

  return (
    <>
    
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="pb-4 bg-gradient-to-r from-[#007AFF] to-[#5856D6] p-4">
        <h2 className="text-2xl font-medium text-white flex items-center">
          Current Time (IST)
        </h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="text-4xl font-bold text-[#1D1D1F] tabular-nums">
            {formatTime(time)}
          </div>
          <div className="text-lg text-[#8E8E93] flex items-center">
            {formatDate(time)}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function SystemStatus({ 
  temperature = 24,
  humidity = 65,
  passengers,
  maxPassengers,
  batteryLevel = 85,
  signalStrength = 90,
  systemStatus = 'operational'
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-[#34C759]'
      case 'warning':
        return 'text-[#FF9500]'
      case 'error':
        return 'text-[#FF3B30]'
      default:
        return 'text-[#34C759]'
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="pb-4 bg-gradient-to-r from-[#34C759] to-[#30D158] p-4">
        <h2 className="text-2xl font-medium text-white flex items-center justify-between">
          <span>System Status</span>
          <div className={`flex items-center text-sm bg-white/20 px-3 py-1 rounded-full ${getStatusColor(systemStatus)}`}>
            <span className="capitalize">{systemStatus}</span>
          </div>
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F2F2F7] p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[#8E8E93]">Temperature</span>
              </div>
              <span className="font-medium text-[#1D1D1F]">{temperature}°C</span>
            </div>
            <div className="mt-2 text-sm text-[#8E8E93]">
              Humidity: {humidity}%
            </div>
          </div>
          <div className="bg-[#F2F2F7] p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[#8E8E93]">Passengers</span>
              </div>
              <span className="font-medium text-[#1D1D1F]">{passengers}/{maxPassengers}</span>
            </div>
            <div className="mt-2 w-full bg-[#D1D1D6] h-2 rounded-full">
              <motion.div 
                className="bg-[#007AFF] h-2 rounded-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${(passengers / maxPassengers) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-[#F2F2F7] p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[#8E8E93]">Battery</span>
              </div>
              <span className="font-medium text-[#1D1D1F]">{batteryLevel}%</span>
            </div>
            <div className="mt-2 w-full bg-[#D1D1D6] h-2 rounded-full">
              <motion.div 
                className="bg-[#34C759] h-2 rounded-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${batteryLevel}%` }}
              />
            </div>
          </div>
          <div className="bg-[#F2F2F7] p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[#8E8E93]">Signal</span>
              </div>
              <span className="font-medium text-[#1D1D1F]">{signalStrength}%</span>
            </div>
            <div className="mt-2 w-full bg-[#D1D1D6] h-2 rounded-full">
              <motion.div 
                className="bg-[#5856D6] h-2 rounded-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${signalStrength}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SystemStatus.propTypes = {
  temperature: PropTypes.number,
  humidity: PropTypes.number,
  passengers: PropTypes.number.isRequired,
  maxPassengers: PropTypes.number.isRequired,
  batteryLevel: PropTypes.number,
  signalStrength: PropTypes.number,
  systemStatus: PropTypes.oneOf(['operational', 'warning', 'error']),
}

function JourneyStatus({
  currentSpeed,
  totalDistance,
  elapsedTime,
  isRunning,
  onStartStop,
  onTerminate,
  isJourneyComplete,
  hasJourneyStarted
}) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="pb-4 bg-gradient-to-r from-[#007AFF] to-[#5856D6] p-4">
        <h2 className="text-2xl font-medium text-white">Journey Status</h2>
        <p className="text-[#E5E5EA]">
          Current journey metrics and controls
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93]">Speed</span>
              <span className="text-2xl font-medium text-[#1D1D1F]">
                {currentSpeed.toFixed(0)} km/h
              </span>
            </div>
            <div className="w-full bg-[#D1D1D6] h-2 rounded-full">
              <motion.div 
                className="bg-[#007AFF] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentSpeed / MAX_SPEED) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F2F2F7] p-4 rounded-xl">
              <div className="text-sm text-[#8E8E93]">Distance</div>
              <div className="text-xl font-medium text-[#1D1D1F]">
                {totalDistance.toFixed(1)} km
              </div>
            </div>
            <div className="bg-[#F2F2F7] p-4 rounded-xl">
              <div className="text-sm text-[#8E8E93]">Elapsed Time</div>
              <div className="text-xl font-medium text-[#1D1D1F] tabular-nums">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onStartStop}
              className={`flex-1 py-4 text-lg font-medium rounded-xl transition-colors duration-300 ${
                isRunning ? 'bg-[#FF3B30] hover:bg-[#FF453A]' : 'bg-[#34C759] hover:bg-[#30D158]'
              }`}
            >
              {isRunning ? 'Pause' : hasJourneyStarted && !isJourneyComplete ? 'Resume' : 'Start'} Journey
            </button>
            {hasJourneyStarted && !isJourneyComplete && (
              <button 
                onClick={onTerminate}
                className="px-6 py-4 text-lg font-medium rounded-xl bg-[#FF3B30] hover:bg-[#FF453A] transition-colors duration-300"
              >
                Stop  Journey
              </button>
            )}
          </div>
          
          {isJourneyComplete && (
            <button 
              onClick={onStartStop}
              className="w-full mt-4 py-4 text-lg font-medium rounded-xl bg-[#007AFF] hover:bg-[#0071E3] transition-colors duration-300"
            >
              Start New Journey
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

JourneyStatus.propTypes = {
  currentSpeed: PropTypes.number.isRequired,
  totalDistance:  PropTypes.number.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onStartStop: PropTypes.func.isRequired,
  onTerminate: PropTypes.func.isRequired,
  isJourneyComplete: PropTypes.bool.isRequired,
  hasJourneyStarted: PropTypes.bool.isRequired,
}

function HyperloopControlCenter() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [totalDistance, setTotalDistance] = useState(0)
  const [graphData, setGraphData] = useState([])
  const [networkSpeed, setNetworkSpeed] = useState(BASE_DATA_RATE)
  const [uploadSpeed, setUploadSpeed] = useState(0)
  const [downloadSpeed, setDownloadSpeed] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showSpeedModal, setShowSpeedModal] = useState(false)
  const [energyConsumption, setEnergyConsumption] = useState(0)
  const [weather, setWeather] = useState('Sunny')
  const [passengers, setPassengers] = useState(0)
  const [isJourneyComplete, setIsJourneyComplete] = useState(false)
  const [hasJourneyStarted, setHasJourneyStarted] = useState(false)
  const [systemStatus, setSystemStatus] = useState('operational')

  const updateSimulation = useCallback(() => {
    setCurrentSpeed(prevSpeed => {
      const action = Math.random()
      let speedChange = 0
      if (action < 0.5) {
        speedChange = Math.random() * ACCELERATION
      } else if (action < 0.9) {
        speedChange = -Math.random() * DECELERATION
      }
      return Math.min(Math.max(prevSpeed + speedChange, MIN_SPEED), MAX_SPEED)
    })

    setTotalDistance(prevDistance => {
      const distanceTravelled = currentSpeed / 3600
      const newDistance = prevDistance + distanceTravelled
      const latencyFactor = 1 + ((currentSpeed / SIGNAL_SPEED) * BASE_LATENCY * 10)
      const effectiveNetworkSpeed = BASE_DATA_RATE / latencyFactor
      setNetworkSpeed(Number(effectiveNetworkSpeed.toFixed(2)))

      const simulatedUploadSpeed = (Math.random() * effectiveNetworkSpeed).toFixed(2)
      const simulatedDownloadSpeed = (Math.random() * effectiveNetworkSpeed).toFixed(2)
      setUploadSpeed(Number(simulatedUploadSpeed))
      setDownloadSpeed(Number(simulatedDownloadSpeed))

      const newEnergyConsumption = energyConsumption + (currentSpeed * 0.1)
      setEnergyConsumption(newEnergyConsumption)

      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        distance: Number(newDistance.toFixed(2)),
        speed: Number(currentSpeed.toFixed(2)),
        networkSpeed: Number(effectiveNetworkSpeed.toFixed(2)),
        energy: Number(newEnergyConsumption.toFixed(2)),
      }
      setGraphData(prevData => [...prevData, newDataPoint].slice(-60))

      // Update system status based on various metrics
      if (currentSpeed > MAX_SPEED * 0.9) {
        setSystemStatus('warning')
      } else if (networkSpeed < BASE_DATA_RATE * 0.5) {
        setSystemStatus('warning')
      } else {
        setSystemStatus('operational')
      }

      return newDistance
    })

    setElapsedTime(prevTime => prevTime + 1)

    // Simulate weather changes
    if (Math.random() < 0.05) {
      const weathers = ['Sunny', 'Cloudy', 'Rainy']
      setWeather(weathers[Math.floor(Math.random() * weathers.length)])
    }

    // Update passenger count at stations
    const currentStation = STATIONS.find(station => Math.abs(station.distance - totalDistance) < 1)
    if (currentStation) {
      const passengerChange = Math.floor(Math.random() * 5) - 2 // Random change between -2 and 2
      setPassengers(prev => Math.min(Math.max(prev + passengerChange, 0), MAX_PASSENGERS))
    }
  }, [currentSpeed, energyConsumption, totalDistance])

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(updateSimulation, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, updateSimulation])

  const handleStartStop = () => {
    setIsRunning(prev => !prev)
    if (!isRunning) {
      if (!hasJourneyStarted || isJourneyComplete) {
        // Reset all states for a new journey
        setCurrentSpeed(0)
        setTotalDistance(0)
        setGraphData([])
        setNetworkSpeed(BASE_DATA_RATE)
        setElapsedTime(0)
        setEnergyConsumption(0)
        setPassengers(0)
        setIsJourneyComplete(false)
        setHasJourneyStarted(true)
        setSystemStatus('operational')
        alert("New Journey Started: Beginning a new Hyperloop journey from Chennai to Bangalore.")
      } else {
        alert("Journey Resumed: Continuing the current journey.")
      }
    } else {
      alert("Journey Paused: The Hyperloop journey has been paused. You can resume at any time.")
    }
  }

  const handleTerminateJourney = () => {
    setIsRunning(false)
    setIsJourneyComplete(true)
    setSystemStatus('error')
    alert("Journey Terminated: The journey has been stopped. You can start a new journey.")
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setShowSpeedModal(true)
      setUserInput('')
      alert("Message Sent: Your message has been successfully transmitted.")
    }, 1000)
  }

  useEffect(() => {
    if (totalDistance >= JOURNEY_DISTANCE) {
      setIsRunning(false)
      setIsJourneyComplete(true)
      alert(`Journey Completed! You've reached Bangalore. Total distance covered: ${totalDistance.toFixed(2)} km.`)
    }
  }, [totalDistance])

  const [showHyperProj, setShowHyperProj] = useState(false)

  if (showHyperProj) {
    return <HyperloopProject />
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800"
      onClick={() => setShowHyperProj(true)}>
        Back
      </button>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-semibold text-[#1D1D1F]">Hyperloop Control Center</h1>
            <p className="text-lg text-[#86868B]">Chennai to Bangalore Route Monitor</p>
          </div>
          <RealtimeClock />
        </div>
        
        <SystemStatus 
          passengers={passengers}
          maxPassengers={MAX_PASSENGERS}
          systemStatus={systemStatus}
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          <JourneyStatus 
            currentSpeed={currentSpeed}
            totalDistance={totalDistance}
            elapsedTime={elapsedTime}
            isRunning={isRunning}
            onStartStop={handleStartStop}
            onTerminate={handleTerminateJourney}
            isJourneyComplete={isJourneyComplete}
            hasJourneyStarted={hasJourneyStarted}
          />

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="pb-4 bg-gradient-to-r from-[#5856D6] to-[#007AFF] p-4">
              <h2 className="text-2xl font-medium text-white">Network Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F2F2F7] p-4 rounded-xl">
                    <div className="text-sm text-[#8E8E93]">Upload Speed</div>
                    <div className="text-xl font-medium text-[#1D1D1F]">{uploadSpeed.toFixed(2)} Mbps</div>
                  </div>
                  <div className="bg-[#F2F2F7] p-4 rounded-xl">
                    <div className="text-sm text-[#8E8E93]">Download Speed</div>
                    <div className="text-xl font-medium text-[#1D1D1F]">{downloadSpeed.toFixed(2)} Mbps</div>
                  </div>
                </div>

                <div className="bg-[#F2F2F7] p-4 rounded-xl">
                  <div className="text-sm text-[#8E8E93]">Network Latency</div>
                  <div className="text-xl font-medium text-[#1D1D1F]">{networkSpeed.toFixed(2)} Mbps</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden md:col-span-2">
            <div className="pb-4 bg-gradient-to-r from-[#FF9500] to-[#FF3B30] p-4">
              <h2 className="text-2xl font-medium text-white">Performance Analytics</h2>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={graphData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                  <XAxis dataKey="time" stroke="#8E8E93" />
                  <YAxis stroke="#8E8E93" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone"
                    dataKey="speed"
                    name="Speed (km/h)"
                    stroke="#007AFF"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="networkSpeed"
                    name="Network (Mbps)"
                    stroke="#34C759"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden md:col-span-2">
            <div className="pb-4 bg-gradient-to-r from-[#34C759] to-[#30D158] p-4">
              <h2 className="text-2xl font-medium text-white">Energy Consumption</h2>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={graphData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                  <XAxis dataKey="time" stroke="#8E8E93" />
                  <YAxis stroke="#8E8E93" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    name="Energy (kWh)"
                    stroke="#FF9500"
                    fill="#FF9500"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden md:col-span-2">
            <div className="pb-4 bg-gradient-to-r from-[#34C759] to-[#30D158] p-4">
              <h2 className="text-2xl font-medium text-white">Journey Progress</h2>
            </div>
            <div className="p-6">
              <div className="relative pt-8 pb-16">
                <div className="w-full bg-[#E5E5EA] h-2 rounded-full">
                  <motion.div 
                    className="bg-[#34C759] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalDistance / JOURNEY_DISTANCE) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center">
                    <span className="font-medium text-[#1D1D1F]">Chennai</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-[#1D1D1F]">Bangalore</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden md:col-span-2 relative z-[1]">
            <div className="pb-4 bg-gradient-to-r from-[#5AC8FA] to-[#007AFF] p-4">
              <h2 className="text-2xl font-medium text-white">Live Journey Map</h2>
            </div>
            <div className="p-6">
              <div className="w-full h-[400px] rounded-xl overflow-hidden relative">
                <MapContainer
                  center={CHENNAI_COORDS}
                  zoom={7}
                  style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
                  className="z-0"
                >
                  <MapComponent totalDistance={totalDistance} weather={weather} />
                </MapContainer>
              </div>
              <div className="mt-4 text-sm text-[#8E8E93]">
                Click near the train or use the "Zoom to Train" button in the popup to focus on the train's location.
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden md:col-span-2">
            <div className="pb-4 bg-gradient-to-r from-[#FF9500] to-[#FF3B30] p-4">
              <h2 className="text-2xl font-medium text-white">Communication Center</h2>
            </div>
            <div className="p-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 rounded-xl border-[#D1D1D6] focus:border-[#007AFF] focus:ring focus:ring-[#007AFF] focus:ring-opacity-50 p-2"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isSending || !userInput.trim()}
                  className="px-8 bg-[#007AFF] hover:bg-[#0071E3] rounded-xl transition-colors duration-300 text-white"
                >
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {showSpeedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90vw] max-w-md">
              <h2 className="text-2xl font-medium text-[#1D1D1F]">Message Status</h2>
              <p className="mt-2 text-[#8E8E93]">Your message has been sent successfully.</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Upload Speed:</span>
                  <span className="font-medium text-[#1D1D1F]">{uploadSpeed.toFixed(2)} Mbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Download Speed:</span>
                  <span className="font-medium text-[#1D1D1F]">{downloadSpeed.toFixed(2)} Mbps</span>
                </div>
              </div>
              <button 
                onClick={() => setShowSpeedModal(false)}
                className="mt-6 w-full bg-[#007AFF] hover:bg-[#0071E3] text-white px-8 py-3 rounded-xl transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HyperloopProject() {
  const [showControlCenter, setShowControlCenter] = useState(false)

  if (showControlCenter) {
    return <HyperloopControlCenter />
  }

  return (
    <>
    <div className="bg-[#6366F1] h-20 shadow-lg" >< Navbar/></div>
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-[#1D1D1F]">Advanced Hyperloop Journey Simulator</h1>
        <p className="text-xl text-[#86868B]">
          Welcome to the cutting-edge Hyperloop Journey Simulator, designed to showcase the future of high-speed transportation between Chennai and Bangalore.
        </p>
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="pb-4 bg-gradient-to-r from-[#007AFF] to-[#5856D6] p-4">
            <h2 className="text-2xl font-medium text-white">Project Overview</h2>
          </div>
          <div className="p-6 space-y-4">
            <p>
              This simulator provides a real-time visualization of a Hyperloop journey, complete with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Live speed and distance tracking</li>
              <li>Energy consumption monitoring</li>
              <li>Network performance analysis</li>
              <li>Interactive map with real-time position updates</li>
              <li>System status and environmental condition reporting</li>
            </ul>
            <p>
              Experience the thrill of traveling at speeds up to 600 km/h while monitoring every aspect of the journey from our state-of-the-art control center.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="pb-4 bg-gradient-to-r from-[#34C759] to-[#30D158] p-4">
            <h2 className="text-2xl font-medium text-white">Key Features</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-[#34C759] p-2 rounded-full mr-4">
                  <span className="text-white">👥</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1D1D1F]">Passenger Tracking</h3>
                  <p className="text-[#86868B]">Monitor real-time passenger count and capacity</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#FF9500] p-2 rounded-full mr-4">
                  <span className="text-white">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1D1D1F]">Energy Monitoring</h3>
                  <p className="text-[#86868B]">Track energy consumption throughout the journey</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#FF3B30] p-2 rounded-full mr-4">
                  <span className="text-white">📡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1D1D1F]">Network Analysis</h3>
                  <p className="text-[#86868B]">Analyze upload and download speeds in real-time</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#5856D6] p-2 rounded-full mr-4">
                  <span className="text-white">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1D1D1F]">Interactive Map</h3>
                  <p className="text-[#86868B]">Visualize the journey with live position updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowControlCenter(true)}
          className="w-full py-4 text-lg font-medium rounded-xl bg-[#007AFF] hover:bg-[#0071E3] transition-colors duration-300 text-white"
        >
          Launch Control Center →
        </button>
      </div>
    </div>
    </>
  )
}
