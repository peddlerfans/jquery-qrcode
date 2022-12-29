import { VisioRowStructureType } from '../types/enums.mjs';
import { firstLetterLowercase } from '../helpers/firstLetterLowercase.mjs';
import { locToParent } from './formulaHelpers.mjs';
import FormulaParser from './FormulaParser.mjs';
import { VisioSectionStructureType } from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';

// ENUMS

// TODO: ref markers will tell us if formula values should be referenced and from where
// for now we hardcoded Sheet as it's the 90%+ cases in the given projects
// const ReferenceMarkersEnum = {
//     PAGE: 'ThePage',
//     SHEET: 'Sheet'
// }

// these are anomaly functions that change the context of the evaluation within the function parameters
const ContextFunctionsEnum = {
    PAR: 'PAR',
    // LOCTOPAR: 'LOCTOPAR'
}

// SECTIONS MAP
// maps formula section names to their respective keys (aliases) in data object and holds defaults
const visioSections = {
    Actions: { alias: 'Actions', default: 'Menu' },
    Char: { alias: 'Character' },
    Connections: { alias: 'Connection' },
    Controls: { alias: 'Control', default: 'X' },
    Fields: { alias: 'Field' },
    FillGradientStops: { alias: 'FillGradient' },
    Geometry: { alias: 'Geometry', indexedName: true },
    Hyperlink: { alias: 'Hyperlink', default: 'Description' },
    Layers: { alias: 'Layer' },
    LineGradientStops: { alias: 'LineGradient' },
    Para: { alias: 'Paragraph' },
    Prop: { alias: 'Property', default: 'Value' },
    Reviewer: { alias: 'Reviewer' },
    Scratch: { alias: 'Scratch' },
    SmartTags: { alias: 'ActionTag', default: 'X' },
    Tabs: { alias: 'Tabs' },
    User: { alias: 'User', default: 'Value' },
}

// PATTERNS
const BasePatterns = {
    singleCharOperator: /([-+^*/&<>=])/,
    multiCharOperator: /(<>|<=|>=)/,
    parentheses: /([()])/,
    singleParentheses: /^[()]$/,
    unitValue: /([-])?([0-9]+)([A-Z]*)/,
    potentialFunc: /^[A-Z]{2,}$/g,
};

const Patterns = {
    operatorSplit: new RegExp(`(?:${BasePatterns.multiCharOperator.source}|${BasePatterns.singleCharOperator.source}|${BasePatterns.parentheses.source})`, 'gm'),
    skipEvaluation: new RegExp(`^${BasePatterns.singleCharOperator.source}|${BasePatterns.multiCharOperator.source}|${BasePatterns.parentheses.source}$`),
    referencedVariable: new RegExp('([\\w]+)\\.([\\d]+)(?:[!])', 'gm'),
}

