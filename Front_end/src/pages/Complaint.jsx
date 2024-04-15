import React, { useState, useEffect } from 'react';

function Complaint() {
    const [position, setPosition] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        faultType: 'Leakage',
        title: '',
        description: ''
    });
    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
        document.head.appendChild(link);


        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);


        return () => {
            document.body.removeChild(script);
            document.head.removeChild(link);
        };
    }, []);


    function initializeMap() {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                (position) => {
                    const { latitude, longitude } = position.coords;
                    const map = L.map('map').setView([latitude, longitude], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                    const marker = L.marker([latitude, longitude], { draggable: true }).addTo(map);
                    marker.on('dragend', (event) => {
                        const newPosition = event.target.getLatLng();
                        setPosition([newPosition.lat, newPosition.lng]);
                    });
                    map.on('click', (event) => {
                        const clickedPosition = event.latlng;
                        setPosition([clickedPosition.lat, clickedPosition.lng]);
                    });
                    setPosition([latitude, longitude]);
                    setMapInstance(map);
                },

                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-xl">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl  mb-5 text-center pb-4" style={{fontSize:'45px'}}>Complaint Form</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-1 font-semibold">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 " />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Email</label>
                            <input type="email" name="email" value={formData.email} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Mobile Number</label>
                            <input type="tel" name="mobileNumber" value={formData.mobileNumber} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Fault Type</label>
                            <select name="faultType" value={formData.faultType} required onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
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
                        <div>
                            <label className="block mb-1 font-semibold">Describe Complaint</label>
                            <textarea name="description" value={formData.description} required onChange={handleInputChange} rows="4" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                        
                       
                    </form>
                    
                    <div className="w-full relative">
                        <h2 className="text-lg font-semibold mb-2 style={{ paddingTop: '3rem'}}">Pin Your Location</h2>
                        <div id="map" className="w-full h-72 mt-8"></div>
                        {position && (
                            <div className="bg-white p-2 rounded-md shadow mt-4">
                                <p className="font-semibold">Coordinates:</p>
                                <p>{position[0]}, {position[1]}</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div className="flex justify-center">
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">Submit</button>
            </div>
            
        </div>
    );
}

export default Complaint;
