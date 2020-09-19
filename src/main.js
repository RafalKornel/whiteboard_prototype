var control = true;
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const clearBtn = document.querySelector("input");
var figures = [];
const resMod = 2;


function setSize() {
    canvas.width = window.innerWidth  * resMod;
    canvas.height = window.innerHeight  * resMod;
}

setSize();
window.addEventListener("resize", setSize);
clearBtn.onclick = () => { c.clearRect(0, 0, canvas.width, canvas.height); }


class Figure {
    constructor(type) {
        this.points = [];
        this.type = type;
        this.strokeWidth = 10;
    }

    draw() {
        c.beginPath();
        c.lineWidth = this.strokeWidth;
        if (this.points.length == 1) {
            c.fillRect(this.points[0].x - 1, this.points[0].y - 1, 2, 2)
        }
        else {
            let l = 
            c.moveTo(this.points[this.points.length-1].x, this.points[this.points.length-1].y);
            c.lineTo(this.points[this.points.length-2].x, this.points[this.points.length-2].y);
            c.stroke();
        }

    }
}

class Point {
    constructor(x, y, i) {
        this.x = x;
        this.y = y;
        this.i = i;
    }
}


var mouseDown = 0;
var fig = new Figure("line");
document.onmousedown = () => {
    console.log("down")
    fig = new Figure("line");
    mouseDown = 1;
}
document.onmouseup = () => {
    console.log('up');
    mouseDown = 0;
    fig.draw();
    figures.push(fig);
}

document.onmousemove = (e) => {
    let i = 0;

    if (mouseDown) {
        fig.points.push(new Point(e.clientX * resMod, e.clientY * resMod, i++));
        fig.draw();
    }

}

//canvas.onmouseleave = document.onmouseup;

function draw() {


}

function update() {

}

function gameLoop() {

    update();
    draw();
}

//var loop = setInterval(gameLoop, deltaTime);