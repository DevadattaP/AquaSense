import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { UserProfile } from '.';
import AquaDark from '../assets/img/aqua_dark.png';
import AquaLight from '../assets/img/aqua_light1.png';
import { useStateContext } from '../contexts/ContextProvider';
import { FaUserTie, FaCaretDown, FaUserLock } from "react-icons/fa";

// import { FaUserShield } from "react-icons/fa6";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({ transparent }) => {
  const { currentColor, activeMenu, setActiveMenu, setScreenSize, screenSize, currentMode } = useStateContext();
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // State to hold user info
  const location = useLocation();

  useEffect(() => {
    // Extract user info from cookie
    const userInfoCookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('userInfo='));
    if (userInfoCookie) {
      const userInfoString = userInfoCookie.split('=')[1];
      const parsedUserInfo = JSON.parse(decodeURIComponent(userInfoString));
      setUserInfo(parsedUserInfo);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleProfileClick = () => {
    setShowProfileTooltip(true);
  };

  const handleProfileClose = () => {
    setShowProfileTooltip(false);
  };

  const handleLogout = () => {
    logout();
    setShowProfileTooltip(false);
  };

  const showOpenSidebarButton = location.pathname !== '/';

  let logoSrc = currentMode === 'Light' ? AquaLight : AquaDark;
  if (location.pathname === '/' && transparent) {
    logoSrc = AquaDark;
  }

  return (
    <div className={`relative flex justify-between p-2 md:ml-6 md:mr-6 z-10 ${transparent ? 'bg-transparent' : ''}`}>
      <div className="flex items-center">
        {showOpenSidebarButton && (
          <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
        )}
        <a href="/dashboard/home" className="flex items-center pl-3">
          <img className="h-8 mr-2" src={logoSrc} alt="logo" />
        </a>
      </div>
      <div>
        {isLoggedIn ? (
          <button
            className="bg-transparent flex text-blue-500 hover:text-white font-bold py-1 px-5 rounded-3xl transition-colors duration-300 border border-blue-500 hover:bg-blue-500 text-md items-center"
            onClick={handleProfileClick}
          >
            {isAdmin ? <FaUserTie className="text-2xl pr-2" /> : <FaUserLock className="text-3xl pr-2" />}
            <p className="mb-0">Profile</p> {/* Use mb-0 to remove margin-bottom */}
            <FaCaretDown className="text-xl" />
          </button>

        ) : (
          <Link to="/login">
            <button
              className="bg-transparent text-blue-500 hover:text-white font-bold py-1 px-5 rounded-lg transition-colors duration-300 border border-blue-500 hover:bg-blue-500"
            >
              Login
            </button>
          </Link>
        )}
      </div>
      {showProfileTooltip && (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-60 border border-blue-200">
          <div className="flex justify-between items-center border-color  border-b-1 pb-6">
            {/* <p className="font-semibold text-lg dark:text-gray-200">User details</p> */}
            <div>
              <p className="font-semibold text-xl dark:text-gray-200">{userInfo.username}</p>
              {userInfo.admin ? <p className="text-gray-500 text-sm dark:text-gray-400">Administrator</p> : <p className="text-gray-500 text-sm dark:text-gray-400">User</p>}
            </div>
            <button
              onClick={handleProfileClose}
              className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white"
            >
              &#10005;
            </button>
          </div>
          <div className="items-center mt-6 pb-6 justify-center">
          <Link to='/dashboard/Profile'><button className="bg-transparent text-blue-500 hover:text-white w-full font-bold py-1 px-5 rounded-lg transition-colors duration-300 border border-blue-500 hover:bg-blue-500" onClick={()=>setShowProfileTooltip(false)}>
           Edit Profile
          </button></Link>
          </div>
          
          <div>
            {/* Additional user profile options */}
            {/* You can map through userProfileData to render options */}
            <button className="bg-transparent text-red-500 hover:text-white w-full font-bold py-1 px-5 rounded-lg transition-colors duration-300 border border-red-500 hover:bg-red-500" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
