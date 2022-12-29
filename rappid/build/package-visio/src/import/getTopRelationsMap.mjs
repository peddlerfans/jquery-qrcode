import { getRelationShipsMap } from './relation.mjs';

/**
 * @this {Visio}
 * @returns {Promise<void>}
 */
export async function getTopRelationsMap() {
    // const promise = this.getJxonAsync('_rels/.rels');
    // const getTopRelationsMap = await promise();
    const topRelations = await this.getJxonAsync('_rels/.rels');

    return getRelationShipsMap(
        {
            relationshipOrArrayOfJxons: topRelations.Relationship,
            basePath: '/'
        }
    );
}

/**
 * @this {Visio}
 * @returns {Promise<void>}
 */
export async function getDocumentRelationsMap() {
    // const promise = this.getJxonAsync('_rels/.rels');
    // const getTopRelationsMap = await promise();
    const documentRelations = await this.getJxonAsync('visio/_rels/document.xml.rels');

    return getRelationShipsMap(
        {
            relationshipOrArrayOfJxons: documentRelations.Relationship,
            basePath: 'visio/'
        }
    );
}
