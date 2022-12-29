// import lodash from 'lodash';
import {
    VisioRelationType,
    VisioJxonThemeSubKey,
    VisioJxonThemeSubKeyA,
    VisioJxonThemeKey,
    XmlSchemaKey,
} from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';
import { assertIsDrawingMLJxon } from './assert/jxon.mjs';
import {
    defaultParseArray,
    parseFontArray,
    parseExtArray
} from './theme.array.mjs';
import {
    hasSpecialKeyParser,
    parseSpecialKey
} from './theme.key.mjs';
import { expectedSchema } from './assert/xmlSchema.mjs';
import { parseSolidFillArray } from './theme.array.mjs';

// const cloneDeep = lodash.cloneDeep;

export function getThemes(relationships, jxonMap) {
    const themeJxons = getJxons(relationships[VisioRelationType.Theme], jxonMap);

    if (themeJxons.length === 0) {
        debug.log('Theme not found', { relationships });
        return [];
    }

    return themeJxons.map(parseTheme);

}

function getJxons(relationships = {}, jxonMap) {
    const jxons = Object.values(relationships)
        .map(relationship => relationship.targetFile.absolutePath)
        .map(absolutePath => jxonMap[absolutePath]);

    // @see {https://en.wikipedia.org/wiki/Office_Open_XML_file_formats#DrawingML}
    jxons.forEach(jxon => expectedSchema(jxon, XmlSchemaKey.DrawingML));

    return jxons;
}

/**
 * @param {VisioDrawingMLJxon} drawingMLJxon
 */
function parseTheme(drawingMLJxon) {
    assertIsDrawingMLJxon(drawingMLJxon);
    const prefix = 'a:';

    const iterateArray = (key, beforeArray, level, path) => {
        switch (key) {
            case VisioJxonThemeSubKeyA.font:
                return parseFontArray(beforeArray, level, path);
            case VisioJxonThemeSubKeyA.ext:
                return parseExtArray(beforeArray, level, path);
            case VisioJxonThemeSubKeyA.solidFill:
                return parseSolidFillArray(beforeArray, level, path);
            case VisioJxonThemeSubKeyA.ln:
                return defaultParseArray(beforeArray, level, path);
            case VisioJxonThemeSubKeyA.effectStyle:
                return defaultParseArray(beforeArray, level, path);
            case VisioJxonThemeSubKeyA.gs:
                return defaultParseArray(beforeArray, level, path);
            case VisioJxonThemeSubKeyA.gradFill:
                return defaultParseArray(beforeArray, level, path);
            default:
                debug.log(`Unknown Theme array "${key}"`, beforeArray);
        }
    };

    /**
     * @throws
     * @param {VisioJxonThemeKey|VisioJxonThemeSubKey} key
     * @param {number} level
     */
    const checkObjectKey = (key, level) => {
        if (level === 0 && !VisioJxonThemeKey.hasOwnProperty(key))
            debug.log(`Unknown key VisioJxonThemeKey "${key}"`);

        if (level > 0 && !VisioJxonThemeSubKey.hasOwnProperty(key))
        // groupLogCollect(`Unknown key VisioJxonThemeSubKey "${key}"`);
            debug.log(`Unknown key VisioJxonThemeSubKey "${key}"`);
    };

    const iterateObject = (beforeObject, level, path) =>
        Object.entries(beforeObject).reduce(
            (result, [fullKey, value]) => {
                checkObjectKey(fullKey, level);

                if (hasSpecialKeyParser(fullKey)) {
                    const { parsedKey, parsedValue } = parseSpecialKey(fullKey, value, level);
                    result[parsedKey] = parsedValue;

                    return result;
                }

                const isObject = typeof value === 'object';
                const isArray = Array.isArray(value);
                const isSimpleObject = isObject && !isArray;
                const key = cutPrefix(prefix, fullKey);
                const newPath = path.concat(key);

                if (isSimpleObject)
                    result[key] = iterateObject(value, level + 1, newPath);

                if (isArray)
                    result[key] = iterateArray(fullKey, value, level + 1, newPath);

                return result;

            }, {});

    // run recursion
    return iterateObject(drawingMLJxon, 0, []);
}


/**
 * @param {string} prefix
 * @param {string} key
 */
export function cutPrefix(prefix, key) {
    const prefixLength = prefix.length;
    const candidate = key.substring(0, prefixLength);
    if (candidate === prefix) return key.substring(prefixLength);

    return key;
}

