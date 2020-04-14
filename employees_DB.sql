DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE employees (
id int not null auto_increment,
first varchar(30) null,
last varchar(30) null,
role_id int not null,
manager_id int not null,
primary key (id)
);


CREATE TABLE role (
id int not null auto_increment,
title varchar (30) not null,
salary decimal(10,2) not null,
department_id int not null
);


CREATE TABLE department (
id int not null auto_increment,
name varchar (30) not null
);

INSERT INTO employees (first, last, role_id, manager_id)
VALUES ("Dave", "Smith", 1, 2);

INSERT INTO employees (first, last, role_id, manager_id)
VALUES ("Sue", "Danger", 1, 2);

INSERT INTO employees (first, last, role_id, manager_id)
VALUES ("Eic", "Westfield", 2, 3);

SELECT * FROM employees;
