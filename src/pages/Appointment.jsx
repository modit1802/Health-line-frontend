import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencysymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getavailableSlots = async () => {
    if (!docInfo) return;

    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = !docInfo?.slots_booked?.[slotDate]?.includes(slotTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }
    if (!slotTime) {
      toast.warn('Please select a time slot');
      return;
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + '_' + month + '_' + year;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors?.length && docId) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getavailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return <div className="text-center mt-20 text-gray-600 font-medium">Loading doctor details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 py-16">
      {/* Doctor Info */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 rounded-lg overflow-hidden shadow-lg border hover:bg-primary border-gray-200">
          <img
            src={docInfo.image}
            alt="Doctor"
            className="w-full h-72 object-cover object-center"
            loading="lazy"
          />
        </div>

        <div className="md:w-2/3 bg-white rounded-lg shadow-md border border-gray-200 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-gray-900">{docInfo.name}</h1>
              <img className="w-6" src={assets.verified_icon} alt="Verified" />
            </div>

            <p className="text-gray-600 mt-2 text-lg">
              {docInfo.degree} - <span className="font-semibold">{docInfo.speciality}</span>
              <span className="ml-3 inline-block px-3 py-1 text-sm bg-primary text-white rounded-full font-medium">
                {docInfo.experience} years experience
              </span>
            </p>

            <div className="mt-6">
              <h2 className="text-md font-semibold flex items-center gap-2 text-gray-900">
                About <img src={assets.info_icon} alt="Info" className="w-4" />
              </h2>
              <p className="mt-2 text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>
          </div>

          <p className="mt-6 text-lg font-semibold text-gray-900">
            Appointment Fee: <span className="text-primary">{currencysymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-16">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Booking Slots</h3>

        {/* Days Selector */}
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots.map((slotArr, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSlotIndex(idx);
                  setSlotTime(''); // reset selected time when day changes
                }}
                className={`min-w-[72px] py-4 rounded-full flex flex-col items-center justify-center cursor-pointer
                  ${
                    slotIndex === idx
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-primary hover:text-white transition'
                  }`}
              >
                <span className="text-sm font-semibold">{daysofWeek[slotArr[0]?.datetime.getDay()]}</span>
                <span className="text-lg font-bold">{slotArr[0]?.datetime.getDate()}</span>
              </button>
            ))}
        </div>

        {/* Time Slots */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mt-8">
          {docSlots.length > 0 &&
            docSlots[slotIndex]?.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSlotTime(slot.time)}
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer border transition
                  ${
                    slot.time === slotTime
                      ? 'bg-primary text-white border-primary shadow'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-primary hover:text-white'
                  }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-10 bg-primary text-white font-semibold py-3 px-16 rounded-full shadow-md hover:shadow-lg transition"
        >
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-24">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;
