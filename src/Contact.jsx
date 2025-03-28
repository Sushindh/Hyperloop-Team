import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const contacts = [
  {
    name: 'Sushindh A',
    regNo: '23BCE1659',
    email: 'sushindh.a2023@vitstudent.ac.in',
    phone: '+91 234 567 8901',
  },
  {
    name: 'Ashley Dylan',
    regNo: '23BCE1656',
    email: 'ashleydylan.j2023@vitstudent.ac.in',
    phone: '+1 234 567 8902',
  },
  {
    name: 'Keerthivasan E',
    regNo: '23BCE1659',
    email: 'keerthivasan.e2023@vitstudent.ac.in',
    phone: '+1 234 567 8903',
  },
  {
    name: 'Dr. Rama Parvathy L',
    role: 'Mentor',
    email: 'xyz@gmail.com',
    phone: '+1 234 567 8904',
  }
];

const ContactCard = ({ name, role, email, phone }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
  >
    <h2 className="text-2xl font-semibold text-[#6366F1]">{name}</h2>
    {role && <p className="text-gray-700">{role}</p>}
    <p className="text-gray-600">{email}</p>
    <p className="text-gray-600">{phone}</p>
  </motion.div>
);

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(contactRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-[#6366F1] h-20 shadow-lg sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Get in <span className="text-[#6366F1]">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Reach out to our team for inquiries, collaborations and more.
          </p>
        </div>

        <div ref={contactRef} className="mt-12 grid md:grid-cols-2 gap-8">
          {contacts.map((contact, index) => (
            <ContactCard key={index} {...contact} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;