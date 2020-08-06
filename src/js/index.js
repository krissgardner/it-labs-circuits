/**
 * MAIN APP CONTROLLER
 */

import Ciruit from './models/Circuit';
import Line from './models/Line';
import * as data from './models/Data';
import * as lineView from './views/lineView';
import circuit from './models/Circuit';

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



/**
 * CIRCUIT 0 CONTROLLER
 */

// Circuit that will be used
const circuit0 = circuits[0];

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

circuit0.scale = scale;

const getData = (list) => {
    const lines = [];
    list.forEach(obj => {
        let newLine = new Line(obj.points, obj.color, obj.lineWidth);
        newLine.getMappedPoints(circuit0.width, circuit0.height, scale.x, scale.y);
        lines.push(newLine);
    });
    return lines;
};

// Probably should be added to the class

// Create static lines
circuit0.staticLines = getData(data.staticData);

// Create dynamic lines
circuit0.dynamicLines = getData(data.dynamicData);

// Get context of current canvas
circuit0.context = circuit0.canvas.getContext('2d');



const resize = (circuit) => {
    canvasResize();
    lineView.drawStatic(circuit);

    circuit.dynamicLines.forEach(line => {
        line.getMappedPoints(circuit.width, circuit.height, circuit.scale.x, circuit.scale.y);
        line.calcPath();
    });
    circuit.pathLen = circuit.calcMaxPathLength();
}

resize(circuit0);

window.addEventListener('resize', () => resize(circuit0));



/**
 * PAINTING STATIC PART
 */

lineView.drawStatic(circuit0);

/**
 * PAINTING DYNAMIC PART
 */

lineView.drawDynamic(circuit0);



