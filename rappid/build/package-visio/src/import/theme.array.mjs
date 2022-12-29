import { debug } from '../helpers/debug.mjs';
import {
    VisioJxonThemeFontAttribute,
    VisioJxonThemeSubKeyVt,
    VisioJxonThemeSubKeyA,
    VisioJxonThemePrefix,
    VisioJxonType,
} from '../types/enums.mjs';
import { assertAttributesLength } from './assert/primitive.mjs';
import {
    assertIsThemeFontDefinition,
    assertIsVisioObjectWithKeys
} from './assert/visio.mjs';
import { cutPrefix } from './theme.mjs';
import { parseSrgbClr } from './theme.key.mjs';
import { hasSpecialKeyParser } from './theme.key.mjs';
import { parseSpecialKey } from './theme.key.mjs';
import { getRootAttributes } from './parseJxon.utils.mjs';
import { assertIsSchemeSrgbClr } from './assert/visio.mjs';


export function parseFontArray(fontArray) {
    const Attribute = VisioJxonThemeFontAttribute;

    return fontArray.reduce(
        (map, fontDefinition) => {
            assertIsThemeFontDefinition(fontDefinition);

            map[fontDefinition[Attribute.script]] =
                fontDefinition[Attribute.typeface];

            return map;
        }, {}
    )
}

export function parseExtArray(array, level, path) {
    return array.reduce(
        (map, extDefinition) => {
            const fullKey = getSingleKeyAssertUri(extDefinition);
            const normalisedKey = cutPrefix('vt:', fullKey);

            if (map.hasOwnProperty(normalisedKey))
                debug.log(
                    `theme parseExtArray - keys collision "${normalisedKey}"`,
                    { array });

            if (hasSpecialKeyParser(fullKey, level)) {
                const { parsedKey, parsedValue } =
                    parseSpecialKey(fullKey, extDefinition, level);
                map[parsedKey] = parsedValue;

            } else if (fullKey === VisioJxonThemeSubKeyVt.bkgnd)
                map[normalisedKey] =
                    parseThemePart(normalisedKey, extDefinition);

            else if ([
                VisioJxonThemeSubKeyVt.themeScheme,
                VisioJxonThemeSubKeyVt.fmtSchemeEx,
                VisioJxonThemeSubKeyVt.fmtConnectorSchemeEx,
                VisioJxonThemeSubKeyVt.fillStyles,
                VisioJxonThemeSubKeyVt.lineStyles,
                VisioJxonThemeSubKeyVt.fontStylesGroup,
                VisioJxonThemeSubKeyVt.variationClrSchemeLst,
                VisioJxonThemeSubKeyVt.variationStyleSchemeLst,
            ].includes(fullKey))
                debug.log(`parseExtArray ignored key "${fullKey}"`,
                    { fullKey, normalisedKey });

            else
                debug.log('parseExtArray unknown key',
                    { fullKey, normalisedKey });

            return map;
        }
    );
}

export function parseSolidFillArray(array, level, path) {
    return array.map(
        solidFillDefinition => {

            if (solidFillDefinition.hasOwnProperty(VisioJxonThemeSubKeyA.srgbClr)){
                assertIsSchemeSrgbClr(solidFillDefinition);

                const srgbClrJxon = solidFillDefinition[VisioJxonThemeSubKeyA.srgbClr];

                return parseSrgbClr(
                    VisioJxonThemeSubKeyA.srgbClr,
                    srgbClrJxon
                );
            }


            //assertIsSchemeColorDefinition(solidFillDefinition);
            const schemeClrJxon = /** @type {VisioJxon} */
                solidFillDefinition[VisioJxonThemeSubKeyA.schemeClr];

            const result = getRootAttributes(schemeClrJxon, VisioJxonType.SchemeClr);


            if (schemeClrJxon.hasOwnProperty(VisioJxonThemeSubKeyA.satMod))
                result['satMod'] =
                    getRootAttributes(
                        schemeClrJxon[VisioJxonThemeSubKeyA.satMod],
                        VisioJxonType.SchemeClr);

            if (schemeClrJxon.hasOwnProperty(VisioJxonThemeSubKeyA.lumMod))
                result['lumMod'] =
                    getRootAttributes(
                        schemeClrJxon[VisioJxonThemeSubKeyA.lumMod],
                        VisioJxonType.SchemeClr);

            return result;
        }
    );
}

export function parseThemePart(parentKey, themePartJxon) {
    const prefixedKey = getSingleKeyAssertUri(themePartJxon);
    const subObject = themePartJxon[prefixedKey];

    if (prefixedKey === VisioJxonThemeSubKeyVt.bkgnd) {
        const prefixedSubKey = getSingleKeyAssertXmlnsVt(subObject);

        if (prefixedSubKey === VisioJxonThemeSubKeyA.srgbClr) {

            const color = parseSrgbClr(prefixedSubKey, subObject[prefixedSubKey]);

            return {
                [cutPrefix(VisioJxonThemePrefix.a, prefixedSubKey)]: color
            }
        }
        debug.log(`Implement ThemePart bkgnd "${prefixedSubKey}"`);

    }

    debug.log(`Implement ThemePart "${prefixedKey}"`);
}

export function defaultParseArray(array, level, path) {
    return { todo: array };
}

function getSingleKeyAssertUri(jxonTree) {
    return getSingleKeyFromJxon(jxonTree, VisioJxonThemeSubKeyVt.uri)
}

function getSingleKeyAssertXmlnsVt(jxonTree) {
    return getSingleKeyFromJxon(jxonTree, VisioJxonThemeSubKeyVt.xmlnsVt)
}

/**
 * @param {VisioJxon} visioJxon
 * @param {
 *      VisioJxonThemeSubKey|
 *      VisioJxonThemeSubKeyA|
 *      VisioJxonThemeSubKeyVt} ignoreKey
 * @returns {VisioJxonThemeSubKey}
 */
function getSingleKeyFromJxon(visioJxon, ignoreKey) {
    assertAttributesLength(
        'ThemeDefinition',
        visioJxon,
        2
    );

    assertIsVisioObjectWithKeys(
        'ThemeDefinition',
        visioJxon,
        [
            ignoreKey,
        ],
    );

    return (
        Object.keys(visioJxon)
            .filter(key => key !== ignoreKey)
    )[0];
}
