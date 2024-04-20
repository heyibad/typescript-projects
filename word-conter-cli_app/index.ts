#! /usr/bin/env node
import inquirer from "inquirer";

const questions = await inquirer.prompt([
  {
    type: "input",
    name: "text",
    message: "Enter the paragraph to count the words📰 :",
  },
]);

if (questions.text) {
  let characters = questions.text
                            .replace(/\s+/g, "")
                            .toLowerCase()
                            .length;

  let words = questions.text
                        .trim()
                        .split(/\s+/)
                        .length;

  console.log(`The paragraph has ${characters} number of characters📰, and ${words} words 📃`);
} 
else {
  console.log("Please enter a valid paragraph📰");
}