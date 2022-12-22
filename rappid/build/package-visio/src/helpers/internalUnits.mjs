/*
 * Internal units
 *
 * @see {Docs 2.3.4.2.5 Cell_Type}
 *
 * AC Acres
 * DEG Degrees
 * DA Radians
 * AD Degrees-minutes-seconds
 * RAD Radians
 * BOOL Boolean
 * COLOR RGB color value
 * CY Currency
 * DATE Days
 * ED Days
 * EH Hours
 * EM Minutes
 * ES Seconds
 * EW Weeks
 * HA Hectare
 * CM Centimeters
 * DL Inches
 * FT Feet
 * F_I Feet and inches
 * IN Inches
 * IN_F Inches
 * KM Kilometers
 * M Meters
 * MI Miles
 * MI_F Miles
 * MM Millimeters
 * NM Nautical miles
 * PER Percentage
 * YD Yards
 * DP Inches
 * PNT Coordinates of a two-dimensional point
 * STR String
 * DE Days
 * C_D Ciceros and didots
 * C Ciceros
 * D Didots
 * DT Points
 * P Picas
 * P_PT Picas and points
 * PT Points
 */

import { VisioUnitType } from '../types/enums.mjs';
import { debug } from './debug.mjs';
import { round as roundFn } from './round.mjs';
import { asNumber } from './convert.mjs';

export function stringToPixels(string, units) {
    return toPixels(asNumber(string), units);
}

export function fromPixels(value, units = VisioUnitType.IN) {
    if (value === undefined || !units) {
        debug.log('Value and target unit type are required to convert a pixel value.');
    }

    value = Number.parseFloat(value);
    if (Number.isNaN(value)) {
        debug.log('fromPixels requires a numeric value.');
    }

    switch (units) {
        case VisioUnitType.IN:
        case VisioUnitType.IN_F:
        case VisioUnitType.DL:
        case VisioUnitType.DP:
            return pixelsToInches(value);
        case VisioUnitType.DT:
        case VisioUnitType.PT:
            return pixelsToPoints(value);
        case VisioUnitType.MM:
            return pixelsToMillimeters(value);
        case VisioUnitType.CM:
            return pixelsToCentimeters(value);
        default:
            debug.log(`Unsupported numeric unit type "${unitDisplayName(units)}" ("${units}")`);
            return value;
    }
}

export function toPixels(value, units = VisioUnitType.IN) {
    if (value === undefined || !units) {
        debug.log('Value and target unit type are required to convert to a pixel value.');
    }

    // todo: support more units
    switch (units) {
        case VisioUnitType.IN:
        case VisioUnitType.IN_F:
        case VisioUnitType.DL:
        case VisioUnitType.DP:
            return inchesToPixels(value);
        case VisioUnitType.MM:
            return millimetersToPixel(value);
        case VisioUnitType.CM:
            return centimetersToPixel(value);
        case VisioUnitType.DT:
        case VisioUnitType.PT:
            // points are not pixels (1 pt = 1/72 inch)
            // todo: suspiciously low value
            // drawing1.vsdx 0.006944444444444444 Points
            // logAndThrow('investigate VisioUnitType.PT');
            return pointsToPixel(value);
        default: {
            debug.log(`Unsupported numeric unit type "${unitDisplayName(units)}" ("${units}")`);
            return value;
        }
    }
}

/**
 * @param {number} inches
 * @returns {number}
 */
export function inchesToPixels(inches) {
    return inches * 96;
}

/**
 * @param {number} millimeters
 * @returns {number}
 */
export function millimetersToPixel(millimeters) {
    return millimeters * 3.7795275591;
}

export function pixelsToMillimeters(pixels) {
    return pixels / 3.7795275591;
}

/**
 * @param {number} centimeters
 * @returns {number}
 */
export function centimetersToPixel(centimeters) {
    const millimeters = centimeters * 10;
    return millimetersToPixel(millimeters);
}

export function pixelsToCentimeters(pixels) {
    const millimeters = pixelsToMillimeters(pixels);
    return millimeters / 10;
}

