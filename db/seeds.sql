USE employee_tracker_db;


INSERT INTO department (name)
VALUES ("Engineering"),
       ("Legal"),
       ("Finance"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("software engineer", 100000, 1),
       ("lead engineer", 200000, 1),
       ("legal assistant", 90000, 2),
       ("legal counsel", 100000, 2),
       ("accountant", 70000, 3),
       ("lead accountant", 90000, 3),
       ("sales person", 70000, 4),
       ("sales lead", 90000, 4);
       

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Hannah", "Folk", 2),
       ("Elliot", "Park", 1),
       ("Fred", "Park", 3),
       ("Peter", "Park", 4),
       ("Grant", "Lee", 5),
       ("Phillip", "Park", 6),
       ("Joseph", "Park", 7),
       ("Hea Suk", "Park", 8);


UPDATE employee
SET manager_id = 1
WHERE id = 2;

UPDATE employee
SET manager_id = 4
WHERE id = 3;

UPDATE employee
SET manager_id = 6
WHERE id = 5;

UPDATE employee
SET manager_id = 8
WHERE id = 7;
