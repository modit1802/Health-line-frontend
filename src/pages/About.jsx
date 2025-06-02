import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  const features = [
    {
      title: 'Easy Scheduling',
      desc: 'Book appointments with just a few clicks, anytime, anywhere.',
    },
    {
      title: 'Health Records',
      desc: 'Securely manage and access your medical history in one place.',
    },
    {
      title: '24/7 Support',
      desc: 'Get help and guidance whenever you need it.',
    },
    {
      title: 'Trusted Doctors',
      desc: 'Choose from verified and experienced healthcare professionals.',
    },
  ];

  return (
    <div className="px-4 sm:px-10 py-10 bg-gray-50">
      {/* ABOUT US Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          ABOUT <span className="text-primary">US</span>
        </h2>
      </div>

      {/* ABOUT US Content */}
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.about_image}
            alt="about"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-gray-700 space-y-5 text-sm sm:text-base">
          <p>
            Welcome to <span className="font-semibold text-primary">Health-Line+</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At <span className="font-semibold text-primary">Health-Line+</span>, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>

          <p>
            <span className="font-semibold text-primary">Health-Line+</span> is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you’re booking your first appointment or managing ongoing care, <span className="font-semibold text-primary">Health-Line+</span> is here to support you every step of the way.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Vision</h3>
            <p>
              Our vision at <span className="font-semibold text-primary">Health-Line+</span> is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Why <span className="text-primary">Choose Us</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto cursor-pointer">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow transition duration-300 hover:bg-primary hover:text-white"
            >
              <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
              <p className="text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
