import React, { useContext, useState } from 'react';
import { assets } from "../assets/assets";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)
  const updateUserProfileData = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    finally {
      setIsLoading(false); // end loading
    }
  }

  return userData && (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-6">
      {/* Profile Image */}
      <div className="flex justify-center">
        <div className="flex justify-center relative group">
          <img
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md transition duration-300"
          />

          {isEdit && (
            <>
              <label
                htmlFor="profileImage"
                className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300"
              >
                Change
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </>
          )}
        </div>


      </div>

      {/* Name */}
      <div className="text-center">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            className="text-2xl font-semibold text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
        )}
      </div>

      <hr />

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
        <div className="space-y-2">
          <div>
            <p className="text-gray-600 text-sm">Email:</p>
            <p className="text-base">{userData.email}</p>
          </div>

          <div>
            <p className="text-gray-600 text-sm">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className="input"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          <div>
            <p className="text-gray-600 text-sm">Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="input mb-1"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="input"
                />
              </>
            ) : (
              <>
                <p>{userData.address.line1}</p>
                <p>{userData.address.line2}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Information</h3>
        <div className="space-y-2">
          <div>
            <p className="text-gray-600 text-sm">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                className="input"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          <div>
            <p className="text-gray-600 text-sm">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                className="input"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={() => {
            if (isEdit) updateUserProfileData();
            else setIsEdit(true);
          }}
          className={`px-6 py-2 rounded-md text-white transition-all duration-200 
    ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700'}
  `}
        >
          {isLoading ? 'Saving...' : isEdit ? 'Save' : 'Edit'}
        </button>


      </div>
    </div>
  );
};

export default MyProfile;
