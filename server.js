const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const data = [];

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: '!QAZ2wsx',
  database: 'tracker_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected as id ' + connection.threadId + ' ');
  landingPage();
});
const landingPage = () => {
  console.log(` 
  ,-----------------------------------------------------.
  |                                                     |
  |     _____                 _                         |
  |    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
  |    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
  |    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
  |    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
  |                    |_|            |___/             |
  |                                                     |
  |     __  __                                          |
  |    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
  |    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
  |    | |  | | (_| | | | | (_| | (_| |  __/ |          |
  |    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
  |                              |___/                  |
  |                                                     |
  \`-----------------------------------------------------'
  `);
  menu();
};

// connection.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId + '\n');
//   menu();  
// });

const menu = () => {
  inquirer.prompt (
    {
      type: 'list',
      name: 'querySelect',
      message: 'What would you like to do? (Check one, please)',
//      choices: ['View All Employees', 'View Employees by Department', 'View Employees by Manager', 'Add Employee', 'Update Employee', 'Delete Employee','Add Manager', 'Update Manager', 'View Role','Add Role', 'Delete Role','View Department','Add Department', 'Delete Department', 'Quit']
      choices: ['View All Employees', 'Add Employee', 'Update Employee', 'View Roles','Add Role', 'View All Departments','Add Department', 'Quit']
    }
  )
  .then ((choices) => {
      switch (choices.querySelect){
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee':
          updateEmployee();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        case 'Add Department':
          addDept();
          break;
        case 'Quit': 
          quit();
          break;
      }
  })
}

// add if statements. example: if choices = view all ee's then call viewEmployees = ()

// write function (start w/ viewEmployees) then add inquirer (tip: KISS)

const viewDepartments = () => {
    console.log('Selecting all Departments...');
    connection.query(`SELECT * FROM department;`, function (err, res) {
      if (err) throw err;
      // log all the results of the select statement
      console.table(res);
      menu();
    });
  };
  const viewRoles = () => {
    console.log('Selecting all Roles... \n');
    connection.query(`SELECT roles.role_id, roles.job_title, roles.salary, deptName AS department_name FROM roles LEFT JOIN department ON roles.department_id = department.id;`, function (err, res) {
      if (err) throw err;
      console.table(res);
      menu();
    });
  };
  const viewEmployees = () => {
    console.log('Selecting all Employees...');
    connection.query(`SELECT EeID, employee.first_name, employee.last_name, roles.job_title, roles.salary, deptName AS Dept_name, 
                    employee.manager_id AS manager
                    FROM employee
                    LEFT JOIN roles ON employee.role_id = roles.role_id
                    LEFT JOIN department ON roles.department_id = department.id
                    ORDER BY EeID;`,
      function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
      });
  };
  const addDept = () => {
    console.log('Adding Department to the Database...');
    inquirer.prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What Department would you like to add?'
      }
    ])
      .then(answer => {
        connection.query(`
            INSERT INTO department SET ?;`,
          {
            deptName: answer.department
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' department was added!');
            menu();
          }
        )
      });
  };
  const addRole = () => {
    inquirer.prompt([
      {
        name: 'role',
        type: 'input',
        message: 'What Role would you like to add?'
      },
      {
        name: 'salary',
        type: 'number',
        message: 'What is the salary for this role?'
      },
      {
        name: 'roleDept',
        type: 'input',
        message: 'What is the department id for this role? (To see the Department id numbers click the "View All Departments")'
      }
    ])
      .then(answer => {
        connection.query(`
            INSERT INTO roles SET ?;`,
          {
            job_title: answer.role,
            salary: answer.salary,
            department_id: answer.roleDept
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' A role was added');
            menu();
          }
        )
      })
  };
  const addEmployee = () => {
    inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is this Employee's First Name?"
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is this Employee's Last Name?"
      },
      {
        name: 'role',
        type: 'input',
        message: `What is the Employee's Role ID? (1) Customer Service (2) Marketing (3) Finance (4) Legal (5) HR (6) IT`
      },
      {
        name: 'manager',
        type: 'number',
        message: `Who is this employee's manager?`
        
      }
    ])
      .then((answer) => {
        connection.query(`INSERT INTO employee SET ?;`,
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
            manager_id: answer.manager
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' '+ answer.firstName + ' ' + answer.lastName + ' was added to the employee table!')
            menu();
          });
      });
  };
  
  const names = [];
  const titles = [];
  
  
  updateEmployee = () => {
  
    console.log('Displaying all employee information in the Database...');
    connection.query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name FROM employee;`,
  
      function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          let name = res[i].Employee_Name;
          names.push(name);
        }
        //console.log(names);
  
        inquirer.prompt([
          {
            name: 'update',
            type: 'list',
            message: 'What Employee would you like to update a role for?',
            choices: names
          }
        ])
          .then((response) => {
            let selectedEmp = response.update;

            connection.query(`SELECT * FROM roles;`,
              (err, res) => {
                if (err) throw err;
                for (let j = 0; j < res.length; j++) {
                  let title = res[j].role_id+' - '+res[j].job_title;
                  console.log(title);
                  titles.push(title);
                }
//                console.log(titles);
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'empRoleUpdate',
                    message: `What is the new role for ${selectedEmp} ? `,
                    choices: titles
                  }
                ])
                    .then((response) => {
//                      let selectedRole = response.empRoleUpdate.substring(0,1);
                      let selectedRole = response.empRoleUpdate.split(' - ')
                      let name= selectedEmp.split(' ');
                      console.log(selectedRole + ' --- ' + name[0] + '-' + name[1]);

//                      connection.query(`UPDATE employee SET role_id VALUES ? WHERE CONCAT(employee.first_name, " ", employee.last_name) = ${selectedEmp}; `, //`+selectedEmp+`;`, //${selectedEmp}; `,
                      connection.query(`UPDATE employee SET ? WHERE ? AND ?`, //`+selectedEmp+`;`, //${selectedEmp}; `,
                        [
                          {
                            role_id: selectedRole[0]
                          },
                          {
                            first_name: name[0]
                          },
                          {
                            last_name: name[1]
                          }

                        ],
                        (err, res) => {
                          if (err) throw err;
                          console.log(`${selectedEmp}'s role updated!`);
                        }
                        //menu()
                      )
                    });

              } 
            )
           menu();


              // .then(
              //   connection.query(`UPDATE employee SET role_id VALUES ? WHERE CONCAT(employee.first_name, " ", employee.last_name) = ${selectedEmp}; `,
              //     {
              //       role_id: response.empRole
              //     },
              //     (err, res) => {
              //       if (err) throw err;
              //       console.log(`${selectedEmp} 's role updated!`);;
              //     },
              //     menu()
              //   )
              // );
          });
      });
  };

const quit = () => {
  connection.end();
};

