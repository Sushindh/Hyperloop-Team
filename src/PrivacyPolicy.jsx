import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';

const privacyPolicy = [
  {
    title: 'Introduction',
    details: [
      'This Privacy Policy explains how we collect, use, and protect your data.',
      'By using the Hyperloop Journey Simulator, you agree to the terms outlined here.',
    ],
  },
  {
    title: 'Data We Collect',
    details: [
      'Passenger tracking (real-time count and capacity monitoring).',
      'Energy consumption tracking.',
      'Network performance analysis (upload/download speeds).',
      'Real-time positioning and system status.',
    ],
  },
  {
    title: 'How We Use Your Data',
    details: [
      'To improve the accuracy and efficiency of the simulation.',
      'To analyze and optimize energy consumption.',
      'To monitor network performance for a better user experience.',
      'To provide real-time updates on system status and journey details.',
    ],
  },
  {
    title: 'Data Protection & Security',
    details: [
      'We do not collect, store, or share personal data.',
      'All data is processed temporarily and deleted after the session ends.',
      'We implement security measures to prevent unauthorized access.',
      'No user accounts or personal details are required to use the Service.',
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

const PrivacyPolicy = () => {
  const policyRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(policyRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      <div className="bg-[#6366F1] h-20 shadow-lg sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Privacy Policy Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Privacy <span className="text-[#6366F1]">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Learn how we handle your data securely and responsibly.
          </p>
        </div>

        <div ref={policyRef} className="mt-12 grid md:grid-cols-2 gap-8">
          {privacyPolicy.map((info, index) => (
            <InfoCard key={index} {...info} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;