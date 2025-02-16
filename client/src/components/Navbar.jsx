import { useState } from 'react'
import { FcBarChart } from "react-icons/fc";
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
    return (
        <div className="navbar flex-row-reverse bg-primary text-primary-content relative">
            {/* Left Section */}
            <ThemeSwitch />
            {/* Center Section */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                <FcBarChart className="text-3xl" />
                <h1 className="text-xl">SentimentScout</h1>
            </div>
        </div>
    )
}

export default Navbar