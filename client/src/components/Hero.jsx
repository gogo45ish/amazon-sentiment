import React, { useState } from 'react';
import Stats from './Stats';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const Hero = () => {
    const [loading, setLoading] = useState(false);  // Start with loading as false since no request is fired initially
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);  // Track error status for feedback

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading when form is submitted
        setError(false);   // Reset error state

        const asinRegex = /^[A-Z0-9]{10}$/;
        const BASE_URL = process.env.NODE_ENV === "production"
            ? "https://amazon-server-three.vercel.app"
            : "http://localhost:3000";

        const url = asinRegex.test(inputValue)
            ? `${BASE_URL}/search/${inputValue}`
            : `${BASE_URL}/search?keyword=${inputValue}`;

        try {
            const response = await axios.get(url);
            if (response.status === 404) {
                // Show toast if no products are found
                toast.error(response.data.message);
                setLoading(false);  // Stop loading once response is received
            } else {
                setData(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(error.response.data.message);
            setLoading(false);
            setError(true);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 mt-3 p-4 md:p-5">
            <h1 className="text-xl md:text-3xl font-bold text-center">
                Analyze Amazon Product Sentiment
            </h1>
            <p className="text-sm md:text-base text-center">
                Discover what customers really think with our advanced sentiment analysis tool
            </p>

            <form onSubmit={handleFormSubmit} className="w-full flex justify-center">
                <label className="input input-bordered input-accent flex items-center gap-2 w-full max-w-lg mt-4">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Enter product keywords or ASIN"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="flex items-center justify-center hover:text-accent">
                        <FaSearch />
                    </button>
                </label>
            </form>

            {/* Show loading spinner when loading is true */}
            {loading && (
                <span className="loading loading-spinner loading-lg mt-6"></span>
            )}

            {/* Only render Stats if data exists */}
            {data && data.sentiment && !loading && !error && (
                <Stats data={data} />
            )}
        </div>
    );
};

export default Hero;
