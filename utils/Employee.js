const cTable = require('console.table');

class Employee {
    constructor(pool) {
      this.pool = pool;
    }
  

    getAllEmployees(showMenu){ this.pool.query( "SELECT * FROM employee",  function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      console.table(results);  
      showMenu();
     
    }
  );
}
  }


  module.exports = Employee;