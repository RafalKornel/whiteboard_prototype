class Figure {
    constructor(type, resMod = 1, width = 3) {
        this.points = [];
        this.type = type;
        this.strokeWidth = width;
        this.i = 0;
        this.resMod = resMod
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

    drawPoint1(o, p = null) {
       /* This function draws 'point', which is
        * basically very small square */
       
        let w = this.strokeWidth;
        //c.fillStyle = "#ff0000";
        
        if (p) {
            c.fillRect(o.x + p.x - w/2, o.y + p.y - w/2, w, w)
            return
        }

        c.fillRect(o.x + this.points[this.points.length - 1].x - w/2, o.y + this.points[this.points.length - 1].y - w/2, w, w)
    }
}