CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS WaterTimetable;
DROP TABLE IF EXISTS FailureLog;
DROP TABLE IF EXISTS Failure;
DROP TABLE IF EXISTS PipeFlowLog;
DROP TABLE IF EXISTS PipeFlow;
DROP TABLE IF EXISTS TankLog;
DROP TABLE IF EXISTS DamLog;
DROP TABLE IF EXISTS ReservLog;
DROP TABLE IF EXISTS PumpLog;
DROP TABLE IF EXISTS Tank;
DROP TABLE IF EXISTS Dam;
DROP TABLE IF EXISTS Reservoir;
DROP TABLE IF EXISTS Pump;
DROP TABLE IF EXISTS ApplicationLog;
DROP TABLE IF EXISTS NotificationLog;
DROP TABLE IF EXISTS ComplaintLog;
DROP TABLE IF EXISTS Applications;
DROP TABLE IF EXISTS Notifications;
DROP TABLE IF EXISTS Complaints;
DROP TABLE IF EXISTS Bills;
DROP TABLE IF EXISTS Connection_Metering;
DROP TABLE IF EXISTS Connections;
DROP TABLE IF EXISTS Pipelines;
DROP TABLE IF EXISTS Node;
DROP TABLE IF EXISTS Admins;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Ward;
DROP TABLE IF EXISTS Zones;

CREATE TABLE Zones (
    ZoneID VARCHAR PRIMARY KEY,
    Name VARCHAR NOT NULL,
    center geometry(Point, 4326)
);

CREATE TABLE Ward (
    WardID VARCHAR PRIMARY KEY,
    Name VARCHAR,
    center geometry(Point, 4326),
    ZoneID VARCHAR,
    FOREIGN KEY (ZoneID) REFERENCES Zones(ZoneID)
);

CREATE TABLE Users(
    Username VARCHAR PRIMARY KEY,
    Password VARCHAR NOT NULL,
    Email VARCHAR,
    Phone_No VARCHAR,
    Gender CHAR,
    LocationID VARCHAR,
    Admin BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);

CREATE TABLE Admins (
    AdminID VARCHAR PRIMARY KEY,
    Username VARCHAR,
    LocationID VARCHAR,
    Designation VARCHAR,
    FOREIGN KEY (Username) REFERENCES Users(Username),
    FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);

CREATE TABLE Node (
    NodeID VARCHAR PRIMARY KEY,
    coords geometry(Point, 4326),
    ParentID VARCHAR,
    Status BOOLEAN DEFAULT TRUE,
    LocationID VARCHAR,
    Flow FLOAT,
    Pressure FLOAT,
    FOREIGN KEY (ParentID) REFERENCES Node(NodeID),
    FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);

CREATE TABLE Pipelines (
    PipelineID VARCHAR PRIMARY KEY,
    End1 VARCHAR,
    End2 VARCHAR,
    Length FLOAT,
    Diameter FLOAT,
    WardID VARCHAR,
    linestring geometry(LineString, 4326),
    FOREIGN KEY (End1) REFERENCES Node(NodeID),
    FOREIGN KEY (End2) REFERENCES Node(NodeID),
    FOREIGN KEY (WardID) REFERENCES Ward(WardID)
);

CREATE TABLE Connections (
    ConnectionID SERIAL PRIMARY KEY,
    coords geometry(Point, 4326),
    LocationID VARCHAR,
    SourceID VARCHAR,
    OwnerID VARCHAR,
    FOREIGN KEY (LocationID) REFERENCES Ward(WardID),
    FOREIGN KEY (SourceID) REFERENCES Node(NodeID),
    FOREIGN KEY (OwnerID) REFERENCES Users(Username)
);

CREATE TABLE Connection_Metering (
    LogID SERIAL PRIMARY KEY,
    ConnectionID INTEGER REFERENCES Connections(ConnectionID),
    LogDate DATE NOT NULL,
    WaterVolume FLOAT NOT NULL,
    FOREIGN KEY (ConnectionID) REFERENCES Connections(ConnectionID)
);

CREATE TABLE Bills (
    BillID SERIAL PRIMARY KEY,
    ConnectionID INTEGER,
    Amount DECIMAL(10, 2),
    BillDate DATE,
    DueDate DATE,
    IsPaid BOOLEAN DEFAULT FALSE,
    PaymentDate DATE,
    Category VARCHAR(10),
    FOREIGN KEY (ConnectionID) REFERENCES Connection(ConnectionID)
);

CREATE TABLE Complaints (
    ComplaintID SERIAL PRIMARY KEY,
    LocationID VARCHAR,
    coords geometry(Point, 4326),
    ComplaintantID VARCHAR,
    ComplaintDate TIMESTAMP,
    Fault_type VARCHAR,
    Title VARCHAR,
    Description TEXT,
    Is_Addressed BOOLEAN DEFAULT FALSE,
    Is_Transferred BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ComplaintantID) REFERENCES Users(Username),
    FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);

