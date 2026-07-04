const grid = document.querySelector(".gridContainer");
const SIZE = 10;

const words = [
  "SCUBA",
  "NERD",
  "WHATIF",
  "KYS",
  "MAKNAE",
  "MARUPOK",
  "MAMATAY",
];
const found = [];

const foundWords = document.querySelector("#foundwords");

const board = Array(SIZE)
  .fill()
  .map(() => Array(SIZE).fill(""));

const directions = {
  right: [0, 1],
  left: [0, -1],
  down: [1, 0],
  up: [-1, 0],
  downRight: [1, 1],
  upLeft: [-1, -1],
};

function placement(word, row, col, direction) {
  const [dr, dc] = directions[direction];

  for (let i = 0; i < word.length; i++) {
    board[row + dr * i][col + dc * i] = word[i];
  }
}

placement("SCUBA", 5, 2, "right");
placement("NERD", 7, 4, "right");
placement("WHATIF", 9, 4, "right");
placement("KYS", 0, 0, "down");
placement("MAKNAE", 5, 9, "up");
placement("MARUPOK", 1, 8, "left");
placement("MAMATAY", 3, 0, "down");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    if (board[r][c] === "") {
      board[r][c] = alphabet[Math.floor(Math.random() * 26)];
    }
  }
}

/*alert("ice breaker muna dahil sa stress ng buhay mo HAHAHAHA");
console.log(alert);
alert("ikaw actually test subject ko para sa website 😎");
console.log(alert);
alert(
  "(spaspam actually kita ng alert HAHAHAHA) dapat aayusin ko pa yung design kaso tinatamad na ako HAHAHAHA",
);
console.log(alert);
alert("ITO NA DI NA AKO MAGSPASPAM");
console.log(alert);
alert("JOKE LANG HAHAHAHA");
console.log(alert);
alert("ETO NA TALAGA");
console.log(alert);*/

const cells = [];

for (let r = 0; r < SIZE; r++) {
  cells[r] = [];

  for (let c = 0; c < SIZE; c++) {
    const cell = document.createElement("div");

    cell.textContent = board[r][c];

    cell.dataset.row = r;
    cell.dataset.col = c;

    grid.appendChild(cell);

    cells[r][c] = cell;
  }
}

let firstCell = null;

grid.addEventListener("click", function (e) {
  const clicked = e.target;

  if (clicked.classList.contains("correct")) return;

  if (!firstCell) {
    firstCell = clicked;
    clicked.classList.add("selected");

    return;
  }

  checkWord(firstCell, clicked);

  firstCell.classList.remove("selected");

  firstCell = null;
});

function checkWord(start, end) {
  let r1 = Number(start.dataset.row);
  let c1 = Number(start.dataset.col);

  let r2 = Number(end.dataset.row);
  let c2 = Number(end.dataset.col);

  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);

  let row = r1;
  let col = c1;

  let word = "";

  const selectedCells = [];

  while (true) {
    word += board[row][col];

    selectedCells.push(cells[row][col]);

    if (row === r2 && col === c2) break;

    row += dr;
    col += dc;

    if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) {
      break;
    }
  }

  const reverse = word.split("").reverse().join("");

  if (words.includes(word) && !found.includes(word)) {
    found.push(word);

    if (found.length === words.length) {
      setTimeout(() => {
        alert("k tapos na.");
      }, 300);
    }

    selectedCells.forEach((cell) => {
      cell.classList.add("correct");
    });

    const li = document.createElement("li");

    li.textContent = word;

    foundWords.appendChild(li);

    return;
  }

  if (words.includes(reverse) && !found.includes(reverse)) {
    found.push(reverse);

    if (found.length === words.length) {
      setTimeout(() => {
        alert("k tapos na.");
      }, 300);
    }

    selectedCells.forEach((cell) => {
      cell.classList.add("correct");
    });

    const li = document.createElement("li");

    li.textContent = reverse;

    foundWords.appendChild(li);

    return;
  }

  selectedCells.forEach((cell) => {
    cell.classList.add("wrong");
  });

  setTimeout(() => {
    selectedCells.forEach((cell) => {
      cell.classList.remove("wrong");
    });
  }, 1000);
}

document.getElementById("hint").addEventListener("click", () => {
  alert("(lah hint agad) yung 7 words ay inside jokes natin HAHAHAHA");
});

document.getElementById("giveUp").addEventListener("click", () => {
  alert(
    "7 words na kailangan mo hanapin ay SCUBA, NERD, WHATIF, KYS, MAKNAE, MARUPOK, MAMATAY HAHAHAHA GL",
  );
});
console.log(board);
