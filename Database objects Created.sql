-- Creating a Database for Airline Reservation SYstem called AeroLink_System
CREATE DATABASE AeroLink_System;
GO
USE AeroLink_System;

-- Airline Table
CREATE TABLE Airline(
    Airline_ID Varchar(25) NOT NULL PRIMARY KEY,
    Airline_Name Varchar(20)
)

-- Airport Table
CREATE TABLE Airport (
    Airport_Code VARCHAR(25) NOT NULL PRIMARY KEY,
    Airport_Name VARCHAR(50),
   Airport_Location VARCHAR(100),
   Timezone VARCHAR(10)
);

-- Account Table
CREATE TABLE Account(
    Account_ID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) UNIQUE,
    User_Password NVARCHAR(100),
    Email_ID VARCHAR(100) UNIQUE,
    Created_at DATETIME DEFAULT GETDATE()
);

-- Flight Table
CREATE TABLE Flight(
    Flight_ID Varchar(25) NOT NULL PRIMARY KEY,
    Aircraft_ID VARCHAR(25) UNIQUE, 
    Model_Name VARCHAR(25) UNIQUE,
    Total_Seats INT,
    Registration_No Varchar(25) UNIQUE,
    Arrival_Airport VARCHAR(100),
    Departure_Airport VARCHAR(100),
    Ticket_Price INT,
    Arrival_time DATETIME,
    Departure_time DATETIME,
    Duration TIME, 
    Distance VARCHAR(10),           
    Airline_ID Varchar(25), 
    Departure_Airport_Code VARCHAR(25),
    Arrival_Airport_Code VARCHAR(25),
    CONSTRAINT FK2_Airline_ID FOREIGN KEY(Airline_ID) REFERENCES Airline(Airline_ID),
    CONSTRAINT FK1_Airport_Code_Departure FOREIGN KEY(Departure_Airport_Code) REFERENCES Airport(Airport_Code),
    CONSTRAINT FK2_Airport_Code_Arrival FOREIGN KEY(Arrival_Airport_Code) REFERENCES Airport(Airport_Code),
    CONSTRAINT CHK_DepartureBeforeArrival CHECK (Departure_time < Arrival_time),
    CONSTRAINT CHK_PositiveTotalSeats CHECK (Total_Seats > 0)
    
);

-- Seat Table
CREATE TABLE Seat(
    Seat_No VARCHAR(25)  NOT NULL PRIMARY KEY,
    Seat_type VARCHAR(10),
    Class VARCHAR(10),
    Flight_ID Varchar(25),
    CONSTRAINT FK_Flight_ID FOREIGN KEY(Flight_ID) REFERENCES Flight(Flight_ID)
);

-- Reservation Table
CREATE TABLE Reservation(
    Reservation_ID INT IDENTITY(11,1) PRIMARY KEY,
    Reservation_date DATETIME DEFAULT GETDATE(),
    Travel_Insurance VARCHAR(25),
    Account_ID int,
    Flight_ID Varchar(25),
    Seat_No VARCHAR(25),
    Reservation_Status VARCHAR(25),
    CONSTRAINT FK2_Account_ID FOREIGN KEY(Account_ID) REFERENCES Account(Account_ID),
    CONSTRAINT FK1_Flight_ID FOREIGN KEY(Flight_ID) REFERENCES Flight(Flight_ID),
    CONSTRAINT FK1_Seat_No FOREIGN KEY(Seat_No) REFERENCES Seat(Seat_No),
    CONSTRAINT CHK_ReservationStatus CHECK (Reservation_Status IN ('Confirmed', 'Not Confirmed'))
);

-- Passenger Table
CREATE TABLE Passenger(
    Passenger_ID INT IDENTITY(11,1) PRIMARY KEY,
    Passenger_Name VARCHAR(100),
    Phone_no VARCHAR(20),
    DOB VARCHAR(20),
    Account_ID int,
    CONSTRAINT FK1_Account_ID FOREIGN KEY(Account_ID) REFERENCES Account(Account_ID),
    CONSTRAINT CHK_ValidPhoneNumber CHECK (Phone_no LIKE '___-___-____')
);

