import { VisioConvertType } from '../types/enums.mjs';
import { VisioValueType } from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';
import { VisioUnitType } from '../types/enums.mjs';

// /**
//  * when setting cell (all parts value, units, formula)
//  *
//  * @param {string} value
//  * @param {VisioValueType} visioType
//  */
// export function convertCellValue(value, visioType) {
//     const valueType = getCellType(visioType);
//
//
//     return value;
// }

/**
 *
 * @param {VisioValueType} visioType - documentation type
 * @param {VisioCell} cell - for debug
 * @return {VisioConvertType | string} - "exact convert function"
 */
export function getConvertType(visioType, cell) {
    //return VisioConvertType.ignore;

    const specialConvertType = getSpecialConvertType(visioType, cell)
    if (specialConvertType !== null) return specialConvertType;

    if (cell.units === VisioUnitType.PER)
        return VisioConvertType.percentage;

    switch (visioType) {
        case VisioValueType.vScalar:
        case VisioValueType.PtgNum: // docs: double precision floating-point number
        case VisioValueType.PtgByte:
        case VisioValueType.PtgShort:
        case VisioValueType.PtgUnsShort:
        case VisioValueType.PtgInt:
        case VisioValueType.PtgNumI:
            return VisioConvertType.number;

        case VisioValueType.vLength: // MUST be interpreted as a lengthInternalUnitNumber
            return VisioConvertType.internalUnitsToPixels;

        case VisioValueType.PtgDate:
            return VisioConvertType.date;

        case VisioValueType.vAngle:
            return VisioConvertType.internalUnitsToDegrees;

        case VisioValueType.PtgBool:
            //return VisioConvertType.booleanTriState;
            return VisioConvertType.booleanStrict;

        case VisioValueType.PtgColorRGB:
        case VisioValueType.vColor:
            return VisioConvertType.color;

        //TODO miky resolve according to doc
        case VisioValueType.vAny:
            if (cell.units !== 'STR' && cell.name !== 'value')
                debug.log('resolve VisioValueType.vAny', cell);
        // eslint-disable-next-line
        case VisioValueType.vFont:
        case VisioValueType.vLanguageString:
        case VisioValueType.vFormatString:
        case VisioValueType.PtgString:
        case VisioValueType.formulaExpression:
            return VisioConvertType.asIs;
    }

    debug.log('unresolved cell type');

}

function getSpecialConvertType(visioType, cell) {
    // by docs vScalar treating as vLength
    if ([
        'pageBottomMargin',
        'pageLeftMargin',
        'pageRightMargin',
        'pageTopMargin',
    ].includes(cell.name)) {
        return VisioConvertType.internalUnitsToPixels;
    }

    return null;
}
