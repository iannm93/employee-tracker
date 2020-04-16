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
                        value: searchDepartment,
                    },
                    {
                        name: "View all employees by manager",
                        value: searchManager,
                    },
                    {
                        name: "Add an employee",
                        value: employeePrompt,
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
                type: "input",
                name: "role",
                message: "what's this employee's role ID",

            },
            {
                type: "input",
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


function addEmployee(res) {
    connection.query(
        "INSERT INTO employees (first, last, role_id, manager_id) VALUES (?, ?, ?, ?)",

        [{ first: res.first, }, { last: res.last }, { role_id: res.role }, { manager_id: res.manager }],
        (err, res) => {
            if (err) {
                throw err;
            }
            searchAllEmployees();
        }
    )
}


// function add(res) {
//     connection.query(
//         "INSERT INTO employees (first, last, role_id, manager_id) VALUES (?, ?, ?, ?)",

//         [{ first: res.first, }, { last: res.last }, { role_id: res.role }, { manager_id: res.manager }],
//         (err, res) => {
//             if (err) {
//                 throw err;
//             }
//             searchAllEmployees();
//         }
//     )
// }

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


function searchDepartment() {
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

function searchManager() {
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