-- Payment Table
CREATE TABLE Payment(
    Payment_ID INT PRIMARY KEY IDENTITY(1,1),
    Payment_Status VARCHAR(20), 
    Amount DECIMAL(10, 2),
    Payment_time DATETIME DEFAULT GETDATE(),
    Payment_Type VARCHAR(10),
    Reservation_ID int,
    CONSTRAINT FK1_Reservation_ID FOREIGN KEY(Reservation_ID) REFERENCES Reservation(Reservation_ID),
    CONSTRAINT CHK_ValidPaymentStatus CHECK (Payment_Status IN ('pending', 'paid', 'failed'))

);

-- Card Table
CREATE TABLE Card(
    Name_on_card VARCHAR(25),
    Card_Number VARCHAR(16),
    Card_Expiry_Date DATETIME DEFAULT GETDATE(),
    Card_CVV VARCHAR(4),
    Payment_ID INT,
    CONSTRAINT FK1_Payment_ID FOREIGN KEY(Payment_ID) REFERENCES Payment(Payment_ID),
);

-- Check Table
CREATE TABLE Check_Method(
    Bank_Name VARCHAR(25),
    Check_Number VARCHAR(16),
    Payment_ID INT,
    CONSTRAINT FK2_Payment_ID FOREIGN KEY(Payment_ID) REFERENCES Payment(Payment_ID)
);

-- Cash Table: 
CREATE TABLE Cash( 
    Cash_Tendered DECIMAL(10, 2),
    Payment_ID INT,
    CONSTRAINT FK3_Payment_ID FOREIGN KEY(Payment_ID) REFERENCES Payment(Payment_ID)
);

-- Cancellation Table
CREATE TABLE Cancellation(
    Cancellation_ID INT PRIMARY KEY IDENTITY(1,1),
    Cancellation_Date DATETIME DEFAULT GETDATE(),
    Cancellation_Reason Varchar(50),
    Reservation_ID INT,
    CONSTRAINT FK_Reservation_ID FOREIGN KEY(Reservation_ID) REFERENCES Reservation(Reservation_ID)
);

-- Confirmation Table
CREATE TABLE Confirmation(
    Confirmation_ID INT PRIMARY KEY IDENTITY(1,1),
    Confirmation_Notification VARCHAR(10),
    Confirmation_time DATETIME DEFAULT GETDATE(),
    Content TEXT,
    Reservation_ID INT,
    CONSTRAINT FK2_Reservation_ID FOREIGN KEY(Reservation_ID) REFERENCES Reservation(Reservation_ID)
    
);

-- Customer Support Table
CREATE TABLE CustomerSupport(
    Issue_ID INT NOT NULL PRIMARY KEY,
    Resolution_ID INT,
    Issue_Description TEXT,
    Resolution_Status VARCHAR(20),
    Created_At DATETIME DEFAULT GETDATE(),
    Resolution_Date DATETIME DEFAULT GETDATE(),
    Passenger_ID INT,
    CONSTRAINT FK1_Passenger_ID FOREIGN KEY(Passenger_ID) REFERENCES Passenger(Passenger_ID)
);

-- Staff Table
CREATE TABLE Staff(
    Staff_ID Varchar(25) NOT NULL PRIMARY KEY,
    Staff_Name VARCHAR(20),
    Contact_Info VARCHAR(20),
    Schedule DATETIME,
    Staff_Type VARCHAR(20),
    Airline_ID Varchar(25),
    CONSTRAINT FK3_Airline_ID FOREIGN KEY(Airline_ID) REFERENCES Airline(Airline_ID),
    CONSTRAINT CHK_ValidStaffType CHECK (Staff_Type IN ('Pilot', 'Crew Member', 'Support Staff'))
);

-- Pilot Table
CREATE TABLE Pilot(
    Pilot_ID VARCHAR(25) NOT NULL PRIMARY KEY,
    License_Number VARCHAR(20),
    Flight_Hours INT,
    Rank Varchar(20),
    CONSTRAINT FK1_Pilot_ID FOREIGN KEY(Pilot_ID) REFERENCES Staff(Staff_ID)
);

-- Crew Member Table 
CREATE TABLE CrewMember(
    CrewMember_ID VARCHAR(25) NOT NULL PRIMARY KEY,
    Member_Role VARCHAR(50),
    Base_Station VARCHAR(15),
    CONSTRAINT FK1_CrewMember_ID FOREIGN KEY(CrewMember_ID) REFERENCES Staff(Staff_ID)
);

