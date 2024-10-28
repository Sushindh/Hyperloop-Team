import React from 'react';

const FKMbg = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 800 400" 
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background */}
        <rect width="800" height="400" fill="#0F172A"/>
        
        {/* Grid Lines */}
        <path d="M50 50 H750 M50 150 H750 M50 250 H750 M50 350 H750" 
              stroke="#1E293B" strokeWidth="1"/>
        <path d="M150 50 V350 M300 50 V350 M450 50 V350 M600 50 V350" 
              stroke="#1E293B" strokeWidth="1"/>
        
        {/* Hyperloop Train */}
        <g transform="translate(200, 200)">
          {/* Main Body */}
          <path d="M0,0 L200,0 C220,0 240,-20 240,-20 C240,-20 220,-40 200,-40 L0,-40 C-20,-40 -40,-20 -40,-20 C-40,-20 -20,0 0,0 Z" 
                fill="url(#trainGradient)"/>
          
          {/* Windows */}
          <rect x="20" y="-30" width="20" height="20" rx="5" fill="#60A5FA" opacity="0.6"/>
          <rect x="60" y="-30" width="20" height="20" rx="5" fill="#60A5FA" opacity="0.6"/>
          <rect x="100" y="-30" width="20" height="20" rx="5" fill="#60A5FA" opacity="0.6"/>
          <rect x="140" y="-30" width="20" height="20" rx="5" fill="#60A5FA" opacity="0.6"/>
        </g>
        
        {/* Speed Indicator */}
        <g transform="translate(50, 100)">
          <text x="0" y="0" fill="#94A3B8" fontFamily="monospace">Speed:</text>
          <text x="70" y="0" fill="#60A5FA" fontFamily="monospace" fontWeight="bold">1,220 km/h</text>
        </g>
        
        {/* Distance Indicator */}
        <g transform="translate(50, 130)">
          <text x="0" y="0" fill="#94A3B8" fontFamily="monospace">Distance:</text>
          <text x="70" y="0" fill="#60A5FA" fontFamily="monospace" fontWeight="bold">500 km</text>
        </g>
        
        {/* Network Speed */}
        <g transform="translate(50, 160)">
          <text x="0" y="0" fill="#94A3B8" fontFamily="monospace">Network:</text>
          <text x="70" y="0" fill="#60A5FA" fontFamily="monospace" fontWeight="bold">5G | 1.2 Gbps</text>
        </g>
        
        {/* Signal Strength Indicator */}
        <g transform="translate(600, 100)">
          <rect x="0" y="0" width="5" height="20" fill="#60A5FA"/>
          <rect x="8" y="-5" width="5" height="25" fill="#60A5FA"/>
          <rect x="16" y="-10" width="5" height="30" fill="#60A5FA"/>
          <rect x="24" y="-15" width="5" height="35" fill="#60A5FA" opacity="0.3"/>
        </g>
        
        {/* Route Line */}
        <path d="M100,300 Q400,250 700,300" 
              stroke="#3B82F6" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,5"/>
        
        {/* Station Markers */}
        <circle cx="100" cy="300" r="5" fill="#3B82F6"/>
        <circle cx="700" cy="300" r="5" fill="#3B82F6"/>
        
        {/* Data Transmission Animation */}
        <circle cx="400" cy="200" r="3" fill="#60A5FA">
          <animate attributeName="r" 
                   values="3;10;3" 
                   dur="2s" 
                   repeatCount="indefinite"/>
          <animate attributeName="opacity" 
                   values="1;0;1" 
                   dur="2s" 
                   repeatCount="indefinite"/>
        </circle>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3B82F6' }}/>
            <stop offset="100%" style={{ stopColor: '#60A5FA' }}/>
          </linearGradient>
        </defs>
        
        {/* Legend */}
        <g transform="translate(600, 350)">
          <text x="0" y="0" fill="#94A3B8" fontFamily="monospace" fontSize="12">
            ● Active Connection
          </text>
          <text x="0" y="-20" fill="#94A3B8" fontFamily="monospace" fontSize="12">
            --- Route Path
          </text>
        </g>
      </svg>
    </div>
  );
};

export default FKMbg;