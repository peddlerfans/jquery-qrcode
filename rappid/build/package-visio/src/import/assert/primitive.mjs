import { debug } from '../../helpers/debug.mjs';

/***
 * Asserts of primitive javascript types
 */

/**
 * @param {string} string
 */
export function assertIsString(string) {
    if (typeof string !== 'string')
        debug.log('Value to convert is not a string.', string);
}

/**
 * @param {number} integer
 */
export function assertIsInteger(integer) {
    if (!Number.isInteger(integer))
        debug.log('Value is not integer.', integer);
}

/**
 * @throws
 * @param {string} name
 * @param {Object} object
 * @param {Array.<string>} requiredKeys
 * @param {Array.<string>} [blacklistedKeys]
 */
export function assertIsObjectWithKeys(name, object, requiredKeys, blacklistedKeys = []) {
    return;
    // if (typeof object !== 'object')
    //     logAndThrow(`"${name}" is not an object.`, object);

    // requiredKeys.forEach(key => {
    //     if (!object.hasOwnProperty(key))
    //         logAndThrow(`"${name}" required key "${key}" missing.`, object);
    // });

    // blacklistedKeys.forEach(key => {
    //     if (object.hasOwnProperty(key))
    //         logAndThrow(`"${key}" is not allowed key in "${name}" object.`, object);
    // });
}

/**
 * @throws
 * @param {string} name
 * @param {Object} object
 * @param {Object.<string, string>} keyValues
 */
export function assertHasKeyValue(name, object, keyValues) {
    return;
    // if (typeof object !== 'object')
    //     logAndThrow(`"${name}" is not an object.`, object);

    // Object.entries(keyValues)
    //     .forEach(([key, expectedValue]) => {
    //         if (!object.hasOwnProperty(key))
    //             logAndThrow(`"${name}" required key "${key}" missing.`, object);

    //         const actualValue = object[key];
    //         if (actualValue !== expectedValue)
    //             logAndThrow(
    //                 `"${name}" required key "${key}" has incorrect value. ` +
    //                 `(expected: "${expectedValue}", actual: "${actualValue}")`,
    //                 object
    //             );
    //     });
}

/**
 * @throws
 * @param {string} name
 * @param {Object} object
 * @param {number} length
 */
export function assertAttributesLength(name, object, length) {
    const actual = Object.keys(object).length;
    if (Object.keys(object).length !== length)
        debug.log(
            `"${name}" require exactly ${length} attributes.` +
            `(actual: "${actual}")`,
            object
        );
}
