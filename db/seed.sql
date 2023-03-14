USE employee_ms_db;

/*Seed department table*/
INSERT INTO department (name) 
     VALUES ("Finance"),
            ("Accounting"),
            ("Help Desk"),
            ("Service"),
            ("Parts");

/*Seed role table*/
INSERT INTO role (title, salary, department_id) 
          VALUES ("Finance"),
                 ("Accounting"),
                 ("Help Desk"),
                 ("Service"),
                 ("Parts");

/*Seed employee table*/
INSERT INTO employee (firstname, lastname, role_id, manager_id) 
     VALUES ("Finance"),
            ("Accounting"),
            ("Help Desk"),
            ("Service"),
            ("Parts");