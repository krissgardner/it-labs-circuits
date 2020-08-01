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
    let ctx = activeCircuit.context, linepos;

    ctx.beginPath();
    ctx.strokeStyle = activeCircuit.dynamicLines[0].color;
    ctx.lineWidth = activeCircuit.dynamicLines[0].lineWidth;
    ctx.lineCap = 'round';

    
    for (const line of activeCircuit.dynamicLines) {
        const path = line.path;

        linepos = pos;
        if (path[linepos] && path[linepos + 1]) {
            // Draw line
            ctx.moveTo(path[linepos].x, path[linepos].y);
            linepos++;
            ctx.lineTo(path[linepos].x, path[linepos].y);
        } else if (path[linepos]) {
            // Draw circle
            line.drawCircle(ctx);
        }
    }

    if (mouseState) {
        ctx.stroke();
        ctx.closePath();
        setTimeout(() => animatePath(activeCircuit, pos + 1), 4);
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