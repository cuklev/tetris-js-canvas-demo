(function() {
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

	function drawTable() {
		for(let i = 0; i < TETRIS_ROWS; i += 1) {
			for(let j = 0; j < TETRIS_COLS; j += 1) {
				if(!tetrisTable[i][j]) {
					continue;
				}

				const color = tetrisTable[i][j];
				context.fillStyle = color;
				context.fillRect(getCellX(i), getCellY(j), TETRIS_CELL_SIZE, TETRIS_CELL_SIZE);
			}
		}
	}

	function drawGrid() {
		for(let i = 0; i <= TETRIS_ROWS; i += 1) {
			context.moveTo(0, getCellY(i));
			context.lineTo(getCellX(TETRIS_COLS), getCellY(i));
			context.stroke();
		}

		for(let i = 0; i <= TETRIS_COLS; i += 1) {
			context.moveTo(getCellX(i), 0);
			context.lineTo(getCellX(i), getCellY(TETRIS_ROWS));
			context.stroke();
		}
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawTable();
		drawGrid();

		requestAnimationFrame(draw);
	}

	draw();
}());
