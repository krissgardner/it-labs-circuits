/**
 * MAIN APP CONTROLLER
 */

import Ciruit from './models/Circuit';
import Line from './models/Line';
import * as data from './models/Data';

let circuits = [];
document.querySelectorAll('.circuits').forEach(el => {
    let cur = new Ciruit(el.id);
    cur.getCanvas();
    circuits.push(cur);
});

const canvasResize = () => {
    circuits.forEach(el => {
        el.getCanvasSize();
        el.setCanvasSize();
    });
}


canvasResize();
window.addEventListener('resize', canvasResize);



/**
 * CIRCUIT 0 CONTROLLER
 */

/**
 * DATA SETUP
 */

// This creates a grid for the canvas of 100 / 100
// Easier to map points and generates a responsive canvas
// + Could be used in future for ajustments such as zooming in or out
let scale = {
    x: 100,
    y: 100
};

// Circuit that will be used
const circuit0 = circuits[0];

let staticLines = [], dynamicLines = [];

const getData = (list) => {
    const lines = [];
    list.forEach(obj => {
        let newLine = new Line(obj.points);
        newLine.getMappedPoints(circuit0.width, circuit0.height, scale.x, scale.y);
        lines.push(newLine);
    });
    return lines;
};

// Create static lines
staticLines = getData(data.staticData);

// Create dynamic lines
dynamicLines = getData(data.dynamicData);

// Get context of current canvas
const context = circuit0.canvas.getContext('2d');



/**
 * PAINTING STATIC PART
 */

const drawStatic = () => {
    staticLines.forEach(line => {
        line.getMappedPoints(circuit0.width, circuit0.height, scale.x, scale.y);
        line.drawLine(context);
        line.drawCircle(context);
    });
};

drawStatic();
window.addEventListener('resize', drawStatic);


/**
 * PAINTING DYNAMIC PART
 */
const drawDynamic = () => {
    context.beginPath();

    dynamicLines.forEach(line => {
        line.getMappedPoints(circuit0.width, circuit0.height, scale.x, scale.y);
        line.drawLine(context);
        line.drawCircle(context);
    });

    context.closePath();
};

circuit0.circuit.addEventListener('mouseover', () => {
    drawDynamic();
});

circuit0.circuit.addEventListener('mouseout', () => {
    context.clearRect(0, 0, circuit0.width, circuit0.height);
    drawStatic();
});

