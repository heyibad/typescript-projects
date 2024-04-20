#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
const delayBySeconds = async (ms = 2500) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
};
const title = chalkAnimation.karaoke("Hey Welcome to Noob'O PRO Quiz🙋");
await delayBySeconds();
title.stop();
console.log(chalk.greenBright("Let's see how well you know about programming! 🚀 \nI have to asked you 10 questions.\nYou have to answer them correctly to win the quiz! 🎉\n"));
const { name } = await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name? 🤔",
    },
]);
const spinner = createSpinner("Loading quiz...🔥");
spinner.start();
await delayBySeconds(2000);
spinner.stop();
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Tool Markup Language",
        ],
        answerIndex: 0,
    },
    {
        question: "Which of the following is NOT a programming language?",
        options: ["Java", "Python", "HTML", "Ruby"],
        answerIndex: 2,
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answerIndex: 0,
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Colorful Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
        ],
        answerIndex: 2,
    },
    {
        question: "Which symbol is used to access jQuery?",
        options: ["%", "$", "&", "@"],
        answerIndex: 1,
    },
    {
        question: "Which of the following is NOT a valid keyword in JavaScript?",
        options: ["function", "string", "null", "this"],
        answerIndex: 1,
    },
    {
        question: "Which property is used to change the font of an element in CSS?",
        options: ["font-family", "text-style", "font-style", "text-family"],
        answerIndex: 0,
    },
    {
        question: "What is the correct way to comment out code in HTML?",
        options: [
            "<!-- This is a comment -->",
            "// This is a comment",
            "/* This is a comment */",
            "# This is a comment",
        ],
        answerIndex: 0,
    },
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        options: ["$var", "let", "variable", "name"],
        answerIndex: 1,
    },
    {
        question: "Which property is used to change the background color of an element in CSS?",
        options: ["bgcolor", "color", "background-color", "background"],
        answerIndex: 2,
    },
];
let score = 0;
for (let i = 0; i < questions.length; i++) {
    const { question, options, answerIndex } = questions[i];
    const { answer } = await inquirer.prompt({
        type: "list",
        name: "answer",
        message: question,
        choices: options,
    });
    if (options[answerIndex] == answer) {
        const spinner = createSpinner("checking your answer...🤔");
        spinner.start();
        await delayBySeconds(500);
        spinner.stop();
        score++;
        console.log(chalk.green("Correct! ✔️"));
    }
    else {
        const spinner = createSpinner("Checking your answer...🤔");
        spinner.start();
        await delayBySeconds(500);
        spinner.stop();
        console.log(chalk.red("Incorrect! ❌"));
        break;
    }
}
if (score === questions.length) {
    console.log(chalk.bgMagentaBright(`Congratulations ${name}! You got all the questions right! 🎉🎉🎉`));
}
else {
    console.log(chalk.greenBright(`${name} your total score is ${score} / 10 🚀`));
}
