import { VisioJxonType } from '../types/enums.mjs';
import { getRootAttributes } from './parseJxon.utils.mjs';
import { debug } from '../helpers/debug.mjs';
import { VisioAttribute } from '../types/enums.mjs';


/**
 * @param {VisioJxonType} jxonType
 * @param {VisioJxon} jxon
 * @param {VisioStructurePath} structurePath
 * @param {string|null} [typeOverride]
 * @param {*|null} [structurePathEnrichObject]
 * @returns {VisioStructurePathFragment}
 */
export function getStructurePathFragment(
    jxonType,
    jxon,
    structurePath,
    {
        typeOverride = null,
        structurePathEnrichObject = null
    } = {}
) {
    if (!structurePath || !jxon)
        debug.log('Missing required attributes.');

    let result = {
        jxonType,
        xsdType: xsdTypeFromJxonType(jxonType),
    };

    //TODO miky
    // temporarily root attrs (this fragment will be used for final one)
    // structure path is one step behind
    const rootAttributes = getRootAttributes(jxon, jxonType, structurePath);

    const whiteList = [
        VisioAttribute.id,
        VisioAttribute.name,
        VisioAttribute.masterId,
        VisioAttribute.masterShapeId,
        VisioAttribute.type,
        VisioAttribute.index,
    ];

    whiteList.forEach(attributeName => {
        if (rootAttributes.hasOwnProperty(attributeName))
            result[attributeName] = rootAttributes[attributeName];
    });

    //TODO miky resolve correctly in getRootAttributes
    if (typeOverride) result.type = typeOverride;

    if (structurePathEnrichObject) {
        result = { ...result, ...structurePathEnrichObject };
    }

    return result;
}

/**
 * @param {VisioJxon} sectionJxon
 * @param {VisioStructurePath} structurePath
 * @param {VisioSectionType} type
 * @returns {VisioStructurePath}
 */
export function addSectionPath(sectionJxon, structurePathParam, type) {
    const jxonType = VisioJxonType.Section;

    const structurePath = structurePathParam.slice();

    return structurePath.concat(
        getStructurePathFragment(
            jxonType,
            sectionJxon,
            structurePath,
            { typeOverride: type }))
}

/**
 * @param {VisioStructurePath} structurePath
 * @param {VisioJxon} rowJxon
 * @param {VisioRowType} type
 * @returns {VisioStructurePath}
 */
export function addRowPath(rowJxon, structurePath, type) {
    const jxonType = VisioJxonType.Row;

    return structurePath.concat(
        getStructurePathFragment(
            jxonType,
            rowJxon,
            structurePath,
            { typeOverride: type }))
}

/**
 * @param {string} jxonType
 * @returns {string}
 */
function xsdTypeFromJxonType(jxonType) {
    //TODO miky exceptions (if any)

    return `${jxonType}_Type`;
}

export function sectionAndRowHappyCase(structurePath) {
    let shapeReached = false;
    const result = {};

    structurePath.forEach(fragment => {
        if (fragment.jxonType === VisioJxonType.Shape) {
            shapeReached = true;
            return;
        }
        if (!shapeReached) return;

        if (fragment.jxonType === VisioJxonType.Section)
            result.section = fragment;
        if (fragment.jxonType === VisioJxonType.Row)
            result.row = fragment;

    });

    return result;
}
