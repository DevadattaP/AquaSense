from fastapi import UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import logging
from os import path
from pathlib import Path
from shutil import copyfileobj

from UTILS.dataop import *
from UTILS.mail import *


FILE_SIZE = 5242880


class Application(BaseModel):
    ApplicationID: Optional[int] = None
    UserID: str
    ApplicantName: str
    ApplicationDate: Optional[datetime] = datetime.now()
    ConnectionType: str
    Connection_Size: float
    Address: str
    Postal_Code: str
    Property_Number: str
    Status: Optional[str] = 'PENDING'
    Id_Proof: Optional[UploadFile] = None
    Address_Proof: Optional[UploadFile] = None


def get_applications(status='PENDING'):
    type_dict = {
        'ALL': "1=1",
        'PENDING': "Status = 'PENDING'",
        'APPROVED': "Status = 'APPROVED'",
        'REJECTED': "Status = 'REJECTED'"
    }

    query = f"""
    SELECT ApplicationID, UserID, ApplicantName, ApplicationDate, ConnectionType, Connection_Size, Address, Postal_Code, Property_Number, Status
    FROM Applications
    WHERE {type_dict[status]};
    """

    return execute_select(query)


def get_application(id):
    query = f"""
    SELECT ApplicationId, UserID, ApplicantName, ApplicationDate, ConnectionType, Connection_Size, Address, Postal_Code, Property_Number, Status
    FROM Applications
    WHERE ApplicationID = {id};
    """

    return execute_select(query)


def change_application(id, change, username):
    change_dict = {
        'APPROVE': "Status = 'APPROVED'",
        'REJECT': "Status = 'REJECTED'",
        'UNDO': "Status = 'PENDING'"
    }

    query = f"""
    UPDATE Applications
    SET {change_dict[change]}
    WHERE ApplicationID = {id};
    """

    log_query = f"""
    INSERT INTO ApplicationLog (Timestamp, ApplicationID, ApplicationAction, Username)
    VALUES ('{datetime.now()}', {id}, 'Change: [{change}]', '{username}');
    """

    email_query=f"""
    SELECT Users.Email
    FROM Applications
    JOIN Users ON Complaints.UserID = Users.Username
    WHERE Applications.ApplicationID = {id};
    """

    application_query = f"""
    SELECT ConnectionType, ApplicationDate, UserID
    FROM Applications
    WHERE ApplicationID = {id};
    """

    result = execute_query(query, message=f"{change} committed successfully.")


    if result['status'] == 'success':
        execute_query(log_query)
        if change == 'APPROVE' or change == 'REJECT':
            email = execute_select(email_query)['response']['email']
            data_dict = execute_select(application_query)['response']

            userid, connection_type, application_date = data_dict['userid'], data_dict['connectiontype'], data_dict['applicationdate']

            formatting = {
            "[User]": userid,
            "[ConnectionType]": connection_type,
            "[ApplicationID]": id,
            "[ApplicationDate]": application_date
            }

            mail_type = 'APPLICATION_ACCEPTANCE' if change == 'APPROVE' else 'APPLICATION_REJECTION'

            send_email(email, *format_email(mail_type, formatting))

    return result


def delete_application(id, username):
    query = f"""
    DELETE FROM Applications
    WHERE ApplicationID = {id};
    """

    log_query = f"""
    INSERT INTO ApplicationLog (Timestamp, ApplicationID, ApplicationAction, Username)
    VALUES ('{datetime.now()}', {id}, 'Deleted', '{username}');
    """

    result = execute_query(query, message=f"Application (id:{id}) deleted successfully.")

    if result['status'] == 'success':
        execute_query(log_query)

    return result


