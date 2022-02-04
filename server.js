// Import and require mysql and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create connection to database with node
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

// inquirer prompt with list of choices as a promise 
function initPrompt() {
  inquirer.prompt ({
    name: 'choices',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Exit'
    ]

  }) .then((answer) => {
    switch (answer.choices) {
      case 'View All Departments':
        viewDepartments();
        break;

      case 'View All Roles':
        viewRoles();
        break;

      case 'View All Employees':
        viewEmployees();
        break;

      case 'Add a Department':
        addDepartment();
        break;

      case 'Add a Role':
        addRole();
        break;

      case 'Add an Employee':
        addEmployee();
        break;

      case 'Update an Employee Role':
        updateEmployee();
        break;
    
      case 'Exit':
        db.end();
        break;
    }
  })
}

initPrompt()


// Create function to view departments 
function viewDepartments() {
  const sql = 'SELECT department.id AS id, department.name AS department FROM department;';

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
  const sql = 'SELECT role.id AS id, role.title AS role, role.salary AS salary, department.name FROM role INNER JOIN department ON role.department_id = department.id;';

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
  const sql = 'SELECT employee.id AS id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.title AS role, role.salary AS salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';

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
  inquirer.prompt ([
    {
      name: 'department',
      type: 'input',
      message: 'What is the name of the department?',
      validate: (input) => {
        if (input) {
          return true;
        } else {
          return "Please enter a department name.";
        }
      } 
    
    },
  ]) .then ((answer) => {
    const sql = `INSERT INTO department (name) VALUES (?);`;

    // query database
    db.query(sql, answer.department, (err) => {
      if (err) {
        console.log(err);
      }

      const showTable = 'SELECT department.id AS id, department.name AS department FROM department;';

      // query database
      db.query(showTable, (data) => {
          // Console.table() method displays tabular data as a table 
          console.table(data);
          // return to inquirer prompt
          initPrompt();
      });
    });
  })
}


