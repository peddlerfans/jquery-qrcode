import { VisioRelObject } from './VisioRelObject.mjs';
import { debug } from '../helpers/debug.mjs';

export class VisioMasterShapes extends VisioRelObject {

    constructor(init, prefixList) {
        super(init, prefixList);

        /** @type {Map.<number, VisioMaster>} */
        this.map = new Map();
    }

    /**
     * @param {VisioMaster} parsedMasterShape
     */
    add(parsedMasterShape) {
        const relId = parsedMasterShape._rel;
        const masterId = parsedMasterShape.id;

        // enrich relation with "real" masterId (from parsed master{n}.xml)
        this.rels.get(relId).masterId = masterId;

        if (parsedMasterShape.cells)
            parsedMasterShape.cells.masterShape = parsedMasterShape;
        else {
            debug.log('master without cells', { parsedMasterShape });
        }

        this.map.set(masterId, parsedMasterShape);
    }

    /**
     * @param {number} id
     * @returns {VisioMaster}
     */
    get(id) {
        const masterShape = this.map.get(id);

        return masterShape;
    }


}
