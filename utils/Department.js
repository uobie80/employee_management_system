const cTable = require('console.table');

class Department {
    constructor(pool) {
        this.pool = pool;
      }

      getAllDepartments(showMenu){ this.pool.query( "SELECT * FROM department",  function(err, results, fields) {

        if(err){
          console.error(err);
          return;
        }
        console.table(results); 
         showMenu(); }); 
      }

      addDepartment(value){ this.pool.query( "INSERT INTO department(name) VALUES (?)", value, function(err, results, fields) {
       
       if(err){
         console.error(err);
         return;
       }
        console.table(results);  
         return; });
        
        }



}





module.exports = Department;