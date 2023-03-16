const cTable = require('console.table');
class Role {
    constructor(pool) {
        this.pool = pool;
      }


      getAllRoles( showMenu){
        this.pool.query( "SELECT * FROM role",  function(err, results, fields) {
          if(err){
            console.error(err);
            return;
          }
          console.log("");
          console.table(results);  
          console.log("");
          showMenu();
          }
        );
      }

      addRole(values, showMenu){
        this.pool.execute(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`, values, function(err, results, fields){

          if(err){
            console.error(err);
          }
          console.log("");
          console.log(`New role has been added!`);
          console.log("");
          showMenu();
        });
      }
}

module.exports = Role;