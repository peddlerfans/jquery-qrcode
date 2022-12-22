/**
 * @param {*|Array.<*>} somethingOrArray
 * @returns {Array.<*>}
 */
export function toArray(somethingOrArray){
    if (Array.isArray(somethingOrArray)) return somethingOrArray;

    return [somethingOrArray]
}
