from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from typing import Optional
from datetime import datetime

from CRUD import *

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"], 
    allow_headers=["*"], 
)

# Login and Sign Up
@app.post("/login")
def login(login_obj: accounts.Login):
    return accounts.login(login_obj)

@app.post("/signup")
def signup(signup_obj: accounts.User):
    return accounts.sign_up(signup_obj)

@app.post("/change_password")
def changePassword(chg_pwd: accounts.ChangePassword):
    return accounts.change_password(chg_pwd)

# Complaints
@app.get("/complaints/{status}")
def getComplaints(status: str):
    return complaints.get_complaints(status)

@app.get("/complaint/{id}")
def getComplaint(id):
    return complaints.get_complaint(id)

@app.post("/complaint")
def createComplaint(
    location_id: Optional[str] = Form(None),
    complaintant: str = Form(...),
    latitude: Optional[float] = Form(None),
    longitude: Optional[float] = Form(None),
    fault_type: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    photo: Optional[UploadFile] = None
):
    complaint = complaints.Complaint(
        location_id = location_id,
        complaintant = complaintant,
        latitude = latitude,
        longitude = longitude,
        fault_type = fault_type,
        title = title,
        description = description,
        photo = photo 
        )
    return complaints.add_complaint(complaint)

@app.put("/complaint/{issuer}/{change}/{id}")
def updateComplaint(id: int, change: str, issuer: str):
    return complaints.change_complaint(id, change, issuer)

@app.delete("/complaint/{issuer}/{id}")
def deleteComplaint(id: int, issuer: str):
    return complaints.delete_complaint(id, issuer)

@app.get("/complaint/photo/{id}")
def getComplaintPhoto(id: int):
    return complaints.get_photo(id)


# Notifications
@app.get("/notifications/{status}")
def getNotifications(status: str):
    return notifications.get_notifications(status)

@app.get("/notification/{id}")
def getNotification(id: int):
    return notifications.get_notification(id)

@app.post("/notification")
def createNotification(notification: notifications.Notification):
    return notifications.add_notification(notification)

@app.put("/notification/{issuer}/{change}/{id}")
def updateNotification(id: int, change: str, issuer: str):
    return notifications.change_notification(id, change, issuer)

@app.delete("/notification/{issuer}/{id}")
def deleteNotification(id: int, issuer: str):
    return notifications.delete_notification(id, issuer)


# Applications
@app.get("/applications/{status}")
def getApplications(status: str):
    return applications.get_applications(status)

@app.get("/application/{id}")
def getApplication(id: int):
    return applications.get_application(id)

@app.post("/application")
def createApplication(
    userid: str = Form(...),
    applicantname: str = Form(...),
    applicationdate: Optional[datetime] = Form(datetime.now()),
    connectiontype: str = Form(...),
    connection_size: float = Form(...),
    address: str = Form(...),
    postal_code: str = Form(...),
    property_number: str = Form(...),
    status: Optional[str] = Form('PENDING'),
    id_proof: Optional[UploadFile] = Form(None),
    address_proof: Optional[UploadFile] = Form(None)
):
    return applications.add_application(applications.Application(
        UserID=userid,
        ApplicantName=applicantname,
        ApplicationDate=applicationdate,
        ConnectionType=connectiontype,
        Connection_Size=connection_size,
        Address=address,
        Postal_Code=postal_code,
        Property_Number=property_number,
        Status=status,
        Id_Proof=id_proof,
        Address_Proof=address_proof
    ))

@app.put("/application/{issuer}/{change}}/{id}")
def updateApplication(id: int, change: str, issuer: str):
    return applications.change_application(id, change, issuer)

@app.get("/application/id_proof/{id}")
def getIdProof(id: int):
    return applications.get_id_proof(id)

@app.get("/application/address_proof/{id}")
def getAddressProof(id: int):
    return applications.get_address_proof(id)

# Locations
@app.get("/zones")
def get_zones():
    return locations.get_zones()

@app.get("/wards/{zone}")
def get_wards(zone: str):
    return locations.get_wards(zone)

@app.get("/ward/{id}")
def get_ward(id: str):
    return locations.get_ward_from_id(id)


# Connections
@app.get("/connection/{id}")
def get_connection(id: str):
    return connections.get_connection(id)

@app.get("/connection_user/{username}")
def get_connection_from_username(username: str):
    return connections.get_connections_by_user(username)

@app.post("/connection")
def create_connection(connection: connections.Connection):
    return connections.add_connection(connection)

@app.delete("/connection/{id}")
def delete_connection(id: str):
    return connections.delete_connection(id)


# Bills
@app.get("/bill/{connection_id}/{month}/{year}")
def get_bills(connection_id: int, month: int, year: int):
    return bills.get_bill_by_connection(connection_id, month, year)

@app.post("/bill")
def create_bill(bill: bills.Bill):
    return bills.add_bill(bill)

@app.delete("/bill/{id}")
def delete_bill(id: int):
    return bills.delete_bill(id)

@app.put("/bill_pay/{id}")
def pay_bill(id: int):
    return bills.pay_bill(id)

# Water TIme Table

@app.get("/water_time_table/{location}")
def get_water_time_table(location: str):
    return water_time_table.get_time_table_by_location(location)

@app.post("/water_time_table")
def add_water_time_table(time_table: water_time_table.TimeTable):
    return water_time_table.add_time_table(time_table)

@app.put("/water_time_table/")
def update_water_time_table(time_table: water_time_table.TimeTable):
    return water_time_table.update_time_table(time_table)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
