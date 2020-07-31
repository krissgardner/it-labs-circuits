export default class circuit {

    constructor (id) {
        this.circuit = document.getElementById(id);
    }
    
    getCanvasSize() {
        const width = window.innerWidth;
        const gridSize = this.circuit.querySelector('.circuits__container').clientHeight;
        // Expecting less content than there should be
        const height = Math.max(500, gridSize);
        
        this.width = width;
        this.height = height;
    }
    
    setCanvasSize() {
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
    }

    getCanvas() {
        this.canvas = this.circuit.querySelector('.circuits__canvas');
    }
}