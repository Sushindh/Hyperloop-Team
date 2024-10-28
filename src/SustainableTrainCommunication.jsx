import React, { useState } from 'react';

const AnimatedArrow = ({ text, onClick }) => (
  <button 
    onClick={onClick}
    className="group relative inline-flex items-center justify-center text-white text-xl 
               bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl px-8 py-4 
               hover:-translate-y-1 transition-all duration-300 min-w-[300px] overflow-hidden"
  >
    {/* Background line container */}
    <div className="absolute inset-0 flex items-center justify-center w-full px-4">
      {/* Left outer line */}
      <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-white/30 
                     group-hover:w-8 -translate-x-2 transition-all duration-300 mr-2"/>
      
      {/* Right outer line */}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-white/30 
                     group-hover:w-8 translate-x-2 transition-all duration-300 ml-2"/>
    </div>

    {/* Left Arrow */}
    <span className="absolute left-0 top-1/2 -translate-x-20 -translate-y-1/2 opacity-0 
                     group-hover:opacity-100 group-hover:-translate-x-16 transition-all duration-300">
      <span className="relative block w-4">
        <span className="absolute top-1/2 left-0 w-2 h-0.5 bg-white -rotate-45 origin-left 
                        translate-y-[2px]"/>
        <span className="absolute top-1/2 left-0 w-2 h-0.5 bg-white rotate-45 origin-left 
                        -translate-y-[2px]"/>
      </span>
    </span>

    {/* Text */}
    <span className="relative z-10">{text}</span>

    {/* Right Arrow */}
    <span className="absolute right-0 top-1/2 translate-x-20 -translate-y-1/2 opacity-0 
                     group-hover:opacity-100 group-hover:translate-x-16 transition-all duration-300">
      <span className="relative block w-4">
        <span className="absolute top-1/2 right-0 w-2 h-0.5 bg-white -rotate-45 origin-right 
                        -translate-y-[2px]"/>
        <span className="absolute top-1/2 right-0 w-2 h-0.5 bg-white rotate-45 origin-right 
                        translate-y-[2px]"/>
      </span>
    </span>

    {/* Side lines containers */}
    <div className="absolute -left-8 inset-y-0 flex items-center">
      <div className="w-8 h-0.5 bg-white/30 scale-x-0 origin-right group-hover:scale-x-100 
                     transition-transform duration-300"/>
    </div>
    <div className="absolute -right-8 inset-y-0 flex items-center">
      <div className="w-8 h-0.5 bg-white/30 scale-x-0 origin-left group-hover:scale-x-100 
                     transition-transform duration-300"/>
    </div>
  </button>
);

// Rest of the component remains the same...

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 
                 animate-[fadeIn_0.5s_ease-in-out]"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-xl max-w-xl 
                   w-full mx-4 text-center text-white shadow-2xl 
                   animate-[scaleIn_0.5s_ease-in-out]"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-lg mb-6">{children}</p>
        <button 
          onClick={onClose}
          className="px-6 py-3 bg-orange-700 hover:bg-red-700 rounded-lg 
                     transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const SustainableTrainCommunication = () => {
  const [selectedDetail, setSelectedDetail] = useState(null);

  const menuItems = [
    { id: 'main', text: 'Main Concept', delay: '200ms' },
    { id: 'clientServerModel', text: 'Client-Server Model', delay: '400ms' },
    { id: 'energyEfficient', text: 'Energy-Efficient Solutions', delay: '600ms' },
    { id: 'greenIT', text: 'Green IT Initiatives', delay: '800ms' },
    { id: 'passengerExperience', text: 'Passenger Experience', delay: '1000ms' },
    { id: 'dataPrivacy', text: 'Data Privacy', delay: '1200ms' },
    { id: 'automation', text: 'Automation', delay: '1400ms' },
    { id: 'advancedTech', text: 'Advanced Technology', delay: '1600ms' }
  ];

  const details = {
    main: "The main concept focuses on enhancing sustainability in train communication systems.",
    clientServerModel: "The client-server model facilitates efficient data exchange and operational efficiency.",
    energyEfficient: "Implementing energy-efficient solutions can significantly reduce environmental impact.",
    greenIT: "Green IT initiatives aim to reduce carbon footprints and promote sustainable practices.",
    passengerExperience: "Improving passenger experience is essential for satisfaction and service quality.",
    dataPrivacy: "Data privacy is essential to protect user information in digital train communication systems.",
    automation: "Automation plays a key role in optimizing operations and enhancing efficiency.",
    advancedTech: "Advanced technology helps improve communication and operational effectiveness."
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br bg-[#F1F5F9]
                    flex flex-col items-center justify-center p-6 overflow-hidden">
      <h1 className="font-sans text-5xl font-bold mb-12 text-[#3e2723] text-center
                     animate-[fadeIn_1s_ease-in-out]">
        Sustainable Train Communication
      </h1>

      <div className="w-full max-w-2xl mx-auto opacity-0 
                      animate-[fadeIn_1s_ease-in-out_forwards] delay-500">
        <ul className="space-y-6">
          {menuItems.map(({ id, text, delay }) => (
            <li 
              key={id}
              className="opacity-0 flex justify-center items-center
                         animate-[slideIn_0.5s_ease-in-out_forwards]"
              style={{ animationDelay: delay }}
            >
              <AnimatedArrow 
                text={text} 
                onClick={() => setSelectedDetail(id)} 
              />
            </li>
          ))}
        </ul>
      </div>

      <Modal 
        isOpen={selectedDetail !== null} 
        onClose={() => setSelectedDetail(null)}
      >
        {selectedDetail && details[selectedDetail]}
      </Modal>

      <footer className="mt-auto p-5 text-center text-sm text-[#3e2723]">
        © 2024 Sustainable Train Communication Project
      </footer>
    </div>
  );
};

export default SustainableTrainCommunication;