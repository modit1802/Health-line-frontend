import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const {backendUrl,token,setToken}=useContext(AppContext)

  const [state, setState] = useState('Sign Up'); // 'Login' or 'Sign Up'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate= useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if(state==='Sign Up'){
        const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password});
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }
        else{
          toast.error(data.message);
        }
      }
      else{
        const {data}=await axios.post(backendUrl+'/api/user/login',{email,password});
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }
        else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    
    if(token){
      navigate('/'); // Redirect to home page if token is present
      toast.success('Logged in successfully');
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex justify-center items-center bg-gray-50 px-4"
    >
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please {state === 'Sign Up' ? 'sign up' : 'login'} to book an appointment
          </p>
        </div>

        {state === 'Sign Up' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600">
          {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setState(state === 'Login' ? 'Sign Up' : 'Login')}
          >
            {state === 'Login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
