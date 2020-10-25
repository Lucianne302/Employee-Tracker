const inquirer = require('inquirer');

// configurable vars:
const fName="Index";
const pTitle="My Team";
const teamArray = [];

function is_Numeric(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const promptUser = teamData => {
    if (!teamData) {
        teamData = [];
    }
    
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do? (Check one, please)',
            choices: ['View All Employees', 'View Employees by Department', 'View Employees by Manager', 'Add Employee', 'Update Employee', 'Delete Employee','Add Manager', 'Update Manager', 'View Role','Add Role', 'Delete Role','View Department','Add Department', 'Delete Department']
        },
        // {
        //     type: 'input',
        //     name: 'View All Employees',
        //     message: 'View All Employees',
        //     validate: nameInput => {
        //       if (nameInput){
        //         return true; 
        //       } else {
        //         console.log('Please enter your name!');
        //         return false;
        //       }
        //     }
        // }, 
        // {
        //     type: 'input',
        //     name: 'id',
        //     message: 'What is your id? (Required)',
        //     validate: idInput => {
        //       if (idInput){
        //           if (is_Numeric(idInput)){
        //             return true; 
        //           } else {
        //             console.log('\nPlease enter a numeric value!');
        //             return false;                      
        //           }
        //       } else {
        //         console.log('Please enter your ID!');
        //         return false;
        //       }
        //     }
        // }, 
        // {
        //     type: 'input',
        //     name: 'email',
        //     message: 'Enter your email: ',
        //     validate: emailInput => {
        //         if (emailInput){
        //         return true; 
        //         } else {
        //         console.log('Please enter your email!');
        //         return false;
        //         }
        //     }
        // },
        // {
        //     type: 'input',
        //     name: 'office',
        //     message: 'what is your office number?',
        //     when: ({ role }) => {
        //         if (role=='Manager') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // },  
        // {
        //     type: 'input',
        //     name: 'githubUserName',
        //     message: 'Enter your Github Username: ',
        //     when: ({ role }) => {
        //         if (role=='Engineer') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     },
        //     validate: githubInput => {
        //         if (githubInput){
        //             return true; 
        //         } else {
        //             console.log('Please enter your Username!');
        //             return false;
        //         }
        //     }
        // },
        // {
        //     type: 'input',
        //     name: 'githubURL',
        //     message: 'Enter the GitHub link to your project. (Required)',
        //     when: ({ role }) => {
        //         if (role=='Engineer') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     },
        //     validate: linkInput => {
        //         if (linkInput){
        //             return true; 
        //         } else {
        //             console.log('Please enter your GitHub link!');
        //             return false;
        //         }
        //     }
        // },
        // {
        //     type: 'input',
        //     name: 'school',
        //     message: 'what is the name of your school?',
        //     when: ({ role }) => {
        //         if (role=='Intern') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // },
        // {
        //     type: 'confirm',
        //     name: 'confirmAddEmp',
        //     message: 'Would you like to enter another employee?',
        //     default: false
        // }

    ]).then(empData => {

        if (empData.role === "Manager") {
            const manager = new Manager(empData.name, empData.id, empData.email, empData.office)
            teamData.push(manager)
        }else if (empData.role === "Engineer"){
            const engineer = new Engineer(empData.name, empData.id, empData.email, empData.githubUserName, empData.githubURL)
            teamData.push(engineer)
        } else if (empData.role === "Intern"){
            const intern = new Intern(empData.name, empData.id, empData.email, empData.school)
            teamData.push(intern)
        } if(empData.confirmAddEmp) {
            return promptUser(teamData)
        }
        return teamData;
    });
};

// function to initialize program
function init() {
    promptUser()
}

// function call to initialize program
init();

module.exports = router;
