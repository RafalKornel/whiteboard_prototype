class Point {
    constructor(x, y, i) {
        this.x = x;
        this.y = y;
        this.i = i;
    }

    add(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
        //this.i = (this.i + p.i)/2;
    }

    subtract(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
        //this.i = (this.i + p.i)/2;
    }
}