import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const RegisterForm = () => {
  const [locationNames, setLocationNames] = useState([]);
  const [zonesData, setZonesData] = useState([]);
  const [wardsData, setWardsData] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
    Phone_No: '',
    Gender: 'M',
    LocationID: '',
    Admin: false
  });

  const fetchZones = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/zones');
      const zonesData = response.data.response.map((zone) => ({
        name: zone.name,
        id: zone.zoneid
      }));
      setZonesData(zonesData);
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  };

  const fetchNamesByZone = async (zoneID) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/wards/${zoneID}`);
      const names = response.data.response.map((ward) => ward.name);
      const wardData = response.data.response.map((ward) => ({
        name: ward.name,
        wardid: ward.wardid // Include wardid along with the name
      }));
      setWardsData(wardData);
      setLocationNames(names);
    } catch (error) {
      console.error(`Error fetching names for zone ${selectedZone}:`, error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleZoneChange = (e) => {
    const selectedZoneName = e.target.value;

    setSelectedZone(selectedZoneName);
    setSelectedLocation('');

    const selectedZoneData = zonesData.find((zone) => zone.name === selectedZoneName);
    if (selectedZoneData) {
      fetchNamesByZone(selectedZoneData.id);
    }
  };

  const handleLocationChange = (e) => {
    const selectedLocationName = e.target.value;

    // Find the ward object that matches the selected location name
    const selectedWard = wardsData.find((ward) => ward.name === selectedLocationName);

    if (selectedWard) {
      // Update the LocationID in the formData with the wardid of the selected location
      setFormData({
        ...formData,
        LocationID: selectedWard.wardid // Use the wardid of the selected location
      });
    } else {
      // Handle error or default behavior if selectedWard is not found
      console.error(`Ward for location ${selectedLocationName} not found in wardsData`);
    }

    setSelectedLocation(selectedLocationName);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hash the password using CryptoJS
      const hashedPassword = CryptoJS.SHA256(formData.Password).toString(CryptoJS.enc.Hex);

      const response = await axios.post('http://127.0.0.1:5000/signup', {
        ...formData,
        Password: hashedPassword, // Replace the plain password with the hashed password
      });
      console.log('Registration successful:', response.data);
      // Handle success - e.g., show a success message or redirect
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error - e.g., display an error message to the user
    }
  };


  return (
    <div className="min-w-screen min-h-screen bg-gray-500 flex items-center justify-center px-2 py-2" >
      <div className="bg-gray-200 text-gray-800 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '500px' }}>
        <div className="flex justify-center w-full">
          <div className="w-full py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="username" className="text-xs font-semibold px-1">Username</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                    <input id="Username" type="text" title="Enter your username" className="w-full -ml-10 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter your username" value={formData.Username}
                      onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                    <input id="Password" type="password" title="Enter your password" value={formData.Password}
                      onChange={handleInputChange} className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter your password" />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                    <input id="Email" type="email" title="Enter your email" value={formData.Email}
                      onChange={handleInputChange} className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter your email" />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="phone" className="text-xs font-semibold px-1">Phone Number</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-phone-outline text-gray-400 text-lg"></i></div>
                    <input id="Phone_No" type="text" value={formData.Phone_No}
                      onChange={handleInputChange} title="Enter your phone number" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter your phone number" />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-4">
                  <label htmlFor="gender" className="text-xs font-semibold px-1">Gender</label>
                  <div className="flex">
                    <select id="Gender" title="Select your gender" value={formData.Gender}
                      onChange={handleInputChange} className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="zone" className="text-xs font-semibold px-1">Zone</label>
                    <div className="flex">
                      <select
                        id="zone"
                        title="Select your zone"
                        className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        value={selectedZone}
                        onChange={handleZoneChange}
                      >
                        <option value="">Select zone</option>
                        {zonesData.map((zone) => (
                          <option key={zone.id} value={zone.name}>{zone.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="location" className="text-xs font-semibold px-1">Location</label>
                  <div className="flex">
                    <select
                      id="location"
                      title="Select your location"
                      className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      value={selectedLocation}
                      onChange={handleLocationChange}
                    >
                      <option value="">Select location</option>
                      {locationNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex -mx-3 pt-8">
                <div className="w-full px-3 mb-5">
                  <button onClick={handleSubmit} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default RegisterForm;
