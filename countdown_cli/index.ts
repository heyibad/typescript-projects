#! /usr/bin/env node
import inquirer from "inquirer";

console.log("Welcome to the COUNTDOWN CLI");

const { confirm, time } = await inquirer.prompt([
  {
    type: "number",
    name: "time",
    message: "Enter the number of seconds to count down from?🤔: ",
    validate: function (time) {
      if (isNaN(time) || time <= 0 || time > 60) {
         console.log("\nInvalid time⏰! Please enter a valid amount of seconds.");
         process.exit(1);
      }
      return true;
    },
  },
  {
    type: "list",
    name: "confirm",
    message: "Are you ready to start the countdown? 🚀",
    choices: ["Yes", "No"],
  },
]);

function countdown(time: number) {
  let value: number = Math.floor(Date.now() / 1000) + time;
  startCountdown(value);
}

function startCountdown(targetSeconds: number) {
  let currentSeconds = Math.floor(Date.now() / 1000);
  let timeDifference = targetSeconds - currentSeconds;

  if (timeDifference <= 0) {
    console.log("Time is up😒!");
    return;
  }

  console.log(`Remaining seconds⏰: ${timeDifference}`);

  setTimeout(() => startCountdown(targetSeconds), 1000);
}

if (confirm === "Yes") {
  countdown(time);
} else {
  console.log("Goodbye👋");
}