-- Customer Support Assignment Table
CREATE TABLE CustomerSupportAssignment(
    Support_Assignment_ID INT NOT NULL PRIMARY KEY,
    Assigned_Date DATETIME DEFAULT GETDATE(),
    Completion_Date DATETIME DEFAULT GETDATE(),
    Issue_ID int,
    CONSTRAINT FK1_CustomerSupport_ID FOREIGN KEY (Issue_ID) REFERENCES CustomerSupport(Issue_ID),
);

-- FlightAssignment Table
CREATE TABLE FlightAssignment(
    Assignment_ID INT NOT NULL PRIMARY KEY,
    Assigned_Date DATETIME DEFAULT GETDATE(),
    Staff_ID Varchar(25),
    Flight_ID VARCHAR(25),
    CONSTRAINT FK3_Staff_ID FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID),
    CONSTRAINT FK4_Flight_ID FOREIGN KEY (Flight_ID) REFERENCES Flight(flight_id)
);


--////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


-- Stored procedure 1 is Book Flight where an account user is booking a flight

CREATE PROCEDURE BookFlight(
    @p_Username NVARCHAR(255),
    @p_Flight_ID VARCHAR(10),
    @p_Departure_Airport_Code VARCHAR(25),
    @p_Arrival_Airport_Code VARCHAR(25),
    @p_Seat_No VARCHAR(10),
    @p_Travel_Insurance VARCHAR(3),
    @p_Payment_Type VARCHAR(10),
    @p_OutputMessage NVARCHAR(1000) OUTPUT
)
AS
BEGIN
    DECLARE @v_AccountID INT;
    DECLARE @v_ReservationID INT;
    DECLARE @v_PaymentID INT;
    DECLARE @v_ConfirmationID INT; 
    DECLARE @v_PassengerName VARCHAR(100);

    SELECT @v_AccountID = Account_ID FROM Account WHERE Username = @p_Username;

    IF @v_AccountID IS NULL
    BEGIN
        SET @p_OutputMessage = 'Invalid username. Please provide a valid username.';
        RETURN;
    END;

    IF NOT EXISTS (SELECT 1 FROM Seat WHERE Seat_No = @p_Seat_No AND Flight_ID = @p_Flight_ID) 
    BEGIN
        SET @p_OutputMessage = 'The selected seat does not exist in the specified flight. Please choose another seat.';
        RETURN;
    END;

    IF EXISTS (SELECT 1 FROM Reservation WHERE Seat_No = @p_Seat_No AND Flight_ID = @p_Flight_ID) 
    BEGIN
        SET @p_OutputMessage = 'The selected seat is already reserved for the specified flight. Please choose another seat.';
        RETURN;
    END;

    IF NOT EXISTS (
        SELECT 1 
        FROM Flight 
        WHERE Flight_ID = @p_Flight_ID 
        AND Departure_Airport_Code = @p_Departure_Airport_Code 
        AND Arrival_Airport_Code = @p_Arrival_Airport_Code
    )
    BEGIN
        SET @p_OutputMessage = 'Invalid departure or arrival airport code for the specified flight.';
        RETURN;
    END;

    INSERT INTO Reservation(Reservation_date, Travel_Insurance, Account_ID, Flight_ID, Seat_No)
    VALUES (GETDATE(), @p_Travel_Insurance, @v_AccountID, @p_Flight_ID, @p_Seat_No);
    
    SELECT @v_ReservationID = SCOPE_IDENTITY();
    
    INSERT INTO Payment(Payment_Status, Amount, Payment_time, Payment_Type, Reservation_ID)
    VALUES ('pending', (SELECT Ticket_Price FROM Flight WHERE Flight_ID = @p_Flight_ID), GETDATE(), @p_Payment_Type, @v_ReservationID);
 
    SELECT @v_PaymentID = SCOPE_IDENTITY();

    INSERT INTO Confirmation(Confirmation_Notification, Confirmation_time, Content, Reservation_ID)
    VALUES ('No', NULL, 'Reservation pending payment.', @v_ReservationID);
    
    SELECT @v_ConfirmationID = SCOPE_IDENTITY(); 

    SELECT @v_PassengerName = Passenger_Name 
    FROM Passenger 
    WHERE Account_ID = @v_AccountID;

    SET @p_OutputMessage = CONCAT(
        'Passenger Name: ', @v_PassengerName, 
        ', Flight ID: ', @p_Flight_ID, 
        ', Departure Airport Code: ', @p_Departure_Airport_Code, 
        ', Arrival Airport Code: ', @p_Arrival_Airport_Code, 
        ', Seat Number: ', @p_Seat_No, 
        ', Reservation ID: ', @v_ReservationID, 
        ', Payment ID: ', @v_PaymentID, 
        ', Confirmation ID: ', @v_ConfirmationID
    );
