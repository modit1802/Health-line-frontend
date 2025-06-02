import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 md:px-20 py-16 mt-32">
      <div className="grid gap-12 md:grid-cols-[3fr_1fr_1fr]">
        {/* Left Section */}
        <div>
          <img src={assets.logo} alt="logo" className="w-28 mb-4" />
          <p className="text-sm leading-relaxed text-gray-600">
            Welcome to Health-line+, your trusted partner in managing your healthcare needs conveniently and efficiently. At Health-Line+, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <h2 className="font-semibold text-base mb-3">COMPANY</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">About us</li>
            <li className="hover:text-blue-500 cursor-pointer">Contact us</li>
            <li className="hover:text-blue-500 cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="font-semibold text-base mb-3">GET IN TOUCH</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-blue-500 cursor-pointer">+91 8168578283</li>
            <li className="hover:text-blue-500 cursor-pointer">moditgrover2003.iii@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="mt-16">
        <hr className="border-t border-gray-300" />
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Modit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
