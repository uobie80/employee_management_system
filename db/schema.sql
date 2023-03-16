DROP DATABASE IF EXISTS employee_ms_db;
CREATE DATABASE employee_ms_db;

USE employee_ms_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(12,2) NOT NULL,
    department_id INT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    role_id INT,
    manager_id INT REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);