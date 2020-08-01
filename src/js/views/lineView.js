import Line from '../models/Line';

// mouseover => 1; mouseout => 0
let mouseState = 0, isRunning = 0;

export const drawStatic = (activeCircuit) => {
    activeCircuit.staticLines.forEach(line => {
        line.getMappedPoints(activeCircuit.width, activeCircuit.height, activeCircuit.scale.x, activeCircuit.scale.y);
        line.drawLine(activeCircuit.context);
        line.drawCircle(activeCircuit.context);
    });
};

const animatePath = (activeCircuit, pos) => {
    let ctx = activeCircuit.context;

    ctx.beginPath();
    ctx.strokeStyle = activeCircuit.dynamicLines[0].color;
    ctx.lineWidth = activeCircuit.dynamicLines[0].lineWidth;
    ctx.lineCap = 'round';

    for (const line of activeCircuit.dynamicLines) {
        const path = line.path;

        if (path[pos] && path[pos + 1]) {
            ctx.moveTo(path[pos].x, path[pos].y);
            pos++;
            ctx.lineTo(path[pos].x, path[pos].y);
        }
    }

    if (mouseState) {
        ctx.stroke();
        ctx.closePath();
        setTimeout(() => animatePath(activeCircuit, pos), 4);
    } else {
        isRunning = 0;
    }
}

export const drawDynamic = (activeCircuit) => {

    activeCircuit.circuit.addEventListener('mouseover', () => {
        mouseState = 1;
        let pos = 0;
        if(!isRunning) {
            isRunning = 1;
            animatePath(activeCircuit, pos);
        }
    });

    // Custom mouseout to prevent events when moving mouse over children
    const onMouseOut = (e) => {
        let circuit = e.relatedTarget.closest('.circuits');
        if(!circuit) {
            mouseState = 0;
            activeCircuit.context.clearRect(0, 0, activeCircuit.width, activeCircuit.height);
            drawStatic(activeCircuit);
        }
    }

    document.querySelector('body').addEventListener('mouseout', onMouseOut);
}