# Employee-Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Employee Tracker is a command-line application to manage a company's employee database. With this application, you will be able to view and update 3 SQL tables (department, role, and employee). The application uses [Node.js](https://nodejs.org/en/download/), [npm Inquirer](https://www.npmjs.com/package/inquirer), and [MySQL](https://www.mysql.com/downloads/).


<br>


## Links
<!-- 
Deployed App on Heroku
> [https://note-taker-elliotpark.herokuapp.com/](https://note-taker-elliotpark.herokuapp.com/)
<br> -->

Link to GIF of Application
> [https://drive.google.com/file/d/1ivP0EtLiI3hlsF6KbffkX7InR82vLHnL/view](https://drive.google.com/file/d/1ivP0EtLiI3hlsF6KbffkX7InR82vLHnL/view)
<br>


Github Repository
> [https://github.com/elliotpark410/Employee-Tracker](https://github.com/elliotpark410/Employee-Tracker)

<br>


## Table of Contents
  * [Getting-Started](#getting-started)
  * [Installation](#installation)
  * [Technologies-Used](#technologies-used)
  * [Contribution-Guidelines](#contribution-guidelines)
  * [Cloning-Guidelines](#cloning-guidelines)
  * [Screenshots](#screenshots)
  * [GIF-of-Application](#gif-of-application)
  * [Code-Snippets](#code-snippets)
  * [Learning-Points](#learning-points)
  * [Authors](#authors)
  * [License-and-Acknowledgements](#license-and-acknowledgements)
  * [Contact](#Contact)

<br>


## Getting-Started

To begin the application, use the following in command line:

```bash
node server.js
```
<br>


## Installation

1. You will need to install Node.js. Here is a link below:

>https://nodejs.org/en/download/

<br>

2. Once you have downloaded Node.js, you will want to download node package manager (npm). In command line, you can enter:

>npm install -g npm

<br>

3. After installing npm, you have to initialize npm. In command line, you can enter:

>npm init -y

<br>

4. Next, install Inquirer.js which is one of the many node packages. In command line, you can enter:

>npm install inquirer

<br>

5. Next, install console.table which is one of the many node packages. In command line, you can enter:

>npm install console.table

<br>

6. Next, install mysql2 which is one of the many node packages. In command line, you can enter:

>npm install mysql2

<br>

7. Lastly, you will need to download mysql:

>https://www.mysql.com/downloads/

<br>


<!-- ## Prerequisites
Requires node.js, npm inquirer, and npm jest (optional)

<br> -->


<!-- ## Test-Instructions

To test the API, I recommend downloading [Insomnia's API Platform](https://insomnia.rest/) and enter the following in Insomnia's URL:

>GET http://localhost:3000/api/notes

<br>

>POST http://localhost:3000/api/notes

Example POST body: 
```bash
{
  "title":"Notes Title",
  "text":"notes text content"
}
```
*id is automatically generated so you do not need to enter id

<br>
<br>

>DELETE http://localhost:3000/api/notes/:id

<br>

Example DELETE: The API request below will delete note with id = "1"
>DELETE http://localhost:3000/api/notes/1

<br> -->


## Technologies-Used

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/)
* [npm Inquirer](https://www.npmjs.com/package/inquirer)
* [npm console.table](https://www.npmjs.com/package/console.table)
* [npm mysql2](https://www.npmjs.com/package/mysql2)
* [MySQL](https://www.mysql.com/downloads/)


<br>


## Contribution-Guidelines
To contribute, please follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

<br>


## Cloning-Guidelines

To install this code, please use [Github's guidlines to clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

<br>

Github repository:
>https://github.com/elliotpark410/Employee-Tracker

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


## GIF-of-Application

<img src="Images\Employee-Tracker.gif" title="Employee Tracker gif" width = 448px>

<br>

Link to GIF of Application
> [https://drive.google.com/file/d/1ivP0EtLiI3hlsF6KbffkX7InR82vLHnL/view](https://drive.google.com/file/d/1ivP0EtLiI3hlsF6KbffkX7InR82vLHnL/view)
<br>

<br>

## Code-Snippets

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


## Learning-Points

* How to use npm mysql2 to generate MySQL queries

* How to use promises and switch statements

* How to use SQL statements (SELECT, INSERT, DELETE, UPDATE, JOIN) 

* How to use MySQL Workbench as a MySQL graphical user interface


<br>


## Authors
 **1. Elliot Park** 

[https://github.com/elliotpark410](https://github.com/elliotpark410)
<br>

[https://www.linkedin.com/in/elliot-park/](https://www.linkedin.com/in/elliot-park/)

<br>


## License-and-Acknowledgements

This project is licensed under the MIT license via UC Berkeley's Extension Program

<br>

Big acknowledgements and thank you to Jerome Chenette, Manuel Nunes, Vince Lee, and Hannah Folk for their support and guidance!

<br>


## Contact
If you'd like to learn more about my projects, check out my Github profile: [https://github.com/elliotpark410](https://github.com/elliotpark410)

<br>

If you have any questions, please don't hesitate to email me at [elliotpark410@gmail.com](mailto:elliotpark410@gmail.com)

<br>
Copyright (c) 2022 Elliot Park



 
  

 



 



