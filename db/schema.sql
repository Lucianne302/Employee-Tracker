DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee;

--CREATE DATABASE trackerDB;

--USE trackerDB;

CREATE TABLE roles (
  role_id INT AUTO_INCREMENT,
  job_title VARCHAR(30) NOT NULL,
  salary DECIMAL(100000,2) NOT NULL,
  department_id INTEGER UNSIGNED,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE department (
  department_id INTEGER PRIMARY KEY,
  deptName VARCHAR(30) NOT NULL,
  description TEXT
);

CREATE TABLE employee (
  EeID INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER UNSIGNED NOT NULL,
  manager_id INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY (EeID)
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT uc_voter UNIQUE (voter_id),
--   CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
--   CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);


-- CREATE TABLE voters (
--   id INTEGER PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   email VARCHAR(50) NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );
