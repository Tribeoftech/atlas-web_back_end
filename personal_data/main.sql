-- Setup MySQL server
-- Configure permissions
CREATE DATABASE IF NOT EXISTS my_db;
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON my_db.* TO 'root'@'localhost';

USE my_db;

-- DROP TABLE IF EXISTS users; -- This line is commented out to avoid accidental deletion of the table

CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(256),
    email VARCHAR(256),
    phone INT,
    ssn INT,
    password VARCHAR(256),
    ip VARCHAR(256),
    last_login INT,
    user_agent VARCHAR(256)
);

-- The extra parenthesis at the end of the CREATE TABLE statement is removed



INSERT INTO users(email) VALUES ("bob@dylan.com");
INSERT INTO users(email) VALUES ("bib@dylan.com");

