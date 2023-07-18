const N = 3;
const X = 'X';
const O = '0';
let M = [];
let count = 1;
onload = () => {
    createArr();
    createTable();
};

const createArr = () => {
    for (let i = 0; i < N; i++) {
        M[i] = [];
        for (let j = 0; j < N; j++) {
            M[i][j] = '';
        }
    }
};

const createTable = () => {
    let table = '';

    for (let i = 0; i < N; i++) {
        table += `</tr>`
        for (let j = 0; j < N; j++) {
            table += `<td onclick="playUser(${i},${j})">${M[i][j]}</td>`;
        }

        table += `</tr>`
    }
    document.getElementsByTagName("table")[0].innerHTML = table;
}

const playUser = (i, j) => {
    if (M[i][j] === "") {
        M[i][j] = X;
        count++;
        createTable();
        setTimeout(checkWin, 250);
        if (count <= N * N) {
            setTimeout(computerPlay, 500);
        }
    }
};

const computerPlay = () => {
    if (count <= N * N) {
        let availableCells = [];
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (M[i][j] === '') {
                    availableCells.push({ row: i, column: j });
                }
            }
        }
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        M[randomCell.row][randomCell.column] = O;
        count++;
        createTable();
        setTimeout(checkWin, 250);
    }
};

const checkWin = () => {
    const winningConditions = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (M[Math.floor(a / N)][a % N] === M[Math.floor(b / N)][b % N] && M[Math.floor(b / N)][b % N] === M[Math.floor(c / N)][c % N] && M[Math.floor(a / N)][a % N] !== "") {
            alert(`${M[Math.floor(a / N)][a % N]} wins!`);
            resetGame();
            return;
        }
    }

    if (count > N * N) {
        alert("It's a tie!");
        resetGame();
    }
};

const resetGame = () => {
    M = [];
    count = 1;
    createArr();
    createTable();
};