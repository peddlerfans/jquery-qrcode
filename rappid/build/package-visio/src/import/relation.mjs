import {
    VisioFilePath,
    VisioJxonRelationKey,
    VisioRelationSchemaToType,
    XmlSchemaKey,
} from '../types/enums.mjs';
import {
    assertIsRelationshipJxon,
} from './assert/jxon.mjs';
import { debug } from '../helpers/debug.mjs';
import { relationshipToNumber } from '../helpers/relationshipToNumber.mjs';
import { getTargetAbsolutePath } from '../helpers/path.mjs';
import { toArray } from '../helpers/toArray.mjs';
import { expectedSchema } from './assert/xmlSchema.mjs';


/**
 * @param {{string: JXONTree}} JXONMap
 * @returns {JXONTree}
 */
export function getDocumentRelationships(JXONMap) {

    const mastersJxonFile = JXONMap[VisioFilePath.DocumentRels];
    expectedSchema(mastersJxonFile, XmlSchemaKey.Relationships);
    const mastersArrayOfJxons = mastersJxonFile[VisioJxonRelationKey.Relationship];

    return getRelationShipsMap(
        {
            relationshipOrArrayOfJxons: mastersArrayOfJxons,
            jxonMapKeys:
            // not files - just keys - for validation only
                Object.keys(JXONMap),
            basePath: VisioFilePath.DocumentRels,
        }
    );
}

/**
 * @param {VisioJxon} relationshipOrArrayOfJxons
 * @param {string} basePath
 * @returns {*}
 */
export function getRelationShipsMap(
    {
        relationshipOrArrayOfJxons,
        basePath,
    }
) {
    const arrayOfRelationshipJxons = toArray(relationshipOrArrayOfJxons);
    arrayOfRelationshipJxons.forEach(relationshipJxon =>
        assertIsRelationshipJxon(relationshipJxon));

    return arrayOfRelationshipJxons.reduce(
        (relationshipsMap, relationshipJxon) => {
            // type
            const type = relationshipJxon[VisioJxonRelationKey.Type];
            if (!VisioRelationSchemaToType.hasOwnProperty(type)) {
                debug.log(`Unknown Relation Type "${type}"`, { relationshipJxon });
                return relationshipsMap;
            }

            // targetFileRelativePath
            const targetFileRelativePath = relationshipJxon[VisioJxonRelationKey.Target];
            const targetFileAbsolutePath = getTargetAbsolutePath(
                targetFileRelativePath,
                basePath
            );

            const id = relationshipJxon[VisioJxonRelationKey.Id];
            const idNumber = relationshipToNumber(id);
            const debugType = VisioRelationSchemaToType[type];

            const item = {
                id: idNumber,
                targetFile: {
                    relativePath: targetFileRelativePath,
                    absolutePath: targetFileAbsolutePath,
                    // jxon: JXONMap[targetFileAbsolutePath],
                },
                debugType,
            };

            // first of type
            if (!relationshipsMap.has(debugType))
                relationshipsMap.set(debugType, new Map());
            // add item
            relationshipsMap.get(debugType).set(idNumber, item);

            return relationshipsMap;
        }, new Map()
    )
}

/**
 * @this {Visio}
 * @param {Map} documentRelationsMap
 * @param {VisioRelationType} relationType
 * @return {string|null}
 */
export function getSingleRecordPath(documentRelationsMap, relationType) {
    const singleRecordRelationMapItem = documentRelationsMap.get(relationType);
    if (!singleRecordRelationMapItem)
        return null;

    const documentRelation =
        getSingleRecord(
            singleRecordRelationMapItem
        );

    return documentRelation.targetFile.absolutePath;
}

export function getRelsPath(absolutePath) {
    return absolutePath.replace(
        /^(?<basePath>.*?)(?<filename>[^/]*?)$/,
        '$<basePath>_rels/$<filename>.rels'
    );
}

/**
 * @throws
 * @param {VisioRelationMap} singleRecordRelationMap
 * @returns {VisioRelation}
 */
function getSingleRecord(singleRecordRelationMap) {
    if (singleRecordRelationMap.size !== 1)
        debug.log('Is not single record JXON', { singleRecordRelationMap });

    return singleRecordRelationMap.values().next().value;
}

// /**
//  * @param {JXONTree} relationJxon
//  * @param {VisioRelationType} type
//  * @returns {VisioRelationMap}
//  */
// export function getParsedRelation(relationJxon, { type = null }) {
//     assertIsRelationshipJxon(relationJxon, { type });
//
//
//     return relationJxon;
// }
