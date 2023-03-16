const cTable = require('console.table');
class Manager {
    constructor(pool) {
        this.pool = pool;
      }


      getAllManagers(showMenu){ 
        this.pool.query( "SELECT * FROM employee WHERE employee.manager_id = employee.id AND manager_id IS NOT NULL",  
         function(err, results, fields) {
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

module.exports = Manager;