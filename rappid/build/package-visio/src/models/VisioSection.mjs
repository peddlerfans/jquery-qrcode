import { V, g } from 'jointjs';
import { geometrySingleShapeArrayToPath } from '../display/geometryToPath.mjs';
import { VisioJxonRowKey,
    VisioRowStructureType,
    VisioRowType,
    VisioSectionType,
    VisioSectionStructureType
} from '../types/enums.mjs';
import { VisioRow } from './VisioRow.mjs';
import { VisioObject } from './VisioObject.mjs';
import { VisioSheetObject } from './VisioSheetObject.mjs';
import { VisioCells } from './VisioCells.mjs';
import { debug } from '../helpers/debug.mjs';
import { firstLetterLowercase } from '../helpers/firstLetterLowercase.mjs';

// geometry section has its own cells in addition to rows and their cells
// todo: geometry section may inherit from VisioSheetObject and allow cell addition
const SECTION_CELL_NAMES = {
    Geometry: ['NoFill', 'NoLine', 'NoShow', 'NoSnap', 'NoQuickDrag'],
}

const SECTION_ROW_CELL_NAMES = {
    Actions: ['Menu', 'Action', 'Checked', 'Disabled', 'ReadOnly', 'Invisible', 'BeginGroup', 'FlyoutChild', 'TagName', 'ButtonFace', 'SortKey'],
    Character: ['Font', 'Color', 'Style', 'Case', 'Pos', 'FontScale', 'Size', 'DblUnderline', 'Overline', 'Strikethru', 'DoubleStrikethrough', 'Letterspace', 'ColorTrans', 'AsianFont', 'ComplexScriptFont', 'ComplexScriptSize', 'LangID'],
    Connection: ['X', 'Y', 'DirX', 'DirY', 'Type', 'AutoGen', 'Prompt'],
    Control: ['X', 'Y', 'XDyn', 'YDyn', 'XCon', 'YCon', 'CanGlue', 'Prompt'],
    Field: ['Value', 'Format', 'Type', 'UICat', 'UICod', 'UIFmt', 'Calendar', 'ObjectKind'],
    FillGradient: ['GradientStopColor', 'GradientStopColorTrans', 'GradientStopPosition'],
    Geometry: ['X', 'Y', 'A', 'B', 'C', 'D', 'E'],
    Hyperlink: ['Description', 'Address', 'SubAddress', 'ExtraInfo', 'Frame', 'NewWindow', 'Default', 'Invisible', 'SortKey'],
    Layer: ['Name', 'Color', 'Status', 'Visible', 'Print', 'Active', 'Lock', 'Snap', 'Glue', 'NameUniv', 'ColorTrans'],
    LineGradient: ['GradientStopColor', 'GradientStopColorTrans', 'GradientStopPosition'],
    Paragraph: ['IndFirst', 'IndLeft', 'IndRight', 'SpLine', 'SpBefore', 'SpAfter', 'HorzAlign', 'Bullet', 'BulletStr', 'BulletFont', 'BulletFontSize', 'TextPosAfterBullet', 'Flags'],
    Property: ['Value', 'Prompt', 'Label', 'Format', 'SortKey', 'Type', 'Invisible', 'Verify', 'DataLinked', 'LangID', 'Calendar'],
    Reviewer: ['Name', 'Initials', 'Color', 'ReviewerID', 'CurrentIndex'],
    Scratch: ['X', 'Y', 'A', 'B', 'C', 'D'],
    ActionTag: ['X', 'Y', 'TagName', 'XJustify', 'YJustify', 'DisplayMode', 'ButtonFace', 'Disabled', 'Description'],
    Tabs: ['Position', 'Alignment'],
    User: ['Value', 'Prompt'],
    // Annotation: ['X', 'Y', 'ReviewerID', 'MarkerIndex', 'Date', 'Comment', 'LangID'],
    // ConnectionABCD: ['X', 'Y', 'A', 'B', 'C', 'D']
}

export class VisioSection extends VisioObject {

    constructor(init) {
        super(init);

        const {
            rows = [],
            cells = new VisioCells({ archive: this.archive })
        } = init;

        this.cells = cells;
        this.rows = rows.map(row => new VisioRow({ ...row, archive: init.archive }));
    }

    getRows() {
        const rows = this.rows;
        if (!rows) return [];
        return rows;
    }

    // To be overridden
    getRow() { }
    addRow() { }
    removeRow() { }

    // Statics
    static from(section) {
        if (section.type === VisioSectionType.Geometry) {
            return new VisioGeometrySection(section);
        } else if (section.type === VisioSectionType.Property) {
            return new VisioDataSection(section);
        } else if (section.type === VisioSectionType.User) {
            return new VisioDataSection(section);
        } else if (VisioSectionStructureType[section.type] === VisioRowStructureType.Indexed) {
            return new VisioIndexedSection(section);
        } else {
            return new VisioNamedSection(section);
        }
    }
}

