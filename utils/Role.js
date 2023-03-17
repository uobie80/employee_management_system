const cTable = require('console.table');
class Role {
    constructor(pool) {
        this.pool = pool;
      }

    //show all roles
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
      //Add new role
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


   //Get list of all roles
    getListOfRoles() {

        return new Promise((resolve, reject) => {
          const roles = new Map();
      
          this.pool.execute("SELECT id, title from role", function(err, results, fields){
            if (err) {
              reject(err);
              return;
            }
      
            for (const result of results) {
              roles.set(result.title, result.id);
            }
      
            resolve(roles);
          });
        });

    }


     //Delete a role
    deleteRole(value, showMenu){
      this.pool.query( `DELETE FROM role WHERE id = ?`, value,  function(err, results, fields) {

        if(err){
          console.error(err);
          return;
        }
        console.log("Role has been deleted!");
        console.log("");
         showMenu(); 
        }); 
      


    }

}

module.exports = Role;