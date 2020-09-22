// DOM bindings
const canvas    = document.querySelector("canvas");
const clearBtn  = document.querySelector("#clear");
const redrawBtn = document.querySelector("#redraw");
const modes     = document.querySelector("#modes");

// Variables
const c = canvas.getContext("2d");
var control = true;
var curentMode = modes.options[modes.selectedIndex].value;
const plane = new Plane(30, 1);
const deltaTime = 1000/plane.fps;
var mouseDown = false;
var fig = new Figure("line");
var initMouseCoords = {x:0, y:0}
var frameCount = 0;

function setSize() {
    canvas.width = window.innerWidth  * plane.resMod;
    canvas.height = window.innerHeight  * plane.resMod;
    plane.updateCenter();
}

setSize();

// Events
window.onresize = setSize;
clearBtn.onclick = () => { c.clearRect(0, 0, canvas.width, canvas.height); }
redrawBtn.onclick = () => { 
    plane.drawFigures();
}

modes.onchange = () => {
    curentMode = modes.options[modes.selectedIndex].value;
}

// Mouse events
document.onmousedown = (e) => {
    mouseDown = true;
    let pos = plane.mousePosition(e)
    console.log("down")
    console.log(pos);

    if (curentMode == "draw") {
        fig = new Figure("line");    
        
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
    let pos = plane.mousePosition(e)

    if (curentMode == "draw") {
        fig.points.push(new Point(pos.x, pos.y, fig.i++));
        plane.draw(fig);
    }

    else if (curentMode == "select") {
        //console.log(plane.center);
        let relative = {x:pos.x - initMouseCoords.x, y:pos.y - initMouseCoords.y};
        let newCenter = {x: relative.x + plane.initCenter.x, y: relative.y + plane.initCenter.y};
        plane.setCenter(newCenter);
        c.clearRect(0, 0, canvas.width, canvas.height);
        plane.drawFigures();
    }

    frameCount++;
}


/*
window.onwheel = (e) => {
    console.log(e.deltaY)
    plane.resMod += e.deltaY/100;
}*/