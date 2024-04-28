import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import useAuth hook from your AuthProvider

const ComplaintTable = () => {
    const [data, setData] = useState([]);
    const { isLoggedIn } = useAuth(); // Retrieve isLoggedIn state from AuthProvider
    const { isAdmin } = useAuth(); // Retrieve isLoggedIn state from AuthProvider

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/complaints/ALL');
            const responseData = response.data.response;

            // Ensure responseData is an array before setting data
            if (Array.isArray(responseData)) {
                setData(responseData); // Set data to the response array
            } else if (typeof responseData === 'object' && responseData !== null) {
                // If responseData is a single object, wrap it in an array
                setData([responseData]);
            } else {
                console.error('Invalid data format from API:', responseData);
                // Handle other cases where responseData is not valid
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    ///////// //////////
    const [position, setPosition] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        fault_type: 'Leakage',
        title: '',
        description: '',
        photo: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            photo: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { fullName, mobileNumber, fault_type, title, description } = formData;
            const { lat, lng } = position;

            const postData = {
                complaintant: 'Sumit', // Placeholder for complainant ID
                fault_type: fault_type, // Corrected field name
                title: title,
                description: description,
                latitude: lat, // Assign latitude directly
                longitude: lng // Assign longitude directly

            };

            console.log('Submitting complaint:', postData);

            const response = await fetch('http://127.0.0.1:5000/complaint/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response:', responseData);

            setFormData({
                fullName: '',
                mobileNumber: '',
                fault_type: 'Leakage', // Reset fault_type to default
                title: '',
                description: ''
            });

            alert('Complaint submitted successfully!');
            fet
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Failed to submit complaint. Please try again.');
        }
    };
    ///////// //////////

    useEffect(() => {
        fetchData();

        // Initialize Leaflet map when the component mounts
        const map = L.map('map').setView([25.334634129747172, 83.00720747094603], 13); // Default coordinates (London)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        const marker = L.marker([25.334634129747172, 83.00720747094603], { draggable: true }).addTo(map); // Default marker (London)
        marker.on('dragend', (event) => {
            const newPosition = event.target.getLatLng();
            setPosition(newPosition);
        });

        setPosition(marker.getLatLng()); // Set initial position
    }, []);

    return (
        <div className="m-2 overflow-x-scroll flex-1 md:mx-4 mt-10 p-2 md:p-2 bg-white rounded-3xl overflow-hidden">
            {/* Existing Table */}
            {isAdmin && (
                <div className='pb-4'>
                    <div className="p-2 text-xl flex justify-between items-center">
                        <h1>Complaints</h1>
                        {/* <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            // onClick={handleOpenModal}
                        >
                            Create
                        </button> */}
                    </div>
                    <div className="overflow-auto">
                        <table className="bg-white border-gray-200 border w-full">
                            {/* Table Header */}
                            <thead className="bg-gray-100">
                                <tr className="text-gray-600 uppercase text-sm">
                                    <th className="p-3">Complaint ID</th>
                                    <th className="p-3">Complainant ID</th>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Fault Type</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Complaint Date</th>
                                    <th className="p-3">Is Addressed</th>
                                    <th className="p-3">Is Transferred</th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody className="text-gray-600 text-sm font-light">
                                {data.map((item) => (
                                    <tr key={item.complaintid} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-center">{item.complaintid}</td>
                                        <td className="p-3 text-center">{item.complaintantid}</td>
                                        <td className="p-3 text-center">{item.title}</td>
                                        <td className="p-3 text-center">{item.fault_type}</td>
                                        <td className="p-3 text-center">{item.description}</td>
                                        <td className="p-3 text-center">{item.complaintdate}</td>
                                        <td className="p-3 text-center">{item.is_addressed ? 'Yes' : 'No'}</td>
                                        <td className="p-3 text-center">{item.is_transferred ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Complaint Form */}
            <div className='pt-10'>
                <h1 className="text-3xl mb-5 text-center pb-4">Report a Fault</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 font-semibold">Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Mobile Number</label>
                        <input type="tel" name="mobileNumber" value={formData.mobileNumber} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Fault Type</label>
                        <select name="fault_type" value={formData.fault_type} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
                            <option value="Leakage">Leakage</option>
                            <option value="Blockage">Blockage</option>
                            <option value="No Supply">No Supply</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Title</label>
                        <input type="text" name="title" value={formData.title} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="w-full relative">
                        <h2 className="text-lg font-semibold mb-2">Pin Your Location</h2>
                        <div id="map" className="w-full h-72 mt-8"></div>
                        {position && (
                            <div className="bg-white p-2 rounded-md shadow mt-4">
                                <p className="font-semibold">Coordinates:</p>
                                <p>{position.lat}, {position.lng}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Describe Complaint</label>
                        <textarea name="description" value={formData.description} required onChange={handleInputChange} rows="4" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Upload Photo of Fault</label>
                        <input type="file" name="photo" accept="image/*" onChange={handlePhotoUpload} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ComplaintTable;
