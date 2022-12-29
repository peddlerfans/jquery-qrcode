import { GUARD, HSL, PAGECOUNT, PAGENUMBER, PAR, PNT, TEXTHEIGHT, TEXTWIDTH, ATAN2, SQRT, IF, BITXOR, MAX } from './formulaFunctions.mjs';
import { getAnnotatedText } from '../display/enrichShapeTextAttributes.mjs';
import { Parser } from 'hot-formula-parser';

export default class FormulaParser extends Parser {
    constructor(cell, shape) {
        super();

        this.registerFunctions(cell, shape);
        this.registerEvents(shape);
    }

    // todo: it might be better to fork and extend formulaParser package (hot-formula-parser)
    registerFunctions(cell, shape) {
        this.setFunction('HSL', HSL);
        this.setFunction('PAGENUMBER', PAGENUMBER.bind(this, shape));
        this.setFunction('PAGECOUNT', PAGECOUNT.bind(this, shape.archive.document));
        this.setFunction('GUARD', GUARD);
        this.setFunction('PAR', PAR);
        this.setFunction('PNT', PNT.bind(this, cell));
        this.setFunction('ATAN2', ATAN2);
        this.setFunction('SQRT', SQRT);
        this.setFunction('IF', IF);
        this.setFunction('BITXOR', BITXOR);
        this.setFunction('MAX', MAX);

        // todo: experimental functions
        // these require more work as they return a value that diverts from original pre-calculated value
        this.setFunction('TEXTWIDTH', TEXTWIDTH.bind(this, shape));
        this.setFunction('TEXTHEIGHT', TEXTHEIGHT.bind(this, shape));
    }

    registerEvents(shape) {
        this.on('callFunction', (name) => {
            if (!this.getFunction(name)) {
                // todo: uncomment when adding new testing projects to see which functions are not handled
                // console.warn(`formula function \"${name}\" is not yet handled`);
            }
        });

        this.on('callVariable', resolveFormulaVariable.bind(this, shape));
    }
}

const VisioReservedVariables = {
    THE_TEXT: 'TheText'
}

function resolveFormulaVariable(shape, variableName, done) {
    let val;

    switch (variableName) {
        case VisioReservedVariables.THE_TEXT: {
            const { mergedText } = getAnnotatedText(shape);
            return done(mergedText);
        }
    }

    const camelCaseName = variableName.charAt(0).toLowerCase() + variableName.slice(1);
    let variableCell = shape.cells.get(camelCaseName);

    if (!variableCell) {
        variableCell = shape.cells.getParentCell(camelCaseName);
    }

    val = variableCell ? variableCell.value : null;

    if (val || val === 0) {
        done(val);
    } else {
        throw Error('#N/A');
    }
}
