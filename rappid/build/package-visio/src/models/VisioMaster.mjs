import { VisioRelObject } from './VisioRelObject.mjs';
import { VisioMasterShape } from './VisioMasterShape.mjs';

export class VisioMaster extends VisioRelObject {

    constructor(init, prefixList = new Set()) {
        prefixList.add('cells');
        prefixList.add('sections');
        prefixList.add('id');
        prefixList.add('name');
        prefixList.add('icon');

        super(init,prefixList);
    }

    setAttributes({ shapes: parsedMasterShapes, ...init }) {
        super.setAttributes(init);

        if (init.cells)
            this.referenceMasterShapeInsideCellsDeep(this);

        if (parsedMasterShapes)
            this.initMasterSubshapes(parsedMasterShapes, this)
    }

    setMasterContents(parsedMasterContent) {

        // different behavior for one or more sub-shapes
        // http://localhost/MS-VSDX.pdf#page=41&zoom=100,92,226
        // 2.2.5.4.1 Master-to-Shape Inheritance
        // If a master has one top-level shape, a shape that inherits from that master
        // inherits the descendant elements of that master shape. If a master has more
        // than one master shape, a shape that inherits from that master inherits
        // those master shapes as subshapes.

        const shapes = parsedMasterContent.shapes;

        // decide if attributes or subshapes
        if (shapes.size > 1) {
            this.initMasterSubshapes(shapes, this);
            return;
        }

        // use single element directly
        const singleShape = [...shapes.values()][0];
        const { id: shapeId, ...initMaster } = singleShape;
        this.setAttributes({
            masterAndShape: true,
            shapeId,
            ...initMaster
        });

        this.masterContentsSet = true;
    }

    /**
     * @param {Map<VisioMasterShape>} masterShapes - parsed object
     * @param {Master|MasterShape} parent
     */
    initMasterSubshapes(masterShapes, parent) {
        if (!parent.masterShapes)
            parent.masterShapes = new Map();
        if (!this.masterShapesMap)
            this.masterShapesMap = new Map();

        masterShapes.forEach(
            (parsedMasterShape, masterShapeId) => {

                // recursion (if more levels)
                const masterShape = new VisioMasterShape({
                    archive: this.archive,
                    master: this,
                    masterId: this.id,
                    ...parsedMasterShape,
                });

                this.referenceMasterShapeInsideCellsDeep(masterShape);

                // parent (master or deeper structure recursively)
                parent.masterShapes.set(
                    masterShapeId,
                    masterShape);

                // flat shapes map
                this.masterShapesMap.set(
                    masterShapeId,
                    masterShape);
            })
    }

    referenceMasterShapeInsideCellsDeep(masterShape) {
        // important - don't use getters - use directly

        if (masterShape._cells)
            this.referenceMasterShapeInsideCells(masterShape._cells, masterShape);

        if (this._sections) {
            this._sections.forEach(sectionsArray => {
                sectionsArray.forEach(section => {
                    if (section.rows)
                        section.rows.forEach(row => {
                            if (row.cells)
                                this.referenceMasterShapeInsideCells(row.cells, masterShape);
                        })
                })
            })
        }
    }

    referenceMasterShapeInsideCells(cells, masterShape) {
        cells.masterShape = masterShape;
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

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    getIconBase64() {
        if (!this._icon || !this._icon.base64) return null;
        return `data:image/png;base64,${this._icon.base64}`;
    }

}
