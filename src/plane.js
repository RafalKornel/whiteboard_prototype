class Plane {
    constructor(fps, resolutionModifier) {
        this.figures = [];
        this.activeFigures = [];
        this.i = 0;
        this.resMod = resolutionModifier;
        this.center = new Point(canvas.width/2, canvas.height/2, 0);
        this.width = 0;
        this.height = 0;
        this.prevCenter = this.center;

        this.maxResMod = 2;
        this.minResMod = 0.5;
    }

    mouseToGlobal(e) {
        /* Returns mouse position in new coordinate system, 
         * that is relative to plane's center property,   
         * which can be modified */

        let pos = new Point(e.clientX, e.clientY, -1);

        return this.localToGlobal(pos);
    }

    mouseToLocal(e) {
        /* Returns mouse position in local coordinate 
         * system, that is relative to window.  */

        return new Point(e.clientX, e.clientY, -1);
    }

    globalToLocal(p) {
        /* Conversion between coordinate systems, 
         * maps global (relative to abstract origin point - this.center) 
         * to local (relative to window origin) */

        let newP = new Point( (p.x + this.center.x)/this.resMod , (p.y + this.center.y)/this.resMod , p.i);
        return newP;
    }

    localToGlobal(p) {
        /* Conversion between coordinate systems, 
         * maps local (relative to window) point to 
         * global coordinate system */

        let newP = new Point( p.x * this.resMod - this.center.x, p.y * this.resMod - this.center.y, p.i);
        return newP;
    }

    addFigure(fig) {
        this.figures.push(fig);
    }

    drawFigures() {
        for (let i in this.figures) {
            this.draw(this.figures[i]);
        }
    }

    redrawFigures() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        

        for (let i in this.figures) {
            this.draw(this.figures[i]);
        }
    }   

    draw(fig) {
        if (fig.points.length < 2) {
            this.drawPoint(fig.points[0]); 
            return;
        }

        let P0 = new Point( (fig.points[0].x), (fig.points[0].y), fig.points[0].i);
        let P1 = new Point( (fig.points[1].x), (fig.points[1].y), fig.points[1].i);
        let midPoint;

        c.moveTo(P0.x, P0.y);
        c.beginPath();


        for (let i = 2; i < fig.points.length - 1; i++) {

            midPoint = new Point( P0.x + (P1.x - P0.x)/2, P0.y + (P1.y - P0.y)/2, (P0.i + P1.i)/2);

            let P0Loc = this.globalToLocal(P0);
            let midPointLoc = this.globalToLocal(midPoint);

            c.quadraticCurveTo(P0Loc.x, P0Loc.y, midPointLoc.x, midPointLoc.y);
            c.moveTo(midPointLoc.x, midPointLoc.y);

            P0 = P1;
            P1 = new Point( (fig.points[i].x), (fig.points[i].y), fig.points[i].i);
        }
        
        c.stroke();
    }

    drawPoint(p) {
        let pLoc = this.globalToLocal(p);
        let w = 10;
        c.fillStyle = "#ff0000"

        c.fillRect(pLoc.x - w/2, pLoc.y - w/2, w, w);
    }

    /*  // dont use it its bugged
    drawCenterPoint() {
        let pointFig = new Figure("point", 1);
        pointFig.points = [this.center];
        this.draw(pointFig);
    } */

    getClosestFigure(x, y) {

    }

    setInitialCenter() {
        this.center = new Point(canvas.width/2, canvas.height/2, -1);
    }

    updateCenter() {
        let pos = this.globalToLocal(new Point(0, 0, -1));
        this.center = pos;
    }

    updateDiameters() {
        this.width = canvas.width;
        this.height = canvas.height;
    }

    setCenter(pos) {
        this.center = pos;
        this.prevCenter = this.center;
    } 
}




/* 


    drawGrid() {
        let i_max = canvas.width % 100;
        let j_max = canvas.height % 100;

        c.strokeWidth = 0.1;

        for (let i = 0; i < i_max; i++) {
            let P0 = new Point( (i - i_max/2) * 100, 0,              i);
            let P1 = new Point( (i - i_max/2) * 100, canvas.height,  i);

            let fig = new Figure("line", this.resMod, 1);
            fig.addPoint(P0);
            fig.addPoint(P1);
            this.figures.push(fig);
            this.draw(fig);
        }

        for (let j = 0; j < j_max; j++) {
            let P0 = new Point(0,              (j - j_max/2) * 100, j);
            let P1 = new Point(canvas.width,   (j - j_max/2) * 100, j);

            let fig = new Figure("line", this.resMod, 1);
            fig.addPoint(P0);
            fig.addPoint(P1);
            this.figures.push(fig);
            this.draw(fig);
        }
    }

    */