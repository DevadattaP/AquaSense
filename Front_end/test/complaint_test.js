var fs = require('fs')
var path = require('path')

function post_complaint(url, complaint, photo) {
    var form_data = new FormData();

    for (var key in complaint){
        form_data.append(key, complaint[key]);
    }

    if (photo) {
        form_data.append('photo', photo);
    }

    const response = fetch(`${url}/complaint`, {
        method: "POST",
        body: form_data
    })
}

let complaint = {
    "longitude": 83.02304,
    "latitude": 25.32559,
    "complaintant": "vansh_test",
    "fault_type": "Water supply",
    "title": "Water Supply Issue",
    "description": "There is a problem with the water supply in my area."
}

url = "http://127.0.0.1:5000"




post_complaint(url, complaint)