import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const steps = [
  {
    title: 'Sustainable Network Communication System',
    description: 'Overview of the entire system, focusing on sustainability and efficient communication.',
    children: [
      {
        title: 'Client-Server Model',
        description: 'Responsible for client-server communication.',
        children: [
          { title: 'Calculate Network Latency', description: 'Measures the delay between sending and receiving data.' },
          { title: 'Measure Time-Distance Relationship', description: 'Analyzes the correlation between time and distance.' },
          { title: 'Fast Kilometers Simulation', description: 'Simulates speed with respect to fast kilometers.' }
        ]
      },
      {
        title: 'Energy-Efficient Data Transmission',
        description: 'Optimizes data transmission for reduced energy consumption.',
        children: [
          { title: 'Replace Carbon Footprint', description: 'Aims to reduce the environmental impact.' },
          { title: 'Optimize Resource Usage', description: 'Efficient usage of computational and network resources.' }
        ]
      },
      {
        title: 'Green IT Practices',
        description: 'Incorporates green IT practices into the system.',
        children: [
          { title: 'Eco-Friendly Network Devices', description: 'Uses devices with reduced environmental impact.' }
        ]
      },
      {
        title: 'Enhanced Passenger Experience',
        description: 'Ensures passengers have reliable and fast network access.',
        children: [
          { title: 'Reliable Network Access', description: 'Guarantees a reliable network for all passengers.' },
          { title: 'Hyperloop Vision', description: 'Supports high-speed network optimized for Hyperloop travel.' }
        ]
      }
    ]
  },
  {
    title: 'Client-Server Communication Model',
    description: 'Detailed communication model for the client-server interaction.',
    children: [
      { title: 'Real-Time Network Communication', description: 'Built with C/C++ for efficient real-time communication.' },
      { title: 'Plot Time-Latency Metrics', description: 'Displays latency metrics in a graph.' }
    ]
  }
];

const TreeNode = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fadeIn = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    config: { tension: 210, friction: 20 }
  });

  return (
    <div style={{ marginLeft: `${level * 1.5}rem` }} className="mb-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-lg font-semibold text-blue-600 hover:underline"
      >
        {node.title}
      </div>
      <animated.div style={fadeIn} className="mt-2 pl-2">
        {isOpen && <p className="text-gray-700">{node.description}</p>}
        {isOpen && node.children && node.children.map((child, index) => (
          <TreeNode key={index} node={child} level={level + 1} />
        ))}
      </animated.div>
    </div>
  );
};

const Flowchart = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Interactive Network Communication System</h1>
      {steps.map((node, index) => (
        <TreeNode key={index} node={node} level={0} />
      ))}
    </div>
  );
};

export default Flowchart;