END;

-- Here I am executing stored procedure Book Flight by providing input parameters

DECLARE @OutputMessage NVARCHAR(1000);

EXEC BookFlight
    @p_Username = 'AishwaryaJames',
    @p_Flight_ID = 'DL5678',
    @p_Departure_Airport_Code = 'LAX',
    @p_Arrival_Airport_Code = 'LHR',
    @p_Seat_No = 'DLA4',
    @p_Travel_Insurance = 'Yes',
    @p_Payment_Type = 'Card',
    @p_OutputMessage = @OutputMessage OUTPUT;

PRINT @OutputMessage;

-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- Stored Procedure 2 Add Flight is adding a new flight 

CREATE PROCEDURE AddNewFlight
    @p_Flight_ID VARCHAR(25),
    @p_Aircraft_ID VARCHAR(25),
    @p_Model_Name VARCHAR(25),
    @p_Total_Seats INT,
    @p_Registration_No VARCHAR(25),
    @p_Arrival_Airport VARCHAR(100),
    @p_Departure_Airport VARCHAR(100),
    @p_Ticket_Price INT,
    @p_Arrival_time DATETIME,
    @p_Departure_time DATETIME,
    @p_Duration TIME,
    @p_Distance VARCHAR(10),
    @p_Airline_ID VARCHAR(25),
    @p_Departure_Airport_Code VARCHAR(25),
    @p_Arrival_Airport_Code VARCHAR(25)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM Flight
        WHERE Flight_ID = @p_Flight_ID
    )
    BEGIN
        IF NOT EXISTS (
            SELECT 1
            FROM Flight
            WHERE Aircraft_ID = @p_Aircraft_ID
        )
        BEGIN
 
            IF NOT EXISTS (
                SELECT 1
                FROM Flight
                WHERE Model_Name = @p_Model_Name
                   OR Registration_No = @p_Registration_No
            )
            BEGIN

                IF EXISTS (
                    SELECT 1
                    FROM Airport
                    WHERE Airport_Name = @p_Departure_Airport
                      AND Airport_Code = @p_Departure_Airport_Code
                )
                BEGIN

                    IF EXISTS (
                        SELECT 1
                        FROM Airport
                        WHERE Airport_Name = @p_Arrival_Airport
                          AND Airport_Code = @p_Arrival_Airport_Code
                    )
                    BEGIN
                        INSERT INTO Flight (
                            Flight_ID, Aircraft_ID, Model_Name, Total_Seats, Registration_No,
                            Arrival_Airport, Departure_Airport, Ticket_Price,
                            Arrival_time, Departure_time, Duration, Distance, Airline_ID,
                            Departure_Airport_Code, Arrival_Airport_Code
                        )
                        VALUES (
                            @p_Flight_ID, @p_Aircraft_ID, @p_Model_Name, @p_Total_Seats, @p_Registration_No,
                            @p_Arrival_Airport, @p_Departure_Airport, @p_Ticket_Price,
                            @p_Arrival_time, @p_Departure_time, @p_Duration, @p_Distance, @p_Airline_ID,
                            @p_Departure_Airport_Code, @p_Arrival_Airport_Code
                        );
                        PRINT 'New flight added successfully.';
                    END
                    ELSE
                    BEGIN
                        PRINT 'Arrival Airport Code does not match the provided Arrival Airport name.';
                    END
                END
                ELSE
                BEGIN
                    PRINT 'Departure Airport Code does not match the provided Departure Airport name.';
                END
            END
            ELSE
            BEGIN
                PRINT 'Model name or Registration number already exists. Please provide different values.';
            END
        END
        ELSE
        BEGIN
            PRINT 'Aircraft ID already exists. Please provide a different Aircraft ID.';
        END
    END
    ELSE
    BEGIN
        PRINT 'Flight ID already exists. Please provide a different Flight ID.';
    END
