#! /usr/bin/env node
import inquirer from "inquirer";

class Student {
  public _id: number;
  public name: string;
  public courses: string[];
  public balance: number;
  constructor(_id: number, name: string) {
    this._id = _id;
    this.name = name;
    this.courses = [];
    this.balance = 0;
  }
}

class ManagementSystem {
  public students: Student[] = [];

  addStudent(name: string): void {
    const unique_id: number = this.generateID();
    const newStudent: Student = new Student(unique_id, name);
    this.students.push(newStudent);
  }
  generateID(): number {
    let result: string = "";
    while (result.length < 5) {
      let random: string = (Math.floor(Math.random() * 10) + 1).toString();
      result += random;
    }
    return Number(result);
  }
  enrollStudent(_id: number, course: string): void {
    this.students.map((student) => {
      if (student._id == _id) {
        student.courses.push(course);
      } else {
        console.log("Student not found");
      }
    });
  }
  viewBalance(_id: number): void {
    this.students.map((student) => {
      if (student._id == _id) {
        console.log(`The balance of the student is ${student.balance}`);
      } else {
        console.log("Student not found");
      }
    });
  }
  payTuitions(_id: number, amount: number): void {
    this.students.map((student) => {
      if (student._id == _id) {
        student.balance += amount;
      } else {
        console.log("Student not found Or Invalid Amount");
      }
    });
  }
}

let loop_condition: boolean = true;
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
  } else if (response == "Enroll Student") {
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
  } else if (response == "View Balance") {
    console.log("Get students ID from the status option");
    const { _id } = await inquirer.prompt([
      {
        type: "number",
        name: "_id",
        message: "Enter id of student ?🌎: ",
      },
    ]);
    managementSystem.viewBalance(_id);
  } else if (response == "Pay Tuition Fees") {
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
  } else if (response == "Show Status") {
    managementSystem.students.map((student) => {
      console.log(
        `Name: ${student.name},  ID: ${student._id},  Courses: ${student.courses},  Balance: ${student.balance}`
      );
    });
  } else {
    loop_condition = false;
    console.log("Thank you for using the Student Management System🙏🏻");
  }
}
