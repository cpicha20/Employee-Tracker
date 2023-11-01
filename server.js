const express = require("express");
const mysql = require("mysql2");
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "emptracker_db",
  },
  console.log(`Connected to the emptracker_db database.`)
);

function getDB(table){
    db.query(`SELECT * FROM ${table}`, function (err, results) {
        console.table(results);
      });
}

async function HomeMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainmenu",
        message: "Main Menu",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
        ],
      },
    ])
    .then((result) => {
      switch (result.mainmenu) {
        case "View Departments":
            getDB("department");

      }
    });
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    HomeMenu();
  });
  