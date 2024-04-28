import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Alerts from './components/Alerts';
import { Navbar, Footer, Sidebar, ThemeSettings} from './components';
import { Home, Notificationtable } from './pages';
import Complaint from './pages/Complaint';
import ComplaintTable from './components/ComplaintTable';
import Billing from './pages/Billing';
import { useStateContext } from './contexts/ContextProvider';
import CustomRoute from './components/CustomRoute';
import NewConnection from './pages/NewConnection';

const Dashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-main-dark-bg z-50 border border-bottom-blue border-5" style={{height:'57px'}}>
        <Navbar />
      </div>
      <div className="flex relative dark:bg-main-dark-bg">
        {/* <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent
            content="Settings"
            position="Top"
          >
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>

          </TooltipComponent>
        </div> */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
          style={{
            marginTop: '50px',
            ...(window.innerWidth <= 767 && {
              marginTop: '0',
            }),
          }}
          
        >
          <div className='flex justify-center'>
            {themeSettings && (<ThemeSettings />)}

            <Routes>
              <Route path="/" element={(<Home />)} />
              <Route path="home" element={(<Home />)} />

              {/* Pages */}
              {/* <Route path="network" element={} /> */}
              <Route path="Notifications" element={<CustomRoute><Notificationtable /></CustomRoute>} />
              <Route path="Current%20Status"/>   
              <Route path="Report%20a%20Fault" element={<CustomRoute><ComplaintTable /></CustomRoute>} />
              <Route path="complaintform" element={<CustomRoute><Complaint /></CustomRoute>} />
              <Route path="New%20Connection" element={<CustomRoute><NewConnection /></CustomRoute>} />
              <Route path="Billing" element={<CustomRoute><Billing /></CustomRoute>} />
                            
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
