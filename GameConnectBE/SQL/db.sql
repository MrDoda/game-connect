CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(255) DEFAULT NULL,
    Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Page (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Content LONGTEXT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    URL VARCHAR(255) NOT NULL,
    OwnerID INT,
    Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OwnerID) REFERENCES User(ID)
);

CREATE TABLE Post (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Content LONGTEXT NOT NULL,
    OwnerID INT,
    PageID INT,
    Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OwnerID) REFERENCES User(ID),
    FOREIGN KEY (PageID) REFERENCES Page(ID)
);

CREATE TABLE MenuItem (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PageID INT DEFAULT NULL,
    OwnerID INT NOT NULL,
    CustomURL VARCHAR(255),
    Name VARCHAR(255) NOT NULL,
    MenuLocation VARCHAR(255) NOT NULL,
    OrderNumber INT NOT NULL,
    Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PageID) REFERENCES Page(ID),
    FOREIGN KEY (OwnerID) REFERENCES User(ID)
);

CREATE TABLE Comment (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Content TEXT NOT NULL,
    OwnerID INT NOT NULL,
    Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OwnerID) REFERENCES User(ID)
);
