import inquirer from "inquirer";
class BankAccount {
    balance;
    constructor(balance = 0) {
        this.balance = balance;
    }
    debit(amount) {
        if (this.balance < amount) {
            console.log("Transaction failed, the amount is Unavailable ❌");
        }
        else {
            this.balance -= amount;
        }
    }
    credit(amount) {
        if (amount > 100) {
            amount -= 1;
            this.balance += amount;
            console.log("Transaction fee applied 💸 1$ and Your Amount is Added 💰");
        }
        else {
            this.balance += amount;
            console.log("Your Amount is Added 💰");
        }
    }
    checkBalance() {
        if (this.balance < 0) {
            console.log("Insufficient funds ❌");
        }
        else {
            console.log(`Your balance is ${this.balance} 💰`);
        }
    }
}
class Customer extends BankAccount {
    firstName;
    lastName;
    gender;
    age;
    phone;
    constructor(firstName, lastName, gender, age, phone, balance) {
        super(balance);
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
    }
}
const { firstName, lastName, gender, age, phone } = await inquirer.prompt([
    {
        type: "input",
        name: "firstName",
        message: "Enter your First Name 🤔: ",
        validate: (value) => {
            if (value.length > 0 && value.trim() != "") {
                return true;
            }
            else {
                return "Please Enter a valid Name ❌";
            }
        },
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter your Last Name 🤔: ",
        validate: (value) => {
            if (value.length > 0 && value.trim() != "") {
                return true;
            }
            else {
                return "Please Enter a valid Name ❌";
            }
        },
    },
    {
        type: "input",
        name: "gender",
        message: "Enter your Gender ( M or F ) : ",
        validate: (value) => {
            if (value.trim().toLowerCase() === "m" || value.trim().toLowerCase() === "f") {
                return true;
            }
            else {
                return "Please Enter M or F ❌";
            }
        },
    },
    {
        type: "number",
        name: "age",
        message: "Enter your Age : ",
        validate: (value) => {
            if (value > 0) {
                return true;
            }
            else {
                return "Please Enter a valid Age ❌:";
            }
        },
    },
    {
        type: "input",
        name: "phone",
        message: "Enter your Phone Number 📞: ",
        validate: (value) => {
            if (value > 9) {
                return true;
            }
            else {
                return "Please Enter a valid Phone Number ❌:";
            }
        },
    },
]);
let loop_condition = true;
const customer = new Customer(firstName, lastName, gender, age, phone, 0);
while (loop_condition) {
    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What do you want to do?",
            choices: ["Check Balance 💰", "Debit 💰", "Credit💰", "Exit ❌"],
        },
    ]);
    if (choice === "Check Balance 💰") {
        customer.checkBalance();
    }
    else if (choice === "Debit 💰") {
        const { amount } = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                message: "Enter the amount you want to debit 💰",
                validate: (value) => {
                    if (value > 0) {
                        return true;
                    }
                    else {
                        return "Please Enter a valid Amount ❌";
                    }
                },
            },
        ]);
        customer.debit(amount);
    }
    else if (choice === "Credit💰") {
        const { amount } = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                message: "Enter the amount you want to credit 💰: ",
                validate: (value) => {
                    if (value > 0) {
                        return true;
                    }
                    else {
                        return "Please Enter a valid Amount ❌";
                    }
                },
            },
        ]);
        customer.credit(amount);
    }
    else {
        loop_condition = false;
        console.log("Thank you for using our service 🙏🏻");
    }
}
