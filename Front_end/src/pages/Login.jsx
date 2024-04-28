import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import loginImage from '../assets/img/save_water1.jpg';
import axios from 'axios';
import Alerts from '../components/Alerts';
import CryptoJS from 'crypto-js'; // Import CryptoJS for SHA256 encryption
import Cookies from 'js-cookie'; // Import js-cookie for cookie handling

const Notification = ({ message }) => (
  <div className="bg-red-500 text-white p-4 fixed top-0 left-0 right-0 z-50 text-center">
    {message}
  </div>
);

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');
  const [showNotification, setShowNotification] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {
    const hash = CryptoJS.SHA256(password);
    const hashPass = hash.toString(CryptoJS.enc.Hex); // Convert hash to hexadecimal string


    // console.log('SHA-256 Hash:', hashPass);
    const credentials = {
      username: email,
      password: hashPass,
    };
    // Set a cookie with `js-cookie`
    const credentialsJSON = JSON.stringify(credentials);

    // Save credentials in document.cookie
    document.cookie = `userCred=${credentialsJSON}; expires=365; path=/; Secure; SameSite=Strict;`;
    const userCredCookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('userCred='));

    if (userCredCookie) {
      const userCredValue = userCredCookie.split('=')[1];
      console.log('userCred Cookie:', userCredValue);
    }


    try {
      const response = await axios.post('http://127.0.0.1:5000/login', credentials);

      // Assuming the response contains necessary data upon successful login
      const responseData = response.data;

      if (responseData.status === "success") {

        console.log(responseData);


        // Perform login action with rememberMe and selectedRole
        login(rememberMe, selectedRole);
        setRedirectToDashboard(true); // Set state to redirect
      } else {
        // Show the alert
        setShowAlert(true);

        // Hide the alert after 4 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      }
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);

      // Show the alert
      setShowAlert(true);

      // Hide the alert after 4 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  if (isLoggedIn || redirectToDashboard) {
    return <Navigate to="/dashboard/home" replace />; // Redirect if logged in or redirectToDashboard is true
  }

  return (
    <div>
      <div className="alerts-container fixed top-0 left-0 right-0 z-50">
        {showAlert && <Alerts type="danger" heading="Invalid email or password." message="" />}
      </div>

      {showNotification && <Notification message="Please login to continue." />}
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 mx-auto" style={{ maxWidth: '1100px', padding: '0px', overflow: 'hidden' }}>
          <div className="mt-2 lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-2 flex flex-col items-center">
              <div className="w-full flex-1 mt-5">
                <div className="flex flex-col items-center">
                  <div >
                    <a href="/" className="flex items-center">
                      <img className="w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24" src="https://th.bing.com/th/id/OIP.JVmwTQb-R9nXfN3UVR27HgHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="logo" />
                      <span className='text-base sm:text-xl md:text-5xl lg:text-5xl xl:text-5xl font-bold'>AquaSense</span>
                    </a>
                  </div>

                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Sign In with registered Username
                    </div>
                  </div>

                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email" placeholder="Username"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password" placeholder="Password"
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="relative mt-5 flex items-center">
                      <input
                        title='checkremember'
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="form-checkbox ml-2 h-5 w-5 text-green-500"
                      />
                      <label id='Rememberlabel' className="ml-2 text-sm text-gray-600">Remember Me</label>
                    </div>
                    <button
                      className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      onClick={handleLogin}
                    >
                      <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-" style={{ paddingLeft: '8px' }}>
                        Sign In
                      </span>
                    </button>
                    <div className="mt-3 text-sm text-gray-600 text-center">
                      <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                    </div>
                    <div className="flex mt-4 justify-between text-sm text-gray-600 ">
                      <span>New to AquaSense?</span>
                      <Link to="/login/register" className="text-blue-500 hover:underline">Register</Link>
                    </div>

                    {/* <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by Cartesian Kinetics
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service
                      </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex" style={{ maxWidth: '650px', maxHeight: '700px', overflow: 'hidden' }}>
            <img
              src={loginImage}
              alt="no img"
              style={{
                width: '120%', // Increase width to zoom in
                height: '100%', // Increase height to zoom in
                objectFit: 'cover', // Ensure the image covers the entire space
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
