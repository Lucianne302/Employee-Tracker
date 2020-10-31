DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;
USE tracker_db;

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  deptName VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles (
  role_id INT AUTO_INCREMENT,
  job_title VARCHAR(30) NOT NULL,
  salary DECIMAL(65,2) NOT NULL,
  department_id INT,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  EeID INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER UNSIGNED NOT NULL,
  manager_id INTEGER UNSIGNED,
  PRIMARY KEY (EeID)
);