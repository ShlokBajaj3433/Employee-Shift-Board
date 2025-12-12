-- Database Reset Script for Simplified Schema
-- This script will drop old tables and recreate them with the new simplified structure

-- Drop existing tables (in order to respect foreign key constraints)
DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS employees CASCADE;

-- Drop sequences if they exist
DROP SEQUENCE IF EXISTS employee_sequence CASCADE;
DROP SEQUENCE IF EXISTS employees_id_seq CASCADE;

-- Create sequence for employee IDs starting from 1
CREATE SEQUENCE employee_sequence START WITH 1 INCREMENT BY 1;

-- Create Employee table with only Name, Employee Code, and Department
CREATE TABLE employees (
    id BIGINT DEFAULT nextval('employee_sequence') PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    employee_code VARCHAR(255) NOT NULL UNIQUE,
    department VARCHAR(255) NOT NULL
);

-- Create User table (for authentication)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    name VARCHAR(255)
);

-- Create Shift table with employee_id, Date, Start Time, and End Time
CREATE TABLE shifts (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Insert sample employees
INSERT INTO employees (name, employee_code, department) VALUES
    ('John Doe', 'EMP001', 'Engineering'),
    ('Jane Smith', 'EMP002', 'Operations'),
    ('Bob Johnson', 'EMP003', 'Administration');

-- Insert default users (passwords are BCrypt encoded)
-- admin / admin123
-- user / user123
INSERT INTO users (username, password, role, email, name) VALUES
    ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', 'admin@employeeshift.com', 'Admin User'),
    ('user', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 'user@employeeshift.com', 'Regular User');

-- Insert sample shifts with employee assignments
INSERT INTO shifts (employee_id, date, start_time, end_time) VALUES
    (1, '2025-12-11', '09:00:00', '17:00:00'),
    (2, '2025-12-11', '09:00:00', '17:00:00'),
    (3, '2025-12-12', '09:00:00', '17:00:00');

COMMENT ON TABLE employees IS 'Stores employee information with name, code, and department only';
COMMENT ON TABLE users IS 'Stores user authentication information (decoupled from employees)';
COMMENT ON TABLE shifts IS 'Stores shift schedules with employee assignment, date and time range';
