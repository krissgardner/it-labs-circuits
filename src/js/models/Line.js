export default class Line {

    constructor(points) {
        this.points = points;
    }

    getMappedPoints(canvasX, canvasY, scaleX, scaleY) {
        let mappedPoints = [];
        this.points.forEach(point => {
            mappedPoints.push({
                x: point.x / scaleX * canvasX,
                y: point.y / scaleY * canvasY
            });
        });
        this.mappedPoints = mappedPoints;

        return mappedPoints;
    }

    drawLine(context) {
        const pts = this.mappedPoints;

        if (pts.length > 1) {
            context.beginPath();
            context.moveTo(pts[0].x, pts[0].y);
            for(let i = 1; i < pts.length; i++) {
                context.lineTo(pts[i].x, pts[i].y);
            }
            context.stroke();
            context.closePath();
        }
    }
}