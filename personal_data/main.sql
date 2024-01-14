-- setup mysql server
-- configure permissions
CREATE DATABASE IF NOT EXISTS my_db;
CREATE USER IF NOT EXISTS root@localhost IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON my_db.* TO 'root'@'localhost';

USE my_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    name VARCHAR(256),
    email VARCHAR(256),
    phone INT,
    ssn INT,
    password VARCHAR(256),
    ip VARCHAR(256),
    last_login INT,
    user_agent VARCHAR(256));



);

INSERT INTO users(email) VALUES ("bob@dylan.com");
INSERT INTO users(email) VALUES ("bib@dylan.com");

