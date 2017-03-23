const TETRIS_ROWS = 18;
const TETRIS_COLS = 10;
const TETRIS_CELL_SIZE = 20;

const tetrisTable = Array.from({ length: TETRIS_ROWS })
	.map(() => Array.from({ length: TETRIS_COLS }).map(() => false));

console.log(tetrisTable);

let x = 10;
let y = 10;

function update() {
	x += 1;
}


setInterval(update, 100);
