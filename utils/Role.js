const cTable = require('console.table');
class Role {
    constructor(pool) {
        this.pool = pool;
      }


      getAllRoles(){
        this.pool.query( "SELECT * FROM role",  function(err, results, fields) {
            console.table(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
          }
        );
      }
}

module.exports = Role;