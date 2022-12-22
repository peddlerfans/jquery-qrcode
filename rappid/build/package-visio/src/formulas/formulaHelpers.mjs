import { pixelsToInches } from '../helpers/internalUnits.mjs';

export function locToParent(point, parent) {
    const { pinX = 0, pinY = 0, locPinX = 0, locPinY = 0, angle = 0 } = parent.cells;
    const ox = pixelsToInches(pinX - locPinX),
        oy = pixelsToInches(pinY - locPinY);

    let { x, y } = point;

    x += ox;
    y += oy;

    // todo: calculate coordinates of a X\Y flipped parent

    return rotatePointAroundOrigin(ox, oy, x, y, angle);
}

function rotatePointAroundOrigin(ox, oy, px, py, angle) {
    const radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        x = (cos * (px - ox)) + (sin * (py - oy)) + ox,
        y = (cos * (py - oy)) - (sin * (px - ox)) + oy;
    return { x, y };
}

// Visio formula can be either:
// 1. undefined - there is no formula declared or inherited for this cell, use pre-calculated value
// 2. "Inh" - formula is inherited from a matching cell in master or style
// 3. "No Formula" - inherited formula has been overridden locally for the cell, use pre-calculated value
// 4. a local formula
export function extractFormula(cell, shape) {
    let formula = cell.formula;

    switch (formula) {
        case 'Inh':
            formula = extractInheritedFormula(cell, shape);
            break;
        case 'No Formula':
            formula = undefined;
            break;
    }

    return formula;
}

// https://docs.microsoft.com/en-us/office/client-developer/visio/about-formulas
// https://docs.microsoft.com/en-us/office/vba/api/visio.shape.mastershape
function extractInheritedFormula(cell, shape) {
    if (shape.masterShape) {
        const masterShapeCell = shape.masterShape.cells.get(cell.name);
        if (masterShapeCell && masterShapeCell.formula) return masterShapeCell.formula;
    }

    const document = shape.archive.document;
    const pageSheetCell = document.pageSheet.cells.get(cell.name);
    if (pageSheetCell && pageSheetCell.formula) return pageSheetCell.formula;

    // if it failed at this point there might be no formula to inherit
    return null;
}

// https://gist.github.com/jiggzson/b5f489af9ad931e3d186
// todo: hot-formula-parser sometimes fails when feeded a scientific notation number
// need to investigate further, for now leaving the function here in case it's used
export function scientificToDecimal(num) {
    const nsign = Math.sign(num);
    //remove the sign
    num = Math.abs(num);
    //if the number is in scientific notation remove it
    if (/\d+\.?\d*[eE][+-]*\d+/i.test(num)) {
        let zero = '0',
            parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
            e = parts.pop(), //store the exponential part
            l = Math.abs(e), //get the number of zeros
            sign = e / l,
            coeff_array = parts[0].split('.');
        if (sign === -1) {
            l = l - coeff_array[0].length;
            if (l < 0) {
                num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
            }
            else {
                num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
            }
        }
        else {
            const dec = coeff_array[1];
            if (dec)
                l = l - dec.length;
            if (l < 0) {
                num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
            } else {
                num = coeff_array.join('') + new Array(l + 1).join(zero);
            }
        }
    }

    return nsign < 0 ? '-'+num : num;
}
