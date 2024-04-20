#! /usr/bin/env node
import inquirer from "inquirer";
console.log(` ----- Welcome to Todo App 📝 -----  `);
let loop_condition = true;
let todos = [];
let init_id = 0;
while (loop_condition) {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "ans",
            message: "What do you want? ✅",
            choices: ["See Todos📝", "Add Todo📝", "Delete Todo🚮", "Update Todo📃", "Exit ❌"],
        },
    ]);
    if (answer.ans == "Add Todo📝") {
        const add = await inquirer.prompt([
            {
                type: "input",
                message: "Add your todo here📝: ",
                name: "add_todo"
            },
        ]);
        if (add.add_todo.trim() != "") {
            init_id++;
            todos.push({
                _id: init_id,
                message: add.add_todo,
            });
        }
        else {
            console.log("Please enter a valid todo 😒");
        }
    }
    else if (answer.ans == "See Todos📝") {
        console.log("Your Todos are : ");
        todos.forEach((todo) => {
            console.log(`📝 ID: ${todo._id}: ${todo.message}`);
        });
    }
    else if (answer.ans == "Delete Todo🚮") {
        const delete_todo = await inquirer.prompt([
            {
                type: "number",
                message: "Give ID of Which todo do you want to delete? : ",
                name: "_id"
            },
        ]);
        todos = todos.filter((todo) => (todo._id != delete_todo._id));
        if (!todos.includes(delete_todo._id)) {
            console.log("Todo Deleted Successfully! 🚮");
        }
    }
    else if (answer.ans == "Update Todo📃") {
        const update_todo = await inquirer.prompt([
            {
                type: "number",
                message: "Give ID of Which todo do you want to update? : ",
                name: "_id"
            },
            {
                type: "input",
                message: "Write Updated version here📝: ",
                name: "message"
            }
        ]);
        todos = todos.map((todo) => {
            if (todo._id == update_todo._id) {
                return { ...todo, message: update_todo.message };
            }
            return todo;
        });
        if (!todos.includes(update_todo.massage)) {
            console.log("Todo Updated Successfully! 📃");
        }
    }
    else {
        loop_condition = false;
        console.log("Good Bye! 🥱");
    }
}