END;

--  Executing procedure AddNewFlight

EXEC AddNewFlight
    @p_Flight_ID = 'AA1234567',
    @p_Aircraft_ID = 'A3465',
    @p_Model_Name = 'Boeing 4e56',
    @p_Total_Seats = 150,
    @p_Registration_No = 'N12678e',
    @p_Arrival_Airport = 'Los Angeles International Airport',
    @p_Departure_Airport = 'John F. Kennedy International Airport',
    @p_Ticket_Price = 200,
    @p_Arrival_time = '2024-04-01 12:00:00',
    @p_Departure_time = '2024-04-01 10:00:00',
    @p_Duration = '02:00:00',
    @p_Distance = '500 miles',
    @p_Airline_ID = 'AA',
    @p_Departure_Airport_Code = 'JFK',
    @p_Arrival_Airport_Code = 'LAX';

SELECT * FROM Flight
-- Here a new flight is added

-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- Stored Procedure 3 is calculating total passengers in a flight who reserved the flight 


CREATE PROCEDURE GetTotalPassengersOnFlight
    @p_Flight_ID VARCHAR(25)
AS
BEGIN
    DECLARE @TotalPassengers INT;

    IF EXISTS (
        SELECT 1
        FROM Reservation
        WHERE Flight_ID = @p_Flight_ID
    )
    BEGIN
        SELECT @TotalPassengers = COUNT(DISTINCT Account_ID)
        FROM Reservation
        WHERE Flight_ID = @p_Flight_ID;

        SELECT @TotalPassengers AS TotalPassengers;
    END
    ELSE
    BEGIN
        PRINT 'Flight ' + @p_Flight_ID + ' does not exist or has no passengers.';
    END
END;


-- Executing the 3rd Stored Procedure
EXEC GetTotalPassengersOnFlight @p_Flight_ID = 'AA1234';

-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- View 1

CREATE VIEW FlightDetailsView AS
SELECT
    f.Flight_ID,
    f.Model_Name AS Aircraft_Model,
    f.Total_Seats,
    f.Ticket_Price,
    f.Departure_time,
    f.Departure_Airport,
    f.Arrival_time,
    f.Arrival_Airport,
    a.Airline_Name AS Airline
FROM
    Flight f
JOIN
    Airline a ON f.Airline_ID = a.Airline_ID;

    
SELECT * FROM FlightDetailsView;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- View 2

CREATE VIEW PaymentSummaryView AS
SELECT
    p.Payment_ID,
    p.Amount AS Payment_Amount,
    p.Payment_Status,
    r.Reservation_ID,
    r.Reservation_date,
    r.Flight_ID,
    r.Seat_No
FROM
    Payment p
JOIN
    Reservation r ON p.Reservation_ID = r.Reservation_ID;


SELECT * FROM PaymentSummaryView;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- View 3

CREATE VIEW ReservationDetailsView AS
SELECT
    r.Reservation_ID,
    r.Reservation_date,
    p.Passenger_Name,
    p.Phone_no,
    p.DOB,
    f.Flight_ID,
    f.Departure_Airport,
    f.Arrival_Airport,
    f.Departure_time,
    f.Arrival_time,
    pmt.Amount AS Payment_Amount,
    pmt.Payment_Status
FROM
    Reservation r
JOIN
    Passenger p ON r.Account_ID = p.Account_ID
JOIN
    Flight f ON r.Flight_ID = f.Flight_ID
JOIN
    Payment pmt ON r.Reservation_ID = pmt.Reservation_ID;


SELECT * FROM ReservationDetailsView;

-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- DML Trigger 1
--  Here altering the flight table so that by adding a column named seats_booked we get total seats booked in the particular flight which is helpful for the trigger
-- Step 1:
ALTER TABLE Flight
ADD Seats_Booked INT DEFAULT 0; 

-- Step 2:
UPDATE Flight
SET Seats_Booked = (
    SELECT COUNT(*)
    FROM Reservation
    WHERE Reservation.Flight_ID = Flight.Flight_ID
    AND Reservation.Reservation_Status = 'Confirmed'
);

