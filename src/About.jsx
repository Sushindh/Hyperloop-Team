import React from 'react';
import Hyper from "./images/about1.jpg";
import Navbar from "./Navbar.jsx";
import Flowchar from "./SustainableTrainCommunication.jsx";

function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="bg-[#6366F1] h-20 shadow-lg sticky top-0 z-50">
                <Navbar />
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                            The Future of <span className="text-[#6366F1]">Transportation</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Experience ultra-fast ground transportation that combines the speed of an airplane, 
                            the efficiency of a train, and the flexibility of a taxi.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#6366F1] rounded-lg transform rotate-3 opacity-20"></div>
                        <img 
                            src={Hyper} 
                            alt="Hyperloop" 
                            className="relative rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Speed Feature */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <div className="text-3xl mb-4">🚄</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Ultra-high speeds</h3>
                        <p className="text-gray-600">
                            Contactless levitation and propulsion systems combined with a low pressure environment 
                            allow hyperloop pods to travel efficiently at ultra-high speeds.
                        </p>
                    </div>

                    {/* Connections Feature */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <div className="text-3xl mb-4">🌆</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Direct city connections</h3>
                        <p className="text-gray-600">
                            Imagine a world where you can travel between cities in minutes. Hyperloop reduces 
                            door-to-door travel times by directly connecting mobility hubs.
                        </p>
                    </div>

                    {/* Emissions Feature */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <div className="text-3xl mb-4">🌱</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Emission-free mobility</h3>
                        <p className="text-gray-600">
                            With fully-electric and energy-efficient operations, the hyperloop system aims at 
                            being climate-neutral over the course of its life cycle.
                        </p>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 shadow-xl text-white">
                    <p className="text-lg leading-relaxed">
                        Hyperloop is an ultra-fast ground transportation system for passenger and cargo, 
                        combining the speed of an airplane, the energy efficiency of a train and the 
                        flexibility of a taxi. The hyperloop system consists of a network of tubes, 
                        connecting mobility hubs around the world, with pods traveling at ultra-high 
                        speeds in a vacuum. The low-pressure environment ensures energy-efficient 
                        operation thanks to low aerodynamic drag. Contactless magnetic levitation and 
                        propulsion systems enable a comfortable and silent passenger experience.
                    </p>
                </div>
            </div>

            {/* Flowchart Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
                    <Flowchar />
                </div>
            </div>
        </div>
    );
}

export default About;