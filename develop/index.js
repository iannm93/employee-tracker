const mysql = require("mysql")
const inquirer = require("inquirer")
const startPrompt =
[
    
    {
        type: "list",
        name: "add_something",
        messsage: "Do you want to add an employee, a role or a department?",
        choices:
        [
            "EMPLOYEE",
            "ROLE",
            "DEPARTMENT",
            "I DO NOT WANT TO ADD ANYTHING"
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

inquirer.prompt(startPrompt).then((res)=>{
    //Check what the user selected
    //Search ny artist
    if(res.add_something === "EMPLOYEE")
        employeePrompt();
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
            // "SELECT first, last from employees WHERE ? AND ?",
            "SELECT first, last from employees WHERE ?",
            {
               first: res.first,
            //    last: res.last
            },
            (err, res) => {
                if (err) {
                    throw err;
                }
             console.log(res)
            }
        )}