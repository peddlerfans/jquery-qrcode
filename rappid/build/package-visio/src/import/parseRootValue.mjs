import { VisioAttribute } from '../types/enums.mjs';
import {
    asBooleanTristate,
    asInteger,
    asNumber
} from '../helpers/convert.mjs';
import { debug } from '../helpers/debug.mjs';


/**
 * Root value means - directly converted to key value on {VisioObject}
 *
 * @param {string} attributeName - (normalizedAttributeName)
 * @param {string|null} value - in jxon everything is string
 * @param {VisioJxonType} jxonType
 * @returns {string|number|boolean|null}
 */
export function parseRootValue(attributeName, value, jxonType) {
    // root value must be whitelisted
    if (!VisioAttribute.hasOwnProperty(attributeName))
    // logAndThrow(`Unknown "VisioAttribute.${attributeName}"`);
        debug.log(`Unknown VisioAttribute.${attributeName}`);

    if (value === null) return null;

    //TODO miky number enums

    //TODO miky use doc dump
    //TODO miky use doc dump
    //TODO miky use doc dump

    // as integer ------------------------------------------------------------------------
    if ([
        VisioAttribute.id,             // by docs unsignedInt
        VisioAttribute.masterId,         // check docs
        VisioAttribute.masterShapeId,  // check docs
        VisioAttribute.fromSheet,      // check docs
        VisioAttribute.fromPart,       // check docs
        VisioAttribute.toSheet,        // check docs
        VisioAttribute.toPart,         // check docs
        VisioAttribute.index,
        // VisioAttribute.,
    ].includes(attributeName))
        return asInteger(value);

    // as number -------------------------------------------------------------------------
    if ([
        VisioAttribute.patternFlags, // by docs unsignedShort
        VisioAttribute.masterType,   // by docs unsignedShort
        VisioAttribute.alignName,    // by docs unsignedShort
        VisioAttribute.iconSize,     // by docs unsignedShort
        VisioAttribute.topPage,
        VisioAttribute.defaultTextStyle,
        VisioAttribute.defaultLineStyle,
        VisioAttribute.defaultFillStyle,
        VisioAttribute.defaultGuideStyle,
        VisioAttribute.glueSettings,
        VisioAttribute.snapSettings,
        VisioAttribute.snapExtensions,
        VisioAttribute.fillStyle,
        VisioAttribute.lineStyle,
        VisioAttribute.textStyle,
        VisioAttribute.backPage,
        // VisioAttribute.,
    ].includes(attributeName))
        return asNumber(value);

    // as boolean ------------------------------------------------------------------------
    if ([
        VisioAttribute.isCustomNameU,
        VisioAttribute.isCustomName,
        VisioAttribute.hidden,
        VisioAttribute.iconUpdate, //TODO miky investigate
        VisioAttribute.matchByName, //TODO miky investigate
        VisioAttribute.protectStyles,
        VisioAttribute.protectShapes,
        VisioAttribute.protectMasters,
        VisioAttribute.protectBkgnds,
        VisioAttribute.dynamicGridEnabled,
        VisioAttribute.deleted,
        VisioAttribute.background,
    ].includes(attributeName))
        return asBooleanTristate(value);


    return value;
}
