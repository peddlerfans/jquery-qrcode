import { VisioObject } from './VisioObject.mjs';

export class VisioMasterShape extends VisioObject {

    constructor(init, prefixList = new Set()) {
        prefixList.add('cells');
        prefixList.add('sections');

        super(init, prefixList);
    }

    setAttributes({ shapes, ...init }) {
        super.setAttributes(init);

        if (shapes)
            this.master.initMasterSubshapes(shapes, this);
    }

    get cells() {
        return this._cells;
    }

    set cells(cells) {
        this._cells = cells;
    }

    get sections() {
        return this._sections;
    }

    set sections(sections) {
        this._sections = sections;
    }
}