/**
 * 1 pt = 1/72 inch
 * @param {number} points
 * @returns {number}
 */
export function pointsToPixel(points) {
    const inch = points / 72;
    return inchesToPixels(inch);
}

export function pixelsToPoints(pixels) {
    const inch = pixelsToInches(pixels);
    return inch * 72;
}

/**
 * @param {number} inches
 * @returns {number}
 */
export function pixelsToInches(pixels) {
    return pixels / 96;
}

/**
 * @param stringValue - radians counterclockwise
 * @param {boolean} round
 * @param {VisioUnitType} units
 * @param {number} decimalPlaces
 * @returns {number} - degrees clockwise
 */
export function toDegrees(stringValue, {
    round = true,
    decimalPlaces = 2,
    units = VisioUnitType.RAD,
} = {}) {
    // in xml all values as a string
    let value = Number(stringValue);

    //TODO miky support more units
    if (
        units === VisioUnitType.RAD ||
        units === VisioUnitType.DA
    ) {
        // convert radians counterclockwise to degrees clockwise
        value = 360 - (value * 180 / Math.PI);
    } else if (units === VisioUnitType.DEG) {
        // degrees by default
    } else if (units === VisioUnitType.AD && value === 0) {
        // ignore zero
        //TODO miky when something usable, parse by it
    } else {
        debug.log(`Implement unit type "${unitDisplayName(units)}" ("VisioUnitType.${units}")`)
    }

    // normalize
    value = value % 360;

    // round to exact decimal places
    if (round)
        value = roundFn(value, decimalPlaces);

    return value;
}

/**
 * @param {VisioUnitType} unitType
 */
export function unitDisplayName(unitType) {
    if (!VisioUnitType.hasOwnProperty(unitType)) throw `Unknown unit type "${unitType}".`;

    return {
        [VisioUnitType.AC]: 'Acres',
        [VisioUnitType.DEG]: 'Degrees',
        [VisioUnitType.DA]: 'Radians',
        [VisioUnitType.AD]: 'Degrees-minutes-seconds',
        [VisioUnitType.RAD]: 'Radians',
        [VisioUnitType.BOOL]: 'Boolean',
        [VisioUnitType.COLOR]: 'RGB color value',
        [VisioUnitType.CY]: 'Currency',
        [VisioUnitType.DATE]: 'Days',
        [VisioUnitType.ED]: 'Days',
        [VisioUnitType.EH]: 'Hours',
        [VisioUnitType.EM]: 'Minutes',
        [VisioUnitType.ES]: 'Seconds',
        [VisioUnitType.EW]: 'Weeks',
        [VisioUnitType.HA]: 'Hectare',
        [VisioUnitType.CM]: 'Centimeters',
        [VisioUnitType.DL]: 'Inches',
        [VisioUnitType.FT]: 'Feet',
        [VisioUnitType.F_I]: 'Feet and inches',
        [VisioUnitType.IN]: 'Inches',
        [VisioUnitType.IN_F]: 'Inches',
        [VisioUnitType.KM]: 'Kilometers',
        [VisioUnitType.M]: 'Meters',
        [VisioUnitType.MI]: 'Miles',
        [VisioUnitType.MI_F]: 'Miles',
        [VisioUnitType.MM]: 'Millimeters',
        [VisioUnitType.NM]: 'Nautical miles',
        [VisioUnitType.PER]: 'Percentage',
        [VisioUnitType.YD]: 'Yards',
        [VisioUnitType.DP]: 'Inches',
        [VisioUnitType.PNT]: 'Coordinates of a two-dimensional point',
        [VisioUnitType.STR]: 'String',
        [VisioUnitType.DE]: 'Days',
        [VisioUnitType.C_D]: 'Ciceros and didots',
        [VisioUnitType.C]: 'Ciceros',
        [VisioUnitType.D]: 'Didots',
        [VisioUnitType.DT]: 'Points',
        [VisioUnitType.P]: 'Picas',
        [VisioUnitType.P_PT]: 'Picas and points',
        [VisioUnitType.PT]: 'Points',
    }[unitType];
}
