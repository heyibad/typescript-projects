import inquirer from "inquirer";

type Board = string[][];

function initializeBoard(): Board {
    return [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];
}

function printBoard(board: Board) {
    for (let row of board) {
        console.log(row.join(" | "));
        console.log("---------");
    }
}

function checkWin(board: Board, player: string): boolean {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === player &&
                board[i][1] === player &&
                board[i][2] === player) ||
            (board[0][i] === player &&
                board[1][i] === player &&
                board[2][i] === player) ||
            (board[0][0] === player &&
                board[1][1] === player &&
                board[2][2] === player) ||
            (board[0][2] === player &&
                board[1][1] === player &&
                board[2][0] === player)
        ) {
            return true;
        }
    }

    return false;
}

async function main() {
    console.log("Welcome to Tic-Tac-Toe Game!🙌\n");

    const { player1Name, player2Name } = await inquirer.prompt([
        {
            type: "input",
            name: "player1Name",
            message: "Enter Player 1's name ❤ : ",
        },
        {
            type: "input",
            name: "player2Name",
            message: "Enter Player 2's name ❤ :",
        },
    ]);

    let board = initializeBoard();
    let currentPlayer = "✔";

    let winner = null;
    let moves = 0;

    while (!winner && moves < 9) {
        console.log("\nCurrent board 📃 :");
        printBoard(board);

        const currentPlayerName =
            currentPlayer === "✔" ? player1Name : player2Name;
        console.log(`\n${currentPlayerName} yours turn🤔: `);

        const { row, col } = await inquirer.prompt([
            {
                type: "number",
                name: "row",
                message: "Enter the row number (1-3):",
                validate: (value) => {
                    if (value >= 1 && value <= 3) {
                        return true;
                    } else {
                        return "❌Please enter a valid row number (1-3): ";
                    }
                },
            },
            {
                type: "number",
                name: "col",
                message: "Enter the column number (1-3): ",
                validate: (value) => {
                    if (value >= 1 && value <= 3) {
                        return true;
                    } else {
                        return "❌ Please enter a valid row number (1-3): ";
                    }
                },
            },
        ]);

        if (board[row - 1][col - 1] !== " ") {
            console.log("That square is already taken. Try again.");
            continue;
        }

        board[row - 1][col - 1] = currentPlayer;
        moves++;

        if (checkWin(board, currentPlayer)) {
            winner = currentPlayer;
        } else {
            currentPlayer = currentPlayer === "✔" ? "❌" : "✔";
        }
    }

    console.log("\nFinal board 📃:");
    printBoard(board);

    if (winner) {
        const winnerName = winner === "✔" ? player1Name : player2Name;
        console.log(`Congratulations ${winnerName} you wins! 💖🎉`);
    } else {
        console.log("It's a draw!");
    }

    console.log("\nThanks for playing! Goodbye 🙋🏻.");
}

main();
