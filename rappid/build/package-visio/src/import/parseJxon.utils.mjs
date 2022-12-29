import { debug } from '../helpers/debug.mjs';
import {
    VisioAttribute,
    VisioJxonKey,
    VisioJxonRowAttributeName,
    VisioJxonSectionKey,
    VisioJxonShapeKey,
    VisioJxonShapeTextKey,
    VisioJxonType
} from '../types/enums.mjs';
import { parseRootValue } from './parseRootValue.mjs';
import { firstLetterLowercase } from '../helpers/firstLetterLowercase.mjs';

/**
 * @param {VisioShapeJxon|VisioMasterJXON|VisioJxon} jxon
 * @param {VisioJxonShapeKey|string} jxonType
 * @returns {{string: string}}
 * @param {VisioStructurePath} structurePath
 * @param {Object} [base]
 * @param {boolean} [ignoreNamespace]
 */
export function getRootAttributes(
    jxon,
    jxonType,
    structurePath,
) {
    const base = {};
    const ignoreNamespace = true;

    if (!structurePath)
        debug.log('Structure path not set.', { jxon, jxonType });

    if (!VisioJxonType.hasOwnProperty(jxonType))
        debug.log(`Unknown "VisioJXONType.${jxonType}"`);


    const result =  /** @type {{string: string}} */Object.entries(jxon)
        // only attributes (starting with @)
        .filter(([key, _value]) => key[0] === '@')
        // no namespace specific
        .filter(([key, _value]) => {
            if (!ignoreNamespace) return true;
            return ![
                VisioJxonKey.xmlns,
                VisioJxonKey.xmlnsR,
                VisioJxonKey.xmlSpace,
            ].includes(key)
        })
        // type specific
        // .filter(([key, _value]) => {
        //     if (jxonType === VisioJxonType.Section &&
        //         key === VisioJxonSectionKey.Name) return false;
        //
        //     return true;
        // })
        // convert to key: value structure
        .reduce(
            (objectRootAttributes, [attributeName, value]) => {
                let normalizedAttributeName =
                    normalizeRootKey(attributeName.substring(1), jxonType);

                objectRootAttributes[normalizedAttributeName] =
                    parseRootValue(normalizedAttributeName, value, jxonType);

                return objectRootAttributes;
            }, base
        );

    return result;

}


/**
 * @param {string} attributeNameFromXML
 * @param {VisioJxonType} jxonType
 * @returns {string}
 */
export function normalizeRootKey(attributeNameFromXML, jxonType) {

    // KEEP VISIO SYNTAX !!!

    // Visio related - common for all types - lower "d" in "ID" only
    if (attributeNameFromXML === 'IX') return 'index';
    if (attributeNameFromXML === 'ID') return 'id';
    if (attributeNameFromXML === 'UniqueID') return 'uniqueId';
    if (attributeNameFromXML === 'OriginalID') return 'originalId';
    if (attributeNameFromXML === VisioJxonRowAttributeName.Deleted.substring(1))
        return VisioAttribute.deleted;

    // Visio unrelated - ShapeText - JXONTree syntax
    if (jxonType === VisioJxonType.ShapeText &&
        attributeNameFromXML === VisioJxonShapeTextKey.Content)
        // 'keyValue' =>
        return 'content';

    // section
    if (jxonType === VisioJxonType.Section &&
        attributeNameFromXML === VisioJxonSectionKey.Name.substring(1)) {
        // '@N' =>
        //TODO miky name or type?
        return 'type';
    }

    // section
    if (jxonType === VisioJxonType.Row) {

        if (attributeNameFromXML === VisioJxonRowAttributeName.Type.substring(1))
            // '@T' =>
            //TODO miky name or type?
            return 'type';

        if (attributeNameFromXML === VisioJxonRowAttributeName.Name.substring(1))
            // '@N' =>
            //TODO miky name or type?
            return 'name';
    }

    // shape
    if (jxonType === VisioJxonType.Shape) {
        if (attributeNameFromXML === VisioJxonShapeKey.MasterShapeId.substring(1))
            return VisioAttribute.masterShapeId; // '@MasterShape'
        if (attributeNameFromXML === VisioJxonShapeKey.MasterId.substring(1))
            return VisioAttribute.masterId; // '@MasterShape'
    }


    // default
    return firstLetterLowercase(attributeNameFromXML);
}
