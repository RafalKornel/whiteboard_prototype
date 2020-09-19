var   control   = true;
const canvas    = document.querySelector("canvas");
const c         = canvas.getContext("2d");
const clearBtn  = document.querySelector("input");
var   figures   = [];


function setSize() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}

setSize();
window.addEventListener("resize", setSize);
clearBtn.onclick = () => { c.clearRect(0, 0, canvas.width, canvas.height); }


class Figure {
    constructor(type) {
        this.points = [];
        this.type = type;
    }

    draw() {
        c.beginPath();
        for (let i = 0; i < this.points.length - 1; i++) {
            let current = this.points[i];
            let next    = this.points[i + 1];
            c.moveTo(current.x, current.y);
            c.lineTo(next.x, next.y);
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
document.onmousedown  = () => { 
    fig = new Figure("line");    
    mouseDown++; 
}
document.onmouseup    = () => { 
    console.log('up');
    mouseDown--;
    fig.draw();
    figures.push(fig);
}   

canvas.onmousemove  = (e) => {
    let i = 0;

    if (mouseDown) {
        console.log("down")
        console.log(fig);
        //c.clearRect(0, 0, canvas.width, canvas.height);
        fig.points.push( new Point(e.layerX, e.layerY, i++));
    }

    fig.draw();
}

canvas.onmouseleave = 




function draw() {


}

function update() {

}

function gameLoop() {

        update();
        draw();
}

//var loop = setInterval(gameLoop, deltaTime);