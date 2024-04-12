import React, { useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useStateContext } from '../contexts/ContextProvider';
import ScrollingCard from '../components/ScrollingCard';
import Card from '../components/Card';
import Alerts from '../components/Alerts';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import Complaint from '../assets/img/Complaint.jpeg';
import bill from '../assets/img/bill.png';
import current_status from '../assets/img/current_status.webp';
import new_water_connection from '../assets/img/new_water_connection.avif';
import minimap from '../assets/img/minimap.jpg';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: 'Time', value: 'Id' }}
      style={{ border: 'none', color: currentMode === 'Dark' && 'white' }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Home = () => {
  const { currentColor, currentMode } = useStateContext();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const { isLoggedIn } = useAuth();

  // Function to handle button click
  const handleButtonClick = () => {
    // Show the alert
    setShowAlert(true);

    // Hide the alert after 4 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div>
      <div className="navbar"> {/* Assume this is your navbar */}
        {/* Navbar content */}
      </div>
      <div className="alerts-container fixed top-0 left-0 right-0 z-50">
        {showAlert && <Alerts type="danger" heading='Access Denied!' message="Please Login to access this Page" />}
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex flex-wrap justify-center sm:gap-4 md:gap-8 lg:gap-8">
          <Card
            image={minimap}
            title="Network around you"
            buttonText="Click"
            style={{ width: '250px', height: '250px' }}
            onClick={() => {
              isLoggedIn ? navigate('/dashboard/orders') : navigate('/login');
            }}
          />
          <ScrollingCard />

          <Card
            image={current_status}
            title="Current status"
            buttonText="Click"
            onClick={() => {
              navigate('/dashboard/line'); // Use navigate function to redirect
            }}
            style={{ width: "250px", height: "250px", }}
          />
        </div>
        <div className="flex flex-wrap justify-center sm:gap-4 md:gap-8 lg:gap-8">
          <Card
            image={Complaint}
            title="Report a fault"
            buttonText="Click"
            onClick={() => {
              isLoggedIn ? navigate('/dashboard/Report%20Fault') : navigate('/login');
            }}
            style={{ width: "250px", height: "250px" }}
          />
          <Card
            image={new_water_connection}
            title="New connection"
            buttonText="Click"
            onClick={() => {
              isLoggedIn ? navigate('/dashboard/pyramid') : navigate('/login');
            }}
            style={{ width: "250px", height: "250px" }}
          />
          <Card
            image={bill}
            title="Check your bill"
            buttonText="Click"
            onClick={() => {
              isLoggedIn ? navigate('/dashboard/Bill') : navigate('/login');
            }}
            style={{ width: "250px", height: "250px" }}
          />

        </div>
      </div>
    </div>
  );
};

export default Home;
