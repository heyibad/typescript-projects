#! /usr/bin/env node
import inquirer from "inquirer";
const randomNumber = Math.floor(Math.random() * 10) + 1;
const userOutPut = await inquirer.prompt([
    {
        type: "number",
        name: "guess",
        message: "Guess the number between 1️⃣\t to  🔟: ",
    },
]);
if (userOutPut.guess === randomNumber) {
    console.log("You guessed it right! 🎉");
}
else {
    console.log(`You guessed it wrong! The number was ${randomNumber}`);
}
