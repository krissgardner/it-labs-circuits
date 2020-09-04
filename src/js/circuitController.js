/**
 * CIRCUITS API
 */

import Ciruit from './models/Circuit';
import Line from './models/Line';
import * as lineView from './views/lineView';
import { domStrings } from './models/base';


const canvasResize = (circuit) => {
    circuit.getCanvasSize();
    circuit.setCanvasSize();
}

export const getData = (list, circuit) => {
    const lines = [];
    list.forEach(obj => {
        let newLine = new Line(obj.points, obj.color, obj.lineWidth);
        newLine.getMappedPoints(circuit.width, circuit.height, circuit.scale.x, circuit.scale.y);
        lines.push(newLine);
    });
    return lines;
};

export const resize = (circuit) => {
    canvasResize(circuit);
    lineView.drawStatic(circuit);

    circuit.dynamicLines.forEach(line => {
        line.getMappedPoints(circuit.width, circuit.height, circuit.scale.x, circuit.scale.y);
        line.calcPath();
    });
    circuit.pathLen = circuit.calcMaxPathLength();
};

export const updateBackground = (currentCircuit) => {
    let bgElem = currentCircuit.circuit.querySelector(domStrings.circuitBackground);
    const check = !bgElem 
    if (check) {
        bgElem = document.createElement('div');
        bgElem.classList.add(domStrings.circuitBackground);
        currentCircuit.circuit.append(bgElem);
    }
    bgElem.style.backgroundColor = currentCircuit.bgColor;
}

export const create = (params) => {
    let currentCircuit;
    try {
        // Setup
        if(params.id) {
            currentCircuit = new Ciruit(params.id, params.backgroundColor ? params.backgroundColor : '#fff');
        } else throw 'Missing or invalid ID';
        
        // Get canvas child
        currentCircuit.getCanvas();

        // Check for custom scale
        currentCircuit.scale = params.scale ? params.scale : {x: 100, y: 100};
        
        updateBackground(currentCircuit);

        if(params.data) {
            // Create static lines
            currentCircuit.staticLines = getData(params.data.staticData, currentCircuit);

            // Create dynamic lines
            currentCircuit.dynamicLines = getData(params.data.dynamicData, currentCircuit);
        } else throw 'Missing points data';
    
    } catch(error) {
        console.log(error);
    }
    

    // Get context of current canvas
    currentCircuit.context = currentCircuit.canvas.getContext('2d');

    resize(currentCircuit);
    window.addEventListener('resize', () => resize(currentCircuit));

    // Magic
    lineView.drawStatic(currentCircuit);
    lineView.drawDynamic(currentCircuit);
};