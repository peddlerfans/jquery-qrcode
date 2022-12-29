/**
 * Typically, attribute name has its own default,
 * but may differ by place where are used
 *
 * @param {VisioCellName} cellAttributeName
 * @param {VisioStructurePath} structurePath
 */
import { VisioValueJavascriptType, VisioValueType } from '../types/enums.mjs';

export function getDefaultUnits(cellAttributeName, structurePath) {


}

// Parse token, custom structure, or custom token grouping Cell default value
// PtgNum           0.00
// PtgBool          0
// PtgString        ""
// PtgByte          0
// PtgColorRGB      #000000
// PtgShort         0
// PtgDate          0.00 days
// PtgInt           0
// PtgUnsShort      0
// PtgNumI          0.00 inches
// vLanguageString  ""
// vFont            "0"
// vAny             0.00 days
// vAngle           0.00 radians
// vLength          0.00 inches
// vColor           #000000
// vFormatString    ""
//
//
//
export const VisioValueDefaultsMap = {
    [VisioValueType.PtgNum]: {
        value: 0,
        type: VisioValueJavascriptType.Double,
        //TODO miky work with decimals?
        docsValue: '0.00'
    },
    [VisioValueType.PtgBool]: {
        value: 0,
        type: VisioValueJavascriptType.BoolAsNnumber,
        docsValue: '0'
    },
    [VisioValueType.PtgString]: {
        value: '',
        type: VisioValueJavascriptType.String,
        docsValue: '""'
    },
    [VisioValueType.PtgByte]: {
        value: 0,
        type: VisioValueJavascriptType.Byte,
        docsValue: '0'
    },
    [VisioValueType.PtgColorRGB]: {
        value: '#000000',

        type: VisioValueJavascriptType.Color,
        docsValue: '#000000'
    },
    [VisioValueType.PtgShort]: {
        value: 0,
        type: VisioValueJavascriptType.Int,
        docsValue: '0'
    },
    [VisioValueType.PtgDate]: {
        type: VisioValueJavascriptType.StringToParse,
        value: 0,
        posix: 'days',
        docsValue: '0.00 days'
    },
    [VisioValueType.PtgInt]: {
        type: VisioValueJavascriptType.Int,
        value: 0,
        docsValue: '0'
    },
    [VisioValueType.PtgUnsShort]: {
        type: VisioValueJavascriptType.Int,
        value: 0,
        docsValue: '0'
    },
    [VisioValueType.PtgNumI]: {
        type: VisioValueJavascriptType.Inches, // StringToParse
        Value: 0,
        posix: 'inches',
        docsValue: '0.00 inches'
    },
    [VisioValueType.vLanguageString]: {
        type: VisioValueJavascriptType.String,
        value: '',
        docsValue: '""',
    },
    [VisioValueType.vFont]: {
        type: VisioValueJavascriptType.NumberAsAString,
        value: '0',
        docsValue: '"0"'
    },
    [VisioValueType.vAny]: {
        type: VisioValueJavascriptType.StringToParse,
        value: 0,
        posix: 'days',
        docsValue: '0.00 days'
    },
    [VisioValueType.vAngle]: {
        type: VisioValueJavascriptType.StringToParse,
        value: 0,
        posix: 'radians',
        docsValue: '0.00 radians'
    },
    [VisioValueType.vLength]: {
        type: VisioValueJavascriptType.StringToParse,
        value: 0,
        posix: 'inches',
        docsValue: '0.00 inches'
    },
    [VisioValueType.vColor]: {
        type: VisioValueJavascriptType.StringToParse,
        value: '#000000',
        docsValue: '#000000'
        // hex | enum (getColorFromCode) | 'Themed'
    },
    [VisioValueType.vFormatString]: {
        type: VisioValueJavascriptType.String,
        value: '',
        docsValue: '""'
    },
};
