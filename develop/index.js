const mysql = require("mysql")
const inquirer = require("inquirer")
const startPrompt =
    [

        {
            type: "list",
            name: "add_something",
            messsage: "What do you want to do?",
            choices:
                [
                    {
                        name: "View all employees",
                        value: searchAllEmployees,
                    },
                    {
                        name: "View all employees by department",
                        value: searchAllDepartments,
                    },
                    {
                        name: "View all employees by manager",
                        value: searchAllManager,
                    },
                    {
                        name: "Add an employee",
                        value: employeePrompt,
                    },
                    {
                        name: "Update an employee",
                        value: employeeUpdate,
                    },
                    {
                        name: "Update a manager",
                        value: managerPrompt,
                    },
                 
                    {
                        name: "Delete an employee",
                        value: whichEmployee
                    },
                    {
                        name: "Exit",
                        value: connectionEnd
                    }
                 

                ]
        }
    ]

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB",
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId + "\n");
    // createItem();
});

function start() {
inquirer.prompt(startPrompt).then((res) => {
    console.log(res)
    res.add_something();
})
}
start();
function whichEmployee(){
    return inquirer
    .prompt([
        {
            type: "input",
            name: "first",
            message: "What's the first name of the employee you would like to delete?",
           
        },
        {
            type: "input",
            name: "last",
            message: "what's the last name of the employee you would like to delete?"
        }
    ])
    .then(res => {
        deleteEmployee(res)
    })

    .catch(err => {
        console.log(err)
    })
}


function employeePrompt() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first",
                message: "Type the first name of the employee you wish to add",

            },
            {
                type: "input",
                name: "last",
                message: "Type the last name of the employee you wish to add",

            },
            {
                type: "number",
                name: "role",
                message: "what's this employee's role ID?",

            },
            {
                type: "number",
                name: "manager",
                message: "what's this employee's manager ID?"
            }

        ])


        .then(res => {
            addEmployee(res)
        })

        .catch(err => {
            console.log(err)
        })
}

function employeeUpdate() {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "first",
                message: "which employee would you like to update",
                choices: ["ian",  "dave", "sue"]

            },

        ])


        .then(res => {
            updateEmployee(res)
        })

        .catch(err => {
            console.log(err)
        })
}
function managerPrompt(){
    return inquirer
    .prompt([
        {
            type: "list",
            name: "first",
            message: "which manager would you like to update",
            choices: ["eric"]

        },

    ])


    .then(res => {
        updateManager(res)
    })

    .catch(err => {
        console.log(err)
    })
}




function addEmployee(res) {
    connection.query(
        "INSERT INTO employees (first, last, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [ res.first, res.last, res.role, res.manager ],
        (err, res) => {
            if (err) {
                throw err;
            }
            searchAllEmployees();
            
        }
    )
}

function deleteEmployee(res){
      connection.query(
        "DELETE FROM employees WHERE ? AND ?;",

        [
            {last: res.last},
            {first: res.first}
        ],
        (err, res) => {
            if (err) {
                throw err;
            }
            console.log("employee removed succesfully");
            start();
        }
    )
}

function addRole(res) {
    connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [res.title, res.salary, res.department],
        (err, res) => {
            if (err) {
                throw err;
            }
            searchAllRoles();
            start();
        }
    )
}





function searchAllEmployees() {
    connection.query(
        "SELECT * FROM employees", (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
                start();
            }
        }
    )
}


function searchAllDepartments() {
    connection.query(
        "SELECT employees.first, employees.last, department.name FROM employees LEFT JOIN department  ON employees.role_id = department.id;", 
        (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
                start();
            }
        }
    )
}

function searchAllManager() {
    connection.query(
        "SELECT employees.first, employees.last, department.name FROM employees LEFT JOIN department on employees.role_id = department.id;", 
        (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
                start();
            }
        }
    )
}


function updateEmployee(){

}

function updateManager(){

}




function connectionEnd(){
    connection.end();
}
