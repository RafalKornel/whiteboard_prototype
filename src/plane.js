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
            this.figures[i].drawFigure(this.center);
        }
    }

    draw(fig) {
        fig.draw(this.center);
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