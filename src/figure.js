class Figure {
    constructor(type, width = 3) {
        this.points = [];
        this.type = type;
        this.strokeWidth = width;
        this.i = 0;
        this.edgePoints = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        }
    }

    addPoint(p) {
        this.points.push(p);
    }

    draw(o = {x:0, y:0}) {
       /* Draws smooth curve between two latest points added to points stack, 
        * or one point if only clicked. Uses bezier quadratic curve function 
        * built in html canvas.
        */

        c.lineWidth = this.strokeWidth;

        
        if (this.points.length == 1) {
            c.beginPath();
            c.moveTo(o.x + this.points[0].x, o.y + this.points[0].y)
            this.drawPoint(o);
        } 

        else {
            let lp = this.points.slice(this.points.length-2); // lp -> lastPoints
            lp = [ {x:lp[0].x + o.x, y:lp[0].y + o.y}, {x:lp[1].x + o.x, y:lp[1].y + o.y}]
            let pMid = new Point(lp[0].x + (lp[1].x-lp[0].x)/2,lp[0].y + (lp[1].y - lp[0].y)/2, (lp[0].i + lp[1].i)/2 );
            c.quadraticCurveTo(lp[0].x,lp[0].y,pMid.x,pMid.y);
            c.moveTo(pMid.x, pMid.y);
            c.stroke();
        }
    }

    drawPoint(o) {
       /* This function draws 'point', which is
        * basically very small square
        */
       
        let w = this.strokeWidth;
        
        //c.fillStyle = "#ff0000"

        c.fillRect(o.x + this.points[this.points.length - 1].x - w/2, o.y + this.points[this.points.length - 1].y - w/2, w, w)
        /*
        c.beginPath();
        c.arc(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y, w/4, 0, Math.PI*2);
        c.fillStyle = "#000000";
        c.strokeWidth = this.strokeWidth;
        c.fill();
        */
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

    drawFigure(o = {x: 0, y: 0}) {
       /* Redraws whole figure, can be useful when needed to
        * draw figure from file or json
        */

        c.moveTo(0, 0);
        let newStack = this.points;
        this.points = [];
        for (let i in newStack) {
            this.points.push(newStack[i]);
            this.draw(o);
        }
    }
}