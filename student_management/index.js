#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    _id;
    name;
    courses;
    balance;
    constructor(_id, name) {
        this._id = _id;
        this.name = name;
        this.courses = [];
        this.balance = 0;
    }
}
class ManagementSystem {
    students = [];
    addStudent(name) {
        const unique_id = this.generateID();
        const newStudent = new Student(unique_id, name);
        this.students.push(newStudent);
    }
    generateID() {
        let result = "";
        while (result.length < 5) {
            let random = (Math.ceil(Math.random() * 10) + 1).toString();
            result += random;
        }
        return Number(result);
    }
    enrollStudent(_id, course) {
        this.students.map((student) => {
            if (student._id == _id) {
                student.courses.push(course);
            }
            else {
                console.log("Student not found");
            }
        });
    }
    viewBalance(_id) {
        this.students.map((student) => {
            if (student._id == _id) {
                console.log(`The balance of the student is ${student.balance}`);
            }
            else {
                console.log("Student not found");
            }
        });
    }
    payTuitions(_id, amount) {
        this.students.map((student) => {
            if (student._id == _id) {
                student.balance += amount;
            }
            else {
                console.log("Student not found Or Invalid Amount");
            }
        });
    }
}
let loop_condition = true;
const managementSystem = new ManagementSystem();
while (loop_condition) {
    const { response } = await inquirer.prompt([
        {
            type: "list",
            name: "response",
            message: "What kind of Operation, do you want to perform?🤔 ",
            choices: [
                "Add Student",
                "Enroll Student",
                "View Balance",
                "Pay Tuition Fees",
                "Show Status",
                "Exit❌",
            ],
        },
    ]);
    if (response == "Add Student") {
        const { name } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the name of the student: ",
            },
        ]);
        managementSystem.addStudent(name);
    }
    else if (response == "Enroll Student") {
        console.log("Enter the course from the following list: ");
        console.log(`Get students ID from the status option`);
        const { _id, course } = await inquirer.prompt([
            {
                type: "number",
                name: "_id",
                message: "Enter id of student ?🌎: ",
            },
            {
                type: "list",
                name: "course",
                message: "Enter the name of the course?📚: ",
                choices: ["Maths", "Science", "English", "History", "Geography"],
            },
        ]);
        managementSystem.enrollStudent(_id, course);
    }
    else if (response == "View Balance") {
        console.log("Get students ID from the status option");
        const { _id } = await inquirer.prompt([
            {
                type: "number",
                name: "_id",
                message: "Enter id of student ?🌎: ",
            },
        ]);
        managementSystem.viewBalance(_id);
    }
    else if (response == "Pay Tuition Fees") {
        console.log("Get students ID from the status option");
        const { _id, amount } = await inquirer.prompt([
            {
                type: "number",
                name: "_id",
                message: "Enter id of student ?🌎: ",
            },
            {
                type: "number",
                name: "amount",
                message: "Enter the amount to pay?💰: ",
            },
        ]);
        managementSystem.payTuitions(_id, amount);
    }
    else if (response == "Show Status") {
        managementSystem.students.map((student) => {
            console.log(`Name: ${student.name},  ID: ${student._id},  Courses: ${student.courses},  Balance: ${student.balance}`);
        });
    }
    else {
        loop_condition = false;
        console.log("Thank you for using the Student Management System🙏🏻");
    }
}
console.log(managementSystem);
