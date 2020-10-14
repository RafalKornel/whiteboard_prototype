// DOM bindings
const canvas    = document.querySelector("canvas");
const clearBtn  = document.querySelector("#clear");
const redrawBtn = document.querySelector("#redraw");
const modes     = document.querySelector("#modes");


// Variables
const c     = canvas.getContext("2d");
const plane = new Plane(30, 1);

var control         = true;
var curentMode      = modes.options[modes.selectedIndex].value;
var mouseDown       = false;
var fig             = new Figure("line");
var initMouseCoords = new Point(0, 0, -1);
var frameCount      = 0;

function setCanvasDiameters() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initializeCanvas() {
    setCanvasDiameters();
    plane.updateCenter();
    plane.updateDiameters();
}

initializeCanvas();


// Events
window.onresize = () => {
    setCanvasDiameters();
    plane.updateDiameters();
    plane.updateCenter();
    plane.redrawFigures();
}

clearBtn.onclick = () => { c.clearRect(0, 0, canvas.width, canvas.height); }
redrawBtn.onclick = () => { 
    plane.redrawFigures();
}

modes.onchange = () => {
    curentMode = modes.options[modes.selectedIndex].value;
}


// Mouse events
canvas.onmousedown = (e) => {
    mouseDown = true;
    let pos = plane.mouseToGlobal(e)
    console.log("down")
    console.log(pos);

    if (curentMode == "draw") {
        fig = new Figure("line", plane.resMod);    
        
        fig.addPoint(new Point(pos.x, pos.y, fig.i++))
        plane.draw(fig);

    }
    else if (curentMode == "select") {
        console.log("selecting");
        initMouseCoords = pos;
    }
}


document.onmouseup = () => {
    mouseDown = false;
    console.log('up');

    if (curentMode == "draw") { 
        plane.addFigure(fig);
    }
}


document.onmousemove = (e) => {
    
    if(!mouseDown) return;
    
    //console.log(curentMode);
    let pos = plane.mouseToGlobal(e);

    if (curentMode == "draw") {
        fig.addPoint(new Point(pos.x, pos.y, fig.i++));
        plane.draw(fig);
    }

    else if (curentMode == "select") {
        let relative = new Point(pos.x - initMouseCoords.x, pos.y - initMouseCoords.y, -1);
        let newCenter = new Point(relative.x + plane.prevCenter.x, relative.y + plane.prevCenter.y, -1);
        plane.setCenter(newCenter);
        plane.redrawFigures();
    }

    frameCount++;
}


window.onwheel = (e) => {

    let prevPos = plane.mouseToGlobal(e);

    plane.resMod -= e.deltaY/100;
    if (plane.resMod < plane.minResMod) { plane.resMod = 0.5}
    if (plane.resMod > plane.maxResMod) { plane.resMod = 2  }

    let curPos = plane.mouseToGlobal(e);
    let diff   = curPos.subtract(prevPos);

    plane.setCenter(plane.center.add(diff));

    plane.redrawFigures();

}