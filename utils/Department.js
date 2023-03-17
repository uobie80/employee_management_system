const cTable = require('console.table');

class Department {
    constructor(pool) {
        this.pool = pool;
        this.departments = [];
      }

      //Get all departments from the department table
      getAllDepartments(showMenu){ this.pool.query( "SELECT * FROM department",  function(err, results, fields) {

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
       //Add a new department to the department table
      addDepartment(value, showMenu){ this.pool.execute( "INSERT INTO department(name) VALUES (?)", value, function(err, results, fields) {
       
       if(err){
         console.error(err);
         return;
       }
        console.log(`${value[0]} has been added!`); 
        showMenu(); 
        });
        
        }

        //Get a list of all the departments
        getLisOfDepartments() {

          return new Promise((resolve, reject) => {
            const departments = new Map();
        
            this.pool.execute("SELECT id, name from department", function(err, results, fields){
              if (err) {
                reject(err);
                return;
              }
        
              for (const result of results) {
                departments.set(result.name, result.id);
              }
        
              resolve(departments);
            });
          });


        }
    //Delete a department from the department table
    deleteDepartment(value, showMenu){
      this.pool.query( `DELETE FROM department WHERE id = ?`, value,  function(err, results, fields) {

        if(err){
          console.error(err);
          return;
        }
        console.log("Department has been deleted");
        console.log("");
         showMenu(); 
        }); 
    
    }

   //Get total budget per department
    getTotalBudget(showMenu){
      this.pool.execute(` SELECT employee_ms_db.department.id, 
                                 employee_ms_db.department.name as department,
                                 SUM(employee_ms_db.role.salary) as total_budget
                            FROM  employee_ms_db.department,
                                  employee_ms_db.role,
                                  employee_ms_db.employee
                           WHERE  employee_ms_db.department.id = employee_ms_db.role.department_id
                             AND  employee_ms_db.employee.role_id = employee_ms_db.role.id
                        GROUP BY  employee_ms_db.department.id`, function(err, results, fields){

  if (err){
    console.error(err);
  }
     console.log("");
     console.table(results);
     console.log("");
     showMenu();
});
    }

}


module.exports = Department;