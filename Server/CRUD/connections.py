from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import logging

from UTILS.dataop import *
from UTILS.mail import *
from UTILS.locs import *

class Connection(BaseModel):
    connection_id: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_id: Optional[int] = None
    source_id: Optional[int] = None
    owner_id: str


class Connection_Meter(BaseModel):
    log_id: Optional[int] = None
    connection_id: int
    log_date: Optional[date] = date.today()
    volume: float


def add_connection(connection: Connection):
    if connection.location_id and connection.latitude:
        location = connection.location_id
        latitude, longitude = connection.latitude, connection.longitude
    elif not connection.location_id and connection.latitude:
        location = nearest_location(connection.latitude, connection.longitude)['wardid']
        latitude, longitude = connection.latitude, connection.longitude
    elif connection.location_id and not connection.latitude:
        location = connection.location_id
        print(location)
        loc_result = execute_select(f"SELECT ST_Y(center) as latitude, ST_X(center) as longitude FROM Ward WHERE WardID = '{location}'")
        print(loc_result)
        if loc_result['status']=='success' and loc_result['response']:
            loc = loc_result["response"]
        else:
            raise ValueError(f"Location {location} does not exist.")
        latitude, longitude = loc['latitude'], loc['longitude']
    else:
        raise ValueError("Neither location nor co-ordinates")
    

    query = f"""
    INSERT INTO Connections (coords, LocationID, OwnerID)
    VALUES (ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326), '{location}', '{connection.owner_id}');
    """

    return execute_query(query, message="Connection added successfully.")


def get_connection(connection_id: int):
    query = f"""
    SELECT *
    FROM Connections
    WHERE ConnectionID = {connection_id};
    """

    return execute_select(query)


def get_connections_by_user(username: str):
    query = f"""
    SELECT *
    FROM Connections
    WHERE OwnerID = '{username}';
    """

    return execute_select(query, make_list=True)


def delete_connection(connection_id: int):
    query = f"""
    DELETE FROM Connections
    WHERE ConnectionID = {connection_id};
    """

    return execute_query(query, message="Connection deleted successfully.")


def connection_meter_entry(connection_id: int, volume: float, log_date = date.today()):
    query = f"""
    INSERT INTO connection_metering (ConnectionID, LogDate, WaterVolume)
    VALUES ({connection_id}, '{log_date}', {volume});
    """

    return execute_query(query, message="Connection meter entry made successfully.")

if __name__ == '__main__':
    print(connection_meter_entry(1, 100))