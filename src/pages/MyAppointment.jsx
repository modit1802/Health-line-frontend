import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${day} ${months[Number(month)]} ${year}`;
  };

  const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (amount) => {
    const stripe = await stripePromise;
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/create-payment-intent`, { amount }, {
        headers: { token }
      });
      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (result.error) toast.error(result.error.message);
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { token }
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      getUserAppointments();
    } catch (error) {
      toast.error("Cancellation failed");
    }
  };

  const verifyPayment = async (session_id) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-payment`, { session_id }, {
        headers: { token }
      });
      if (data.success) {
        toast.success("Payment verified");
        getUserAppointments();
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        toast.error("Payment not completed");
      }
    } catch (error) {
      toast.error("Verification error");
    }
  };

  const paymentReceipt = async (session_id) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment-reciept`, { session_id }, {
        headers: { token }
      });
      data.success
        ? toast.success("Receipt sent to email")
        : toast.error("Failed to send receipt");
    } catch (error) {
      toast.error("Error sending receipt");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      getDoctorsData();

      const session_id = new URLSearchParams(location.search).get("session_id");
      if (session_id) {
        verifyPayment(session_id);
        setTimeout(() => paymentReceipt(session_id), 2000);
      }
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">My Appointments</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-600">No appointments found.</div>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start mb-4">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-16 h-16 object-cover rounded-full border border-blue-300"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">{item.docData.name}</p>
                  <p className="text-sm text-gray-500">{item.docData.speciality}</p>
                </div>
              </div>
              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <p><span className="font-medium">Address:</span> {item.docData.address.line1}, {item.docData.address.line2}</p>
                <p><span className="font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {!item.cancelled && !item.isCompleted && (
                  item.payment ? (
                    <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-300 rounded text-sm">Paid</span>
                  ) : (
                    <button
                      onClick={() => handleCheckout(item.amount)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Pay Online
                    </button>
                  )
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Cancel
                  </button>
                )}

                {item.cancelled && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded text-sm">Cancelled</span>
                )}

                {item.isCompleted && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded text-sm">Completed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
