#! /usr/bin/env node
import inquirer from "inquirer";
const calculator = await inquirer.prompt([
    {
        type: "number",
        name: "num1",
        message: "Enter the first number: ",
    },
    {
        type: "number",
        name: "num2",
        message: "Enter the second number: ",
    },
    {
        type: "list",
        name: "operation",
        message: "Select from the operation: ",
        choices: ["Addition", "Subtraction", "Multiplication", "Dividation"],
    },
]);
if (calculator.operation === "Addition") {
    console.log(`The result is: ${calculator.num1 + calculator.num2}`);
}
else if (calculator.operation === "Subtraction") {
    console.log(`The result is: ${calculator.num1 - calculator.num2}`);
}
else if (calculator.operation === "Multiplication") {
    console.log(`The result is: ${calculator.num1 * calculator.num2}`);
}
else if (calculator.operation === "Dividation") {
    console.log(`The result is: ${calculator.num1 / calculator.num2}`);
}
else {
    console.log("Invalid operation Or Any Error Occured!");
}
