import Navbar from "./Navbar.jsx";

import React, { useState } from 'react';

const Home = () => {
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    // Function to run the C server program
    const runServerProgram = async () => {
        try {
            const response = await fetch('http://localhost:5000/run-c-program', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let result = '';

            // Continuously read the response stream
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += decoder.decode(value, { stream: true });
            }

            setOutput(result);
        } catch (error) {
            console.error('Error running the C program:', error);
            setError('Error running the C program');
        }
    };

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="bg-[url('/src/images/Trainbg2.webp')] bg-cover bg-center bg-no-repeat w-screen h-screen">
                    <Navbar />
                    <div className="relative w-full max-w-4xl mx-auto pt-10">
                        <div className="absolute top-10 left-0 w-full h-36 skew-y-2"></div>
                        <div className="relative text-white p-4">
                            <h1 className="text-6xl font-bold uppercase text-gray-800 leading-none">
                                Hyperloop Trains
                            </h1>
                            <h2 className="text-4xl mt-2 font-bold text-gray-800 uppercase">
                                A Technical Vision of Indian Railways
                            </h2>
                        </div>
                    </div>
                </div>
                {/* Correct the heading tag */}
                
                
            </div>
        </>
    );
};

export default Home;
