class Plane {
    constructor(fps, resolutionModifier) {
        this.figures = [];
        this.activeFigures = [];
        this.i = 0;
        this.fps = fps;
        this.resMod = resolutionModifier;
        this.center = { x: canvas.width/2,
                        y: canvas.height/2};
        this.initCenter = this.center;

        this.maxResMod = 2;
        this.minResMod = 0.5;
    }

    mousePosition(e) {
        /* Returns mouse position in new coordinate system, 
         * that is relative to plane's center property,   
         * which can be modified
         */

        return {x: e.clientX * this.resMod - this.center.x,
                y: e.clientY * this.resMod - this.center.y}
    }

    addFigure(fig) {
        this.figures.push(fig);
    }

    drawFigures() {
        for (let i in this.figures) {
            this.draw(this.figures[i]);
            //this.figures[i].drawFigure(this.center);
        }
    }

    redrawFigures() {
        c.clearRect(0, 0, c.widht, c.height);
        for (let i in this.figures) {
            this.draw(this.figures[i]);
            //this.figures[i].drawFigure(this.center);
        }
    }   

    draw(fig) {
        if (fig.points.length < 2) return fig.drawPoint(this.center); 

        let P0 = {x:(fig.points[0].x + this.center.x) , y:(fig.points[0].y + this.center.y), i: fig.points[0].i};
        let P1 = {x:(fig.points[1].x + this.center.x) , y:(fig.points[1].y + this.center.y), i: fig.points[1].i};
        let midPoint;

        c.moveTo(P0.x, P0.y);
        c.beginPath();


        for (let i = 2; i < fig.points.length - 1; i++) {

            midPoint = new Point( P0.x + (P1.x - P0.x)/2, P0.y + (P1.y - P0.y)/2, (P0.i + P1.i)/2);

            c.quadraticCurveTo(P0.x, P0.y, midPoint.x, midPoint.y);
            c.moveTo(midPoint.x, midPoint.y);
            P0 = P1;
            P1 = {x:(fig.points[i].x + this.center.x), y:(fig.points[i].y + this.center.y), i:fig.points[i].i};
        }
        
        c.stroke();
    }

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

    getClosestFigure(x, y) {

    }

    updateCenter() {
        this.center = { x: canvas.width/2,
                        y: canvas.height/2};
    }

    setCenter(pos) {
        this.center = pos;
        this.initCenter = this.center;
    } 
}