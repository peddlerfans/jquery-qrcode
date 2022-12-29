/**
 * @property {string} _xmlPath - absolute path
 */
import { debug } from '../helpers/debug.mjs';
import { VisioAttribute } from '../types/enums.mjs';
import { getRelationShipsMap, getRelsPath } from '../import/relation.mjs';
import { VisioObject } from './VisioObject.mjs';
import { XmlSchema } from '../types/enums.mjs';

/**
 * @property {Visio} _visio
 * @property {string} _xmlPath
 * @property {VisioRelationMap} _rels
 */
export class VisioRelObject extends VisioObject {

    getDefaultAttributes() {
        return {
            ...super.getDefaultAttributes(),

            rels: null,
            xmlPath: null,
        };
    }

    constructor(init, prefixList = new Set()) {
        prefixList.add(VisioAttribute.rels);
        prefixList.add(VisioAttribute.xmlPath);
        super(init, prefixList);
    }

    /**
     * @returns {Promise<VisioRelation>}
     */
    async getRelsMapCachedAsync(opt = {}) {

        // no path
        if (!this.xmlPath)
            debug.log('no xml path');

        // cached
        if (this.rels) return /** @type {VisioRelation} */this.rels;

        this.rels = await this.getRelsMapAsync.call(this.archive, this.xmlPath, opt);

        return this.rels;
    }

    /**
     * @param baseAbsolutePath
     * @returns {Promise<VisioRelationMap>}
     */
    async getRelsMapAsync(baseAbsolutePath, opt = {}) {
        const { overrideRels } = opt;
        const relsPath = getRelsPath(baseAbsolutePath);

        let pagesRelsJxon;
        if (overrideRels) {
            const { document: doc } = this;
            // failsafe but this should never happen
            if (!doc || !doc.masters || !doc.masters.map) {
                return null;
            }

            pagesRelsJxon = {
                '@xmlns': XmlSchema.Relationships,
                Relationship: []
            };

            // rebuild relationships from scratch, push all existing masters
            doc.masters.map.forEach((master, index) => {
                pagesRelsJxon.Relationship.push({
                    '@Id': `rId${index + 1}`,
                    '@Type': XmlSchema.VisioMasterRelationship,
                    '@Target': master._xmlPath.replace('visio', '..')
                });
            });
        } else {
            pagesRelsJxon = await this.getJxonAsync(relsPath);
        }

        if (!pagesRelsJxon) return null;

        return getRelationShipsMap({
            relationshipOrArrayOfJxons: pagesRelsJxon.Relationship,
            basePath: baseAbsolutePath,
        });
    }


    set rels(rels) {
        this._rels = rels;
    }

    get rels() {
        return this._rels;
    }

    set xmlPath(rels) {
        this._xmlPath = rels;
    }

    get xmlPath() {
        return this._xmlPath;
    }

}
