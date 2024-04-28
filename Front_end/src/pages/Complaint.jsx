import React, { useState } from 'react';
import axios from 'axios';

export default function Complaint() {
    const [complaint, setComplaint] = useState({
        "longitude": 83.02304,
        "latitude": 25.32559,
        "complainant": "Sumit",
        "fault_type": "Water supply",
        "title": "Water Supply Issue",
        "description": "There is a problem with the water supply in my area."
    });

    const postComplaint = async () => {
        try {
            // const response = await axios.post('http://127.0.0.1:5000/complaint', complaint);
            // console.log('Complaint successfully submitted:', response.data);
            // // Handle success (e.g., show a success message)
            const response = fetch(`http://127.0.0.1:5000/complaint`, {
                method: "POST",
                body: complaint
            })
        } catch (error) {
            console.error('Error submitting complaint:', error);
            // Handle error (e.g., show an error message)
        }

    }


    return (
        <div>
            <h2>File a Complaint</h2>
            <p>Title: {complaint.title}</p>
            <p>Description: {complaint.description}</p>
            <button onClick={postComplaint}>Submit Complaint</button>
        </div>
    );
}

