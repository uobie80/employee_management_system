const cTable = require('console.table');

class Department {
    constructor(pool) {
        this.pool = pool;
        this.departments = [];
      }

      getAllDepartments(showMenu){ this.pool.query( "SELECT * FROM department",  function(err, results, fields) {

        if(err){
          console.error(err);
          return;
        }
        console.log("");
        console.table(results); 
        console.log("");
         showMenu(); 
        }); 
      }

      addDepartment(value, showMenu){ this.pool.execute( "INSERT INTO department(name) VALUES (?)", value, function(err, results, fields) {
       
       if(err){
         console.error(err);
         return;
       }
        console.log(`${value[0]} has been added!`); 
        showMenu(); 
        });
        
        }


        getLisOfDepartments() {

          return new Promise((resolve, reject) => {
            const departments = new Map();
        
            this.pool.execute("SELECT id, name from department", function(err, results, fields){
              if (err) {
                reject(err);
                return;
              }
        
              for (const result of results) {
                departments.set(result.name, result.id);
              }
        
              resolve(departments);
            });
          });


        }



}


module.exports = Department;