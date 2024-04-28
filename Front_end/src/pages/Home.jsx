import React, { useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useStateContext } from '../contexts/ContextProvider';
import ScrollingCard from '../components/ScrollingCard';
import Card from '../components/Card';
import { Routes, Link } from 'react-router-dom';
import Alerts from '../components/Alerts';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
// import Complaint from '../assets/img/Complaint.jpeg';
import Complaint from '../assets/img/Complaint1.png';
import bill from '../assets/img/bill1.jpg';
import current_status from '../assets/img/current_status.webp';
import new_water_connection from '../assets/img/new_water_connection.avif';
import minimap from '../assets/img/Network.png';

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
  // const [showAlert, setShowAlert] = useState(false);


  // Function to handle button click
  // const handleButtonClick = () => {
  //   // Show the alert
  //   setShowAlert(true);

  //   // Hide the alert after 4 seconds
  //   setTimeout(() => {
  //     setShowAlert(false);
  //   }, 2000);
  // };

  return (
    <div>
      <div className="navbar"> {/* Assume this is your navbar */}
        {/* Navbar content */}
      </div>
      {/* <div className="alerts-container fixed top-0 left-0 right-0 z-50">
        {showAlert && <Alerts type="danger" heading='Access Denied!' message="Please Login to access this Page" />}
      </div> */}
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex flex-wrap justify-center sm:gap-4 md:gap-8 lg:gap-8">
          <Link to={`/dashboard/network`}><Card
            image={minimap}
            title="Network around you"
            buttonText="Click"
            style={{ width: '250px', height: '250px' }}
            onClick={() => {
              navigate('/dashboard/network');
            }}
          />
          </Link>

          <Link to={`/dashboard/notifications`}>
            <ScrollingCard />
          </Link>

          {/* <Link to={`/dashboard/line`}> */}
            {/* <Card 
            image={current_status}
            title="Current status"
            buttonText="Click"
            onClick={() => {
              navigate('/dashboard/line'); // Use navigate function to redirect
            }}
            style={{ width: "250px", height: "250px", }}
          />1 */}
            <div
              className="rounded-xl z-20 m-4 p-4 shadow-md relative justify-center overflow-hidden bg-indigo-100 border border-indigo-200"
              style={{ width: '283px', height: '337px', overflow: 'hidden', position: 'relative' }}
            >
              <div className='flex-1 flex-wrap relative bg-white rounded-xl text-center' style={{ width: '100%', height: '249px', overflow: 'hidden', position: 'relative' }}>
                <div className='mt-8'>
                  <h5 className="text-2xl font-bold mt-2">Water Supply:</h5>
                  <p className="text-xl mt-4">Start: 07:00 AM</p>
                  <p className="text-xl mt-2">Stop: 10:00 AM</p>
                </div>
              </div>

              <div className='p-2 text-center font-bold text-xl mb-3 z-10' style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                Current Status
              </div>

            </div>
          {/* </Link> */}

          <Link to={`/dashboard/Report%20a%20Fault`}><Card
            image={Complaint}
            title="Report a fault"
            buttonText="Click"
            onClick={() => navigate('/dashboard/Report%20Fault')}
            style={{ width: "250px", height: "250px" }}
          />
          </Link>

          <Link to={`/dashboard/New%20Connection`}>
            <Card
              image={new_water_connection}
              title="New connection"
              buttonText="Click"
              onClick={() => {
                navigate('/dashboard/New%20Connection')
              }}
              style={{ width: "250px", height: "250px" }}
            />
          </Link>

          <Link to={`/dashboard/Billing`}>
            <Card
              image={bill}
              title="Check your bill"
              buttonText="Click"
              onClick={() => {
                navigate('/dashboard/Billing')
              }}
              style={{ width: "250px", height: "250px" }}
            />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
