from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import logging

from UTILS.dataop import *
import hashlib

class User(BaseModel):
    Username: str
    Password: str
    Email: str
    Phone_No: str
    Gender: str
    LocationID: str
    Admin: Optional[bool] = False


class Login(BaseModel):
    username: str
    password: str


def sign_up(user: User):
    hashed_pass = user.Password
    
    query = f"""
    INSERT INTO Users (Username, Password, Email, Phone_No, Gender, LocationID, Admin)
    VALUES ('{user.Username}', '{hashed_pass}', '{user.Email}', '{user.Phone_No}', '{user.Gender}', '{user.LocationID}', {user.Admin});
    """

    return execute_query(query, message="User signed up successfully.")


def login(login: Login):
    hashed_pass = login.password

    query = f"""
    SELECT Password FROM Users
    WHERE Username = '{login.username}'
    """
    result = execute_select(query, make_list=True)

    if result['status'] != 'success':
        return {'status':'faliure', 'response':{'message': 'Some unkown error occurred'}}
    if not result['response']:
        return  {'status':'failure', 'response':{'message':'Username does not exist'}}
    if result['response'][0]['password'] != hashed_pass:
        return {'status':'failure', 'response':{'message':'Incorrect password'} }
    
    user_data_query = f"""
    SELECT Username, Email, Phone_No , Gender, LocationID, Admin
    FROM Users
    WHERE Username = '{login.username}'
    """

    user_data = execute_select(user_data_query)['response']

    return {'status':'success', 'response':{'message': 'You are signed in', **user_data}}


if __name__ == "__main__":
    pass
    # user_data = {
    # "Username": "vansh_test",
    # "Password": "password123",
    # "Email": "abhyasakarita@gmail.com",
    # "Phone_No": "1234567890",
    # "Gender": "M",
    # "LocationID": "W048",
    # "Admin": False
    # }
    # print(sign_up(User(**user_data)))
