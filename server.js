const mysql = require('mysql2');  
const inquirer = require('inquirer');  
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


 //Initialize classes
 
 const emp = new Employee(pool);
 const dept = new Department(pool);
 const role = new Role(pool);
 const mgr = new Manager(pool);

// define functions
const showDepartments = function(){

  dept.getAllDepartments(showMenu);
  

};


const showRoles = function(){

  role.getAllRoles(showMenu);
 

};


const showEmployees = function(){

  emp.getAllEmployees(showMenu);


};


const addDepartment = function(){

};


const addRole = function(){

};

const addEmployee = function(){

};


const updateEmployeeRole = function(){

};


const updateEmployeeManager = function(){

};



const showEmployeeManager = function(){


}

const showEmployeeByDepartment = function(){

}


const deleteDepartment = function(){

}



const deleteRole = function(){

}


const deleteEmployee = function(){

}


const showTotalDeptBudget = function(){

} 


//Show Menu Prompt
const showMenu = function(){

    inquirer
    .prompt([
        {
             type: 'list',
             message: "What would you like to do?",
             name: 'menu',
             choices: ['view all departments', 'view all roles', 'view all employees', 'add a department',
                       'add a role', 'add an employee','update an employee role', 'update employee managers',
                       'view employees by manager',' view employees by department','delete department',
                       'delete a role', 'delete an employee', 'view total department budget', 'exit'],
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
              }else if (response.menu === "update employee managers") {
                updateEmployeeManager(); 
              } else if (response.menu === "view employees by manager") {
                showEmployeeManager(); 
              } else if (response.menu === "view employees by department") {
                showEmployeeByDepartment(); 
              } else if (response.menu === "delete a department") {
                deleteDepartment(); 
              } else if (response.menu === "delete a role") {
                deleteRole(); 
              } else if (response.menu === "delete an employee") {
                deleteEmployee(); 
              } else if (response.menu === "view total department budget") {
                showTotalDeptBudget(); 
            } else {
               process.exit(0);
            }
    });

}



showMenu();
