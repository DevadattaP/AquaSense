from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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
    return accounts.signup(signup_obj)


# Complaints
@app.get("/complaints/{status}")
def getComplaints(status: str):
    return complaints.get_complaints(status)

@app.get("/complaint/{id}")
def getComplaint(id):
    return complaints.get_complaint(id)

@app.post("/complaint")
def createComplaint(complaint: complaints.Complaint):
    return complaints.add_complaint(complaint)

@app.put("/complaint/{issuer}/{change}/{id}")
def updateComplaint(id: int, change: str, issuer: str):
    return complaints.change_complaint(id, change, issuer)

@app.delete("/complaint/{issuer}/{id}")
def deleteComplaint(id: int, issuer: str):
    return complaints.delete_complaint(id, issuer)


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
def createApplication(application: applications.Application):
    return applications.add_application(application)

@app.put("/application/{issuer}/{change}}/{id}")
def updateApplication(id: int, change: str, issuer: str):
    return applications.change_application(id, change, issuer)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
