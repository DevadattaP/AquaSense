import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import AquaDark from '../assets/img/aqua_dark.png';
import AquaLight from '../assets/img/aqua_light1.png';
import { adminlinks, userlinks } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useAuth } from './AuthContext'; // Import useAuth hook from your AuthProvider

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize, currentMode } = useStateContext();
  const { isAdmin } = useAuth();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  // Determine which logo to use based on the current theme
  const logoSrc = currentMode === 'Light' ? AquaLight : AquaDark;

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/dashboard/home" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <img className="h-8 mr-2" src={logoSrc} alt="logo" />
            </Link>
            <TooltipComponent content="" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {isAdmin ? ( // Using isAdmin state variable
              adminlinks.map((item) => (
                <div key={item.title}>
                  {/* <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p> */}
                  {item.links.map((link) => (
                    <NavLink
                      to={`/dashboard/${encodeURIComponent(link.name)}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))
            ) : 
            (
              userlinks.map((item) => (
                <div key={item.title}>
                  {/* <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p> */}
                  {item.links.map((link) => (
                    <NavLink
                      to={`/dashboard/${encodeURIComponent(link.name)}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;