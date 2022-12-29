import { VisioAttribute } from '../types/enums.mjs';
import { VisioRelObject } from './VisioRelObject.mjs';

/**
 * @property {Array.<Page>} _pages
 */
export class VisioPages extends VisioRelObject {

    getDefaultAttributes() {
        return {
            // underscore prefixed (later)
            ...super.getDefaultAttributes(),
            pages: new Map()
        }
    }

    constructor(init) {
        super(init, new Set([
            // underscore prefixed (later)
            VisioAttribute.pages
        ]));

        // all prefixed "_"
        Object.entries(init).forEach(([key, value]) => {
            // prefix
            key = `_${key}`;
            return this[key] = value;
        });
    }

    get(id) {
        return this._pages.get(id) || null;
    }

    add(page) {
        const nextIndex = this._pages.size;
        page.index = nextIndex;
        this._pages.set(page.id, page);
    }

    toArray() {
        return [...this._pages.values()];
    }

}
