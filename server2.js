const inquirer = require('inquirer');
const mysql = require('mysql2');
const data = [];

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: '!QAZ2wsx',
  database: 'trackerDB'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected as id ' + connection.threadId + '\n');
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
      choices: ['View All Employees', 'View Employees by Department', 'View Employees by Manager', 'Add Employee', 'Update Employee', 'Delete Employee','Add Manager', 'Update Manager', 'View Role','Add Role', 'Delete Role','View Department','Add Department', 'Delete Department', 'Quit']
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
    console.log('Selecting all Departments... \n');
    connection.query(`SELECT * FROM departments;`, function (err, res) {
      if (err) throw err;
      // log all the results of the select statement
      console.table(res);
      menu();
    });
  };
  const viewRoles = () => {
    console.log('Selecting all Roles... \n');
    connection.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS departments_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`, function (err, res) {
      if (err) throw err;
      console.table(res);
      menu();
    });
  };
  const viewEmployees = () => {
    console.log('Selecting all Employees... \n');
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS Dept_name, 
                    employees.manager_id AS manager
                    FROM employees
                    RIGHT JOIN roles ON employees.role_id = roles.id
                    RIGHT JOIN departments ON roles.department_id = departments.id
                    ORDER BY employees.id;`,
      function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
      });
  };
  const addDept = () => {
    console.log('Adding Department to the Database... \n');
    inquirer.prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What Department would you like to add?'
      }
    ])
      .then(answer => {
        connection.query(`
            INSERT INTO departments SET ?;`,
          {
            name: answer.department
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' Sucess! Department Added!');
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
        message: 'What is the Department id for this role? \n (To see the Department id numbers click the "View All Departments") \n'
      }
    ])
      .then(answer => {
        connection.query(`
            INSERT INTO roles SET ?;`,
          {
            title: answer.role,
            salary: answer.salary,
            department_id: answer.roleDept
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' Role Added! Please View all Roles to verify.');
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
        message: `What is the Employee's Role ID? \n (1) Associate \n (2) Manager \n (3) Lead \n (4) Programmer \n (5) Megatron \n (6) Training Manager \n (7) Litigator \n`
      },
      {
        name: 'manager',
        type: 'number',
        message: `Who is this employee's manager?`
        
      }
    ])
      .then((answer) => {
        connection.query(`INSERT INTO employees SET ?;`,
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
            manager_id: answer.manager
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + 'Sucess! Employee added!')
            menu();
          });
      });
  };
  
  const names = [];
  
  
  updateEmployee = () => {
  
    console.log('Displaying all employee information in the Database... \n');
    connection.query(`SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Employee_Name FROM employees;`,
  
      function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          let name = res[i].Employee_Name;
          names.push(name);
        }
        console.log(names);
  
        inquirer.prompt([
          {
            name: 'update',
            type: 'list',
            message: 'What Employee would you like to update a role for?',
            choices: names
          }
        ])
          .then((response) => {
            let selectedEmp = response;
            inquirer.prompt({
              type: 'input',
              name: 'empRoleUpdate',
              message: `What is the new role for ${selectedEmp} ? `
            })
              .then(
                connection.query(`UPDATE employees SET role_id VALUES ? WHERE CONCAT(employees.first_name, " ", employees.last_name) = ${selectedEmp}; `,
                  {
                    role_id: response.empRole
                  },
                  (err, res) => {
                    if (err) throw err;
                    console.log(`\n ${selectedEmp} 's role updated! \n`);;
                  },
                  startApp()
                )
              );
          });
      });
  };

quit = () => {
  connection.end();
};

