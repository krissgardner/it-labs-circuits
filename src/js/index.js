/**
 * MAIN APP CONTROLLER
 */

import Ciruit from './models/Circuit';
import Line from './models/Line';

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

// Create static lines
[
    [
        {x:100, y:50}, 
        {x: 90, y: 50}, 
        {x:80, y:40}
    ],
    // [
    //     {x:100, y:49}, 
    //     {x: 90, y: 49}, 
    //     {x:80, y:39}
    // ],
    // [
    //     {x:100, y:48}, 
    //     {x: 90, y: 48}, 
    //     {x:80, y:38}
    // ],
    // [
    //     {x:100, y:47}, 
    //     {x: 90, y: 47}, 
    //     {x:80, y:37}
    // ],
].forEach(line => {
    let newLine = new Line(line);
    newLine.getMappedPoints(circuit0.width, circuit0.height, scale.x, scale.y);
    staticLines.push(newLine);
});

// Create dynamic lines

[
    [
        {x:0, y:50}, 
        {x: 10, y: 50}, 
        {x:20, y:40}
    ],
    // [
    //     {x:0, y:49}, 
    //     {x: 10, y: 49}, 
    //     {x:20, y:39}
    // ],
    // [
    //     {x:0, y:48}, 
    //     {x: 10, y: 48}, 
    //     {x:20, y:38}
    // ],
    // [
    //     {x:0, y:47}, 
    //     {x: 10, y: 47}, 
    //     {x:20, y:37}
    // ],
].forEach(line => {
    let newLine = new Line(line);
    newLine.getMappedPoints(circuit0.width, circuit0.height, scale.x, scale.y);
    dynamicLines.push(newLine);
});

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

