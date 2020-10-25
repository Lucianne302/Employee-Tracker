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
          exit();
          break;
      }
  })
}

// add if statements. example: if choices = view all ee's then call viewEmployees = ()

// write function (start w/ viewEmployees) then add inquirer (tip: KISS)

const viewEmployees = () => {
  console.log('Selecting all employees...\n');
  // Select all of the data from the 'products' table
  connection.query('SELECT * FROM `employee`;',
  function(err, res) {
    if (err) throw err;
    //logs results
    console.table(res);
    menu();
  });
};

viewEdept = () => {
  console.log('View Employees by Department...\n');
  // Select the data from the 'employee' table to view by dept

  const query = connection.query(
    'SELECT * FROM `employee` ORDER BY `department`',
    function(err, results) {
      console.log(results);
    }
  );
};

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  viewEmgr();  
});

viewEmgr = () => {
  console.log('View Employees by Manager...\n');
  // Select the data from the 'employee' table to view by dept

  const query = connection.query(
    'SELECT * FROM `employee` WHERE `manager_id NOT NULL`',
    function(err, results) {
      console.log(results);
    }
  );
};

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  addEmployee();  
});

addEmployee = () => {
  console.log('Inserting a new employee...\n');
  const query = connection.query(
    'INSERT INTO employee SET ?',
    {
      first_name: '',
      last_name: '',
      role_id: '',
      manager_id: ''
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' employee inserted!\n');
      // Call updateProduct() AFTER the INSERT completes
      updateEmployee();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  updateEmployee();  
});

updateEmployee = () => {
  console.log('Updating employee...\n');
  // Update employee

  const query = connection.query(
    'UPDATE products SET ?  WHERE ? ',[
      {
        first_name: '',
        last_name: '',
        role_id: '',
        manager_id: ''
      }],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product updated!\n');
      // Call updateProduct() AFTER the INSERT completes
      updateEmployee();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  deleteEmployee();  
});


deleteEmployee = () => {
  console.log('Deleting all strawberry ice cream...\n');
  // Delete employee
  const query = connection.query(
    'DELETE FROM employee WHERE ?',
    {
      EeID: '',
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' employee deleted!\n');
      viewEmployees();
    }
  );
}

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  viewDepartments();  
});

viewDepartments = () => {
  console.log('Selecting all departments...\n');
  // Select all of the data from the 'products' table

  const query = connection.query(
    'SELECT * FROM `department`',
    function(err, results) {
      console.log(results);
    }
  );
};

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  viewRoles();  
});

viewRoles = () => {
  console.log('Selecting all roles...\n');
  // Select all of the data from the 'roles' table

  const query = connection.query(
    'SELECT * FROM `roles`',
    function(err, results) {
      console.log(results);
    }
  );
};

quit = () => {
  connection.end();
};

