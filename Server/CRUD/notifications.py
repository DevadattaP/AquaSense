from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import logging

from UTILS.dataop import *
from math import sin, cos, asin, radians, sqrt

class Notification(BaseModel):
    notification_id: Optional[int] = None
    title: str
    issuer: str
    description: str
    notification_date: datetime
    is_live: Optional[bool] = False


def get_notifications(status='LIVE'):
    type_dict = {
        'ALL': "'1'='1'",
        'LIVE': "Is_Live = TRUE",
        'INACTIVE': "Is_Live = FALSE"
    }

    query = f"""
    SELECT NotificationID, Issuer, Title, Description, NotificationDate, Is_Live 
    FROM Notifications
    WHERE {type_dict[status]}
    ORDER BY NotificationID ASC;
    """

    return execute_select(query, make_list=True)


def get_notification(id):
    query = f"""
    SELECT NotificationID, Title, Description, NotificationDate, Is_Live 
    FROM Notifications;
    WHERE NotificationtID = {id};
    """

    return execute_select(query)


def change_notification(id, change, username):
    change_dict = {
        'DEACTIVATE': "Is_Live = FALSE",
        'REACTIVATE': "Is_Live = TRUE"
    }

    query = f"""
    UPDATE Notifications
    SET {change_dict[change]}
    WHERE NotificationID = {id};
    """

    log_query=f"""
    INSERT INTO NotificationLog (Timestamp, NotificationID, NotificationAction, Username)
    VALUES ({datetime.now()}, {id}, 'Change: [{change}]', {username});
    """

    result = execute_query(query, message=f"{change} commited successfully.")

    if result['status'] == 'success': print(execute_query(log_query))

    return result


def delete_notification(id, username):
    query = f"""
    DELETE FROM Notifications
    WHERE NotificationID = {id};
    """

    log_query=f"""
    INSERT INTO NotificationLog (Timestamp, NotificationID, NotificationAction, Username)
    VALUES ({datetime.now()}, {id}, 'Deleted', {username});
    """

    result = execute_query(query, message=f"Notification (id:{id}) deleted succesfully.")

    if result['status'] == 'success': print(execute_query(log_query))

    return result 


def add_notification(notification: Notification):
    query = f"""
    INSERT INTO Notifications (Title, Issuer, Description, NotificationDate)
    VALUES ('{notification.title}', '{notification.issuer}', '{notification.description}', '{notification.notification_date}');
    """

    log_query=f"""
    INSERT INTO NotificationLog (Timestamp, NotificationID, NotificationAction, Username)
    VALUES ('{datetime.now()}', nextval('notifications_notificationid_seq')-1, 'Added_Notification', '{notification.issuer}');
    """

    result = execute_query(query, message='Notification added successfully.')

    if result['status'] == 'success': print(execute_query(log_query))

    return result


if __name__ == '__main__':
    # print(get_notifications())
    # notification = Notification(
    #     title="New Notification",
    #     issuer="tatya_trump",
    #     description="This is a test notification.",
    #     notification_date=datetime.now()
    # )
    # print(add_notification(notification))
    pass