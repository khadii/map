"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Search,
  Info,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  MessageCircle,
  Send,
  Users,
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Types
interface City {
  id: number
  name: string
  country: string
  lat: number
  lng: number
}

interface WeatherData {
  today: {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    icon: string
  }
  tomorrow: {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    icon: string
  }
}

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: Date
  city?: string
}

// Sample cities data
const cities: City[] = [
  { id: 1, name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { id: 2, name: "New York", country: "USA", lat: 40.7128, lng: -74.006 },
  { id: 3, name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { id: 4, name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { id: 5, name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { id: 6, name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  { id: 7, name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { id: 8, name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { id: 9, name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
  { id: 10, name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  { id: 11, name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },
  { id: 12, name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { id: 13, name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
  { id: 14, name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { id: 15, name: "Buenos Aires", country: "Argentina", lat: -34.6118, lng: -58.396 },
  { id: 16, name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { id: 17, name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { id: 18, name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },
  { id: 19, name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
  { id: 20, name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
]

// Mock weather data generator
const generateWeatherData = (): WeatherData => {
  const conditions = ["sunny", "cloudy", "rainy", "snowy"]
  const icons = ["☀️", "☁️", "🌧️", "❄️"]

  const todayCondition = conditions[Math.floor(Math.random() * conditions.length)]
  const tomorrowCondition = conditions[Math.floor(Math.random() * conditions.length)]

  return {
    today: {
      temp: Math.floor(Math.random() * 35) + 5,
      condition: todayCondition,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: icons[conditions.indexOf(todayCondition)],
    },
    tomorrow: {
      temp: Math.floor(Math.random() * 35) + 5,
      condition: tomorrowCondition,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: icons[conditions.indexOf(tomorrowCondition)],
    },
  }
}

// Weather icon component
const WeatherIcon: React.FC<{ condition: string }> = ({ condition }) => {
  switch (condition) {
    case "sunny":
      return <Sun className="w-8 h-8 text-yellow-500" />
    case "cloudy":
      return <Cloud className="w-8 h-8 text-gray-500" />
    case "rainy":
      return <CloudRain className="w-8 h-8 text-blue-500" />
    case "snowy":
      return <CloudSnow className="w-8 h-8 text-blue-200" />
    default:
      return <Sun className="w-8 h-8 text-yellow-500" />
  }
}

// Simple Chat Component
const ChatInterface: React.FC<{
  selectedCity: City
  onClose: () => void
}> = ({ selectedCity, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [isUsernameSet, setIsUsernameSet] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate online users
  useEffect(() => {
    const simulatedUsers = ["WeatherExplorer", "CityLover", "TravelBug", "LocalGuide"]
    setOnlineUsers(simulatedUsers)

    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "System",
      message: `Welcome to ${selectedCity.name} chat! Share your thoughts about this amazing city.`,
      timestamp: new Date(),
      city: selectedCity.name,
    }
    setMessages([welcomeMessage])

    // Simulate some activity
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomUser = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)]
        const cityMessages = [
          `I love visiting ${selectedCity.name}!`,
          `The weather in ${selectedCity.name} is amazing today`,
          `Anyone know good restaurants in ${selectedCity.name}?`,
          `Just arrived in ${selectedCity.name}, any recommendations?`,
          `The culture in ${selectedCity.name} is fascinating`,
          `Planning a trip to ${selectedCity.name} next month`,
        ]

        const randomMessage: ChatMessage = {
          id: Date.now().toString() + Math.random(),
          username: randomUser,
          message: cityMessages[Math.floor(Math.random() * cityMessages.length)],
          timestamp: new Date(),
          city: selectedCity.name,
        }

        setMessages((prev) => [...prev, randomMessage])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [selectedCity])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isUsernameSet) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: username,
      message: newMessage,
      timestamp: new Date(),
      city: selectedCity.name,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setIsUsernameSet(true)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isUsernameSet) {
    return (
      <div className="fixed inset-0 bg-[#00000033] bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Join {selectedCity.name} Chat</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose a username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleUsernameSubmit()}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                maxLength={20}
              />
            </div>
            <button
              onClick={handleUsernameSubmit}
              disabled={!username.trim()}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Join Chat
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-5/6 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{selectedCity.name} Chat</h3>
              <p className="text-sm text-gray-600">{selectedCity.country}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{onlineUsers.length} online</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Online Users Sidebar */}
          <div className="w-48 bg-gray-50 border-r border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Online Users</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-blue-600">{username} (You)</span>
              </div>
              {onlineUsers.map((user, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{user}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.username === username ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.username === username
                        ? "bg-blue-500 text-white"
                        : message.username === "System"
                          ? "bg-gray-100 text-gray-800 border"
                          : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.username !== username && message.username !== "System" && (
                      <div className="text-xs font-semibold mb-1 text-gray-600">{message.username}</div>
                    )}
                    <div className="text-sm">{message.message}</div>
                    <div
                      className={`text-xs mt-1 ${message.username === username ? "text-blue-100" : "text-gray-500"}`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={`Message ${selectedCity.name} chat...`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  maxLength={500}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CityWeatherExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState<City>(cities[0])
  const [showWeather, setShowWeather] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)

  // Filter cities based on search term
  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Initialize Mock Map
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = {
        setCenter: (coords: [number, number]) => {
          console.log("Map centered to:", coords)
        },
        setZoom: (zoom: number) => {
          console.log("Map zoom set to:", zoom)
        },
      }
    }
  }, [])

  // Handle city selection
  const handleCitySelect = (city: City) => {
    setSelectedCity(city)
    setShowWeather(false)
    setShowChat(false)

    if (map.current) {
      map.current.setCenter([city.lng, city.lat])
      map.current.setZoom(10)
    }
  }

  // Handle weather info click
  const handleWeatherClick = () => {
    const weather = generateWeatherData()
    setWeatherData(weather)
    setShowWeather(true)
  }

  // Handle chat click
  const handleChatClick = () => {
    setShowChat(true)
    setShowWeather(false)
  }

  // Handle zoom
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  return (
    <div className="flex h-screen bg-gray-100 city-explorer-container">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col city-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800 mb-4">City Weather Explorer</h1>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Cities List */}
        <div className="flex-1 overflow-y-auto">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => handleCitySelect(city)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${
                selectedCity.id === city.id ? "bg-blue-100 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="font-medium text-gray-800">{city.name}</div>
              <div className="text-sm text-gray-500">{city.country}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative city-map-container">
        {/* Realistic Map Container */}
        <div
          ref={mapContainer}
          className="w-full h-full bg-blue-50 relative overflow-hidden"
          style={{
            backgroundImage: `
    linear-gradient(90deg, #f8f9fa 1px, transparent 1px),
    linear-gradient(180deg, #f8f9fa 1px, transparent 1px),
    linear-gradient(45deg, #e9ecef 25%, transparent 25%),
    linear-gradient(-45deg, #e9ecef 25%, transparent 25%)
  `,
            backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px, ${20 * zoomLevel}px ${20 * zoomLevel}px, ${40 * zoomLevel}px ${40 * zoomLevel}px, ${40 * zoomLevel}px ${40 * zoomLevel}px`,
            backgroundColor: "#f0f9ff",
          }}
        >
          {/* Map Street Patterns */}
          <div className="absolute inset-0">
            {/* Major Streets */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute bg-gray-400 opacity-40"
                  style={{
                    height: "1px",
                    width: "100%",
                    top: `${(i + 1) * 12.5}%`,
                  }}
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute bg-gray-400 opacity-40"
                  style={{
                    width: "1px",
                    height: "100%",
                    left: `${(i + 1) * 8.33}%`,
                  }}
                />
              ))}
            </div>

            {/* Geographic Features */}
            <div className="absolute inset-0">
              {/* Parks/Green Areas */}
              <div
                className="absolute bg-green-100 opacity-40 rounded-lg"
                style={{
                  width: "120px",
                  height: "80px",
                  top: "20%",
                  left: "15%",
                  transform: `scale(${zoomLevel})`,
                }}
              />
              <div
                className="absolute bg-green-100 opacity-40 rounded-lg"
                style={{
                  width: "90px",
                  height: "60px",
                  top: "60%",
                  right: "20%",
                  transform: `scale(${zoomLevel})`,
                }}
              />

              {/* Water Bodies */}
              <div
                className="absolute bg-blue-100 opacity-50 rounded-full"
                style={{
                  width: "100px",
                  height: "40px",
                  top: "70%",
                  left: "10%",
                  transform: `scale(${zoomLevel})`,
                }}
              />
            </div>

            {/* Neighborhood Labels */}
            <div className="absolute inset-0 text-gray-400 text-xs pointer-events-none">
              <div className="absolute" style={{ top: "25%", left: "20%", transform: `scale(${zoomLevel})` }}>
                DOWNTOWN
              </div>
              <div className="absolute" style={{ top: "45%", right: "25%", transform: `scale(${zoomLevel})` }}>
                BUSINESS DISTRICT
              </div>
              <div className="absolute" style={{ bottom: "30%", left: "15%", transform: `scale(${zoomLevel})` }}>
                HISTORIC QUARTER
              </div>
              <div className="absolute" style={{ top: "15%", right: "15%", transform: `scale(${zoomLevel})` }}>
                RESIDENTIAL
              </div>
            </div>
          </div>

          {/* Map Search Bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center space-x-3 max-w-md w-full">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`${selectedCity.name}, ${selectedCity.country}`}
                className="flex-1 text-gray-700 bg-transparent outline-none"
                value={`${selectedCity.name}, ${selectedCity.country}`}
                readOnly
              />
              <button className="bg-teal-500 text-white px-4 py-1 rounded-md text-sm hover:bg-teal-600">Search</button>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleZoomOut}
              className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* All Cities Markers */}
          {cities.map((city) => {
            // Calculate position based on lat/lng (simplified projection)
            const x = ((city.lng + 180) / 360) * 100
            const y = ((90 - city.lat) / 180) * 100

            return (
              <div
                key={city.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                }}
                onClick={() => handleCitySelect(city)}
              >
                {/* Teal City Marker - Similar to the image */}
                <div className={`relative group ${selectedCity.id === city.id ? "z-20" : "z-10"}`}>
                  {/* Location Pin */}
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full border-3 border-white shadow-lg transition-all duration-300 flex items-center justify-center ${
                        selectedCity.id === city.id
                          ? "bg-teal-600 scale-125"
                          : "bg-teal-500 hover:bg-teal-600 hover:scale-110"
                      }`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    {/* Pin Point */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-teal-500"></div>
                  </div>

                  {/* City Label - Show on hover or when selected */}
                  <div
                    className={`absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-3 py-2 text-sm whitespace-nowrap transition-all duration-300 ${
                      selectedCity.id === city.id
                        ? "opacity-100 visible"
                        : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                    }`}
                  >
                    <div className="font-bold text-gray-800">{city.name}</div>
                    <div className="text-gray-600 text-xs">{city.country}</div>
                    {/* Arrow pointing to marker */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Selected City Action Buttons */}
          {selectedCity && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative pointer-events-auto">
                {/* Action Buttons for Selected City */}
                <div className="flex space-x-4">
                  {/* Weather Info Button */}
                  <button
                    onClick={handleWeatherClick}
                    className="p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-blue-500"
                    title={`View weather forecast for ${selectedCity.name}`}
                  >
                    <Info className="w-6 h-6 text-blue-500" />
                  </button>

                  {/* Chat Button */}
                  <button
                    onClick={handleChatClick}
                    className="p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-green-500"
                    title={`Join ${selectedCity.name} chat`}
                  >
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </button>
                </div>

                {/* Selected City Info Panel */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-3 min-w-max">
                  <div className="text-center">
                    <div className="font-bold text-gray-800 text-lg">{selectedCity.name}</div>
                    <div className="text-sm text-gray-600">{selectedCity.country}</div>
                    <div className="text-xs text-gray-500 mt-1">Click icons for weather or chat</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {selectedCity.lat.toFixed(2)}°, {selectedCity.lng.toFixed(2)}°
                    </div>
                  </div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                </div>
              </div>
            </div>
          )}

          {/* Popular Sights Label */}
          <div className="absolute bottom-4 left-4 text-gray-500 text-sm font-semibold">POPULAR SIGHTS</div>

          {/* Weather Popup */}
          {showWeather && weatherData && (
            <div className="absolute inset-4 bg-white rounded-lg shadow-2xl p-6 overflow-y-auto z-30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Weather Forecast</h3>
                <button onClick={() => setShowWeather(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Today's Weather */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Today</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <WeatherIcon condition={weatherData.today.condition} />
                      <div>
                        <div className="text-2xl font-bold text-gray-800">{weatherData.today.temp}°C</div>
                        <div className="text-sm text-gray-600 capitalize">{weatherData.today.condition}</div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Droplets className="w-4 h-4 mr-1" />
                        {weatherData.today.humidity}%
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Wind className="w-4 h-4 mr-1" />
                        {weatherData.today.windSpeed} km/h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tomorrow's Weather */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Tomorrow</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <WeatherIcon condition={weatherData.tomorrow.condition} />
                      <div>
                        <div className="text-2xl font-bold text-gray-800">{weatherData.tomorrow.temp}°C</div>
                        <div className="text-sm text-gray-600 capitalize">{weatherData.tomorrow.condition}</div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Droplets className="w-4 h-4 mr-1" />
                        {weatherData.tomorrow.humidity}%
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Wind className="w-4 h-4 mr-1" />
                        {weatherData.tomorrow.windSpeed} km/h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && <ChatInterface selectedCity={selectedCity} onClose={() => setShowChat(false)} />}

      {/* Mobile Responsive Styles */}
      <style {...({ jsx: true, global: true } as any)}>{`
  .city-sidebar {
    width: 20rem;
  }

  @media (max-width: 768px) {
    .city-sidebar {
      width: 100% !important;
      max-height: 40vh !important;
    }

    .city-explorer-container {
      flex-direction: column !important;
    }

    .city-map-container {
      height: calc(100vh - 40vh);
    }
  }
`}</style>
    </div>
  )
}

export default CityWeatherExplorer
