const cTable = require('console.table');

class Employee {
    constructor(pool) {
      this.pool = pool;
    }
  

    getAllEmployees(showMenu){ this.pool.query( `SELECT employee.id, 
                                                        employee.firstname,
                                                        employee.lastname,
                                                        role.title
                                                     FROM employee,
                                                           role
                                                    WHERE employee.role_id = role.id`, function(err, results, fields) {
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

}


  module.exports = Employee;