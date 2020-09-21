var control = true;
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const clearBtn = document.getElementById("clear");
const redrawBtn = document.getElementById("redraw");
const fps       = 30;
const deltaTime = 1000/fps;
var figures = [];
const resMod = 2;
let i = 0;



function setSize() {
    canvas.width = window.innerWidth  * resMod;
    canvas.height = window.innerHeight  * resMod;
}

setSize();
window.addEventListener("resize", setSize);
clearBtn.onclick = () => { c.clearRect(0, 0, canvas.width, canvas.height); }
redrawBtn.onclick = () => { 
    for (let i in figures) {
        figures[i].drawFigure();
    }
}


class Figure {
    constructor(type, width = 10) {
        this.points = [];
        this.type = type;
        this.strokeWidth = width;
    }

    draw() {
       /* Draws smooth curve between two latest points added to points stack, 
        * or one point if only clicked. Uses bezier quadratic curve function 
        * built in html canvas.
        */

        c.lineWidth = this.strokeWidth;


        if (this.points.length == 1) {
            c.beginPath();
            c.moveTo(this.points[0].x, this.points[0].y)
            this.drawPoint();
        }

        else {
            let lp = this.points.slice(this.points.length-2); // lp -> lastPoints
            let pMid = new Point( lp[0].x + (lp[1].x-lp[0].x)/2, lp[0].y + (lp[1].y - lp[0].y)/2, (lp[0].i + lp[1].i)/2 );
            c.quadraticCurveTo(lp[0].x, lp[0].y, pMid.x, pMid.y);
            c.moveTo(pMid.x, pMid.y);
            c.stroke();
        }
    }

    drawPoint() {
       /* This function draws 'point', which is
        * basically very small square
        */
       
        let w = this.strokeWidth;
        
        //c.fillStyle = "#ff0000"

        c.fillRect(this.points[this.points.length - 1].x - w/2, this.points[this.points.length - 1].y - w/2, w, w)
    }

    drawLine(P0 = null, P1 = null) {
       /* This function draws a line between two specified 
        * in argument points. If the function is called without 
        * arguments, then it will draw line between most recent
        * points contained in this.points
        */

        c.beginPath();

        if (P0 == null || P1 == null) {
            P0 = this.points[this.points.length - 2];
            P1 = this.points[this.points.length - 1];
        }

        c.moveTo(P0.x, P0.y);
        c.lineTo(P1.x, P1.y);
        c.stroke();
    }

    drawFigure() {
       /* Redraws whole figure, can be useful when needed to
        * draw figure from file or json
        */

        c.moveTo(0, 0);
        let newStack = this.points;
        this.points = [];
        for (let i in newStack) {
            this.points.push(newStack[i]);
            this.draw();
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


var mouseDown = false;
var fig = new Figure("line");
document.onmousedown = () => {
    console.log("down")
    fig = new Figure("line");
    mouseDown = true;
}
document.onmouseup = () => {
    console.log('up');
    mouseDown = false;
    i = 0;
    figures.push(fig);
}

document.onmousemove = (e) => {
    
    if(!mouseDown) return;

    fig.points.push(new Point(e.clientX * resMod, e.clientY * resMod, i++));
    fig.draw();
}