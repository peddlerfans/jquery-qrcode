/***
 * API for setting results - same as VisioObject
 */
export class VisioResult {

    constructor(init) {
        this._attributes = {};
        if (init !== undefined) this.setAttributes(init);
    }

    set(attributeName, value) {
        // ignore
        if (attributeName === 'archive') return;

        this._attributes[attributeName] = value;
    }

    setAttributes(init) {
        Object.entries(init)
            .forEach(([attributeName, value]) =>
                this.set(attributeName, value)
            );
    }

    get attributes() {
        return this._attributes;
    }

    get isDummyResult() {
        return true;
    }
}
