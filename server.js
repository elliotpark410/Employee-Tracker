// Import and require mysql and inquirer
const mysql = require("mysql2");
const inquirer = require("inquirer");

// Create connection to database with node
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

// inquirer prompt with list of choices as a promise
function initPrompt() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit",
      ],
    })

    .then((answer) => {
      // use a switch statement to execute function depending on different cases
      switch (answer.choices) {
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add a Department":
          addDepartment();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Update an Employee Role":
          updateEmployee();
          break;

        case "Exit":
          db.end();
          break;
      }
    });
}

// initialize funtion (inquirer prompt)
initPrompt();

// Create function to view departments
function viewDepartments() {
  // create SELECT statement to retrieve data from department table
  const sql =
    "SELECT department.id AS id, department.name AS department FROM department;";

  // query database
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    // Console.table() method displays tabular data as a table
    console.table(data);
    // return to inquirer prompt
    initPrompt();
  });
}

// Create function for view roles
function viewRoles() {
  const sql =
  // create SELECT statement with inner join on department table to retrieve data from role table 
    "SELECT role.id AS id, role.title AS role, role.salary AS salary, department.name FROM role INNER JOIN department ON role.department_id = department.id;";

  // query database
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    // Console.table() method displays tabular data as a table
    console.table(data);
    // return to inquirer prompt
    initPrompt();
  });
}

// Create function to view employees
function viewEmployees() {
  const sql =
  // create SELECT statement with inner join on department table, role table, and employee table (for manager) to retrieve data from employee table
    'SELECT employee.id AS id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.title AS role, role.salary AS salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';

  // query database
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    // Console.table() method displays tabular data as a table
    console.table(data);
    // return to inquirer prompt
    initPrompt();
  });
}

// Create function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            return "Please enter a department name.";
          }
        },
      },
    ])
    .then((answer) => {
      // create INSERT INTO statement to insert new department
      const sql = `INSERT INTO department (name) VALUES (?);`;

      // query database
      db.query(sql, answer.department, (err) => {
        if (err) {
          console.log(err);
        }

        const showTable =
          "SELECT department.id AS id, department.name AS department FROM department;";

        // query database
        db.query(showTable, (err, data) => {
          if (err) {
            console.log(err);
          }

          console.log(`Added ${answer.department} department to the database`);
          // Console.table() method displays tabular data as a table
          console.table(data);
          // return to inquirer prompt
          initPrompt();
        });
      });
    });
}

// Create function to add a department
function addRole() {

  // get data from department table. will use this data later to display departments and get department id
  const sql = "SELECT * FROM department";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "What is the name of the role?",
          validate: (input) => {
            if (input) {
              return true;
            } else {
              return "Please enter a role.";
            }
          },
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the role?",
          validate: (input) => {
            if (isNaN(input) === false) {
              return true;
            } else {
              return "Please enter a salary.";
            }
          },
        },
        {
          name: "department",
          type: "list",
          message: "Which department does the role belong to?",
          choices: () => {
            // use data from department table to get array of department names
            let departmentChoiceArray = [];
            for (let i = 0; i < data.length; i++) {
              departmentChoiceArray.push(data[i].name);
            }
            return departmentChoiceArray;
          },
        },
      ])
      .then((answer) => {

        // use data from department table to get the department id for user's department choice (answer.department)
        let departmentId;
        for (let i = 0; i < data.length; i++) {
          if (answer.department === data[i].name) {
            departmentId = data[i].id.toString();
          }
        }

        // create INSERT INTO statement to insert new role
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;

        // create array of parameters entered into sql statement above
        const roleValues = [answer.role, answer.salary, departmentId];

        // query database
        db.query(sql, roleValues, (err) => {
          if (err) {
            console.log(err);
          }

          const showTable =
            "SELECT role.id AS id, role.title AS role, role.salary AS salary, department.name FROM role INNER JOIN department ON role.department_id = department.id;";

          // query database
          db.query(showTable, (err, data) => {
            if (err) {
              console.log(err);
            }

            console.log(`Added ${answer.role} role to the database`);
            // Console.table() method displays tabular data as a table
            console.table(data);
            // return to inquirer prompt
            initPrompt();
          });
        });
      });
  });
}

