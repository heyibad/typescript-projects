#! /usr/bin/env node
import inquirer from "inquirer";
let avaliableCash = 100000;
let userPin = 1234;
let userOutput = await inquirer
    .prompt([
    {
        type: "number",
        name: "pin",
        message: "Enter your pin🔐? :",
    },
]);
if (userPin === userOutput.pin) {
    let optionsForUser = await inquirer
        .prompt([
        {
            type: "list",
            name: "option",
            choices: ["Check Balance💰", "Withdraw Cash💸"],
            message: "Select From given options💰 ? :",
        },
    ]);
    if (optionsForUser.option == "Check Balance💰") {
        console.log(`You have ${avaliableCash} in your account💸`);
    }
    else {
        let userGivenAmount = await inquirer
            .prompt([
            {
                type: "number",
                name: "amount",
                message: "Enter the amount you want to withdraw💸? :",
            },
        ]);
        if (userGivenAmount.amount > avaliableCash) {
            console.log(`Insufficient balance🚫`);
        }
        else {
            avaliableCash -= userGivenAmount.amount;
            console.log(`You have successfully withdraw ${userGivenAmount.amount} from your account💸`);
            console.log(`Now you have ${avaliableCash}, remaining in your account💸`);
        }
    }
}
else {
    console.log(`Invalid pin🚫`);
}
