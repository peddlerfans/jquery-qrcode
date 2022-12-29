import { asInteger } from './convert.mjs';
import { debug } from './debug.mjs';

/**
 * @param {string} string
 * @returns {number}
 */
export function relationshipToNumber(string) {
    const idPattern = /^rId(\d+)$/;

    if (!idPattern.test(string))
        debug.log('incorrect format of relationship to master', string);

    return asInteger(string.match(idPattern)[1]);
}
