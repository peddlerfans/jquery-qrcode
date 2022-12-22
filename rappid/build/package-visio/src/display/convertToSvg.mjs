import { g } from 'jointjs';
import { round } from '../helpers/round.mjs';
import { getBSplinePoints } from './BSpline.mjs';
import { VisioRowType } from '../types/enums.mjs';
import { inchesToPixels } from '../helpers/internalUnits.mjs';

const { sqrt, cos, sin, atan2, abs } = Math;

let lastX = 0;
let lastY = 0;
let spline = null;

export function convertToSvg(rows, { width, height }) {

    const dimensions = { width, height };
    let resultString = '';
    lastX = lastY = 0;
    spline = null;

    rows.forEach(function({ name, cells }, index, dataset) {

        if (index === 0 && name !== VisioRowType.MoveTo) {
            // The first command of an SVG path has to be `M`
            resultString += getMoveTo({ x: 0, y: 0 });
        }

        if (spline) {
            const { points, knots, degree } = spline;
            if (dataset.length === index + 1) {
                // Last Row
                convertRowToSVG(name, cells, dimensions);
                resultString += getSpline(points, knots, degree);
                return;
            } else if(name !== VisioRowType.SplineKnot) {
                // Last Knot
                resultString += getSpline(points, knots, degree);
                spline = null;
            }
        }
        resultString += convertRowToSVG(name, cells, dimensions);
    });

    return resultString;
}

function convertRowToSVG(name, cells, dimensions) {
    // Note: A geometry section that contains an Ellipse or InfiniteLine row should not contain any other rows.
    switch (name) {
        // Absolute
        case VisioRowType.MoveTo:
            return getMoveTo(cells);
        case VisioRowType.LineTo:
            return getLineTo(cells);
        case VisioRowType.ArcTo:
            return getArcTo(cells);
        case VisioRowType.EllipticalArcTo:
            return getEllipticalArcTo(cells);
        case VisioRowType.Ellipse:
            return getEllipse(cells);
        case VisioRowType.InfiniteLine:
            return getInfiniteLine(cells);
        case VisioRowType.SplineStart:
            getSplineStart(cells);
            break;
        case VisioRowType.SplineKnot:
            getSplineKnot(cells);
            break;
        // Relative
        case VisioRowType.RelMoveTo:
            return getRelMoveTo(cells, dimensions);
        case VisioRowType.RelLineTo:
            return getRelLineTo(cells, dimensions);
        case VisioRowType.RelCubBezTo:
            return getRelCubBezTo(cells, dimensions);
        case VisioRowType.RelQuadBezTo:
            return getRelQuadBezTo(cells, dimensions);
        case VisioRowType.RelEllipticalArcTo:
            return getRelEllipticalArcTo(cells, dimensions);
        case VisioRowType.PolylineTo:
            return getPolylineTo(cells, dimensions);
        case VisioRowType.NURBSTo:
            return getNURBSTo(cells, dimensions);
        default:
            break;
    }
    return '';
}


// Relative Commands

function getRelQuadBezTo(cells, dimensions) {
    const { width, height } = dimensions;
    const x = cells.x * width;
    const y = cells.y * height;
    const x1 = cells.a * width;
    const y1 = cells.b * height;
    lastX = x;
    lastY = y;
    return ` Q ${round(x1)} ${round(y1)} ${round(x)} ${round(y)}`;
}

function getRelCubBezTo(cells, dimensions) {
    const { width, height } = dimensions;
    const x = cells.x * width;
    const y = cells.y * height;
    const cpx1 = cells.a * width;
    const cpy1 = cells.b * height;
    const cpx2 = cells.c * width;
    const cpy2 = cells.d * height;
    lastX = x;
    lastY = y;
    return ` C ${round(cpx1)} ${round(cpy1)} ${round(cpx2)} ${round(cpy2)} ${round(x)} ${round(y)}`
}

function getRelMoveTo(cells, dimensions) {
    const { width, height } = dimensions;
    let { x = lastX, y = lastY } = cells;
    x = x * width;
    y = y * height;
    lastX = x;
    lastY = y;
    return ` M ${round(x)} ${round(y)}`;
}

