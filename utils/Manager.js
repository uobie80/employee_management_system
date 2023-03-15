const cTable = require('console.table');
class Manager {
    constructor(pool) {
        this.pool = pool;
      }


      getAllManagers(){ 
        this.pool.query( "SELECT * FROM employee WHERE employee.manager_id = employee.id AND manager_id IS NOT NULL",  
         function(err, results, fields) {
        console.table(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );
  }
}

module.exports = Manager;