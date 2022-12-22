import { debug } from './debug.mjs';
import { assertIsString } from '../import/assert/primitive.mjs';

/**
 * @param {string} string
 * @returns {number}
 */
export function asNumber(string) {
    assertIsString(string);

    const number = Number(string);
    assertAreSameNumberAndString(number, string);

    return number;
}

/**
 * @param {string} string
 * @returns {number}
 */
export function asInteger(string) {
    assertIsString(string);

    const number = Number(string);
    assertAreSameNumberAndString(number, string);

    return number;
}

/**
 * 
 * @param {string} string
 * @param {boolean} [triState] - whether can return null
 * @returns {boolean|null}
 */
export function asBooleanTristate(string, { triState = true } = {}) {
    if (triState && string === undefined){
        debug.log('boolean as a null');
        return null;
    }

    return asBooleanStrict(string);
}

/**
 * @param {string} string
 * @returns {boolean}
 */
export function asBooleanStrict(string) {
    if (string !== '0' && string !== '1')
        debug.log('Can\'t convert string to boolean', string);

    return string === '1';
}

/**
 * Check of correct conversion
 * @param {number} number
 * @param {string} string
 * @returns {boolean}
 */
export function assertAreSameNumberAndString(number, string) {
    return String(number) === string;
}
