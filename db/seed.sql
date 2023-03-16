USE employee_ms_db;

INSERT INTO department (name) 
     VALUES ("Finance"),
            ("Accounting"),
            ("Human Resources"),
            ("Customer Service"),
            ("Information Technology");
     


INSERT INTO role (title, salary, department_id) 
          VALUES ("Finance Analyst", 70000.00, 1),
                 ("Finance Manager", 90000.00, 1),
                 ("Finance Examiner", 75000.00, 1),
                 ("Tax Accountant", 85000.00, 2),
                 ("Auditor", 100000.00, 2),
                 ("Controller", 120000.00, 2),
                 ("Management Accountant", 110000.00, 2),
                 ("HR Analyst", 68000.00, 3),
                 ("HR Manager", 130000.00, 3),
                 ("HR Consultant", 76000.00, 3),
                 ("Customer Service Manager", 85000.00, 4),
                 ("Call Center Manager", 80000.00, 4),
                 ("Helpdesk Technician", 60000.00, 4),
                 ("Full Stack Developer", 85000.00, 5),
                 ("Senior Java Developer", 110000.00, 5),
                 ("IT Manager", 120000.00, 5);
                 
INSERT INTO employee (firstname, lastname, role_id, manager_id) 
     VALUES ("Peter","Parker", 16, null),
            ("Bruce", "Banner", 15, 1),
            ("Richard", "Reed", 2, null),
            ("Nonso", "Anozie", 5, 3),
            ("John", "Doe", 9, null),
            ("Jane","Doe", 8, 5),
            ("Kevin", "Johnson", 11, null),
            ("Charles","Barkley",13,7),
            ("Michael", "Jordan",16,null),
            ("Kevin","Durant",14,9);