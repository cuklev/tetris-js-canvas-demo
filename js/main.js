const canvas = document.getElementById('tetris-canvas');
const context = canvas.getContext('2d');

const requestAnimationFrame = (window.requestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| function(callback) {
		setTimeout(callback, 1000 / 30); // 30 FPS
	});

canvas.width = 800;
canvas.height = 600;

const TETRIS_ROWS = 18;
const TETRIS_COLS = 10;
const TETRIS_CELL_SIZE = 20;

let x = 10;
let y = 10;

function update() {
	x += 1;
}

function drawGrid() {
	for(let i = 0; i <= TETRIS_ROWS; i += 1) {
		context.moveTo(0, TETRIS_CELL_SIZE * i);
		context.lineTo(TETRIS_COLS * TETRIS_CELL_SIZE, TETRIS_CELL_SIZE * i);
		context.stroke();
	}

	for(let i = 0; i <= TETRIS_COLS; i += 1) {
		context.moveTo(TETRIS_CELL_SIZE * i, 0);
		context.lineTo(TETRIS_CELL_SIZE * i, TETRIS_ROWS * TETRIS_CELL_SIZE);
		context.stroke();
	}
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawGrid();

	requestAnimationFrame(draw);
}

draw();

setInterval(update, 100);
