import FormulaParser from './FormulaParser.mjs';
import { preparseFormula } from './formulaPreparser.mjs';
import { extractFormula } from './formulaHelpers.mjs';

// to resolve a visio formula we split the process into two stages
//
// 1. pre-parsing - takes care of the pieces of formula that the hot-formula-parser
// does not understand and will fail evaluating. This includes (for now)
// values with units, context changing functions and references.
//
// 2. hot-formula-parser parsing - we let hot-formula-parser take care of calculating
// formula that after pre-parsing consists mostly of numeric values and functions
// known to the package.
export function resolveFormula(cell, shape) {
    if (!shape) return cell.value;

    // formula can be local, inherited or empty
    const formula = extractFormula(cell, shape);

    // if there was no formula inherited or it's overridden and cleared, return early the static value
    if (!formula || !shape) {
        return cell.value;
    }

    // as hot-formula-parser handles Excel syntax, the formula has to be prepared for evaluation
    const preparsedFormula = preparseFormula(formula, shape);

    // pre-parsed formula can now be evaluated by hot-formula-parser
    const parser = new FormulaParser(cell, shape);
    const evaluated = parser.parse(preparsedFormula);

    if (evaluated.error) {
        // in case there was some error, we simply return value Visio has pre-calculated
        // and use this error log to track and add missing/faulty functions
        // console.warn(`Could not evaluate formula`, {cell, shape, formula, preparsedFormula, evaluated});
        return cell.value;
    } else {
        let result = evaluated.result.toString();

        // TODO: just for testing, replace with proper solution
        if (valueAliases[result.toLowerCase()]) {
            result = valueAliases[result.toLowerCase()];
        }

        // TODO: DEBUG log
        // console.log('formula evaluated', {cell, original: cell.value, parsed: result, baseFormula: cell.formula, inherited: formula, preparsedFormula, shape});
        return result;
    }
}

// todo: need to catch the cases where this happens
// primitives might need to be casted to Visio specific values
const valueAliases = {
    'false': '0',
    'true': '1'
}
