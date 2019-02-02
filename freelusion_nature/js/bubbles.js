const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var relativeSize = (canvas.width + canvas.height)/2;
var c = canvas.getContext('2d');
var minSpeed = 3;
var speedFactor = 0.5;
var minRadius = Math.floor(relativeSize * 0.001);
var maxRadius = minRadius * 3;
var quant = Math.floor(relativeSize * 0.05);

var CircleArray = [];

for (var i = 0; i < quant; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xSpeed = (Math.random() - 0.5) * speedFactor;
    var ySpeed = (Math.random() - 0.5) * speedFactor;
    xSpeed += xSpeed * minSpeed;
    ySpeed += ySpeed * minSpeed;
    radius = Math.random() * maxRadius + minRadius;
    var randomHue=Math.random() *50;
    var randomLight= 100 - (Math.random() * 20 + 2);
    var clr = `hsla(${randomHue.toFixed(0)}, 100%, ${randomLight.toFixed(0)}%,${(radius * 0.05)+0.1})`;

    CircleArray.push(new Circle(x, y, xSpeed, ySpeed, radius, clr));
}

function Circle(x, y, xSpeed, ySpeed, radius, color) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();
    }

    this.update  = function() {
        if (this.x + this.radius > canvas.width || this.x -this.radius < 0) {
            this.xSpeed = -this.xSpeed;
        }

        this.x += this.xSpeed;

        if (this.y + this.radius > canvas.height || this.y -this.radius < 0) {
            this.ySpeed = -this.ySpeed;
        }

        this.y += this.ySpeed;

        this.draw();
    }
}

// frame by frame
setInterval(function () {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < CircleArray.length; i++) {
        CircleArray[i].update();
    }
}, 30);