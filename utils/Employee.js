class Employee {
    constructor(firstname, lastname, roleid, managerid=null) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.roleid = roleid;
      this.managerid = managerid
    }
  
    getEmployeeName() {
      console.log(`Hi, my name is ${this.firstname} ${this.lastname}`);
    }
  }