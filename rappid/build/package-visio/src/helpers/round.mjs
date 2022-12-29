/**
 * @param {number} value
 * @param {number} [decimalPlaces]
 */
export function round(value, decimalPlaces = 0) {

    if (typeof value !== 'number') throw 'Not a number.';

    if (decimalPlaces === 0) return Math.round(value);

    const pow = Math.pow(10, decimalPlaces);
    return Math.round(value * pow) / pow;
}
