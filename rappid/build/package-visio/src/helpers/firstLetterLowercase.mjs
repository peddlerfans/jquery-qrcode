/**
 * @param {string} string
 * @returns {string}
 */
export function firstLetterLowercase(string) {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toLowerCase() + string.slice(1);
}
