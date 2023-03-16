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
  //mgr.getAllManagers(showMenu);


};


const addDepartment = function(){
 
  inquirer
   .prompt([
       {
            type: 'input',
            message: "Provide the name of the department.",
            name: 'name',
           },
         ])
   .then((response) => { 
           dept.addDepartment([response.name], showMenu);
        
   });


};


const addRole = function(departments) {

var depts = [];

for (let key of departments.keys()) {
  depts.push(key);
}


  inquirer
  .prompt([
      {
           type: 'input',
           message: "Provide the title of the role",
           name: 'title',
          },
          {
            type: 'input',
            message: "Provide the salary of the role",
            name: 'salary',
           },
           {
            type: 'list',
            message: "Please select the department for the role",
            name: 'department',
            choices: depts
           },
        ])
  .then((response) => { 

         const dept_id = departments.get(response.department);
         const salary = parseInt(response.salary);
         role.addRole([response.title, salary, dept_id], showMenu)
  });

};

const addEmployee = function(roles, empl){

  var role_titles = [];
  var employees = ['None'];

for (let key of roles.keys()) {
  role_titles.push(key);
}

for (let key of empl.keys()) {
  employees.push(key);
}


inquirer
.prompt([
    {
         type: 'input',
         message: "Enter the fistname of the employee",
         name: 'firstname',
        },
        {
          type: 'input',
          message: "Enter the lastname of the employee",
          name: 'lastname',
         },
         {
          type: 'list',
          message: "Please select the employee's role",
          name: 'title',
          choices: role_titles
         },
         {
          type: 'list',
          message: "Please select the employee's manager",
          name: 'manager',
          choices: employees
         },
      ])
.then((response) => { 

       const role_id = roles.get(response.title);
       const manager_id = empl.get(response.manager);
       
       emp.addEmployee([response.firstname, response.lastname, role_id, manager_id], showMenu);
});



};


const updateEmployeeRole = function(roles, empl){

  var role_titles = [];
  var employees = [];

for (let key of roles.keys()) {
  role_titles.push(key);
}

for (let key of empl.keys()) {
  employees.push(key);
}


inquirer
.prompt([ 
        {
          type: 'list',
          message: "Please select the employee",
          name: 'employee',
          choices: employees
         },
         {
          type: 'list',
          message: "Please select the employee's new role",
          name: 'title',
          choices: role_titles
         },
        
      ])
.then((response) => { 

       const role_id = roles.get(response.title);
       const employee_id = empl.get(response.employee);
       
       emp.updateEmployeeRole([ role_id, employee_id], showMenu);
});


};


const updateEmployeeManager = function(empl){

  var employees = [];
  var managers = ['None'];

for (let key of empl.keys()) {
  employees.push(key);
  managers.push(key);
}


inquirer
.prompt([ 
        {
          type: 'list',
          message: "Please select the employee",
          name: 'employee',
          choices: employees
         },
         {
          type: 'list',
          message: "Please select the employee's new manager",
          name: 'manager',
          choices: managers
         },
        
      ])
.then((response) => { 

       const manager_id = empl.get(response.manager);
       const employee_id = empl.get(response.employee);
       
       emp.updateEmployeeManager([ manager_id, employee_id], showMenu);
});




};



const showEmployeeManager = function(showMenu){
  mgr.showEmployeesByManager(showMenu);

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



//Define Menu Prompt
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

                dept.getLisOfDepartments().then((departments) => {

                  addRole(departments);
                }
                
                ).catch((err) =>
                {
                  console.error(err);
                });
                
              } else if (response.menu === "add an employee") {
              //  addEmployee();
                    emp.getLisOfRoles()
                        .then((roles) => {
                    emp.getLisOfEmployees()
                         .then((employees)=>{ 
                            addEmployee(roles, employees);
                          })
                         .catch((err)=>{
                           console.error(err);});
                    })
                    .catch((err)=>{
                      console.error(err);}
                      );
              } else if (response.menu === "update an employee role") {  
                emp.getLisOfRoles()
                    .then((roles) => {
                         emp.getLisOfEmployees()
                            .then((employees)=>{ 
                              updateEmployeeRole(roles, employees);  
                        })
                         .catch((err)=>{
                      console.error(err);});
                   })
                   .catch((err)=>{
                     console.error(err);}
                  );

              }else if (response.menu === "update employee managers") {
                emp.getLisOfEmployees()
                    .then((employees)=>{ 
                       updateEmployeeManager(employees);
                     })
                     .catch((err)=>{
                    console.error(err);
                  });
              
              } else if (response.menu === "view employees by manager") {
                showEmployeeManager(showMenu); 

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
