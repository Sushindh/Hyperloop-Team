import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Navbar from './Navbar';


const contacts = [
  {
    name: 'Sushindh A',
    reg_no: '23BCE1659',
    email: 'sushindh.a2023@vitstudent.ac.in',
    phone: '+91 234 567 8901',
  },
  {
    name: 'Ashley Dylan',
    reg_no: '23BCE1656',
    email: 'ashleydylan.j2023@vitstudent.ac.in',
    phone: '+1 234 567 8902',
  },
  {
    name: 'Keerthivasan E',
    reg_no: '23BCE1659',
    email: 'keerthivasan.e2023@vitstudent.ac.in',
    phone: '+1 234 567 8903',
  },
  {
    name: 'Dr Rama Parvathy L',
    role: 'HR Coordinator',
    email: 'emily.white@example.com',
    phone: '+1 234 567 8904',
  }
];

const Background = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80"></div>
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/hyperloop-bg.jpg')] bg-cover bg-center bg-no-repeat"></div>
      </div>
      <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-20"></div>
    </div>
  );
};

const ContactCard = ({ name, role, email, phone }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 p-6 rounded-xl shadow-lg text-center space-y-3 hover:scale-105 transition-transform">
      <h2 className="text-2xl font-semibold text-cyan-400">{name}</h2>
      <p className="text-gray-400">{role}</p>
      <p className="text-gray-300">{email}</p>
      <p className="text-gray-300">{phone}</p>
    </motion.div>
  );
};

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(contactRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      <Background />
      <Navbar />
      <div ref={contactRef} className="relative z-10 flex flex-col items-center py-16">
        <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl">
          {contacts.map((contact, index) => (
            <ContactCard key={index} {...contact} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;