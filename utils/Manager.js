const cTable = require('console.table');
class Manager {
    constructor(pool) {
        this.pool = pool;
      }


      getAllManagers(showMenu){ 
        this.pool.query( `SELECT CONCAT(manager.firstname + ' ' + manager.lastname) as manager 
                                 CONCAT(employee.firstname + ' ' + employee.lastname) as non_manager_employee,
                                 role.title 
                            FROM employee, 
                                 (SELECT manager_id, id, firstname, lastname as id FROM employee WHERE employee.manager_id IS NOT NULL) as manager 
                            WHERE employee.id = manager.manager_id`,  
         function(err, results, fields) {
          if(err){
            console.error(err);
            return;
          }
          console.log("");
          console.table(results);  
          console.log("");
          showMenu();
        
      }
    );}


    showEmployeesByManager(showMenu){
      this.pool.execute(`SELECT CONCAT(employee.firstname, ' ', employee.lastname) as manager, 
                        CONCAT(nonmanager.firstname ,' ', nonmanager.lastname) as non_manager_employee
                         FROM employee, 
                        (SELECT manager_id, id, firstname, lastname FROM employee WHERE employee.manager_id IS NOT NULL) as nonmanager 
                         WHERE employee.id = nonmanager.manager_id`,  function(err, results, fields){

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

module.exports = Manager;