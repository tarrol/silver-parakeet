// // const dbConnection = require('./server.ts')
// import { dbConnection } from "./server"

// export function viewMovies() {
//   console.log(dbConnection.query("SELECT * from movies;"))
// }

// function viewRoles() {
//   return dbConnection.promise().query("SELECT role.id, role.title, role.salary, department.name from role join department on role.department_id = department.id;")
// }
// function viewEmployees() {
//   return dbConnection.promise().query("SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS 'employee name', role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;")
// }

// function addEmployee(employee:object) {
//   return dbConnection.promise().query(`insert into employee (first_name, last_name, manager_id, role_id) values ("${employee.first_name}", "${employee.last_name}", "${employee.manager_id}", "${employee.role_id}")`)
// }
// function addDepartment(department:object) {
//   return dbConnection.promise().query(`insert into department (name) values ("${department.name}")`)
// }
// function addRole(role:object) {
//   return dbConnection.promise().query(`insert into role (title, salary, department_id) values ("${role.title}", "${role.salary}", "${role.department}")`)
// }

// module.exports = { viewDepartment, viewRoles, viewEmployees, addDepartment, addEmployee, addRole, addDepartment }