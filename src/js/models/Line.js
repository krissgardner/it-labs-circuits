export default class Line {

    constructor(points, color = '#264f83', lineWidth = 3) {
        this.points = points;
        this.color = color;
        this.lineWidth = lineWidth;
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

    drawLine(context, src = 'mappedPoints', restrict = 9999) {
        const pts = this[src];

        if (pts.length > 1) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = this.lineWidth;
            context.lineCap = 'round';

            context.moveTo(pts[0].x, pts[0].y);
            for(let i = 1; i < pts.length && i < restrict; i++) {
                context.lineTo(pts[i].x, pts[i].y);
            }

            context.stroke();
            context.closePath();
        }
    }

    drawCircle(context, src = 'mappedPoints') {
        const pts = this[src];
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;

        const x = pts[pts.length - 1].x,
            y = pts[pts.length - 1].y;
        const rad = this.lineWidth * 2;

        context.arc(x, y, rad, 0, 2 * Math.PI);
        context.fillStyle = '#fff';
        context.fill();
        context.stroke();
        context.closePath();
    }

    calcPath() {
        const path = [];
        const mapped = this.mappedPoints;

        if (mapped.length > 1) {
            for(let i = 1; i < mapped.length; i++) {
                let xOffset, yOffset, dist, intervals;
    
                xOffset = mapped[i].x - mapped[i - 1].x;
                yOffset = mapped[i].y - mapped[i - 1].y;
                
                // Number of points to generate in a line
                // Next point is 3 px apart by default
                dist = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
                intervals = Math.floor(dist / 5);

                for(let j = 0; j < intervals; j++) {
                    path.push({
                        x: mapped[i - 1].x + xOffset * j / intervals,
                        y: mapped[i - 1].y + yOffset * j / intervals
                    });
                }

                this.path = path;
            }
        }//if
    }
}