function getRelLineTo(cells, dimensions) {
    const { width, height } = dimensions;
    let { x = lastX, y = lastY } = cells;
    x = x * width;
    y = y * height;
    lastX = x;
    lastY = y;
    return ` L ${round(x)} ${round(y)}`;
}

function getEllipse(cells) {
    const cx = cells.x;
    const cy = cells.y;
    const a = cells.a;
    const b = cells.b;
    const c = cells.c;
    const d = cells.d;
    const dx1 = abs(a - cx);
    const dy1 = abs(b - cy);
    const rx = sqrt(dx1 * dx1 + dy1 * dy1);
    const dx2 = abs(c - cx);
    const dy2 = abs(d - cy);
    const ry = sqrt(dx2 * dx2 + dy2 * dy2);
    return ` M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

// Absolute Commands

function getMoveTo(cells) {
    let { x = lastX, y = lastY } = cells;
    lastX = x;
    lastY = y;
    return ` M ${round(x)} ${round(y)}`;
}

function getLineTo(cells) {
    let { x = lastX, y = lastY } = cells;
    lastX = x;
    lastY = y;
    return ` L ${round(x)} ${round(y)}`;
}

function getInfiniteLine(cells) {
    const {
        // X: An x-coordinate of a point on the infinite line; paired with y-coordinate represented by the Y cell.
        x,
        // Y: A y-coordinate of a point on the infinite line; paired with x-coordinate represented by the X cell.
        y,
        // A: An x -coordinate of a point on the infinite line; paired with y-coordinate represented by the B cell.
        a: x2,
        // B: A y-coordinate of a point on an infinite line; paired with x-coordinate represented by the A cell.
        b: y2
    } = cells;
    return ` L ${x} ${y} ${x2} ${y2}`;
}

function getArcTo(cells) {
    let { x, y, a } = cells;
    if (a === 0) {
        return ` L ${x} ${y}`;
    }
    const x0 = lastX;
    const y0 = lastY;
    const dx = abs(x - x0);
    const dy = abs(y - y0);
    const rx = abs(round((a * 0.5) + (dx * dx + dy * dy) / (8.0 * a), 2));
    const ry = rx;
    const r0 = abs(rx);
    x = round(x, 2);
    y = round(y, 2);
    a = round(a, 2);
    const sf = (a > 0) ? 1 : 0;
    const laf = (r0 < abs(a)) ? 1 : 0;
    lastX = x;
    lastY = y;
    // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
    return ` A ${rx} ${ry} 0 ${laf} ${sf} ${x} ${y}`;
}

function getEllipticalArcTo(cells) {
    const {
        x = lastX,
        y = lastY,
        a: x3 = 0,
        b: y3 = 0,
        c = 0,
        d = 0
    } = cells;
    const x1 = lastX;
    const y1 = lastY;
    const x2 = x;
    const y2 = y;
    const rotation = -c;
    lastX = x;
    lastY = y;
    const rad = g.toRad(rotation);
    const p1x = sqrt(x1 * x1 + y1 * y1) * cos(atan2(y1, x1) - rad);
    const p1y = sqrt(x1 * x1 + y1 * y1) * sin(atan2(y1, x1) - rad);
    const p2x = sqrt(x2 * x2 + y2 * y2) * cos(atan2(y2, x2) - rad);
    const p2y = sqrt(x2 * x2 + y2 * y2) * sin(atan2(y2, x2) - rad);
    const p3x = sqrt(x3 * x3 + y3 * y3) * cos(atan2(y3, x3) - rad);
    const p3y = sqrt(x3 * x3 + y3 * y3) * sin(atan2(y3, x3) - rad);
    const p0xDenominator = (p1x - p2x) * (p2y - p3y) - (p2x - p3x) * (p1y - p2y);
    const p0yDenominator = (p2x - p3x) * (p1y - p2y) - (p1x - p2x) * (p2y - p3y);
    if (p0yDenominator === 0 || p0yDenominator === 0) {
        return ` L ${x2} ${y2}`;
    }
    const p0xNumerator = ((p1x - p2x) * (p1x + p2x) * (p2y - p3y) - (p2x - p3x) * (p2x + p3x) * (p1y - p2y) + d * d * (p1y - p2y) * (p2y - p3y) * (p1y - p3y));
    const p0x = p0xNumerator / (2 * p0xDenominator);
    const p0yNumerator = (p1x - p2x) * (p2x - p3x) * (p1x - p3x) / (d * d) + (p2x - p3x) * (p1y - p2y) * (p1y + p2y) - (p1x - p2x) * (p2y - p3y) * (p2y + p3y);
    const p0y = p0yNumerator / (2 * p0yDenominator);
    const dx = p1x - p0x;
    const dy = p1y - p0y;
    const rx = sqrt(dx * dx + dy * dy * d * d);
    const ry = rx / d;
    const sweep = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
    const sf = (sweep > 0) ? 0 : 1;
    let laf = 0;
    if (isInsideTriangle(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) && isReflexAngle(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y)) {
        laf = 1;
    }
    return ` A ${round(rx,2)} ${round(ry,2)} ${rotation} ${laf} ${sf} ${round(x, 2)} ${round(y, 2)}`;
}

function getRelEllipticalArcTo(cells, dimensions) {
    // A RelEllipticalArcTo row can only be persisted in the .vsdx, .vsdm, .vstx, .vstm, .vssx, and .vssm file formats.
    // When a file is saved to the Visio 2003-2010 formats, the RelEllipticalArcTo row is converted to an EllipticalArcTo row.
    const { width, height } = dimensions;
    const { x, y, a, b, c, d } = cells;
    return getEllipticalArcTo({
        // X: The x-coordinate of the ending vertex on an arc relative to the width of the shape.
        x: x * width,
        // Y: The y-coordinate of the ending vertex on an arc relative to the height of the shape.
        y: y * height,
        // A: The x-coordinate of the arc's control point relative to the shape's width; a point on the arc.
        // The control point is best located about halfway between the beginning and ending vertices of the arc.
        // Otherwise, the arc may grow to an extreme size in order to pass through the control point, with unpredictable results.
        a: a * width,
        // B: The y-coordinate of an arc's control point relative to the shape's width.
        b: b * width,
        // C: The angle of an arc's major axis relative to the x -axis of its parent.
        c,
        // D: The ratio of an arc's major axis to its minor axis. Despite the usual meaning of these words,
        // the "major" axis does not have to be greater than the "minor" axis, so this ratio does not have to be greater than 1.
        // Setting this cell to a value less than or equal to 0 or greater than 1000 can lead to unpredictable results.
        d
    });
}

function getSpline(points, knots, degree) {
    return ` L ${getBSplinePoints(degree, points, knots).join(' ')}`;
}

function getSplineStart(cells) {
    let { x = lastX, y = lastY } = cells;
    x = round(x, 2);
    y = round(y, 2);
    spline = {
        points: [[lastX, lastY], [x, y]],
        knots: [cells.b, cells.a, cells.c],
        degree: cells.d
    }
    lastX = x;
    lastY = y;
}

function getSplineKnot(cells) {
    let { x = lastX, y = lastY, a } = cells;
    lastX = x = round(x, 2);
    lastY = y = round(y, 2);
    if (spline) {
        const { points, knots } = spline;
        points.push([x, y]);
        knots.splice(knots.length - 1, 0, a);
    }
}

function getNURBSTo(cells, dimensions) {
    const {
        // X: The x-coordinate of the last control point of a NURBS.
        x,
        // Y: The y-coordinate of the last control point of a NURBS.
        y,
        // A: The second to the last knot of the NURBS.
        a: secondLastKnot,
        // B: The last weight of the NURBS.
        b: lastWeight,
        // C: The first knot of the NURBS.
        c: firstKnot,
        // D: The first weight of the NURBS.
        d: firstWeight,
        // E: A NURBS formula.
        e: formula
    } = cells;
    const { width, height } = dimensions;
    const points = [[lastX, lastY]];
    const knots = [firstKnot];
    const weights = [firstWeight];
    // NURBS(** knotLast **, ** degree **, ** xType **, ** yType **, ** x1 **, ** y1 **, ** knot1 **, ** weight1 **, ...)
    let [lastKnot, degree, xType, yType, ...values] = parseFormula(formula)
    let xn, yn, knot, weight;
    while (values.length > 0) {
        [xn, yn, knot, weight,...values] = values;
        // xType: Specifies how to interpret the x input data.
        // If xType is 0, all x input data is interpreted as a percentage of Width.
        // If xType is 1, all x input data is interpreted as local coordinates.
        if (xType === 0) {
            xn *= width;
        } else {
            xn = inchesToPixels(xn);
        }
        // yType: Specifies how to interpret the y input data.
        // If yType is 0, all y input data is interpreted as a percentage of Height.
        // If yType is 1, all y input data is interpreted as local coordinates.
        if (yType === 0) {
            yn *= height;
        } else {
            yn = inchesToPixels(yn);
        }
        points.push([xn, yn]);
        knots.push(knot);
        weights.push(weight);
    }
    knots.push(secondLastKnot, lastKnot);
    points.push([x, y]);
    weights.push(lastWeight);
    lastX = x;
    lastY = y;
    const nurbs = getBSplinePoints(degree, points, knots, weights).join(' ');
    if (nurbs.length === 0) return '';
    return ` L ${nurbs}`;
}

function getPolylineTo(cells, dimensions) {
    const {
        // X: The x-coordinate of the ending vertex of a polyline.
        x,
        // Y: The y-coordinate of the ending vertex of a polyline.
        y,
        // A: The polyline formula. (e.g "POLYLINE(0, 1, 0,1.5748031496063, 1,1, 1,0.039370078740157)")
        a: formula
    } = cells;
    const { width, height } = dimensions;
    const [xType, yType, ...values] = parseFormula(formula);
    const points = values.map((value, index) => {
        let coordinate;
        if (index % 2 === 0) {
            // xType: Specifies how to interpret the x input data.
            // If xType is 0, all x input data is interpreted as a percentage of Width.
            // If xType is 1, all x input data is interpreted as local coordinates.
            if (xType === 0) {
                coordinate = value * width;
            } else {
                coordinate = inchesToPixels(value);
            }
        } else {
            // yType: Specifies how to interpret the y input data.
            // If yType is 0, all y input data is interpreted as a percentage of Height.
            // If yType is 1, all y input data is interpreted as local coordinates.
            if (yType === 0) {
                coordinate = value * height;
            } else {
                coordinate = inchesToPixels(value);
            }
        }
        return round(coordinate, 2);
    });
    points.push(x, y);
    lastX = x;
    lastY = y;
    return `L ${points.join(' ')}`;
}

// Helpers

function parseFormula(formula) {
    return formula.replace(/[A-Z]|\(|\)/g, '')
        .split(/\s*,\s*/)
        .map(x => Number(x))
}

function isInsideTriangle(x, y, ax, ay, bx, by, cx, cy) {
    bx = bx - ax;
    by = by - ay;
    cx = cx - ax;
    cy = cy - ay;
    const d = bx * cy - cx * by;
    const wa = (x * (by - cy) + y * (cx - bx) + bx * cy - cx * by) / d;
    const wb = (x * cy - y * cx) / d;
    const wc = (y * bx - x * by) / d;
    if (wa > 0 && wa < 1 && wb > 0 && wb < 1 && wc > 0 && wc < 1) {
        return true;
    }
    return false;
}

function isReflexAngle(x0, y0, x1, y1, x2, y2, x3, y3) {
    x1 = x1 - x0;
    y1 = y1 - y0;
    y2 = y2 - y0;
    x2 = x3 - x0;
    y3 = y3 - y0;
    x0 = 0;
    y0 = 0;
    let aStart = g.toDeg(atan2(y1, x1) - atan2(y0, x0));
    let aEnd = g.toDeg(atan2(y2, x2) - atan2(y0, x0));
    let aCP = g.toDeg(atan2(y3, x3) - atan2(y0, x0));
    aStart = g.normalizeAngle(aStart - aCP);
    aEnd = g.normalizeAngle(aEnd - aCP);
    if ((aStart > 0 && aEnd < 0) || (aStart < 0 && aEnd > 0)) {
        if (abs(aStart - aEnd) > 180) return true;
    }
    return false;
}
