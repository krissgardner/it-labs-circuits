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

    drawLine(context) {
        const pts = this.mappedPoints;

        if (pts.length > 1) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = this.lineWidth;

            context.moveTo(pts[0].x, pts[0].y);
            for(let i = 1; i < pts.length; i++) {
                context.lineTo(pts[i].x, pts[i].y);
            }

            context.stroke();
            context.closePath();
        }
    }

    drawCircle(context) {
        const pts = this.mappedPoints;

        if (pts.length > 1) {
            const between = (x, min, max) => x >= min && x <= max;

            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = this.lineWidth;

            let x1, x2, x3, y1, y2, y3, alpha;
            const rad = this.lineWidth * 2;

            [x2, y2] = [pts[pts.length - 1].x, pts[pts.length - 1].y];
            [x1, y1] = [pts[pts.length - 2].x, pts[pts.length - 2].y];

            alpha = Math.atan((y2 - y1) / (x2 - x1));

            x3 = x2 + rad * Math.cos(alpha);
            if(between(x3, x1, x2) || between(x3, x2, x1)) {
                x3 = x2 - rad * Math.cos(alpha);
            }
            y3 = y2 + rad * Math.sin(alpha);
            if(between(y3, y1, y2) || between(y3, y2, y1)) {
                y3 = y2 - rad * Math.sin(alpha);
            }

            context.arc(x3, y3, rad, 0, 2 * Math.PI);

            context.stroke();
            context.closePath();
        }
    }

    calcPath(speed = 1) {
        const path = [];
        const mapped = this.mappedPoints;

        if (mapped.length > 1) {
            for(let i = 1; i < mapped.length; i++) {
                let xOffset, yOffset, dist, intervals;
    
                xOffset = mapped[i].x - mapped[i - 1].x;
                yOffset = mapped[i].y - mapped[i - 1].y;
                
                // Number of points to generate in a line
                // Next point is 5 px apart by default
                dist = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
                intervals = Math.floor(dist / (5 * speed));
    
                for(let j = 0; j < intervals; j++) {
                    path.push({
                        x: mapped[i - 1].x + xOffset * j / intervals,
                        y: mapped[i - 1].y + xOffset * j / intervals
                    });
                }
            }

            this.path = path;
        }//if
    }

}