-- Step 3:
UPDATE Flight
SET Seats_Booked = Total_Seats
WHERE Seats_Booked > Total_Seats;

-- /////////////////////////////////////

CREATE OR ALTER TRIGGER trg_UpdateSeatAvailability
ON Cancellation
AFTER INSERT
AS
BEGIN
    UPDATE Flight
    SET Seats_Booked = CASE 
                         WHEN Seats_Booked > 0 THEN Seats_Booked - 1
                         ELSE Seats_Booked
                       END
    FROM inserted i
    INNER JOIN Reservation r ON i.Reservation_ID = r.Reservation_ID
    INNER JOIN Flight f ON r.Flight_ID = f.Flight_ID;
END;

-- Verifying the 1st Trigger
INSERT INTO Cancellation (Cancellation_Date,Cancellation_Reason, Reservation_ID)
VALUES (GETDATE(), 'Changed plans', 21);

SELECT * FROM Cancellation;
SELECT * from Flight;
-- Here verifying the changes in both cancellation table as well as the Flight table one cancellation might 
-- be added to the cancellation table and in the flight table Seats_booked will have one value less for that flight

-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

--  2nd Trigger

CREATE OR ALTER TRIGGER trg_UpdateReservationStatusOnPayment
ON Payment
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Payment_Status)
    BEGIN
        UPDATE Reservation
        SET Reservation_Status = CASE 
                        WHEN i.Payment_Status = 'paid' THEN 'Confirmed'
                        WHEN i.Payment_Status = 'failed' THEN 'Failed'
                        ELSE 'Pending'
                     END
        FROM inserted i
        INNER JOIN Reservation r ON i.Reservation_ID = r.Reservation_ID
        WHERE r.Reservation_ID = i.Reservation_ID;
    END
END;

-- Here we are checking our payment and reservation table to see the values tha need to be changed

SELECT * FROM Payment;
SELECT * from Reservation;

-- Updating status
UPDATE Payment
SET Payment_Status = 'paid'
WHERE Reservation_ID = 14;

-- Verifying the Trigger by checking if the changes are made or not
SELECT * FROM Payment;
SELECT * from Reservation;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- 3rd Trigger

