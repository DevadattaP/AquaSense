CREATE TABLE IF NOT EXISTS Location (
    LocationID SERIAL PRIMARY KEY,
    Name VARCHAR,
    Latitude FLOAT,
    Longitude FLOAT
);

CREATE TABLE IF NOT EXISTS Node (
    NodeID VARCHAR PRIMARY KEY,
    Latitude FLOAT,
    Longitude FLOAT,
    ParentID VARCHAR,
    Status BOOLEAN DEFAULT TRUE,
    LocationID INTEGER,
    Flow FLOAT,
    Pressure FLOAT,
    FOREIGN KEY (ParentID) REFERENCES Node(NodeID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

CREATE TABLE IF NOT EXISTS Pipelines (
    PipelineID VARCHAR PRIMARY KEY,
    End1 VARCHAR,
    End2 VARCHAR,
    Length FLOAT,
    LocationID INTEGER,
    FOREIGN KEY (End1) REFERENCES Node(NodeID),
    FOREIGN KEY (End2) REFERENCES Node(NodeID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

CREATE TABLE IF NOT EXISTS Connection (
    ConnectionID SERIAL PRIMARY KEY,
    Latitude FLOAT,
    Longitude FLOAT,
    LocationID INTEGER,
    SourceID VARCHAR,
    OwnerID INTEGER,
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID),
    FOREIGN KEY (SourceID) REFERENCES Node(NodeID),
    FOREIGN KEY (OwnerID) REFERENCES User(Username)
);

CREATE TABLE IF NOT EXISTS Complaints (
    ComplaintID SERIAL PRIMARY KEY,
    LocationID INTEGER,
    Latitude FLOAT,
    Longitude FLOAT,
    ComplaintantID VARCHAR,
    ComplaintDate TIMESTAMP,
    Fault_type VARCHAR,
    Title VARCHAR,
    Description TEXT,
    Is_Addressed BOOLEAN DEFAULT FALSE,
    Is_Transferred BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

CREATE TABLE IF NOT EXISTS Notifications (
    NotificationID SERIAL PRIMARY KEY,
    Title VARCHAR,
    Description TEXT,
    NotificationDate TIMESTAMP,
    Is_Live BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Admins (
    AdminID VARCHAR PRIMARY KEY,
    Username VARCHAR,
    Designation VARCHAR,
    FOREIGN KEY (Username) REFERENCES Users(Username),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

CREATE TABLE IF NOT EXISTS User (
    Username VARCHAR PRIMARY KEY,
    Password VARCHAR NOT NULL,
    Email VARCHAR,
    Phone_No VARCHAR,
    Gender CHAR,
    LocationID INTEGER,
    Admin BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

CREATE TABLE IF NOT EXISTS Applications (
    ApplicationID SERIAL PRIMARY KEY,
    UserID INTEGER,
    ApplicationDate TIMESTAMP,
    ConnectionType VARCHAR,
    Address TEXT,
    Status VARCHAR
);

CREATE TABLE IF NOT EXISTS ComplaintLog (
    LogID SERIAL PRIMARY KEY,
    Timestamp TIMESTAMP,
    ComplaintID INTEGER,
    ComplaintAction VARCHAR,
    Username VARCHAR,
    FOREIGN KEY (ComplaintID) REFERENCES Complaints(ComplaintID)
);

CREATE TABLE IF NOT EXISTS NotificationLog (
    LogID SERIAL PRIMARY KEY,
    Timestamp TIMESTAMP,
    NotificationID INTEGER,
    NotificationAction VARCHAR,
    Username VARCHAR,
    FOREIGN KEY (ComplaintID) REFERENCES Complaints(ComplaintID)
);

CREATE TABLE IF NOT EXISTS ApplicationLog (
    LogID SERIAL PRIMARY KEY,
    Timestamp TIMESTAMP,
    ApplicationID INTEGER,
    ApplicationAction VARCHAR,
    Username VARCHAR,
    FOREIGN KEY (ApplicationID) REFERENCES Applications(ApplicationID)
);

CREATE TABLE IF NOT EXISTS Tank (
    tank_id SERIAL PRIMARY KEY,
    tank_name VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Dam (
    dam_id SERIAL PRIMARY KEY,
    dam_name VARCHAR NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tank_log (
    log_id SERIAL PRIMARY KEY,
    tank_id INTEGER REFERENCES Tank(tank_id) NOT NULL,
    water_level INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS dam_log (
    log_id SERIAL PRIMARY KEY,
    dam_id INTEGER REFERENCES Dam(dam_id) NOT NULL,
    water_level INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL
);
