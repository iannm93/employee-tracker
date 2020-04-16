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
                        value: searchAllRoles,
                    },
                    {
                        name: "Add an employee",
                        value: employeePrompt,
                    },
                    {
                        name: "Add a role",
                        value: rolePrompt,
                    },
                    {
                        name: "Add a department",
                        value: departmentPrompt,
                    },
                 

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

inquirer.prompt(startPrompt).then((res) => {
    console.log(res)
    res.add_something();
})



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
                message: "what's this employee's role ID",

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

function rolePrompt() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What's the employee's title?",

            },
            {
                type: "input",
                name: "salary",
                message: "What's the employee's salary?",

            },
            {
                type: "input",
                name: "department",
                message: "what's the employee's department ID",

            },
        
        ])


        .then(res => {
            addRole(res)
        })

        .catch(err => {
            console.log(err)
        })
}


function departmentPrompt() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What's the department name",

            },
     
        ])


        .then(res => {
            addDepartment(res)
        })

        .catch(err => {
            console.log(err)
        })
}







// function addEmployee(res) {
//     connection.query(
//         "INSERT INTO employees (first, last, role_id, manager_id) VALUES(?, ?, ?, ?)",
//         [{ first: res.first, }, { last: res.last }, { role_id: res.role }, { manager_id: res.manager }],
//         (err, res) => {
//             if (err) {
//                 throw err;
//             }
//             searchAllEmployees();
//         }
//     )
// }
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

function addRole(res) {
    connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [res.title, res.salary, res.department],
        (err, res) => {
            if (err) {
                throw err;
            }
            searchAllRoles();
        }
    )
}


function addDepartment(res) {
    connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [res.name],
        (err, res) => {
            if (err) {
                throw err;
            }
            searchAllDepartments();
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
            }
        }
    )
}


function searchAllDepartments() {
    connection.query(
        "SELECT * FROM department", (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
            }
        }
    )
}

function searchAllRoles() {
    connection.query(
        "SELECT * FROM role", (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
            }
        }
    )
}

