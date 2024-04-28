from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import logging

from UTILS.dataop import *


class TimeTable(BaseModel):
    time_table_id: Optional[int] = None
    location_id: str
    start_time: str
    end_time: str
    day_of_week: str


def add_time_table(timetable: TimeTable):
    query = f"""
    INSERT INTO WaterTimetable(location_id, start_time, end_time, day_of_week)
    VALUES ({timetable.location_id}, {timetable.start_time}, {timetable.end_time}, {timetable.day_of_week});
    """

    return execute_query(query, message='Timetable added successfully')


def get_time_table_by_location(location_id: str):
    query = f"""
    SELECT *
    FROM WaterTimetable
    WHERE location_id = {location_id};
    """

    return execute_select(query)


def update_time_table(timetable: TimeTable):
    query = f"""
    UPDATE WaterTimetable
    SET start_time = {timetable.start_time}, end_time = {timetable.end_time}, day_of_week = {timetable.day_of_week}
    WHERE time_table_id = {timetable.location_id};
    """

    return execute_query(query, message='Timetable updated successfully')