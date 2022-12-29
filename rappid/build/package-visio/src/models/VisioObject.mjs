/**
 * @property {string} _xmlPath - absolute path
 */
import { debug } from '../helpers/debug.mjs';
import { VisioAttribute } from '../types/enums.mjs';
import { VisioJxonType } from '../types/enums.mjs';

/**
 * Top parent class for all objects
 *
 * @property {Visio} _visio
 * @property {string} _xmlPath
 * @property {VisioRelationMap} _rels
 */
export class VisioObject {

    getDefaultAttributes() {
        return {
            archive: null, // required in constructor
        }
    }

    constructor(init, prefixList = new Set()) {

        this.assertArchiveDefined(init);

        const initWithDefaults = {
            ...this.getDefaultAttributes(),
            ...init
        };
        prefixList.add(VisioAttribute.archive);

        this._prefixList = prefixList;

        this.setAttributes(initWithDefaults);
    }

    get prefixList() {
        return this._prefixList;
    }

    setAttribute(attributeName, value) {
        // prefix
        if (this.prefixList.has(attributeName))
            attributeName = `_${attributeName}`;

        this[attributeName] = value;
    }

    setAttributes(init) {
        Object.entries(init)
            .forEach(([attributeName, value]) =>
                this.setAttribute(attributeName, value)
            );

        if ('structurePath' in init) {
            this.setOwner(init.structurePath);
        }
    }

    setOwner(structurePath) {
        if (structurePath.length === 1) {
            this.owner = structurePath[0].jxonType;
            return;
        }

        if (hasJxonType(structurePath, VisioJxonType.StyleSheet))
            this.owner = 'Document-Stylesheet'
        else if (hasJxonType(structurePath, VisioJxonType.DocumentSheet))
            this.owner = 'Document-DocumentSheet'
        else if (hasJxonType(structurePath, VisioJxonType.PageSheet)) {
            if (hasJxonType(structurePath, VisioJxonType.Page)) {
                this.owner = 'Page-PageSheet'
            } else if (hasJxonType(structurePath, VisioJxonType.Master)) {
                this.owner = 'Master-PageSheet'
            } else {
                debug.log('Unknown PageSheet owner');
            }
        } else if (hasJxonType(structurePath, VisioJxonType.Shape)) {
            if (hasJxonType(structurePath, VisioJxonType.Page)) {
                this.owner = 'Page-Shape'
            } else if (hasJxonType(structurePath, VisioJxonType.Master)) {
                this.owner = 'Master-Shape'
            } else {
                debug.log('Unknown Shape owner');
            }
        } else if (!window.tests) {
            // TODO: Roman
        }
    }

    set parent(parent) {
        this._parent = parent;
    }

    get parent() {
        return this._parent;
    }

    get archive() {
        return this._archive; // required in constructor
    }

    assertArchiveDefined(init) {
        if (!init.hasOwnProperty('archive') || !init.archive) {
            debug.log('Missing archive reference in constructor', this);
        }
    }
}

/**
 * @param {VisioStructurePath} structurePath
 * @param {VisioJxonType} jxonType
 */
function hasJxonType(structurePath, jxonType) {
    return structurePath.some(fragment => fragment.jxonType === jxonType);
}