CREATE TRIGGER trg_ValidateSeatAssignment
ON Reservation
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Seat_No VARCHAR(25);
    DECLARE @Flight_ID VARCHAR(25);

    SELECT @Seat_No = Seat_No, @Flight_ID = Flight_ID FROM inserted;

    IF (SELECT COUNT(*) FROM Reservation WHERE Seat_No = @Seat_No AND Flight_ID = @Flight_ID) > 1
    BEGIN
        RAISERROR ('This seat is already assigned to another passenger on this flight.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;

-- Verifying the Trigger (Can add the seat if it's not booked or get an error as the seat is already booked by some other passenger)

INSERT INTO Reservation(Reservation_date, Travel_Insurance, Account_ID, Flight_ID, Seat_No)
VALUES ('2024-03-27 09:00:00', 'No', 4, 'AA1234', 'AAE20');

INSERT INTO Reservation(Reservation_date, Travel_Insurance, Account_ID, Flight_ID, Seat_No)
VALUES ('2024-03-26 09:00:00', 'Yes', 3, 'AA1234', 'AAF1');

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- 6 Table Level check constraints 

-- CONSTRAINT CHK_DepartureBeforeArrival CHECK (Departure_time < Arrival_time),
-- CONSTRAINT CHK_PositiveTotalSeats CHECK (Total_Seats > 0)
-- CONSTRAINT CHK_ReservationStatus CHECK (Reservation_Status IN ('Confirmed', 'Not Confirmed'))
-- CONSTRAINT CHK_ValidPhoneNumber CHECK (Phone_no LIKE '___-___-____')
-- CONSTRAINT CHK_ValidPaymentStatus CHECK (Payment_Status IN ('pending', 'paid', 'failed'))
-- CONSTRAINT CHK_ValidStaffType CHECK (Staff_Type IN ('Pilot', 'Crew Member', 'Support Staff'))

--  These were already provided while creating the table mentioning it here for confirmation

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- Computed column 1 based on a user defined function (UDF)

CREATE FUNCTION CalculateTotalRevenueByAirline (@AirlineID VARCHAR(25))
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @TotalRevenue DECIMAL(10, 2);

    SELECT @TotalRevenue = SUM(F.Ticket_Price * F.Seats_Booked)
    FROM Flight F
    WHERE F.Airline_ID = @AirlineID;

    RETURN ISNULL(@TotalRevenue, 0);
END;

-- Adding the computed column to the airline table
ALTER TABLE Airline
ADD Total_Revenue AS dbo.CalculateTotalRevenueByAirline(Airline_ID);

SELECT * FROM Airline
-- Here the computed column is the Total_Revenue in the Airline Table

-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- Computed column 2 based on a user defined function (UDF)

CREATE FUNCTION CalculateAvailableSeats (@FlightID VARCHAR(25))
RETURNS INT
AS
BEGIN
    DECLARE @TotalSeats INT;
    DECLARE @SeatsBooked INT;
    DECLARE @AvailableSeats INT;

    SELECT @TotalSeats = Total_Seats, @SeatsBooked = Seats_Booked
    FROM Flight
    WHERE Flight_ID = @FlightID;

    IF @TotalSeats > @SeatsBooked
    BEGIN
        SET @AvailableSeats = @TotalSeats - @SeatsBooked;
    END
    ELSE
    BEGIN
        SET @AvailableSeats = 0;
    END

    RETURN @AvailableSeats;
END;
GO

-- Adding the computed column to the flight table
ALTER TABLE Flight
ADD Available_Seats AS dbo.CalculateAvailableSeats(Flight_ID);

SELECT * FROM Flight
-- After running the above query you can see a new column added Available_Seats for all the flight_id's

-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- Column data Encryption

-- Here we are computing encrypted values for 2 columns which are card number and the CVV in the card table

-- Step 1
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'AerLink@5';

-- Step 2
CREATE CERTIFICATE CardEncryptCertificate WITH SUBJECT = 'Card Encryption Certificate';

-- Step 3
CREATE SYMMETRIC KEY CardDataKey 
WITH ALGORITHM = AES_256
ENCRYPTION BY CERTIFICATE CardEncryptCertificate;

-- Step 4
ALTER TABLE Card
ADD Card_Number_Encrypted VARBINARY(MAX),
    Card_CVV_Encrypted VARBINARY(MAX);

-- Step 5
OPEN SYMMETRIC KEY CardDataKey
DECRYPTION BY CERTIFICATE CardEncryptCertificate;

UPDATE Card
SET 
    Card_Number_Encrypted = EncryptByKey(Key_GUID('CardDataKey'), CONVERT(VARBINARY(MAX), Card_Number)),
    Card_CVV_Encrypted = EncryptByKey(Key_GUID('CardDataKey'), CONVERT(VARBINARY(MAX), Card_CVV));
    SELECT *
    FROM 
       Card;
-- Here you can view the encrypted columns

CLOSE SYMMETRIC KEY CardDataKey;


-- Step 6: Here we also decrypt and view the data to verify if it's correctly encrypted or not
OPEN SYMMETRIC KEY CardDataKey
DECRYPTION BY CERTIFICATE CardEncryptCertificate;

SELECT 
    *,   
    CONVERT(VARCHAR(MAX), DecryptByKey(Card_Number_Encrypted)) AS Decrypted_Card_Number,
    CONVERT(VARCHAR(MAX), DecryptByKey(Card_CVV_Encrypted)) AS Decrypted_Card_CVV
FROM 
    Card;

CLOSE SYMMETRIC KEY CardDataKey;

-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- // Created 4 non-clustered indexes
CREATE INDEX IX_AirportCode ON Flight(Departure_Airport_Code);
CREATE INDEX IX_StaffName ON Staff(Staff_Name);
CREATE INDEX IX_PilotRank ON Pilot(Rank);
CREATE INDEX IX_SeatType ON Seat(Seat_type);

-- // By performing this query we can see fetch data from the respective tables by applying some conditions on these non clustered indexes

SELECT * FROM Flight WHERE Departure_Airport_Code = 'JFK';

SELECT * FROM Staff WHERE Staff_Name = 'Sophia Martinez';

SELECT * FROM Pilot WHERE Rank = 'Captain';

SELECT * FROM Seat WHERE Seat_type = 'Window';

-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////