from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import logging
from fastapi import UploadFile
from os import path

from UTILS.dataop import *
from UTILS.mail import *
from UTILS.locs import *
from UTILS.file_validation import *

class Complaint(BaseModel):
    complaint_id: Optional[int] = None
    location_id: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    complaintant: str 
    complaint_date: Optional[datetime] = datetime.now()
    fault_type: str
    title: str
    description: str
    is_addressed: Optional[bool] = False
    is_transferred: Optional[bool] = False


def get_complaints(status='PENDING'):
    type_dict = {
        'ALL': "1=1",
        'PENDING': "Is_Addressed = FALSE and Is_Transferred = FALSE",
        'UNADDRESSED': "Is_Addressed = FALSE",
        'ADDRESSED': "Is_Addressed = TRUE",
        'TRANSFERRED': "Is_Transferred = TRUE"
    }

    query = f"""
    SELECT ComplaintID, LocationID, ComplaintantID, ComplaintDate, Fault_type, Title, Description, Is_Addressed, Is_Transferred
    FROM Complaints
    WHERE {type_dict[status]}
    ORDER BY ComplaintID ASC;
    """

    return execute_select(query)


def get_complaint(id):
    query = f"""
    SELECT ComplaintID, LocationID, Complaintant, ComplaintDate, Fault_type, Title, Description, Is_Addressed, Is_Transferred
    FROM Complaints
    WHERE ComplaintID = {id};
    """

    return execute_select(query)



def change_complaint(id, change, username):
    change_dict = {
        'ADDRESS': "Is_Addressed = TRUE",
        'TRANSFER': "Is_Transferred = TRUE",
        'UNDO_ADDRESS': "Is_Addressed = FALSE",
        'UNDO_TRANSFER': "Is_Transferred = FALSE"
    }

    query = f"""
    UPDATE Complaints
    SET {change_dict[change]}
    WHERE ComplaintID = {id};
    """

    log_query=f"""
    INSERT INTO ComplaintLog (Timestamp, ComplaintID, ComplaintAction, Username)
    VALUES ({datetime.now()}, {id}, 'Change: [{change}]', {username});
    """

    email_query=f"""
    SELECT Users.Email
    FROM Complaints
    JOIN Users ON Complaints.ComplaintantID = Users.Username
    WHERE Complaints.ComplaintID = {id};
    """

    complaint_query = f"""
    SELECT Fault_type, ComplaintDate, ComplaintantID
    FROM Complaints
    WHERE ComplaintID = {id};
    """

    result = execute_query(query, message=f"{change} commited successfully.")

    if result['status'] == 'success': 
        execute_query(log_query)

        if change == 'ADDRESS' or change == 'TRANSFER':
            email = execute_select(email_query)['response']['email']
            data_dict = execute_select(complaint_query)['response']
            fault, complaint_date, complaintant = data_dict['fault_type'], data_dict['complaintdate'], data_dict['complaintantid']
            formatting = {
                "[User]": complaintant,
                "[ComplaintType]": fault,
                "[ComplaintID]": id,
                "[ComplaintDate]": complaint_date
            }
            mail_type = 'COMPLAINT_RESOLUTION' if change=='ADDRESS' else 'COMPLAINT_TRANSFER'

            send_email(email, *format_email(mail_type, formatting))


    return result



def delete_complaint(id, username):
    query = f"""
    DELETE FROM Complaints
    WHERE ComplaintID = {id};
    """

    log_query=f"""
    INSERT INTO ComplaintLog (Timestamp, ComplaintID, ComplaintAction, Username)
    VALUES ({datetime.now()}, {id}, 'Deleted', {username});
    """


    result = execute_query(query, message=f"Complaint (id:{id}) deleted succesfully.")

    if result['status'] == 'success': 
        print(execute_query(log_query))
        

    return result


def add_complaint(complaint: Complaint):
    if complaint.location_id and complaint.latitude:
        location = complaint.location_id
        latitude, longitude = complaint.latitude, complaint.longitude
    elif not complaint.location_id and complaint.latitude:
        location = nearest_location(complaint.latitude, complaint.longitude)['wardid']
        latitude, longitude = complaint.latitude, complaint.longitude
    elif complaint.location_id and not complaint.latitude:
        location = complaint.location_id
        # print(location)
        loc_result = execute_select(f"SELECT ST_Y(center) as latitude, ST_X(center) as longitude FROM Ward WHERE WardID = '{location}'")
        # print(loc_result)
        if loc_result['status']=='success' and loc_result['response']:
            loc = loc_result["response"]
        else:
            raise ValueError(f"Location {location} does not exist.")
        latitude, longitude = loc['latitude'], loc['longitude']
    else:
        raise ValueError("Neither location nor co-ordinates")

    query = f"""
    INSERT INTO Complaints (LocationID, ComplaintantID, ComplaintDate, coords, Fault_type, Title, Description)
    VALUES ('{location}', '{complaint.complaintant}', '{complaint.complaint_date}', ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326),
    '{complaint.fault_type}', '{complaint.title}', '{complaint.description}');
    """

    email = execute_select(f"SELECT email FROM users WHERE username='{complaint.complaintant}'")['response']['email']
    location_name = execute_select(f"SELECT name FROM Ward WHERE WardID = '{location}'")['response']['name']

    complaint_id = execute_select("SELECT nextval('complaints_complaintid_seq')")['response']['nextval']-1

    formatting = {
        "[User]": complaint.complaintant,
        "[ComplaintType]": complaint.fault_type,
        "[ComplaintID]": complaint_id,
        "[Location]": location_name,
        "[ComplaintDate]": complaint.complaint_date
    }

    send_email(email, *format_email('COMPLAINT_CONFIRMATION', formatting))

    log_query = f"""
        INSERT INTO ComplaintLog (Timestamp, ComplaintID, ComplaintAction, Username)
        VALUES ('{complaint.complaint_date}', {complaint_id}, 'add_complaint', '{complaint.complaintant}');
    """

    result = execute_query(query, message='Complaint added successfully.')

    if result['status'] == 'success': print(execute_query(log_query))

    return result


def add_image(file: UploadFile, filename: str):
    try:
        validate_file_size_type(file)
        file_path = path.join(path.dirname(path.abspath(__file__)), filename)
        with open(file_path, 'wb') as f:
            f.write(file.file.read())
        return {
           'status':'success',
           'response': file_path
        }
    except Exception as e:
        return {
           'status': 'error',
           'response': str(e)
        }

    

if __name__ == '__main__':
    # complaint_data_2 = {
    #     # "location_id": "W048",
    #     "longitude": 83.02304,
    #     "latitude": 25.32559,
    #     "complaintant": "vansh_test",
    #     "complaint_date": datetime.now(),
    #     "fault_type": "Water supply",
    #     "title": "Water Supply Issue",
    #     "description": "There is a problem with the water supply in my area."
    # }
    # print(add_complaint(Complaint(**complaint_data_2)))
    # print(get_complaints(status='ALL'))
    pass