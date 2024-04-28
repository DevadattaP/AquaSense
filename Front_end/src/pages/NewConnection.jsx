import React, { useState } from 'react';

function Editor() {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        postalCode: '',
        mobileNumber: '',
        email: '',
        propertyNumber: '',
        propertyType: '',
        population: '',
        numOfFloors: '',
        numOfFlats: '',
        connectionType: '',
        category: '',
        connectionSize: '',
        areaType: '',
        identityProof: '',
        residentialProof: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error message when input changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required';
            }
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);
            // Add form submission logic here
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-xl">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl mb-5 text-center pb-4" style={{ fontSize: '45px' }}>New Tap Connection</h1>
                {/* Customer Information Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-semibold">Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                {errors.address && <p className="text-red-500">{errors.address}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Postal Code</label>
                                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                {errors.postalCode && <p className="text-red-500">{errors.postalCode}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Mobile Number</label>
                                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                {errors.email && <p className="text-red-500">{errors.email}</p>}
                            </div>
                        </div>
                        <hr className="my-6" />
                        {/* Property Information Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Property Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold">Property Number</label>
                                    <input type="text" name="propertyNumber" value={formData.propertyNumber} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                    {errors.propertyNumber && <p className="text-red-500">{errors.propertyNumber}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Property Type</label>
                                    <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required>
                                        <option value="">Select Property Type</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="Industrial">Industrial</option>
                                        <option value="Institutional">Institutional</option>
                                        <option value="Individual House">Individual House</option>
                                    </select>
                                    {errors.propertyType && <p className="text-red-500">{errors.propertyType}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Population</label>
                                    <input type="text" name="population" value={formData.population} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                    {errors.population && <p className="text-red-500">{errors.population}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Number of Floors</label>
                                    <input type="text" name="numOfFloors" value={formData.numOfFloors} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                    {errors.numOfFloors && <p className="text-red-500">{errors.numOfFloors}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Number of Flats</label>
                                    <input type="text" name="numOfFlats" value={formData.numOfFlats} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                    {errors.numOfFlats && <p className="text-red-500">{errors.numOfFlats}</p>}
                                </div>
                            </div>
                        </div>
                        <hr className="my-6" />
                        {/* Connection Details Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Connection Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold">Connection Type</label>
                                    <select name="connectionType" value={formData.connectionType} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required>
                                        <option value="">Select Connection Type</option>
                                        <option value="Retail">Retail</option>
                                        <option value="Bulk">Bulk</option>
                                    </select>
                                    {errors.connectionType && <p className="text-red-500">{errors.connectionType}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required>
                                        <option value="">Select Category</option>
                                        <option value="Domestic">Domestic</option>
                                        <option value="Non-Domestic">Non-Domestic</option>
                                        <option value="Special Consumer">Special Consumer</option>
                                        <option value="Corporation">Corporation</option>
                                        <option value="Railway">Railway</option>
                                    </select>
                                    {errors.category && <p className="text-red-500">{errors.category}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Connection Size (in mm)</label>
                                    <input type="text" name="connectionSize" value={formData.connectionSize} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required />
                                    {errors.connectionSize && <p className="text-red-500">{errors.connectionSize}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Area Type</label>
                                    <select name="areaType" value={formData.areaType} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" required>
                                        <option value="">Select Area Type</option>
                                        <option value="Urban">Urban</option>
                                        <option value="Rural">Rural</option>
                                    </select>
                                    {errors.areaType && <p className="text-red-500">{errors.areaType}</p>}
                                </div>
                            </div>
                        </div>
                        <hr className="my-6" />
                        {/* Upload Documents Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Upload Documents</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold">Identity Proof</label>
                                    <input type="file" name="identityProof" onChange={handleInputChange} required />
                                    {errors.identityProof && <p className="text-red-500">{errors.identityProof}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Residential Proof</label>
                                    <input type="file" name="residentialProof" onChange={handleInputChange} required />
                                    {errors.residentialProof && <p className="text-red-500">{errors.residentialProof}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Editor;