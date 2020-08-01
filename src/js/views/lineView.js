

export const drawStatic = (activeCircuit) => {
    activeCircuit.staticLines.forEach(line => {
        line.getMappedPoints(activeCircuit.width, activeCircuit.height, activeCircuit.scale.x, activeCircuit.scale.y);
        line.drawLine(activeCircuit.context);
        line.drawCircle(activeCircuit.context);
    });
};

export const drawDynamic = (activeCircuit) => {
    // mouseover => 1; mouseout => 0
    let mouseState = 0;
    
    activeCircuit.circuit.addEventListener('mouseover', () => {
        mouseState = 1;
        console.log(mouseState);

        activeCircuit.context.clearRect(0, 0, activeCircuit.width, activeCircuit.height);
        //window.requestAnimationFrame(animatePath);
    });

    activeCircuit.circuit.addEventListener('mouseout', () => {
        mouseState = 0;
        console.log(mouseState);

        activeCircuit.context.clearRect(0, 0, activeCircuit.width, activeCircuit.height);
        drawStatic(activeCircuit);
    });


}