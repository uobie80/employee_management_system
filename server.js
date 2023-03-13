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


