import { measureShapeText } from '../display/enrichShapeTextAttributes.mjs';
import { pixelsToInches, inchesToPixels } from '../helpers/internalUnits.mjs';

// CONFIG CONSTANTS
const DEFAULT_MAX_WIDTH = 1000000;

// FUNCTIONS
export function HSL(params) {
    const h = (params[0] / 239) * 360;
    const s = (params[1] / 240);
    const l = (params[2] / 240);

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1)
        r = '0' + r;
    if (g.length === 1)
        g = '0' + g;
    if (b.length === 1)
        b = '0' + b;

    return '#' + r + g + b;
}

// https://docs.microsoft.com/en-us/office/client-developer/visio/textwidth-function
export function TEXTWIDTH(shape, params) {
    let [,maxWidth] = params;
    maxWidth = !isNaN(maxWidth) ? inchesToPixels(maxWidth) : DEFAULT_MAX_WIDTH;

    const { leftMargin = 0, rightMargin = 0 } = shape.cells;

    const bbox = measureShapeText(shape, { maxWidth });

    return pixelsToInches(bbox.width + leftMargin + rightMargin);
}

// https://docs.microsoft.com/en-us/office/client-developer/visio/textheight-function
export function TEXTHEIGHT(shape, params) {
    let [,maxWidth] = params;
    maxWidth = !isNaN(maxWidth) ? inchesToPixels(maxWidth) : DEFAULT_MAX_WIDTH;

    const { topMargin = 0, bottomMargin = 0 } = shape.cells;

    const bbox = measureShapeText(shape, { maxWidth });

    return pixelsToInches(bbox.height + topMargin + bottomMargin);
}

export function GUARD(params) {
    return params[0];
}

export function PAGENUMBER(shape) {
    return shape.page.index + 1;
}

export function PAGECOUNT(document) {
    const { pages } = document.pages;
    return pages ? pages.length : 0;
}

// Returns the x,y coordinates of a point in the coordinate system of the shape's parent.
// https://docs.microsoft.com/en-us/office/client-developer/visio/par-function
// However, as this is already preparsed, the only param we get is the actual value.
export function PAR(params) {
    return params[0];
}

// Returns the point represented by the coordinates x and y as a single value.
// https://docs.microsoft.com/en-us/office/client-developer/visio/pnt-function
// Although Visio returns both coordinates as a single value, on this stage we already
// decide which coordinate, X or Y, will be used based on the cell being evaluated.
// it seems Visio does the same thing under the hood, but it's not clear at what stage.
// It has been verified that user can use just the PNT function in a formula and the cell
// would still know which coordinate to use as it's value, so it make sense to filter that
// on the function stage.
// TODO: verify if functions other then PAR might require both coordinates
export function PNT(cell, params) {
    const axis = cell.name[cell.name.length - 1];
    switch (axis) {
        case 'X':
            return params[0];
        case 'Y':
            return params[1];
        default:
            // TODO: handle cases when PNT is used as value for a non coordinate type cell
            throw Error('#VALUE');
    }
}

export function MAX(params) {
    return params.reduce(function(a, b) {
        return Math.max(a, b);
    });
}

export function ATAN2(params) {
    const [y, x] = params;
    return Math.atan2(y, x);
}

export function SQRT(params) {
    return Math.sqrt(params[0]);
}

export function IF(params) {
    return params[0].toString() === '1' ? params[1] : params[2];
}

export function BITXOR(params) {
    let [num1, num2] = params;

    if (isNaN(num1) || isNaN(num2)) {
        throw Error('#VALUE');
    }

    num1 = parseInt(num1);
    num2 = parseInt(num2);

    if (num1 < 0 || num2 < 0) {
        throw Error('#NUM');
    }

    if (Math.floor(num1) !== num1 || Math.floor(num2) !== num2) return '#NUM!';
    if (num1 > 281474976710655 || num2 > 281474976710655) return '#NUM!';

    return ((num1 ^ num2) >>> 0).toString(2);
}
