#! /usr/bin/env node
import inquirer from "inquirer";

class Person {
  private personality: string = "mystery";

  constructor() {}

  public askedQuestion(answer: number): void {
    if (answer === 1) {
      this.personality = "extrovert";
    } else {
      this.personality = "introvert";
    }
  }

  public getPersonality(): string {
    return this.personality;
  }
}

class Student extends Person {
  public _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set name(newName: string) {
    this._name = newName;
  }
}

let myStudent = new Student("New One");

console.log(
  "Type 1 if you like to talk to others and type 2 if you wouldn't like to talk to others😒: "
);

const { name, input } = await inquirer.prompt([
  {
    type: "number",
    name: "input",
    message: "Enter your choice (1 or 2)🤔 : ",
    validate: (input) => {
      if (input === 1 || input === 2) {
        return true;
      } else {
        console.log("\nError Occurs ❌ : Please enter 1 or 2");
        process.exit(1);
      }
    },
  },
  {
    type: "input",
    name: "name",
    message: "Enter your name🔥: ",
  },
]);

myStudent.askedQuestion(input);

myStudent.name = name;

console.log(
  `Your name is ${
    myStudent.name
  } ❤, and your personality type is ${myStudent.getPersonality()}🙌`
);
