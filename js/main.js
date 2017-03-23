const TETRIS_ROWS = 18;
const TETRIS_COLS = 10;
const TETRIS_CELL_SIZE = 20;

const tetrisTable = Array.from({ length: TETRIS_ROWS })
	.map(() => Array.from({ length: TETRIS_COLS }).map(() => false));

tetrisTable.push(Array.from({ length: TETRIS_COLS }).map(() => true));

const figures = [
	{
		color: 'red',
		cells: [
			[1, 1],
			[1, 1],
		]
	},
];

function getCellX(row) {
	return TETRIS_CELL_SIZE * row;
}

function getCellY(col) {
	return TETRIS_CELL_SIZE * col;
}

let currentFigure = {
	obj: {},
	row: 0,
	col: 0
};

let gameSpeed = 100;

function getFigure() {
	const index = Math.random() * figures.length | 0;
	currentFigure.obj = figures[index];
	currentFigure.row = 0;
	currentFigure.col = 0;
}

function update() {
	let canFall = true;
	for(let i = 0; i < currentFigure.obj.cells.length; i += 1) {
		const row = currentFigure.row + i + 1;
		for(let j = 0; j < currentFigure.obj.cells[i].length; j += 1) {
			const col = currentFigure.col + j;

			if(currentFigure.obj.cells[i][j] && tetrisTable[row][col]) {
				canFall = false;
				break;
			}
		}
	}

	if(canFall) {
		currentFigure.row += 1;
	} else {
		for(let i = 0; i < currentFigure.obj.cells.length; i += 1) {
			const row = currentFigure.row + i;
			for(let j = 0; j < currentFigure.obj.cells[i].length; j += 1) {
				const col = currentFigure.col + j;

				if(currentFigure.obj.cells[i][j]) {
					tetrisTable[row][col] = currentFigure.obj.color;
				}
			}
		}

	}

	setTimeout(update, gameSpeed);
}

getFigure();
update();
