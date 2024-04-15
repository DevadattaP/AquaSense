import React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useStateContext } from '../contexts/ContextProvider';

import image5 from "../assets/img/image5.jpg";
import Card from '../components/Card';
import { Link } from "react-router-dom";
import Notifications from "../assets/img/Notifications.PNG"
import Complaint from "../assets/img/Complaint.jpeg"
import bill from "../assets/img/bill.png"
import current_status from "../assets/img/current_status.webp"
import new_water_connection from "../assets/img/new_water_connection.avif"
import minimap from "../assets/img/minimap.jpg"
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Home = () => {
  const { currentColor, currentMode } = useStateContext();

  return (



    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

      

    </div>
  );
};

export default Home;
