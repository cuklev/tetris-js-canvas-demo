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
	{
		color: 'yellow',
		cells: [
			[1],
			[1],
			[1],
			[1],
		]
	},
	{
		color: 'lightgreen',
		cells: [
			[1, 1, 0],
			[0, 1, 1],
		]
	},
	{
		color: 'lightblue',
		cells: [
			[0, 1, 1],
			[1, 1, 0],
		]
	},
	{
		color: 'blue',
		cells: [
			[1, 1, 1],
			[1, 0, 0],
		]
	},
	{
		color: 'purple',
		cells: [
			[1, 1, 1],
			[0, 0, 1],
		]
	},
	{
		color: 'green',
		cells: [
			[1, 1, 1],
			[0, 1, 0],
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
	currentFigure.row = -figures[index].cells.length;
	currentFigure.col = 0;
}

function checkForCollision(offsetRow, offsetCol) {
	for(let i = 0; i < currentFigure.obj.cells.length; i += 1) {
		const row = offsetRow + i;
		if(row < 0) {
			continue;
		}

		for(let j = 0; j < currentFigure.obj.cells[i].length; j += 1) {
			const col = offsetCol + j;

			if(currentFigure.obj.cells[i][j] && tetrisTable[row][col]) {
				return true;
			}
		}
	}

	return false;
}

function update() {
	let canFall = !checkForCollision(currentFigure.row + 1, currentFigure.col);

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

		getFigure();
	}

	setTimeout(update, gameSpeed);
}

getFigure();
update();

window.addEventListener('keydown', function(ev) {
	console.log(ev.key);

	if(ev.key === 'ArrowLeft') {
		const canMove = currentFigure.col > 0 && !checkForCollision(currentFigure.row, currentFigure.col - 1);
		if(canMove) {
			currentFigure.col -= 1;
		}
	} else if(ev.key === 'ArrowRight') {
		const canMove = currentFigure.col + currentFigure.obj.cells[0].length < TETRIS_COLS && !checkForCollision(currentFigure.row, currentFigure.col + 1);
		if(canMove) {
			currentFigure.col += 1;
		}
	}
});
