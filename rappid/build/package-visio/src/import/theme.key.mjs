import {
    VisioJxonThemeSubKeyA,
    VisioJxonThemeSubKeyVt,
} from '../types/enums.mjs';
import { assertIsThemeValue } from './assert/visio.mjs';
import { debug } from '../helpers/debug.mjs';
import { cutPrefix } from './theme.mjs';
import {} from '../types/enums.mjs';

export function hasSpecialKeyParser(key, level) {
    return [
        VisioJxonThemeSubKeyA.srgbClr,
        VisioJxonThemeSubKeyA.schemeClr,
        VisioJxonThemeSubKeyVt.schemeID,
    ].includes(key);
}

/**
 * @param {VisioJxonThemeSubKey} fullKey
 * @param {VisioJxon} visioJxon
 * @param {number} level - nesting level
 * @returns {{parsedValue: *, parsedKey: *}}
 */
export function parseSpecialKey(fullKey, visioJxon, level) {
    switch (fullKey) {
        case VisioJxonThemeSubKeyA.srgbClr:
            return {
                parsedKey: cutPrefix('a:', fullKey),
                parsedValue: parseSrgbClr(fullKey, visioJxon, level),
            };
        case VisioJxonThemeSubKeyA.schemeClr:
            return {
                parsedKey: cutPrefix('a:', fullKey),
                parsedValue: parseSrgbClr(fullKey, visioJxon, level),
            };
        case VisioJxonThemeSubKeyVt.schemeID:
            return {
                parsedKey: cutPrefix('vt:', fullKey),
                parsedValue: visioJxon[VisioJxonThemeSubKeyVt.schemeEnum],
            };
        default:
            debug.log(`Unknown special key ${fullKey}`, { key: fullKey, level })
    }
}

/**
 * @param {string} fullKey
 * @param {VisioJxon} themeColorJxon
 * @param {number|null} [level]
 * @returns {string}
 */
export function parseSrgbClr(fullKey, themeColorJxon, level = null) {
    assertIsThemeValue(themeColorJxon);

    return convertColor(themeColorJxon[VisioJxonThemeSubKeyA.value]);
}

/**
 * @param {string} fullKey
 * @param {VisioJxon} themeColorJxon
 * @param {number|null} [level]
 * @returns {string}
 */
export function parseSchemeClr(fullKey, themeColorJxon, level = null) {
    assertIsThemeValue(themeColorJxon);

    //TODO miky possible check for existing color aliases

    return themeColorJxon[VisioJxonThemeSubKeyA.value];
}



/**
 * @param {string} color
 */
function convertColor(color) {
    if (!/^[0-9A-Fa-f]{6}$/.test(color))
        debug.log(`Is not an expected format of color "${color}"`);

    return `#${color}`;
}
