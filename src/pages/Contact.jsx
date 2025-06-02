import React from 'react';
import { assets } from '../assets/assets';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 py-16 bg-gradient-to-br from-white to-gray-100 min-h-screen">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-800">
          Get In <span className="text-blue-600">Touch</span>
        </h2>
        <p className="text-base text-gray-600 mt-3">
          We'd love to hear from you. Reach out anytime!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto items-start">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.contact_image}
            alt="Contact"
            className="w-72 md:w-80 h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Contact Info Section */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-xl space-y-6 text-gray-700">
          <h3 className="text-2xl font-semibold text-gray-900">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Address</p>
                <p className="text-sm text-gray-700">123, Health Street, Noida, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-700">support@Healthlineplus.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Phone</p>
                <p className="text-sm text-gray-700">+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Working Hours</p>
                <p className="text-sm text-gray-700">Mon - Sat: 10AM - 9PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
