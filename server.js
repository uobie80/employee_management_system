const pool = require('mysql2');  
const inquirer = require('inquirer');  
const cTable = require('console.table');
const Employee = require('./utils/Employee.js');
const Department = require('./utils/Department.js');
const Role = require('./utils/Role.js');
const Manager = require('./utils/Manager.js');


// Create the connection pool. 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'employee_ms_db',
    password: 'Welcome123',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0
  });




  //Show Menu
   , and 

function ShowMenu(){

    inquirer
    .prompt([
        {
             type: 'list',
             message: "What would you like to do? (Use Arrow Keys)",
             name: 'menu',
             choices: ['view all departments', 'view all roles', 'view all employees', 'add a department',
                        'add a role', 'add an employee','update an employee role','exit'],
            },
          ])
    .then((response) => { 
            console.log(response.menu);
            if (response.menu === "view all departments"){
                showDepartments();
              } else if (response.menu === "view all roles") {
                showRoles();
              } else if (response.menu === "view all employees") {
                showEmployees();
              } else if (response.menu === "add a department") {
                addDepartment();
              } else if (response.menu === "add a role") {
                addRole();
              } else if (response.menu === "add an employee") {
                addEmployee();
              } else if (response.menu === "update an employee role") {
                updateEmployeeRole();   
            } else {
               process.exit(0);
            }
            
    });

}
