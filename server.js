const mysql = require('mysql2');

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
  console.log('connected as id ' + connection.threadId + '\n');
  createRole();
});

createRole = () => {
  console.log('Inserting a new role...\n');
  const query = connection.query(
    'INSERT INTO role SET ?',
    {
      role_id: '[ ]',
      job_title: '',
      department : '', 
      // name: ''
      salary: ''
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' role inserted!\n');
      // Call addRole() AFTER the INSERT completes
      addRole();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

addRole = () => {
  console.log('Adding role...\n');
  const query = connection.query(
    'UPDATE role SET ?  WHERE ? ',[
      {
        role_id: '[ ]'
      },
      {
      job_title: ''
    },
    {
      department_id: ''
    }, 
      // name: ''
    {
      salary: ''
    }],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' role updated!\n');
      deleteRole();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

deleteRole = () => {
  console.log('Deleting role...\n');
  // Delete the role
  const query = connection.query(
    'DELETE FROM role WHERE ?',
    {
      id: '',
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' role deleted!\n');
      readProducts();
    }
  );

  console.log(query.sql);
};

readRole = () => {
  console.log('Selecting all roles...\n');
  // Select all of the data from the 'roles' table
  const query = connection.query(
    'SELECT * FROM `roles`',
    function(err, results) {
      console.log(results);
    }
  );
};


connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  createDept();
});

createDept = () => {
  console.log('Inserting a new department...\n');
  const query = connection.query(
    'INSERT INTO department SET ?',
    {
      department_id: '[ ]',
      deptName: ''
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department inserted!\n');
      // Call addDept() AFTER the INSERT completes
      addDept();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

addDept = () => {
  console.log('Adding department...\n');
  const query = connection.query(
    'UPDATE department SET ?  WHERE ? ',[
      {
        department_id: '[ ]'
      },
      {
        deptName: ''
    }],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department updated!\n');
      deleteDept();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

deleteDept = () => {
  console.log('Deleting department...\n');
  // Delete the department
  const query = connection.query(
    'DELETE FROM department WHERE ?',
    {
      department_id: '',
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department deleted!\n');
      readDept();
    }
  );

  console.log(query.sql);
};

readDept = () => {
  console.log('Selecting all departments...\n');
  // Select all of the data from the 'department' table
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
  createEe();
});

createEe = () => {
  console.log('Inserting a new employee...\n');
  const query = connection.query(
    'INSERT INTO employee SET ?',
    {
      EeID: '[ ]',
      first_name: '',   
      last_name: '',
      role_id: '[ ]'
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' employee inserted!\n');
      // Call addEe() AFTER the INSERT completes
      addEe();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

addEe = () => {
  console.log('Adding employee...\n');
  const query = connection.query(
    'UPDATE employee SET ?  WHERE ? ',[
      {
        EeID: '[ ]'
      },
      {
        first_name: ''
      },   
      {
        last_name: ''
      }, 
      {
        role_id:''
      },
      {
        manager_id:''
      }
  ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' employee updated!\n');
      deleteEe();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

deleteEe = () => {
  console.log('Deleting employee...\n');
  // Delete the department
  const query = connection.query(
    'DELETE FROM employee WHERE ?',
    {
      EeID: '',
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' employee deleted!\n');
      readEe();
    }
  );

  console.log(query.sql);
};

readEe = () => {
  console.log('Selecting all employee...\n');
  // Select all of the data from the 'department' table
  const query = connection.query(
    'SELECT * FROM `employee`',
    function(err, results) {
      console.log(results);
    }
  );
};

