import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const terms = [
  {
    title: 'Welcome to the Hyperloop Journey Simulator',
    details: [
      'These Terms of Service govern your access to and use of our simulation platform.',
      'By using our Service, you agree to comply with these Terms.',
      'If you do not agree, please refrain from using the Service.',
    ],
  },
  {
    title: 'Service Features',
    details: [
      'Live speed and distance tracking.',
      'Energy consumption monitoring.',
      'Network performance analysis.',
      'Interactive map with real-time position updates.',
      'System status and environmental condition reporting.',
    ],
  },
  {
    title: 'Prohibited Activities',
    details: [
      'Engaging in unauthorized access or hacking.',
      'Using the Service to transmit harmful or malicious software.',
      'Attempting to disrupt or manipulate Service functionality.',
    ],
  },
  {
    title: 'Data Collection & Privacy',
    details: [
      'Passenger tracking (real-time count and capacity monitoring).',
      'Energy consumption tracking.',
      'Network performance analysis (upload/download speeds).',
      'Real-time positioning and system status.',
      'For more details on data usage and storage, refer to our Privacy Policy.',
    ],
  },
];

const InfoCard = ({ title, details }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
  >
    <h2 className="text-2xl font-semibold text-[#6366F1]">{title}</h2>
    <ul className="text-gray-600 text-left space-y-2">
      {details.map((point, index) => (
        <li key={index} className="leading-relaxed">• {point}</li>
      ))}
    </ul>
  </motion.div>
);

const TOS = () => {
  const termsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(termsRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-[#6366F1] h-20 shadow-lg sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Terms Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Terms of <span className="text-[#6366F1]">Service</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Please read the following terms carefully before using our service.
          </p>
        </div>

        <div ref={termsRef} className="mt-12 grid md:grid-cols-2 gap-8">
          {terms.map((info, index) => (
            <InfoCard key={index} {...info} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TOS;