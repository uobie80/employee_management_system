const cTable = require('console.table');

class Employee {
    constructor(pool) {
      this.pool = pool;
    }
  

    getAllEmployees(showMenu){ this.pool.query( `SELECT nonmanager.id, 
                                                        nonmanager.firstname,
                                                        nonmanager.lastname,
                                                        role.title,
                                                        CONCAT(employee.firstname, ' ', employee.lastname) as Manager
                                                    FROM (SELECT id, firstname, lastname, manager_id, role_id FROM employee) AS nonmanager
                                                    LEFT JOIN role ON nonmanager.role_id = role.id
                                                    LEFT JOIN employee ON employee.id = nonmanager.manager_id` , function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      console.log("");
      console.table(results);  
      console.log("");
      showMenu();
     
    });
} 


getLisOfRoles() {

  return new Promise((resolve, reject) => {
    const roles = new Map();

    this.pool.execute("SELECT id, title from role", function(err, results, fields){
      if (err) {
        reject(err);
        return;
      }

      for (const result of results) {
        roles.set(result.title, result.id);
      }

      resolve(roles);
    });
  });


  

}



getLisOfEmployees() {

  return new Promise((resolve, reject) => {
    const employees = new Map();

    this.pool.execute("SELECT id, firstname, lastname from employee", function(err, results, fields){
      if (err) {
        reject(err);
        return;
      }

      for (const result of results) {
       
        employees.set( `${result.firstname + " " + result.lastname}`, result.id);
      }

      resolve(employees);
    });
  });
   
}


  addEmployee(values, showMenu){
   
    for (let i=0; i<values.length; i++){
      if (values[i] === undefined){
        values[i] = null;
      }
    }
   

    this.pool.execute(`INSERT INTO employee(firstname, lastname, role_id, manager_id) VALUES (?,?,?,?)`, values, function(err, results, fields){

    if(err){
      console.error(err);
    }
    console.log("");
    console.log("Employee has been added!");
    console.log("");
    showMenu();
    });


  }



  updateEmployeeRole(values, showMenu){

    this.pool.execute(`UPDATE employee SET role_id = ? WHERE id = ?`,values, function(err, results, fields){

      if(err){
        console.error(err);
      }
        console.log("");
        console.log("Employee's role has been updated!");
        console.log("");
        showMenu();
    });



  }


  updateEmployeeManager(values, showMenu){

    for (let i=0; i<values.length; i++){
      if (values[i] === undefined){
        values[i] = null;
      }
    }
   
     this.pool.execute(`UPDATE employee SET manager_id = ? WHERE id = ?`,values, function(err, results, fields){

      if(err){
        console.error(err);
      }
        console.log("");
        console.log("Employee's manager has been updated!");
        console.log("");
        showMenu();
    });

  }


  showEmployeesByDepartment(showMenu){

    this.pool.execute(`SELECT department.name as department, employee.firstname, employee.lastname 
                        FROM employee,
                               role,
                               department
                          WHERE employee.role_id = role.id
                            AND  role.department_id = department.id`, function(err, results, fields){

      if(err){
        console.error(err);
      }
        console.log("");
        console.table(results);
        console.log("");
        showMenu();
       
    });
  }


  deleteEmployee(value, showMenu){
    this.pool.query( `DELETE FROM employee WHERE id = ?`, value,  function(err, results, fields) {

      if(err){
        console.error(err);
        return;
      }
      console.log("Employee has been deleted!");
      console.log("");
       showMenu(); 
      }); 

  }

}


  module.exports = Employee;