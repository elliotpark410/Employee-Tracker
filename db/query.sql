USE employee_tracker_db;

SELECT * FROM department;

-- view to see all employees by department and role 
-- look up concat and rename column e.g. concat first_name and Last_name
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, manager.first_name, manager.last_name FROM department
INNER JOIN role ON department.id = role.department_id
INNER JOIN employee ON role.id = employee.role_id
LEFT JOIN employee manager ON manager.id = employee.manager_id 
ORDER BY employee.id ASC;
