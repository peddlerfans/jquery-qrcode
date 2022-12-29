/**
 * @this {VisioCells}
 * @param cell
 * @param valueType
 * @returns {boolean|number}
 */
import { VisioThemeValKey } from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';

export function themedResolver(cell, valueType) {
    const { name } = cell;

    if (name === 'lineColor') return themeVal(VisioThemeValKey.Dark);
    if (name === 'linePattern') return 1; // solid line
    if (name === 'lineColorTrans') return false;

    if (name === 'fillForegnd') return themeVal(VisioThemeValKey.Light);
    if (name === 'fillPattern') return 1; // solid fill color
    if (name === 'fillForegndTrans') return 0; // 0-1

    if (name === 'style') return 0; // 0 - unformatted
    if (name === 'lineWeight') return 1; //TODO


    //TODO find right value
    if (name === 'font') return undefined;
    if (name === 'asianFont') return undefined;
    if (name === 'complexScriptFont') return undefined;
    if (name === 'color') return themeVal(VisioThemeValKey.Dark);
    if (name === 'fillBkgnd') return themeVal(VisioThemeValKey.Light);
    if (name === 'fillBkgndTrans') return false;

    // todo: finish this up ...
}

/**
 * @param {VisioThemeValKey} key
 */
function themeVal(key) {
    // exact
    if (key === VisioThemeValKey.Light) return '#ffffff';
    if (key === VisioThemeValKey.Dark) return '#000000';
    if (key === VisioThemeValKey.AccentColor) return '#c05046';
    if (key === VisioThemeValKey.AccentColor2) return '#9dbb61';
    if (key === VisioThemeValKey.AccentColor3) return '#ab9ac0';
    if (key === VisioThemeValKey.AccentColor4) return '#4bacc6';
    if (key === VisioThemeValKey.AccentColor5) return '#f59d56';
    if (key === VisioThemeValKey.AccentColor6) return '#ffc000';
    if (key === VisioThemeValKey.VariantColor1) return '#c05046';
    if (key === VisioThemeValKey.VariantColor2) return '#9dbb61';
    if (key === VisioThemeValKey.VariantColor3) return '#ab9ac0';
    if (key === VisioThemeValKey.VariantColor4) return '#4bacc6';
    if (key === VisioThemeValKey.VariantColor5) return '#f59d56';
    if (key === VisioThemeValKey.VariantColor6) return '#ffc000';
    if (key === VisioThemeValKey.VariantColor7) return '#000000';

    debug.log('Unknown themeVal');
    // if (key === 'FillColor') return 'red';
}
