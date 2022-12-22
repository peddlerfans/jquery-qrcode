import { VisioObject } from './VisioObject.mjs';
import { VisioCell } from './VisioCell.mjs';
import { debug } from '../helpers/debug.mjs';

export class VisioSheetObject extends VisioObject {

    getOwnCellNames() {
        const { cells } = this;
        if (!cells) return [];

        return cells.getOwnNames();
    }

    getCell(cellName) {
        const { cells } = this;
        if (!cells) {
            debug.log('Visio object does not contain cells.');
            return null;
        }

        const cell = cells.get(cellName);
        if (!cell) return null;
        return new VisioCell({ ...cell, cells });
    }

    setCell(cellName, attributes) {
        const { cells, jxon } = this;
        if (!cells) {
            debug.log('Visio object does not contain cells.');
            return;
        }

        cells.set(cellName, attributes, jxon);
    }

    removeCell(name) {
        const { cells, jxon } = this;
        if (!cells || !cells.get(name)) {
            return;
        }

        cells.remove(name, jxon);
    }
}
