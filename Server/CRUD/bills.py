from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import logging

from UTILS.dataop import *

class Bill(BaseModel):
    bill_id: Optional[int] = None
    connection_id: int
    amount: float
    bill_date: date
    due_date: date
    is_paid: Optional[bool] = False
    payment_date: Optional[date] = None
    category: Optional[str] = 'PENDING'


def add_bill(bill: Bill):
    query = f"""
    INSERT INTO bills (ConnectionID, Amount, BillDate, DueDate)
    VALUES ({bill.connection_id}, {bill.amount}, '{bill.bill_date}', '{bill.due_date}');
    """

    return execute_query(query, message='Bill added successfully')


def get_bill_by_connection(connection_id: int, month: int, year: int):
    if month < 12:
        month += 1
    else:
        year += 1

    query = f"""
    SELECT *
    FROM bills
    WHERE ConnectionID = {connection_id}
    AND TO_CHAR(BillDate, 'YYYY-MM-DD') LIKE '{year}-{month:0>2}-%';
    """

    return execute_select(query)


def pay_bill(bill_id: int):
    query = f"""
    UPDATE bills
    SET IsPaid = TRUE,
    PaymentDate = '{date.today()}',
    Category = 'PAID'
    WHERE BillID = {bill_id};
    """

    return execute_query(query, message='Bill Payment Registered')


def delete_bill(bill_id: int):
    query = f"""
    DELETE FROM bills
    WHERE BillID = {bill_id};
    """

    return execute_query(query, message='Bill deleted successfully')


def overdue_labelling():
    query = f"""
    UPDATE bills
    SET Category = 'OVERDUE'
    WHERE TO_CHAR(DueDate, 'YYYY-MM-DD') < '{date.today()}' AND
    IsPaid = FALSE
    AND Category = 'PENDING';
    """

    return execute_query(query, message='Overdue bills labelled')


if __name__ == "__main__":
    # print(overdue_labelling())
    pass