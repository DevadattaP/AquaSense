import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   // Initialize isLoggedIn state from localStorage, defaulting to false if not found
  //   return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  // });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (rememberMe, selectedRole) => {
    if (rememberMe) {
      // If "Remember Me" is checked, store login status and role in localStorage
      // localStorage.setItem('isLoggedIn', true);
    } else {
      const userCredCookie = Cookies.get('userCred');

      if (userCredCookie) {
        const credentials = JSON.parse(userCredCookie);

        if (credentials && credentials.username && credentials.password) {
          const { username, password } = credentials;

          try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
              username: username,
              password: password
            });

            // Login successful
            setIsLoggedIn(true);
            const userdata = response.data.response;

            // Extract the relevant data from the response
            const userInfo = {
              username: userdata.username,
              email: userdata.email,
              phone_no: userdata.phone_no,
              gender: userdata.gender,
              locationid: userdata.locationid,
              admin: userdata.admin
            };

            // Convert userInfo object to JSON string
            const userInfoJSON = JSON.stringify(userInfo);

            // Set userInfo cookie with `js-cookie`
            document.cookie = `userInfo=${userInfoJSON}; expires=365; path=/; Secure; SameSite=Strict;`;

            // Retrieve userInfo cookie (optional)
            const userInfoCookie = document.cookie
              .split('; ')
              .find(cookie => cookie.startsWith('userInfo='));
            console.log(userInfoCookie);

            setUserInfo(userdata);
            if (userdata.admin) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }

          } catch (error) {
            // Login failed
            console.error('Login error:', error);
            setIsLoggedIn(false);
            setIsAdmin(false);
            setUserInfo(null);
          }

        } else {
          console.error('Credentials not found in cookie.');
        }

      } else {
        setIsLoggedIn(false);
      }
    }
  };


  useEffect(() => {
    login();
  }, []);

  const logout = () => {
    // Remove login status and role from both sessionStorage and localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    document.cookie = `userCred=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAdmin, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
