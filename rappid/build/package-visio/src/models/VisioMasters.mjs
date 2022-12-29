import { VisioRelObject } from './VisioRelObject.mjs';
import { debug } from '../helpers/debug.mjs';
import { VisioJxonType } from '../types/enums.mjs';
import { VisioMaster } from './VisioMaster.mjs';
import { parseJxon } from '../import/parseJxon.mjs';

export class VisioMasters extends VisioRelObject {

    constructor(init, prefixList) {
        super(init, prefixList);

        /** @type {Map.<number, VisioMaster>} */
        this.map = new Map();
    }

    /**
     * @param {VisioMaster} parsedMaster
     * @return {VisioMaster}
     */
    add(parsedMaster) {
        const masterId = parsedMaster.id;
        const relId = parsedMaster._rel;
        const rel = this.getRelById(relId);

        // enrich relation with "real" masterId (from parsed master{n}.xml)
        // masters.xml has only basic attributes & rel to path
        rel.masterId = masterId;

        const xmlPath = rel.targetFile.absolutePath;

        const master = new VisioMaster({
            archive: this.archive,
            masters: this,
            xmlPath,
            masterContentsSet: false, // will be set via addIntoById
            ...parsedMaster
        });

        this.map.set(masterId, master);

        return master;
    }

    getRelById(relId) {
        return this.rels
            .get(VisioJxonType.Master)
            .get(relId);
    }

    /**
     * Second phase
     *
     * @param {number} masterId
     * @param {VisioMaster} parsedMasterContent
     */
    addIntoById(masterId, parsedMasterContent) {
        const master = this.map.get(masterId);

        master.setMasterContents({
            ...parsedMasterContent
        });
    }

    getIdByPath(masterAbsolutePath) {
        const masterRels = this.rels.get(VisioJxonType.Master);
        const relsArray = [...masterRels.values()];
        const rel = relsArray
            .find(rel => rel.targetFile.absolutePath === masterAbsolutePath);

        if (!rel) debug.log('Unknown master');

        return rel.masterId;
    }

    /**
     * @param {number} id
     * @returns {VisioMaster}
     */
    get(id) {
        const master = this.map.get(id);

        return master;
    }

    async loadMasters(mastersRelsMap) {
        const archive = this.archive;

        // this rel id of master is misleading !!! (find right one in mastersRels)
        // this id is only page related
        for (let [, masterRelation] of mastersRelsMap.entries()) {
            const masterPath = masterRelation.targetFile.absolutePath;
            const masterId = this.getIdByPath(masterPath);
            const master = this.get(masterId);

            // already loaded
            if (master.masterContentsSet) continue;

            const masterJxon = await archive.getJxonAsync(masterPath);
            const parsedMasterContent =
                await parseJxon.call(
                    archive,
                    masterJxon,
                    VisioJxonType.Master,
                    [],
                    {
                        structurePathEnrichObject: {
                            masterId
                        }
                    });

            master.setMasterContents(parsedMasterContent);
        }
    }

}