export class VisioIndexedSection extends VisioSection {

    getRow(index) {
        const row = this.rows[index];
        if (!row) return null;
        return row;
    }

    addRow() {
        const lastIndex = this.rows.map(section => section.index).sort().pop();
        const rowIndex = Number.isInteger(lastIndex) ? lastIndex + 1 : 1;

        const jxon = {
            [VisioJxonRowKey.Id]: rowIndex.toString(),
            Cell: []
        };

        const row = new VisioRow({
            debugType: VisioRowStructureType.Indexed,
            index: rowIndex,
            jxon,
            archive: this.archive
        });

        // set valid cells based on section type
        const rowCellNames = SECTION_ROW_CELL_NAMES[this.type];
        rowCellNames.forEach(name => row.setCell(name, { value: '' }));

        // update structures
        this.jxon.Row.push(row.jxon);
        this.rows.push(row);

        return row;
    }

    removeRow(index) {
        this.rows.splice(index, 1);
        this.jxon.Row.splice(index, 1);
        return this.rows;
    }
}

export class VisioNamedSection extends VisioSection {

    getRow(name) {
        const row = this.rows.find(row => row.name === name);
        if (!row) return null;
        return row;
    }

    addRow(name) {
        if (this.rows.findIndex(row => row.name === name) > -1) {
            throw new Error(`Row named "${name}" already exists.`);
        }

        const jxon = {
            [VisioJxonRowKey.Name]: name,
            Cell: []
        };

        const row = new VisioRow({
            name,
            jxon,
            debugType: VisioRowStructureType.Named,
            archive: this.archive
        });

        // set valid cells based on section type
        const rowCellNames = SECTION_ROW_CELL_NAMES[this.type];
        rowCellNames.forEach(name => row.setCell(name, { value: '' }));

        // update structures
        this.jxon.Row.push(row.jxon);
        this.rows.push(row);

        return row;
    }

    removeRow(name) {
        this.rows = this.rows.filter(row => row.name !== name);
        this.jxon.Row = this.jxon.Row.filter(row => row['@N'] !== name);
        return this.rows;
    }
}

export class VisioDataSection extends VisioNamedSection {

    getProperty(propertyName, propertyAttribute = 'value') {
        const row = this.getRow(propertyName);
        if (!row) return null;
        return row.cells[propertyAttribute];
    }

    getPropertyNames() {
        return this.rows.map(row => row.name);
    }
}

export class VisioGeometrySection extends VisioIndexedSection {

    constructor(init) {
        super(init);

        if (init.cells) {
            // todo: create jxon based on existing cells
            // this can be done when working on JXON related classes
            // this jxon is missing when importing a project
            this.cells = init.cells;
        } else {
            this.cells = new VisioCells({ archive: this.archive });
            this.jxon.Cell = [];

            SECTION_CELL_NAMES.Geometry.forEach(cellName => {
                const locName = firstLetterLowercase(cellName);
                if (this.cells.has(locName) || this.cells[`_${locName}`]) return;
                this.setCell(cellName, { value: '' });
            });
        }
    }

    getOwnCellNames() {
        return VisioSheetObject.prototype.getOwnCellNames.call(this);
    }

    getCell(cellName) {
        return VisioSheetObject.prototype.getCell.call(this, cellName);
    }

    setCell(name, attributes) {
        if (!SECTION_CELL_NAMES.Geometry.includes(name)) {
            debug.log(`Cannot add ${name} cell to Geometry section.`);
            return;
        }

        VisioSheetObject.prototype.setCell.call(this, name, attributes);
    }

    removeCell(cellName) {
        VisioSheetObject.prototype.removeCell.call(this, cellName);
    }

    toPath(width, height) {
        const { rows = [] } = this;
        // Visio geometry path, based on cartesian coordinate system
        let d = geometrySingleShapeArrayToPath({ rows }, { width, height });
        d = V.normalizePathData(d);

        const path = new g.Path(d);

        // Remove redundant segments at the end so the last segment is differentiable
        // i.e. markers at the end can find a proper direction
        let segCount = path.segments.length;
        while (segCount > 2) {
            if (!path.segments[segCount - 1].end.equals(path.segments[segCount - 2].end)) {
                break;
            }
            path.removeSegment(segCount - 2);
            segCount--;
        }

        // transform geometry path to JointJS non-cartesian coordinate system
        path.translate(0, -height).scale(1, -1);
        return path;
    }

    // adding two RelMoveTo rows next ot each other, at index 1 and 2 seems to hang Visio
    addRow(geometryRowType) {
        const row = super.addRow();

        let rowType = geometryRowType;
        if (!rowType) {
            // just called super, so at least one row will be present
            rowType = this.getRows().length === 1 ? VisioRowType.RelMoveTo : VisioRowType.RelLineTo;
        }

        row.type = rowType;

        return row;
    }
}
