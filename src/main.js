var control = true;
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const clearBtn = document.querySelector("input");
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


class Figure {
    constructor(type, width = 10) {
        this.points = [];
        this.type = type;
        this.strokeWidth = width;
    }

    draw() {
        let last = this.points[this.points.length-1];

        if (last.i == 0) {
            this.drawPoint();
        }
        else if (last.i % 2 == 0) {
            this.drawBezier(2);
        }
    }

    drawPoint() {
       /* This function draws 'point', which is
        * basically very small square
        */
       
        c.beginPath();
        let w = this.strokeWidth;

        c.fillRect(this.points[this.points.length - 1].x - w/2, this.points[this.points.length - 1].y - w/2, w, w)
    }

    drawLine(P0 = null, P1 = null) {
       /* This function draws a line between two specified 
        * in argument points. If the function is called without 
        * arguments, then it will draw line between most recent
        * points contained in this.points
        */


        c.beginPath();
        c.lineWidth = this.strokeWidth;

        if (P0 == null || P1 == null) {
            P0 = this.points[this.points.length - 2];
            P1 = this.points[this.points.length - 1];
        }

        c.moveTo(P1.x, P1.y);
        c.lineTo(P0.x, P0.y);
        c.stroke();

    }

    drawBezier(degree = 2) {
       /* this function draws bezier curve, with given degree
        * NOTE: only degree of 2 and 3 works at the time, you also
        *       have to change method used to calculate poins 
        *       (this.bezierQuadratic / this.bezierCubic)
        */

        let quality = 4;            //controls how fine the curve is drawn
        let tempPoints = [];
        let P = this.points.slice(-1*(degree + 1)); 

        for (let i = 0; i <= quality; i++) {
            let b = this.bezierQuadratic(P, i/quality);
            tempPoints.push(new Point(b[0], b[1], i));
        }

        c.beginPath();
        c.lineWidth = this.strokeWidth;

        for (let i = 0; i < tempPoints.length - 1; i++) {
            this.drawLine(tempPoints[i], tempPoints[i+1]);
        }

    }

    bezierQuadratic(P, t) {
       /* Calculates value of quadratic Bezier curve in 
        * point t, which should be : 0 <= t <= 1
        */
       
        let x = P[1].x + (1-t)**2 * (P[0].x - P[1].x) + t**2 * (P[2].x - P[1].x);
        let y = P[1].y + (1-t)**2 * (P[0].y - P[1].y) + t**2 * (P[2].y - P[1].y);
        return [x, y];
    }

    bezierCubic(P, t) {
       /* Calculates value of quadratic Bezier curve in 
       * point t, which should be : 0 <= t <= 1
       * TODO: rewrite function so it works without 
       * referencing lower order bezier curve function
       */

        let bezier012 = this.bezierQuadratic([P[0], P[1], P[2]], t);
        let bezier123 = this.bezierQuadratic([P[1], P[2], P[3]], t);
        let x = bezier012[0] * (1 - t) + bezier123[0] * t;
        let y = bezier012[1] * (1 - t) + bezier123[1] * t;

        return [x, y];
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
    i = 0;
    fig.draw();
    figures.push(fig);
}

document.onmousemove = (e) => {

    if (mouseDown) {
        fig.points.push(new Point(e.clientX * resMod, e.clientY * resMod, i++));
        fig.draw();
    }
}



/* 


    drawBezierQuadratic() {
        // this function draws curve between three points, making it smooth

        let maxI = 10;         //controls how fine the curve is
        let tempPoints = [];
        let P0 = this.points[this.points.length-3];
        let P1 = this.points[this.points.length-2];
        let P2 = this.points[this.points.length-1];

        for (let i = 0; i <= maxI; i++) {
            let t = i/maxI;
            let b = this.bezierQuadratic(P0, P1, P2, t);
            tempPoints.push(new Point(b[0], b[1], i));
        }

        c.beginPath();
        c.lineWidth = this.strokeWidth;

        for (let i = 0; i < tempPoints.length - 1; i++) {
            c.moveTo(tempPoints[i+1].x, tempPoints[i+1].y);
            c.lineTo(tempPoints[i].x, tempPoints[i].y)
            c.stroke();
        }
    }

    drawBezierCubic() {
        // this function draws quadratic bezier curve between two points, using interpolation to calc midpoint
        let maxI = 10;         //controls how fine the curve is
        let tempPoints = [];
        let P0 = this.points[this.points.length-4];
        let P1 = this.points[this.points.length-3];
        let P2 = this.points[this.points.length-2];
        let P3 = this.points[this.points.length-1];

        for (let i = 0; i <= maxI; i++) {
            let t = i/maxI;
            let b = this.bezierCubic(P0, P1, P2, P3, t);
            tempPoints.push(new Point(b[0], b[1], i));
        }

        c.beginPath();
        c.lineWidth = this.strokeWidth;

        for (let i = 0; i < tempPoints.length - 1; i++) {
            c.moveTo(tempPoints[i+1].x, tempPoints[i+1].y);
            c.lineTo(tempPoints[i].x, tempPoints[i].y)
            c.stroke();
        }

    }

    */