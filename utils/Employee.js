const cTable = require('console.table');

class Employee {
    constructor(pool) {
      this.pool = pool;
    }
  

    getAllEmployees(){ this.pool.query( "SELECT * FROM employee",  function(err, results, fields) {
      console.table(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
}
  }


  module.exports = Employee;