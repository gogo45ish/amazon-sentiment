import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full footer footer-center bg-base-300 text-base-content p-3 md:p-4 text-center">
            <aside>
                <p className="text-sm md:text-base">
                    Copyright © {new Date().getFullYear()} - All rights reserved by George Zummar
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