CREATE TABLE Notifications (
    NotificationID SERIAL PRIMARY KEY,
    Title VARCHAR,
    Description TEXT,
    NotificationDate TIMESTAMP,
    Is_Live BOOLEAN DEFAULT TRUE,
    Issuer VARCHAR,
    FOREIGN KEY (Issuer) REFERENCES Users(Username)
);

CREATE TABLE Applications (
    ApplicationID SERIAL PRIMARY KEY,
    UserID VARCHAR,
    ApplicationDate TIMESTAMP,
    ConnectionType VARCHAR,
    Address TEXT,
    Status VARCHAR,
    FOREIGN KEY (UserID) REFERENCES Users(Username)
);

CREATE TABLE ComplaintLog (
    LogID SERIAL PRIMARY KEY,
    Timestamp TIMESTAMP,
    ComplaintID INTEGER,
    ComplaintAction VARCHAR,
    Username VARCHAR
    -- FOREIGN KEY (ComplaintID) REFERENCES Complaints(ComplaintID)
);

CREATE TABLE NotificationLog (
    LogID SERIAL PRIMARY KEY,
    Timestamp TIMESTAMP,
    NotificationID INTEGER,
    NotificationAction VARCHAR,
    Username VARCHAR
    -- FOREIGN KEY (NotificationID) REFERENCES Notifications(NotificationID)
);

CREATE TABLE ApplicationLog (
    LogID SERIAL PRIMARY KEY,
    Timestamp TIMESTAMP,
    ApplicationID INTEGER,
    ApplicationAction VARCHAR,
    Username VARCHAR
    -- FOREIGN KEY (ApplicationID) REFERENCES Applications(ApplicationID)
);

CREATE TABLE Tank (
    tank_id VARCHAR PRIMARY KEY,
    capacity INTEGER NOT NULL,
	LocationID VARCHAR,
    coords geometry(Point, 4326) NOT NULL,
	FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);

CREATE TABLE Pump (
    pump_id VARCHAR PRIMARY KEY,
    capacity INTEGER NOT NULL,
	LocationID VARCHAR,
    coords geometry(Point, 4326) NOT NULL,
	FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);

CREATE TABLE Reservoir (
    reserv_id VARCHAR PRIMARY KEY,
    capacity INTEGER NOT NULL,
	LocationID VARCHAR,
    coords geometry(Point, 4326) NOT NULL,
	FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);


CREATE TABLE Dam (
    dam_id VARCHAR PRIMARY KEY,
    capacity INTEGER NOT NULL,
    coords geometry(Point, 4326) NOT NULL
);

CREATE TABLE TankLog (
    log_id SERIAL PRIMARY KEY,
    tank_id VARCHAR, --REFERENCES Tank(tank_id) NOT NULL,
    water_level INTEGER NOT NULL,
    time_stamp TIMESTAMP NOT NULL
);

CREATE TABLE PumpLog (
    log_id SERIAL PRIMARY KEY,
    pump_id VARCHAR, --REFERENCES Tank(tank_id) NOT NULL,
    status INTEGER NOT NULL,
    time_stamp TIMESTAMP NOT NULL
);

CREATE TABLE ReservLog (
    log_id SERIAL PRIMARY KEY,
    reserv_id VARCHAR, --REFERENCES Tank(tank_id) NOT NULL,
    water_level INTEGER NOT NULL,
    time_stamp TIMESTAMP NOT NULL
);

CREATE TABLE DamLog (
    log_id SERIAL PRIMARY KEY,
    dam_id VARCHAR, --REFERENCES Dam(dam_id) NOT NULL,
    water_level INTEGER NOT NULL,
    time_stamp TIMESTAMP NOT NULL
);

CREATE TABLE Failure (
    FailureID SERIAL PRIMARY KEY,
    PipeID VARCHAR,
    Time_Stamp TIMESTAMP,
    FailureType VARCHAR,
    IsSolved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (PipeID) REFERENCES Pipelines(PipelineID)
);

CREATE TABLE FailureLog (
    LogID SERIAL PRIMARY KEY,
    Time_Stamp TIMESTAMP,
    FailureID INTEGER,
    Action VARCHAR,
    Username VARCHAR
);

CREATE TABLE PipeFlow (
    PipelineID VARCHAR,
    Last_Updated TIMESTAMP,
    Flow FLOAT,
    Pressure FLOAT,
    FOREIGN KEY (PipelineID) REFERENCES Pipelines(PipelineID)
);

CREATE TABLE PipeFlowLog(
    PipelineID VARCHAR,
    Time_Stamp TIMESTAMP,
    Flow FLOAT,
    Pressure FLOAT,
    FOREIGN KEY (PipelineID) REFERENCES Pipelines(PipelineID)
);

CREATE TABLE WaterTimetable (
    TimetableID SERIAL PRIMARY KEY,
    LocationID VARCHAR,
    Start_Time TIME,
    End_Time TIME,
    AllDays BOOLEAN,
    FOREIGN KEY (LocationID) REFERENCES Ward(WardID)
);