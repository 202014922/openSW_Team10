CREATE DATABASE IF NOT EXISTS travel;
USE travel;

CREATE TABLE user (
    identifier VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100),
    name VARCHAR(100)
);