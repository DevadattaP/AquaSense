import React, { useEffect, useState } from "react";
import axios from 'axios';
import L from 'leaflet';
import Cookies from 'js-cookie';

const Complaint = () => {
    const [position, setPosition] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        fault_type: 'Leakage',
        title: '',
        description: '',
        latitude: '',
        longitude: ''
    });
    const [imageFile, setImageFile] = useState(null); // State to hold the selected image file

    const [complaint, setComplaint] = useState({
        "longitude": 83.02304,
        "latitude": 25.32559,
        "complaintant": "Sumit",
        "fault_type": "Water supply",
        "title": "Water Supply Issue",
        "description": "There is a problem with the water supply in my area.",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        console.log(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { fullName, mobileNumber, fault_type, title, description } = formData;
            const { lat, lng } = position;
            // const form = document.getElementById('form');

            // var form_data = new FormData();
            
            const formDataWithImage = new FormData();
            // formDataWithImage.append('fullName', fullName);
            formDataWithImage.append('complaintant', 'Sumit');
            // formDataWithImage.append('mobileNumber', mobileNumber);
            formDataWithImage.append('fault_type', fault_type);
            formDataWithImage.append('title', title);
            formDataWithImage.append('description', description);
            formDataWithImage.append('latitude', lat);
            formDataWithImage.append('longitude', lng);
            formDataWithImage.append('photo', imageFile); // Append image file to FormData


            console.log('Submitting complaint:', formDataWithImage);

            const response = await axios.post('http://127.0.0.1:5000/complaint/', formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // const complaint = {
            //     "longitude": 83.02304,
            //     "latitude": 25.32559,
            //     "complaintant": "Sumit",
            //     "fault_type": "Water supply",
            //     "title": "Water Supply Issue",
            //     "description": "There is a problem with the water supply in my area.",
            // }

            // console.log(complaint);
            // for (var key in complaint){
            //     form_data.append(key, complaint[key]);
            // }

            // console.log(form_data);
            // // const response = await axios.post('http://127.0.0.1:5000/complaint/', complaint);
            // const response = fetch(`http://127.0.0.1:5000/complaint`, {
            //     method: "POST",
            //     body: form_data
            // })
            // console.log('Response:', response.data);

            setFormData({
                fullName: '',
                mobileNumber: '',
                fault_type: 'Leakage',
                title: '',
                description: ''
            });
            setImageFile(null);

            alert('Complaint submitted successfully!');
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Failed to submit complaint. Please try again.');
        }
    };

    useEffect(() => {
        const map = L.map('map').setView([25.334634129747172, 83.00720747094603], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        const marker = L.marker([25.334634129747172, 83.00720747094603], { draggable: true }).addTo(map);
        marker.on('dragend', (event) => {
            const newPosition = event.target.getLatLng();
            setPosition(newPosition);
        });

        setPosition(marker.getLatLng());
    }, []);

    return (
        <div className="m-2 overflow-x-scroll flex-1 md:mx-4 mt-2 p-2 md:p-2 bg-white rounded-3xl overflow-hidden">
            <h1 className="text-3xl mb-5 text-center pb-4">Report a Fault</h1>
            <form className="space-y-4" id='form' onSubmit={handleSubmit}> 
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
                    <label className="block mb-1 font-semibold">Upload Image</label>
                    <input type="file" name="image" onChange={handleImageChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Describe Complaint</label>
                    <textarea name="description" value={formData.description} required onChange={handleInputChange} rows="4" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">Submit</button>
            </form>
        </div>
    );
};

export default Complaint;