def add_application(application: Application):
    query = f"""
    INSERT INTO Applications (UserID, ApplicantName, ApplicationDate, ConnectionType, Connection_Size, 
    Address, Postal_Code, Property_Number, Status)
    VALUES ('{application.UserID}', '{application.ApplicantName}', '{application.ApplicationDate}', '{application.ConnectionType}', 
    {application.Connection_Size}, '{application.Address}', '{application.Postal_Code}', 
    '{application.Property_Number}', '{application.Status}');
    """

    application_id = execute_select("SELECT nextval('applications_applicationid_seq')")['response']['nextval']-1

    if application.Id_Proof:
        try:
            file_exts_dict={
                'image/jpeg': 'jpg',
                'image/jpg': 'jpg',
                'image/png': 'png'
            }
            if application.Id_Proof.content_type not in ['image/jpeg', 'image/jpg', 'image/png']:
                raise ValueError(f"File type {application.Id_Proof.content_type} not supported.")
            if application.Id_Proof.size > FILE_SIZE:
                raise ValueError(f"File size {application.Id_Proof.size} is too large.")
            CRUD_path = str(path.dirname(path.abspath(__file__)))
            file_path = f"{str(Path(CRUD_path).parent)}\\images\\applications\\idproof\\{application_id}.{file_exts_dict[application.Id_Proof.content_type]}"
            print(file_path)
            with open(file_path, 'wb') as f:
                copyfileobj(application.Id_Proof.file, f)
        except Exception as e:
            return {
            'status': 'error',
            'response': str(e)
            }
        
    if application.Address_Proof:
        try:
            file_exts_dict={
                'image/jpeg': 'jpg',
                'image/jpg': 'jpg',
                'image/png': 'png'
            }
            if application.Address_Proof.content_type not in ['image/jpeg', 'image/jpg', 'image/png']:
                raise ValueError(f"File type {application.Address_Proof.content_type} not supported.")
            if application.Address_Proof.size > FILE_SIZE:
                raise ValueError(f"File size {application.Address_Proof.size} is too large.")
            CRUD_path = str(path.dirname(path.abspath(__file__)))
            file_path = f"{str(Path(CRUD_path).parent)}\\images\\applications\\addressproof\\{application_id}.{file_exts_dict[application.Address_Proof.content_type]}"
            print(file_path)
            with open(file_path, 'wb') as f:
                copyfileobj(application.Address_Proof.file, f)
        except Exception as e:
            return {
            'status': 'error',
            'response': str(e)
            }

    log_query = f"""
    INSERT INTO ApplicationLog (Timestamp, ApplicationID, ApplicationAction, Username)
    VALUES ('{datetime.now()}', {application_id}, 'Added_Application', '{application.UserID}');
    """

    email = execute_select(f"SELECT email FROM users WHERE username='{application.UserID}'")['response']['email']

    formatting = {
    "[User]": application.UserID,
    "[ConnectionType]": application.ConnectionType,
    "[ApplicationID]": application_id,
    "[ApplicationDate]": application.ApplicationDate
    }


    send_email(email, *format_email('APPLICATION_CONFIRMATION', formatting))

    result = execute_query(query, message='Application added successfully.')

    if result['status'] == 'success':
        print(execute_query(log_query))

    return result


def get_id_proof(application_id):
    CRUD_path = str(path.dirname(path.abspath(__file__)))
    image_path = f"{str(Path(CRUD_path).parent)}\\images\\applications\\idproof\\{application_id}"

    extensions = ['jpg', 'png', 'jpeg']

    for ext in extensions:
        if path.isfile(f"{image_path}.{ext}"):
            return FileResponse(Path(f"{image_path}.{ext}"))
        

def get_address_proof(application_id):
    CRUD_path = str(path.dirname(path.abspath(__file__)))
    image_path = f"{str(Path(CRUD_path).parent)}\\images\\applications\\addressproof\\{application_id}"

    extensions = ['jpg', 'png', 'jpeg']

    for ext in extensions:
        if path.isfile(f"{image_path}.{ext}"):
            return FileResponse(Path(f"{image_path}.{ext}"))



if __name__ == '__main__':
    # application = Application(
    #     UserID='tatya_trump',  # User ID of the applicant
    #     ApplicationDate=datetime.now(),
    #     ConnectionType="Residential",
    #     Address="123 Main Street",
    #     Status="PENDING"
    # )
    # print(add_application(application))
    # print(get_application(3))
    # print(change_application(3, 'APPROVE', 'tatya_trump'))
    # print(delete_application(3, 'tatya_trump'))
    pass