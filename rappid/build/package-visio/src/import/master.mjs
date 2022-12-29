import {
    // VisioJxonMasterKey,
    VisioJxonType,
    // VisioJxonRelKey,
    VisioRelationType,
    VisioJxonRelationKey,
    VisioFilePath,
    VisioShapeDebugType,
    XmlSchemaKey,
} from '../types/enums.mjs';

import { debug } from '../helpers/debug.mjs';
import { assertIsMasterJxon } from './assert/jxon.mjs';
import { getRelationShipsMap } from './relation.mjs';
import { toArray } from '../helpers/toArray.mjs';
import { parseJxon } from './parseJxon.mjs';
import { expectedSchema } from './assert/xmlSchema.mjs';

/**
 * @this {Visio}
 * @param masterJxon
 * @returns {VisioMaster}
 */
export async function getSingleMaster(masterJxon){
    assertIsMasterJxon(masterJxon);

    const master = /** @type {VisioMaster} */await parseJxon.call(
        this,
        masterJxon,
        VisioJxonType.Master);

    return master;
}


/**
 * @this {Visio}
 * @param mastersJXONArray
 * @returns {*}
 */
export function getMastersMap(mastersJXONArray) {
    return mastersJXONArray.reduce(
        (mastersMap, masterJxon) => {
            const master = getSingleMaster.call(this, masterJxon);

            //TODO miky temporarily during development (PROD shape !== null)
            if (master === null) return mastersMap;

            master.debugType = VisioShapeDebugType.GeneralMaster;
            mastersMap.set(master.id, master);

            return mastersMap;
        }, new Map()
    );
}

export function getMastersJxonArray(relationships, jxonMap) {
    const mastersRelations = relationships[VisioRelationType.s];
    const mastersRelation = getMastersRelation(mastersRelations);
    const mastersFilePath = mastersRelation.targetFile.absolutePath;

    const mastersJxon = jxonMap[mastersFilePath];
    expectedSchema(mastersJxon, XmlSchemaKey.Main);

    if (!mastersJxon || !mastersJxon.Master) {
        debug.log('Master not found', { mastersJxon });
        return [];
    }

    const masters = mastersJxon.Master;
    const mastersJxonsArray = toArray(masters);

    //TODO miky check if flat() still necessary (some map from examples had triggered)
    const mastersJxonsArrayNormalized = mastersJxonsArray.flat();

    mastersJxonsArrayNormalized.forEach(assertIsMasterJxon);

    return mastersJxonsArrayNormalized;
}

function getMastersRelation(mastersRelations) {
    const keys = Object.keys(mastersRelations);
    if (keys.length !== 1)
        debug.log('Can\'t resolve masters relation', { mastersRelations });

    return mastersRelations[keys[0]];
}

export function getMastersPaths(JXONMap) {
    const filePath = VisioFilePath.MastersRels;
    const relsListJxon = JXONMap[filePath];
    expectedSchema(relsListJxon, XmlSchemaKey.Relationships);

    const relsListArrayOfJxons = relsListJxon[VisioJxonRelationKey.Relationship];
    const relMap = getRelationShipsMap(
        {
            relationshipOrArrayOfJxons: relsListArrayOfJxons,
            jxonMapKeys: Object.keys(JXONMap),
            basePath: filePath,
        }
    );

    if (!relMap.Master) return [];


    return relMap;
}