// CORE
export function preparseFormula(formula, shape, opt) {
    let localOpt = opt || {};

    // split formula by operators and parentheses, then remove empty results
    const formulaParts = formula.split(Patterns.operatorSplit).filter(part => part);

    // main iteration loop identifies function boundaries and evaluates those as formula parts
    let index = 0, evaluatedFormula = [];
    while (index < formulaParts.length) {
        const fPart = formulaParts[index];

        // skip anything that does not require evaluation like operators or parentheses
        if (fPart.match(Patterns.skipEvaluation)) {
            evaluatedFormula.push(fPart);
            index++;
            continue;
        }

        // typically all capital letters part means the part is a function name
        // TODO: check if function exists
        if (fPart.match(BasePatterns.potentialFunc)) {
            // get function parameters
            const functionBounds = getFunctionBounds(formulaParts, index);
            const functionString = functionBounds.join('');

            // check if it's a context changing function
            // do not override a higher level context change
            if (fPart === ContextFunctionsEnum[fPart]) {
                localOpt.ctxType = localOpt.ctxType || ContextFunctionsEnum[fPart];
            }

            const evaluatedPart = preparseFormula(functionString, shape, localOpt);

            // attach function name at the beginning of the evaluated content
            // functionBounds.unshift(fPart);

            // attach function with evaluated contents
            evaluatedFormula.push(fPart + evaluatedPart);

            // skip already evaluated function parts
            index += functionBounds.length + 1;
        } else {
            const evaluatedPart = evaluateFormulaPart(fPart, shape, localOpt);
            evaluatedFormula.push(evaluatedPart);
            index++;
        }
    }

    evaluatedFormula = evaluatedFormula.join('');
    return evaluatedFormula;

    // HELPERS

    // based on the current index, searches for the bounds of the function parameters
    function getFunctionBounds(formulaParts, index) {
        let startIndex = index + 1, currentIndex = startIndex, nesting = 0;

        let enteredBrackets;
        while (currentIndex < formulaParts.length) {
            if (formulaParts[currentIndex].match(BasePatterns.singleParentheses)) {
                nesting += formulaParts[currentIndex] === '(' ? 1 : -1;
                enteredBrackets = true;
            }

            currentIndex++;

            if (enteredBrackets && nesting === 0) break;
        }

        return formulaParts.slice(startIndex, currentIndex);
    }

    // checks if formula part under given index should be
    // evaluated in it's parent context
    // TODO: this should probably just return proper context
    // unused for now but could be a potential cleanup util function
    // function getEvaluationContext(index, formulaParts) {
    //     let currentIndex = index - 1, nesting = 0;
    //     while (currentIndex >= 0) {
    //         const fPart = formulaParts[currentIndex];
    //         if (fPart.match(BasePatterns.singleParentheses)) {
    //             nesting += fPart === '(' ? 1 : -1;
    //         }
    //         if (formulaParts[currentIndex] === 'PAR') {
    //             return {
    //             };
    //         }
    //         currentIndex--;
    //     }
    //     return false;
    // }

    // finds last reference ID in a formula part
    // it seems that if single function parameters reference multiple sheets,
    // it's the last one that should be used to find proper context
    // todo: need to confirm that as it doesn't sound right, even if initial tests proved it to be right
    function getReferenceIdFromFormula(fPart) {
        if (!fPart) {
            debug.log('[getReferenceIdFromFormula] No formula piece provided for id extraction.');
            return null;
        }

        const fParts = fPart.split(Patterns.referencedVariable);

        let index = fParts.length;
        while (index >= 0) {
            if (fParts[index] === 'Sheet') {
                const refId = fParts[index + 1];

                if (Number.isNaN(refId)) {
                    debug.log('[getReferenceIdFromFormula] Invalid reference ID', { refId });
                    return null;
                }

                return parseInt(refId);
            }

            index--;
        }

        return null;
    }

    // evaluates a part of a formula into a specific value
    // works under assumption, that the formula part passed
    // is a bottom level part that can be evaluated and
    // it is not another function
    // todo: debug every case of early return of arguments[0]
    function evaluateFormulaPart(fPart, shape, opt) {
        const localOpt = opt || {};

        let ctxShape;
        if (localOpt.ctxType === ContextFunctionsEnum.PAR) {
            const ctxId = getReferenceIdFromFormula(fPart);
            ctxShape = getReferenceShape(shape, ctxId);
        }

        let refId, referenceShape;
        let parsed = fPart.replace(/(?:([a-zA-Z]+)\.([\d]+)!(?:([a-zA-Z]+)([\d]+)?)(?:\.(\w+))?(?:\.(\w+))?)|(?:(Actions|Char|Connections|Controls|Fields|FillGradientStops|Geometry(?=[\d]+)?|HyperLink|Layers|LineGradientStops|Para|Prop|Reviewer|Scratch|SmartTags|Tabs|User)(\d+)?(?:\.(\w+))?(?:\.(\w+))?)/gm, function() {
            // refId will exist if formula is referencing another shape (Sheet), page etc.
            refId = parseInt(arguments[2]);

            const pointer = refId >= 0 ? arguments[3] : arguments[7],
                geometryIndex = refId >= 0 ? arguments[4] : arguments[8],
                sectionIndex = refId >= 0 ? arguments[5] : arguments[9],
                cellName = refId >= 0 ? arguments[6] : arguments[10];

            if (isNaN(refId)) {
                // todo: unhandled reference id, typical case is Props.<Prop> reference - to be handled
                // console.warn('unhandled reference id', {shape, arguments, refId});
                return arguments[0];
            } else {
                referenceShape = getReferenceShape(shape, refId);
            }

            // in case reference shape was not found return original formula so it can fallback to pre-calculated value
            if (!referenceShape) return arguments[0];

            // if pointer is a known section name we treat it as a section
            // otherwise we can resolve it as a cell
            let cell;
            if (visioSections[pointer]) {
                const sectionConf = visioSections[pointer];
                const sectionData = referenceShape.sections.get(sectionConf.alias);

                if (!sectionData) return arguments[0];

                // Visio sections can be named or indexed which dictates how to read the formula
                let row, rowCellName;
                const structureType = VisioSectionStructureType[sectionConf.alias];
                if (structureType === VisioRowStructureType.Named) {
                    // resolve section row by name
                    row = sectionData[0].rows.find((namedRow) => namedRow.name === sectionIndex);

                    // resolve cell name or fallback to default of none is given
                    rowCellName = cellName || sectionConf.default;
                } else {
                    // resolve section row by indexes
                    const rowIndexStr = sectionIndex.match(/\d+/g);
                    const rowIndex = rowIndexStr ? parseInt(rowIndexStr[0]) - 1 : 0;
                    const index = geometryIndex >= 0 ? geometryIndex - 1 : 0;

                    row = sectionData[index].rows[rowIndex];

                    // cell name is part of the sectionIndex group in the formula
                    rowCellName = sectionIndex.match(/[a-zA-Z]+/)[0];
                }

                if (!row) return arguments[0];

                rowCellName = firstLetterLowercase(rowCellName);
                cell = row.cells.get(rowCellName);

                if (!cell)
                    cell = row.cells.getParentCell(rowCellName);
            } else {
                const cellName = firstLetterLowercase(pointer);
                cell = referenceShape.cells.get(cellName);

                if (!cell)
                    cell = referenceShape.cells.getParentCell(cellName);
            }
            return cell ? cell.value : arguments[0];
        });

        if (ctxShape) {
            const pntArguments = parsed.replace(/[()]/gm, '').split(',').map(p => {
                const parser = new FormulaParser({}, shape);
                const res = parser.parse(p);
                return res.result;
            });

            let [x, y] = pntArguments;

            if (pntArguments.length > 2) {
                debug.log('Potentially invalid PNT arguments', { formula, pntArguments });
            }

            const point = locToParent({ x, y }, ctxShape);

            parsed = `${point.x},${point.y}`;
        }

        return parsed;
    }

    // finds a reference shape based on given ID and source shape
    function getReferenceShape(shape, refId) {
        if (!refId && refId !== 0) {
            debug.log('no reference id provided', { shape, refId });
        }

        // todo: investigate when master is missing, and for what reason
        // possible lead - foreign objects like images
        const referenceMaster = shape.masterShape ? shape.masterShape.master : null;

        const shapeIterator = shape.pageContent.shapes.values();
        let refShape = shapeIterator.next(), referenceShape;
        while (!refShape.done && referenceMaster) {
            if (refShape.value.masterId === referenceMaster.id && refShape.value.shapes.has(shape.id)) {
                referenceShape = refShape.value;
                break;
            }

            refShape = shapeIterator.next();
        }

        // TODO: investigate cases when referenceShape was not found
        // if (!referenceShape) debugger;

        return referenceShape;
    }

    // todo: potential helpers
    // function getContext(fPart, shape) {}
    // function formulaPartToCellValue(fPart, shape) {}
    // function getValueInContext(val, context, ctxType) {}
}
