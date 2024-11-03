import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Server, Leaf, Shield, Users, Zap, Cpu, Radio, X, ChevronRight, Info } from 'lucide-react';

const details = {
  main: {
    title: "Main Concept",
    description: "The main concept focuses on enhancing sustainability in train communication systems.",
    icon: <Train className="w-6 h-6" />,
    color: "from-green-400 to-green-600"
  },
  clientServerModel: {
    title: "Client-Server Model",
    description: "The client-server model facilitates efficient data exchange and operational efficiency.",
    icon: <Server className="w-6 h-6" />,
    color: "from-purple-400 to-purple-600"
  },
  energyEfficient: {
    title: "Energy Efficiency",
    description: "Implementing energy-efficient solutions can significantly reduce environmental impact.",
    icon: <Leaf className="w-6 h-6" />,
    color: "from-yellow-400 to-yellow-600"
  },
  greenIT: {
    title: "Green IT",
    description: "Green IT initiatives aim to reduce carbon footprints and promote sustainable practices.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-teal-400 to-teal-600"
  },
  passengerExperience: {
    title: "Passenger Experience",
    description: "Improving passenger experience is essential for satisfaction and service quality.",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-400 to-blue-600"
  },
  dataPrivacy: {
    title: "Data Privacy",
    description: "Data privacy is essential to protect user information in digital train communication systems.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-red-400 to-red-600"
  },
  automation: {
    title: "Automation",
    description: "Automation plays a key role in optimizing operations and enhancing efficiency.",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-indigo-400 to-indigo-600"
  },
  advancedTech: {
    title: "Advanced Technology",
    description: "Advanced technology helps improve communication and operational effectiveness.",
    icon: <Radio className="w-6 h-6" />,
    color: "from-cyan-400 to-cyan-600"
  }
};

const SustainableTrainCommunication = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('topics');

  useEffect(() => {
    if (selectedTopic) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [selectedTopic]);

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const TopicButton = ({ topic, details }) => (
    <motion.button
      className={`w-full p-6 text-white font-semibold rounded-2xl bg-gradient-to-r ${details.color} shadow-lg hover:shadow-xl transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-opacity-50`}
      onClick={() => setSelectedTopic(topic)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center">
          {details.icon}
          <span className="ml-3 text-lg">{details.title}</span>
        </span>
        <ChevronRight className="w-5 h-5" />
      </div>
    </motion.button>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Sustainable Train Communication
          </h1>
          <nav>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
              {['topics', 'about'].map((section) => (
                <button
                  key={section}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeSection === section
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeSection === 'topics' && (
            <motion.div
              key="topics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-2xl mx-auto"
            >
              {Object.entries(details).map(([topic, detail]) => (
                <TopicButton key={topic} topic={topic} details={detail} />
              ))}
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Sustainable Train Communication</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Our project aims to revolutionize train communication systems by implementing sustainable and efficient technologies. We focus on reducing environmental impact while improving operational efficiency and passenger experience.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
                <div className="flex items-start">
                  <Info className="w-6 h-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <p className="text-blue-700">
                    By integrating advanced technologies and green IT practices, we're paving the way for a more sustainable future in rail transportation.
                  </p>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Goals</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Reduce carbon footprint of train communication systems",
                  "Enhance operational efficiency through automation",
                  "Improve passenger experience with advanced technologies",
                  "Ensure data privacy and security in all communications"
                ].map((goal, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                    {goal}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isModalOpen && selectedTopic && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full m-4"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  {details[selectedTopic].icon}
                  <span className="ml-3">{details[selectedTopic].title}</span>
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {details[selectedTopic].description}
              </p>
              <div className="flex justify-end">
                <button 
                  className={`px-6 py-3 bg-gradient-to-r ${details[selectedTopic].color} text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-opacity-50`}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 Sustainable Train Communication Project</p>
            <nav className="mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-gray-300 transition-colors mx-3"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SustainableTrainCommunication;