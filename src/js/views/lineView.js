import Line from '../models/Line';

const delay = 4;

// could be async
let mouseState = 0, isRunning = 0, progress = 0;


export const drawStatic = (activeCircuit) => {
    activeCircuit.staticLines.forEach(line => {
        line.getMappedPoints(activeCircuit.width, activeCircuit.height, activeCircuit.scale.x, activeCircuit.scale.y);
        line.drawLine(activeCircuit.context);
        line.drawCircle(activeCircuit.context);
    });
};



const paintProgress = (activeCircuit, max) => {
    let ctx = activeCircuit.context, linepos;

    ctx.beginPath();
    ctx.lineCap = 'round'; // Maybe add to struct

    
    for (const line of activeCircuit.dynamicLines) {
        const path = line.path;

        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.lineWidth;

        linepos = progress;
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

    // Update progress
    progress++;
    console.log('paint ' + progress);

    if (mouseState) {
        ctx.stroke();
    }

    ctx.closePath();

    if (mouseState && progress < max) {
        setTimeout(() => paintProgress(activeCircuit, max), delay);
    } else {
        isRunning = 0;
    }
}



const reverseProgress = (activeCircuit) => {
    if (progress != 0 && !mouseState) {

        // Reset canvas and prep for dyn
        activeCircuit.context.clearRect(0, 0, activeCircuit.width, activeCircuit.height);
        drawStatic(activeCircuit);

        // Draw and shorten progress
        // for (const line of activeCircuit.dynamicLines) {
        //     // const context = activeCircuit.context;
        //     // context.beginPath();
        //     // context.strokeStyle = line.color;
        //     // context.lineWidth = line.lineWidth;
        //     // context.lineCap = 'round';

        //     // context.moveTo(pts[0].x, pts[0].y);
        //     // for(let i = 1; i < progress && i < line.path.length; i++){
        //     //     context.lineTo(pts[i].x, pts[i].y);
        //     // }
            
        //     // context.stroke();
        //     // context.closePath();
        //     line.drawLine(activeCircuit.context, progress);
        //     if (line.path[progress - 1] && !line.path[progress]) {
        //         line.drawCircle(activeCircuit.context);
        //     }
        // }

        // Update progress
        progress--;
        console.log('reverse ' + progress);

        setTimeout(() => reverseProgress(activeCircuit), delay);
    }
};



const calcMaxPoints = (activeCircuit) => {
    let max = activeCircuit.dynamicLines.reduce((acc, cur) => {
        return Math.max(acc, cur.path.length);
    }, 0);
    return max;
};

export const drawDynamic = (activeCircuit) => {

    let maxPoints = calcMaxPoints(activeCircuit);

    activeCircuit.circuit.addEventListener('mouseover', () => {
        mouseState = 1;
        if(!isRunning && progress < maxPoints) {
            isRunning = 1;
            paintProgress(activeCircuit, maxPoints);
        }
    });

    // Custom mouseout to prevent events when moving mouse over children
    const onMouseOut = (e) => {
        let circuit = e.relatedTarget.closest('.circuits');
        if(!circuit) {
            mouseState = 0;
            reverseProgress(activeCircuit);
        }
    }

    document.querySelector('body').addEventListener('mouseout', onMouseOut);
}