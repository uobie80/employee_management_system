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
          console.table(results);  
          showMenu();
          }
        );
      }
}

module.exports = Role;