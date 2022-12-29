import { getRootAttributes } from './parseJxon.utils.mjs';
import { VisioJxonDocumentKey, VisioJxonType } from '../types/enums.mjs';
import { getKeyValuesFromJxon } from './getKeyValueFromJxon.mjs';
import {
    assertIsDocumentColorEntryRgbJxon,
    assertIsDocumentColorJxon
} from './assert/jxon.mjs';
import { toArray } from '../helpers/toArray.mjs';
import { debug } from '../helpers/debug.mjs';

export function parseDocumentSettings(documentSettingsJxon, structurePath) {
    const rootAttributes = getRootAttributes(
        documentSettingsJxon,
        VisioJxonType.DocumentSettings,
        structurePath);

    return getKeyValuesFromJxon(
        documentSettingsJxon,
        rootAttributes
    );
}

/**
 * @param {VisioJxon} colorsJxon
 * @param {VisioStructurePath} structurePath
 * @returns {Map}
 */
export function parseColors(colorsJxon, structurePath) {
    assertIsDocumentColorJxon(colorsJxon);

    const baseColors = getDefaultColors();

    const colorEntriesArray = toArray(colorsJxon[VisioJxonDocumentKey.ColorEntry]);

    return colorEntriesArray.reduce(
        (colorEntriesById, colorEntryJxon) => {
            assertIsDocumentColorEntryRgbJxon(colorEntryJxon);
            const ix = colorEntryJxon[VisioJxonDocumentKey.Ix];
            const rgb = colorEntryJxon[VisioJxonDocumentKey.Rgb];

            if (colorEntriesById.has(ix))
                debug.log('Color override', { colorsJxon });

            colorEntriesById.set(ix, rgb);

            return colorEntriesById;
        },
        baseColors
    );

}

/**
 * @returns {Map<number, string>}
 */
export function getDefaultColors() {
    const base = new Map();

    base.set(0, '#000000');
    base.set(1, '#FFFFFF');
    base.set(2, '#FF0000');
    base.set(3, '#00FF00');
    base.set(4, '#0000FF');
    base.set(5, '#FFFF00');
    base.set(6, '#FF00FF');
    base.set(7, '#00FFFF');
    base.set(8, '#800000');
    base.set(9, '#008000');
    base.set(10, '#000080');
    base.set(11, '#808000');
    base.set(12, '#800080');
    base.set(13, '#008080');
    base.set(14, '#C0C0C0');
    base.set(15, '#E6E6E6');
    base.set(16, '#CDCDCD');
    base.set(17, '#B3B3B3');
    base.set(18, '#9A9A9A');
    base.set(19, '#808080');
    base.set(20, '#666666');
    base.set(21, '#4D4D4D');
    base.set(22, '#333333');
    base.set(23, '#1A1A1A');

    return base;
}
