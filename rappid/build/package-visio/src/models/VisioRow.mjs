import { VisioSheetObject } from './VisioSheetObject.mjs';
import { VisioCells } from './VisioCells.mjs';
import { VisioJxonRowAttributeName, VisioRowStructureType } from '../types/enums.mjs';

const SECTION_ROW_TYPES = ['MoveTo', 'RelMoveTo', 'LineTo', 'RelLineTo', 'ArcTo', 'InfiniteLine', 'Ellipse', 'EllipticalArcTo', 'RelEllipticalArcTo', 'SplineStart', 'SplineKnow', 'PolylineTo', 'NURBSTo', 'RelCubBezTo', 'RelQuadBezTo']

// TODO: implement VisioIndexedRow and VisioNamedRow

export class VisioRow extends VisioSheetObject {
    constructor({ ...init }) {
        super(init);

        const { cells = new VisioCells({ archive: this.archive }) } = init;
        this.cells = cells;
        this.debugType = init.debugType;
        this.jxon = init.jxon;

        if (init.type) {
            this.type = init.type;
        }

        if (init.debugType === VisioRowStructureType.Named) {
            this.name = init.name;
        } else {
            this.index = init.index;
        }
    }

    set type(rowType) {
        if (SECTION_ROW_TYPES.includes(rowType) && this.jxon) {
            // user created a geometry row, set type in jxon
            this.jxon[VisioJxonRowAttributeName.Type] = rowType;
        }

        this._type = rowType;
    }

    get type() {
        return this._type;
    }
}
