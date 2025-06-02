import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filteredDoc, setFilteredDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const specialities = [
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoc(
        doctors.filter((doc) =>
          doc.speciality.toLowerCase() === speciality.toLowerCase()
        )
      );
    } else {
      setFilteredDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 md:px-20 py-16 text-gray-800 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Browse Doctors by Speciality
      </h2>

      {/* Filter Tags */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {specialities.map((spec, index) => (
          <button
            key={index}
            onClick={() => navigate(`/doctors/${spec}`)}
            className={`px-5 py-2 rounded-full border transition-all duration-300 
              ${
                speciality === spec
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300 hover:bg-blue-100'
              }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoc.length > 0 ? (
          filteredDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full h-48 bg-blue-100 flex items-center justify-center overflow-hidden">
  <img
    src={item.image}
    alt={item.name}
    className="h-full object-cover"
  />
</div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-green-600 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No doctors found for "{speciality}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
