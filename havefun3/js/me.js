var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var mouse = {x: undefined, y: undefined};
var maxPullDistance = canvas.height * 0.8;

window.addEventListener("mousemove", function(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

window.addEventListener("resize", function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	createBars();
});

function Bar(x, width, delay) {
	this.position = {x: x, y: canvas.height};
	this.width = width;
	this.timer = delay;
	this.height = 0;

	this.update = function() {
		this.timer += 0.01;

		var distanceBetweenBarAndMouse = {
			x: ((this.position.x + this.width / 2) - mouse.x),
			y: this.position.y - this.height - mouse.y
		};

		if (distanceBetweenBarAndMouse.y < maxPullDistance &&  distanceBetweenBarAndMouse.x > -this.width / 2 && distanceBetweenBarAndMouse.x < this.width / 2) {
			this.height += ((this.position.y - this.height) - mouse.y) * 0.12;
		} else if (distanceBetweenBarAndMouse.y < maxPullDistance && distanceBetweenBarAndMouse.x > -this.width * 1.5 && distanceBetweenBarAndMouse.x < this.width * 1.5) {
			this.height += ((this.position.y - this.height) - mouse.y) * 0.01;
		} else {
			var maxBarHeightWithSin = canvas.height / 3;

			// Smooth animation down to original height
			this.height -= (this.height - Math.abs(Math.sin(this.timer) * canvas.height / 2.5)) * 0.12;

		}
		this.draw();
	}

	this.draw = function() {
		// Change hue of bar gradually from 1 to 255 and then back from 255 to 1
		c.fillStyle = 'hsl('+Math.abs(Math.sin(this.timer) * 255)+', 50%, 50%)';
		c.fillRect(this.position.x ,canvas.height - this.height, this.width, this.height);
	}	
}

var bars;
var barCount;
var barWidth;
var barPosition;
var barDelay;

function createBars() {
	bars = [];
	barCount = 15;
	barWidth = canvas.width / barCount;
	barPosition = 0;
	barDelay = 0;

	for (var i = 0; i < barCount; i++) {
		bars.push(new Bar(barPosition, barWidth, barDelay));
		barPosition += barWidth;
		barDelay += 0.2;
	}
}

function animate() {
	window.requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,0.1)';
	c.fillRect(0, 0, canvas.width, canvas.height);

	bars.forEach(function(bar) {
		bar.update();
	});
}

createBars();
animate();