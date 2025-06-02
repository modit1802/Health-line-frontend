import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CheckCircle, XCircle } from 'lucide-react';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6 my-20 px-4 md:px-10 text-gray-900">
      <h1 className="text-3xl md:text-4xl font-semibold text-center">Top Doctors to Book</h1>
      <p className="text-sm md:text-base text-center max-w-xl text-gray-600">
        Browse our curated list of top-rated doctors available for quick and easy appointments.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="bg-white border border-blue-100 rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03]"
          >
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover bg-blue-50" />
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                {item.available ? (
                  <CheckCircle className="text-green-500 w-4 h-4" />
                ) : (
                  <XCircle className="text-gray-400 w-4 h-4" />
                )}
                <span className={`font-medium ${item.available ? 'text-green-600' : 'text-gray-500'}`}>
                  {item.available ? 'Available' : 'Not Available'}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="bg-gradient-to-r from-blue-500 to-primary text-white px-10 py-3 rounded-full mt-10 shadow hover:shadow-md hover:scale-105 transition-all"
      >
        View More Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
