import React, { useState } from 'react';
import { Map, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import Navbar from './Navbar';

const Map12 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header section with gradient */}
      <div className="bg-[#6366F1] h-20 shadow-lg" >< Navbar/></div>

      {/* Main content */}
      <div className="flex-1 p-6 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M54.627%200l.83.828-1.415%201.415L51.8%200h2.827zM5.373%200l-.83.828L5.96%202.243%208.2%200H5.374zM48.97%200l3.657%203.657-1.414%201.414L46.143%200h2.828zM11.03%200L7.372%203.657%208.787%205.07%2013.857%200H11.03zm32.284%200L49.8%206.485%2048.384%207.9l-7.9-7.9h2.83zM16.686%200L10.2%206.485%2011.616%207.9l7.9-7.9h-2.83zM22.343%200L13.858%208.485%2015.272%209.9l7.9-7.9h-.83zm5.657%200L19.515%208.485%2020.93%209.9l8.485-8.485h-1.414zM32.343%200L26.272%206.07l8.485-8.485h-2.414zm2.828%200l-4.95%204.95L39.8%2096.485%2048.284%200h-13.113zm13.114%200L39.8%208.485%2041.214%209.9l8.485-8.485h-1.414zM22.343%2012.343l-1.414%201.414%204.95%204.95L33.757%2011h-2.414L22.343%2012.343zM0%2038.636l2.843%202.843%201.414-1.414L0%2038.636zm13.114%200L0%2051.75l1.414%201.414L15.757%2038h-2.643zm18.385%200l-4.95%204.95%201.414%201.414%206.364-6.364h-2.828zm-9.9%200L4.343%2056.343l1.414%201.414L17.757%2038h-2.828zm2.828%200l7.071%207.071%201.414-1.414L20.585%2038h-2.828z%22%20fill%3D%22%236366F1%22%20fill-opacity%3D%220.4%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] pointer-events-none"></div>

        {/* Title section */}
        <div className="max-w-4xl mx-auto mb-6 relative">
          <div className="flex items-center space-x-3 mb-2">
            <Map className="h-6 w-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Chennai to Bangalore Route
            </h1>
          </div>
          <p className="text-gray-600">
            Interactive map showing the route between two major South Indian cities
          </p>
        </div>

        {/* Map container */}
        <div className="max-w-4xl mx-auto relative">
          <div className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-sm
            ${isFullscreen ? 'fixed inset-4 z-50 bg-white' : 'bg-white'}`}>
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
              </div>
            )}

            {/* Control buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
                <ZoomIn className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
                <ZoomOut className="h-5 w-5 text-gray-700" />
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Maximize2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1184323.448305606!2d78.24095319734008!3d12.882835079682923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!3m2!1d13.0843007!2d80.2704622!4m5!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!3m2!1d12.9715987!2d77.5945627!5e1!3m2!1sen!2sin!4v1730097228120!5m2!1sen!2sin"
              className={`w-full transition-all duration-300 ease-in-out
                ${isFullscreen ? 'h-full' : 'h-[600px]'}`}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                Distance <span className="ml-2">📏</span>
              </h3>
              <p className="text-gray-600">Approximately 350 km </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                Travel Time <span className="ml-2">🚗</span>
              </h3>
              <p className="text-gray-600">Around 6-7 hours by road via NH48</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                Travel Time <span className="ml-2">🚂</span>
              </h3>
              <p className="text-gray-600">Around 4.5-7 hours by Express Trains</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                Travel Time <span className="ml-2">🚄</span>
              </h3>
              <p className="text-gray-600">Around 1 hours by Hyperloop Train</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map12;