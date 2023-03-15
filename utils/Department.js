const cTable = require('console.table');

class Department {
    constructor(pool) {
        this.pool = pool;
      }

      getAllDepartments(){ this.pool.query( "SELECT * FROM department",  function(err, results, fields) {
        console.table(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );
  }
}





module.exports = Department;