import { V } from 'jointjs';
import { pixelsToInches } from '../helpers/internalUnits.mjs';
import { VisioCellName } from '../types/enums.mjs';

export default function pathToGeometryRows(path, matrix) {

    const rows = [];

    path.segments.forEach(segment => {
        let type;
        let points = [V.transformPoint(segment.end, matrix)];
        switch (segment.type) {
            case 'M':
                type = 'MoveTo';
                break;
            case 'L':
            case 'Z':
                type = 'LineTo';
                break;
            case 'C':
                type = 'LineTo';
                points = segment.toPoints();

                points.forEach((point, index) => {
                    points[index] = V.transformPoint(point, matrix);
                });
                break;
        }

        // TODO: extract this
        // creating a Visio cell can be a helper function
        points.forEach(point => {
            rows.push({
                '@IX': (rows.length + 1).toString(),
                '@T': type,
                Cell: [
                    { '@N': VisioCellName.X, '@V': pixelsToInches(point.x).toString() },
                    { '@N': VisioCellName.Y, '@V': pixelsToInches(point.y).toString() }
                ]
            });
        });
    });

    return rows;
}
