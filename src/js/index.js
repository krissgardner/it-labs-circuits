/**
 * MAIN APP CONTROLLER
 */

import Ciruit from './models/Circuit';

let circuits = [];
document.querySelectorAll('.circuits').forEach(el => {
    let cur = new Ciruit(el.id);
    cur.getCanvas();
    circuits.push(cur);
});

const init = () => {
    circuits.forEach(el => {
        el.getCanvasSize();
        el.setCanvasSize();
    });
}

// Add event listener
window.onresize = init;

init();


// Dev testing