// Create function to add an employee
function addEmployee() {

  // get data from employee table. will use this data later to display employee's role and employee's maanger
  const sql =
    'SELECT employee.id AS id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.id AS role_id, role.title AS role, role.salary AS salary, department.id AS department_id, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
          validate: (input) => {
            if (input) {
              return true;
            } else {
              return "Please enter a first name .";
            }
          },
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
          validate: (input) => {
            if (input) {
              return true;
            } else {
              return "Please enter a last name.";
            }
          },
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role?",
          choices: () => {
            // use data from employee table to get array of role titles
            let roleChoiceArray = [];
            for (let i = 0; i < data.length; i++) {
              roleChoiceArray.push(data[i].role);
            }
            return roleChoiceArray;
          },
        },
        {
          name: "manager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: () => {
            // use data from employee table to get array of employee names
            let managerChoiceArray = [];
            for (let i = 0; i < data.length; i++) {
              managerChoiceArray.push(data[i].employee);
            }
            return managerChoiceArray;
          },
        },
      ])
      .then((answer) => {
        
        // use data from employee table to get the role id for user's role choice (answer.role)
        let roleId;
        for (let i = 0; i < data.length; i++) {
          if (answer.role === data[i].role) {
            roleId = data[i].role_id.toString();
          }
        }

        // use data from employee table to get the manager id for user's manager choice (answer.manager)
        let managerId;
        for (let i = 0; i < data.length; i++) {
          if (answer.manager === data[i].manager) {
            managerId = data[i + 1].id.toString();
          }
        }

        // create INSERT INTO statement to insert new employee
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;

        // create array of parameters entered into sql statement above
        const employeeValues = [
          answer.firstName,
          answer.lastName,
          roleId,
          managerId,
        ];

        // query database
        db.query(sql, employeeValues, (err) => {
          if (err) {
            console.log(err);
          }

          const showTable =
            'SELECT employee.id AS id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.title AS role, role.salary AS salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';

          // query database
          db.query(showTable, (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(
              `Added ${answer.firstName} ${answer.lastName} employee to the database`
            );
            // Console.table() method displays tabular data as a table
            console.table(data);
            // return to inquirer prompt
            initPrompt();
          });
        });
      });
  });
}

// Create function to update employee
function updateEmployee() {

  // get data from employee table. will use this data later to display employee's role and employee's maanger
  const sql =
    'SELECT employee.id AS id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.id AS role_id, role.title AS role, role.salary AS salary, department.id AS department_id, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: () => {
            // use data from employee table to get array of employee names
            let employeeNameChoiceArray = [];
            for (let i = 0; i < data.length; i++) {
              employeeNameChoiceArray.push(data[i].employee);
            }
            return employeeNameChoiceArray;
          },
        },
        {
          name: "employeeRole",
          type: "list",
          message: "Which role do you want to assign the selected employee?",
          choices: () => {
            // use data from employee table to get array of employee roles
            let employeeRoleChoiceArray = [];
            for (let i = 0; i < data.length; i++) {
              employeeRoleChoiceArray.push(data[i].role);
            }
            return employeeRoleChoiceArray;
          },
        },
      ])
      .then((answer) => {

        // use data from employee table to get the employee id for user's update employee choice (answer.employeeName)
        let employeeId;
        for (let i = 0; i < data.length; i++) {
          if (answer.employeeName === data[i].employee) {
            employeeId = data[i].id.toString();
          }
        }

        // use data from employee table to get the role id for user's update role choice (answer.employeeRole)
        let roleId;
        for (let i = 0; i < data.length; i++) {
          if (answer.employeeRole === data[i].role) {
            roleId = data[i].role_id.toString();
          }
        }

        // create UPDATE statement to update employee role
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;

        // create array of parameters entered into sql statement above
        const roleUpdate = [roleId, employeeId];

        // query database
        db.query(sql, roleUpdate, (err) => {
          if (err) {
            console.log(err);
          }

          const showTable =
            'SELECT employee.id AS id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.title AS role, role.salary AS salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';

          // query database
          db.query(showTable, (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(
              `Updated ${answer.employeeName}'s role in the database`
            );
            // Console.table() method displays tabular data as a table
            console.table(data);
            // return to inquirer prompt
            initPrompt();
          });
        });
      });
  });
}
