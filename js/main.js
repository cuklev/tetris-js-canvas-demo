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

let x = 10;
let y = 10;

function update() {
	x += 1;
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillRect(x, y, 10, 10);

	requestAnimationFrame(draw);
}

draw();

setInterval(update, 100);
