# Employee-Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Employee Tracker is a command-line application to manage a company's employee database. With this application, you will be able to view and update 3 SQL tables (department, role, and employee). The purpose of this application is to have a Content Management System so that non-developers can easily view and interact with information stored in databases. The application uses [Node.js](https://nodejs.org/en/download/), [Inquirer](https://www.npmjs.com/package/inquirer), and [MySQL](https://www.mysql.com/downloads/).

<br>

GIF of Application
>[https://drive.google.com/file/d/1ivP0EtLiI3hlsF6KbffkX7InR82vLHnL/view](https://drive.google.com/file/d/1ivP0EtLiI3hlsF6KbffkX7InR82vLHnL/view)

<br>

## Table of Contents
  * [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Technologies Used](#technologies-used)
  * [Screenshots](#screenshots)
  * [Code Snippets](#code-snippets)
  * [Learning Points](#learning-points)
  * [Author](#author)

<br>


## Getting Started

To begin the application, use the following in command line:

```bash
node server.js
```
<br>


## Prerequisites

1. Download Node.js

>https://nodejs.org/en/download/

<br>

2. Install node package manager (npm)
>npm install -g npm

<br>

3. Install dependencies inquirer, console.table, and mysql2

>npm install

<br>

5. Download mysql:

>https://www.mysql.com/downloads/

<br>

## Technologies Used

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [console.table](https://www.npmjs.com/package/console.table)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [MySQL](https://www.mysql.com/downloads/)


<br>

## Screenshots

<br>
Screenshot of Initial Prompt
<img src="Images\Initial Prompt screenshot.png" title="Initial Prompt screenshot" width = 700px>

<br>
<br>
Screenshot of View Employees table
<img src="Images\View Employees screenshot.png" title="View Employees table screenshot" width = 700px>

<br>
<br>
Screenshot of Add Department prompt
<img src="Images\Add Department screenshot.png" title="Add Department prompt screenshot" width = 700px>

<br>
<br>
Screenshot of Add Role prompt
<img src="Images\Add Role screenshot.png" title="Add Role prompt screenshot" width = 700px>

<br>
<br>
Screenshot of Add Employee prompt
<img src="Images\Add Employee screenshot.png" title="Add Employee prompt screenshot" width = 700px>

<br>
<br>
Screenshot of Update Employee prompt
<img src="Images\Update Employee screenshot.png" title="Update Employee prompt screenshot" width = 700px>

<br>
<br>

## Code Snippets

This code snippet shows how you can use SQL and npm mysql2 to create a function to view the departments table

* const sql uses Structured Query Language SELECT statement to display columns with an alias FROM the department table

* ".query" is a built-in method in npm mysql2 to execute a query in the mysql database

* "console.table()" method displays tabular data as a table


```
function viewDepartments() {
  const sql =
    "SELECT department.id AS id, department.name AS department FROM department;";

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.table(data);
    initPrompt();
  });
}
```

 <br>


## Learning Points

* How to use npm mysql2 to generate MySQL queries

* How to use promises and switch statements

* How to use SQL statements (SELECT, INSERT, DELETE, UPDATE, JOIN)

* How to use MySQL Workbench as a MySQL graphical user interface


<br>


## Author
 **1. Elliot Park**

[Github](https://github.com/elliotpark410)

<br>

[LinkedIn](https://www.linkedin.com/in/elliot-park/)

<br>

[Email](mailto:elliotpark410@gmail.com)

<br>

















