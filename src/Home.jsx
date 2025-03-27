import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Menu } from 'lucide-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

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

const Hero = () => {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const ctaElement = ctaRef.current;

    gsap.fromTo(
      heroElement,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.to(ctaElement, {
      scale: 1.05,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={heroRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4"
        >
          The Future of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Transportation
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Experience the revolutionary Hyperloop technology, connecting cities
          at unprecedented speeds.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12"
        >
          <div className="rounded-md shadow">
          
            <div className='rounded-md shadow' >
                <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 ease-in-out transform hover:scale-105" >
                   <Link to="/HP1" >Get Started</Link> 
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            <Background />
            <Navbar/>
            <Hero />
            {/* Additional content sections can be added here */}
        </div>
    );
};

export default Home;