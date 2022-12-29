import { util, g, V } from 'jointjs';
import { VisioSheetObject } from './VisioSheetObject.mjs';
import {
    VisioAttribute,
    VisioJxonKey,
    VisioJxonType,
    VisioJxonCellKey,
    VisioJxonShapeKey,
    VisioJxonMasterKey,
    VisioRowStructureType,
    VisioJxonSectionKey,
    VisioSectionStructureType
} from '../types/enums.mjs';
import { mergeSections } from '../import/section.mjs';
import { getTextContent } from '../helpers/getTextContent.mjs';
import { VisioShapeType } from '../types/enums.mjs';
import { VisioSectionType } from '../types/enums.mjs';
import { convertVisioShapeToRappidAttributes, convertVisioGroupToRappidAttributes } from '../display/shape.mjs';
import { VisioSection } from './VisioSection.mjs';
import { debug } from '../helpers/debug.mjs';
import { parseJxon } from '../import/parseJxon.mjs';
import { defaultImportShape } from '../display/factory.mjs';

let autoincrement = 0;

export class VisioShape extends VisioSheetObject {

    getDefaultAttributes() {
        return {
            ...super.getDefaultAttributes(),
            name: null,
            type: null,
            cells: null,
            sections: new Map(),
            shapes: [], // subShapes
            pageContent: null
        };
    }

    constructor({ shapes, ...init }) {
        if (!init.type && init.deleted !== true) {
            debug.log('Missing type, could not instantiate a VisioShape.');
        }

        super(init, new Set([
            VisioAttribute.name,
            VisioAttribute.type,
            VisioAttribute.cells,
            VisioAttribute.sections,
            VisioAttribute.master,
            VisioAttribute.shapes,
            VisioAttribute.textStyle,
        ]));


        if (this.masterId !== undefined) {
            this._master = this.masters.get(this.masterId);
        }

        if (shapes) {
            this.initShapes(shapes);
        }

        this.pageContent.referenceShape(this);
    }

    initShapes(shapes) {

        const master = this._master;

        const parentMaster = this.masters && this.masters.get(this.parentMasterId);

        // custom shape without reference to master
        if (!master && !parentMaster) {
            this.shapes = this.instantiateShapes(shapes);
            return;
        }

        // root shape with reference to master
        if (master) {
            this.shapes = this.traverseShapes(shapes, master.masterShapes);
            return;
        }

        // child shape (or dummy shape)
        if (parentMaster) {
            const masterShape = parentMaster.masterShapesMap.get(this.masterShapeId);

            this.shapes = this.traverseShapes(shapes, masterShape.masterShapes);
        }

    }

    /**
     * recursion
     * @param {Map<number, VisioShape>} shapes
     * @param {Map<number, MasterShape>} masterShapes
     * @return {Map<number|string, VisioShape>}
     */
    traverseShapes(shapes, masterShapes = new Map()) {
        const masterId =
            this.masterId !== undefined ?
                this.masterId :
                this.parentMasterId;

        const shapesByMasterShapeId = this.shapesByMasterShapeId(shapes);

        let groupOrderCounter = 0;

        const shapesResult = new Map();
        masterShapes.forEach(
            (masterShape, masterShapeId) => {
                let shape = shapesByMasterShapeId.get(masterShapeId);

                if (!shape)
                    shape = {
                        id: 'dummy-' + autoincrement++,
                        type: masterShape.type,
                    };

                if (shape.deleted) return;

                shapesResult.set(
                    shape.id,
                    this.factory({
                        masterShape,
                        parentMasterId: masterId,
                        xmlGroupOrder: groupOrderCounter++,
                        ...shape
                    }));
            });

        return shapesResult;
    }

    /**
     * Create subshape instance
     * @param init
     * @returns {Shape}
     */
    factory(init) {
        return new VisioShape({
            archive: this.archive,
            parent: this,
            pageContent: this.pageContent,
            masters: this.masters,
            ...init
        });
    }

    getRootShape() {
        let root = this;
        let parent = root.parent;
        while (parent) {
            root = parent;
            parent = root.parent;
        }
        return root;
    }

    isRootShape() {
        return !this.parent;
    }

    shapesByMasterShapeId(shapes) {
        const shapesByMasterShapeId = new Map();
        shapes.forEach(shape => {
            if (!shape.masterShapeId) {
                debug.log('masterShapeId undefined')
            }
            shapesByMasterShapeId.set(shape.masterShapeId, shape);
        });
        return shapesByMasterShapeId;
    }

    getComputedForeignData() {
        const { foreignData, masterShape } = this;
        if (foreignData) return foreignData;
        if (masterShape && masterShape.foreignData) return masterShape.foreignData;
        return null;
    }

    hasImage() {
        return Boolean(this.getComputedForeignData());
    }

    async getImage() {

        const foreignData = this.getComputedForeignData();
        if (!foreignData) return null;

        const { targetFile, id } = foreignData;
        const image = await this.archive.getImageAsync(targetFile.absolutePath);
        return {
            ...image,
            selector: `image${id}`
        };
    }

    referenceMasters() {

        // if (!this.structurePath)
        //     logAndThrow('no structure path in shape');

        const masterId = this.masterId !== undefined ?
            this.masterId :
            this.parentMasterId;

        if (masterId === undefined) return;

        const masters = this.archive.document.masters;
        this.master = masters.get(masterId);

        if (this.masterShapeId) {
            const masterShapesMap = this.master.masterShapesMap;
            this._masterShape = masterShapesMap.get(this.masterShapeId);
        } else {
            this._masterSubShape = masters.getSubShape(masterId);
        }
    }

    /**
     * @returns {MasterShape|Master}
     */
    get masterShape() {
        return this._masterShape || this._master;
    }

    set masterShape(masterShape) {
        this._masterShape = masterShape;
    }

    /**
     * Converts anonymous objects into instances of VisioShape
     * - works recursively
     */
    instantiateShapes(shapes) {
        const parentMasterId =
            this.masterId !== undefined ?
                this.masterId :
                this.parentMasterId;

        const instantiatedShapesMap = new Map();

        shapes.forEach((parsedShape, id) =>
            instantiatedShapesMap.set(
                id,
                this.factory({
                    parentMasterId,
                    ...parsedShape
                }))
        );

        return instantiatedShapesMap;
    }

    get x() {
        return this.cells.pinX - this.cells.locPinX
    }

    get y() {
        return this.cells.pinY - this.cells.locPinY
    }

    get angle() {
        return this.cells.angle;
    }

    get height() {
        return this.cells.height;
    }

    get width() {
        return this.cells.width;
    }

    get matrix() {
        const { x, y, angle } = this;
        let matrix = V.createSVGMatrix().translate(x, y);
        if (angle) {
            matrix = matrix.rotate(angle);
        }
        // const { flipX, flipY } = this.cells;
        // if (flipX) {
        //     matrix = matrix.flipX();
        // }
        // if (flipY) {
        //     matrix = matrix.flipY();
        // }
        return matrix;
    }

    getPageMatrix() {
        let matrix = V.createSVGMatrix();
        [...this.getAncestorShapes(), this].forEach(shape => {
            matrix = matrix.multiply(shape.matrix);
        });
        return matrix;
    }

    getPageOrigin() {
        const { parent, pageContent } = this;
        const origin = new g.Point(0, pageContent.page.height);
        if (parent) {
            const matrix = parent.getPageMatrix();
            origin.offset(matrix.e, -matrix.f);
        }
        return origin;
    }

    getPageZIndex() {
        return this.getRootShape().xmlOrder;
    }

    getPageAngle() {
        return this.getAncestorShapes().reduce((angle, shape) => angle + shape.angle, this.angle);
    }

    getPagePosition() {
        // width & height can have negative values and affect the position
        return this.getPageBBox().origin();
    }

    getPageBBox() {
        const matrix = this.getPageMatrix();
        const { width, height, pageContent } = this;
        const x = matrix.e;
        const y = pageContent.page.height - matrix.f - height;
        // `width`, `height` can be negative for connect shapes
        return (new g.Rect(x, y, width, height)).normalize();
    }

    get name() {
        const name = (this.archive.document.languageDependent) ? this._name : this.nameU;
        return typeof name === 'string' ? name : null;
    }

    get type() {
        return this._type
    }

    set type(type) {
        this._type = type
    }

    get cells() {
        if (!this._cells) {
            const masterShape = this.masterShape;
            if (masterShape && masterShape.cells)
                return masterShape.cells;
        }

        return this._cells
    }

    set cells(cells) {
        this._cells = cells
    }

    /**
     * @returns {Map<VisioSectionType, (VisioIndexedSection|VisioNamedSection)[]>|undefined}
     */
    get sections() {

        if (!this._cachedSections) {
            this.cacheSections();
        }

        return this._cachedSections;
    }

    cacheSections() {
        const vsdSectionMap = new Map();

        this.mergeSections().forEach((section, name) => {
            const vsdSections = section.map(sectionEntry => {
                const vsdSection = VisioSection.from({ ...sectionEntry, archive: this.archive });

                if (this._sections.has(name)) {
                    vsdSection.jxon = this._sections.get(name)[0].jxon;
                }

                return vsdSection;
            });

            vsdSectionMap.set(name, vsdSections);
        });

        this._cachedSections = vsdSectionMap;
    }

    /**
     * @returns {Map<VisioSectionType, [VisioSectionParsed]>|undefined}
     */
    mergeSections() {
        const defaultSections = this.getDefaultSections();

        const hasSections = Boolean(this._sections);
        const hasMasterWithSections =
            Boolean(this.masterShape &&
                this.masterShape.sections);

        // no sections at all
        if (!hasSections && !hasMasterWithSections) {
            return defaultSections;
        }

        // no master sections
        if (hasSections && !hasMasterWithSections) {
            return mergeSections(defaultSections, this._sections, this);
        }

        // only master sections
        if (!hasSections && hasMasterWithSections) {
            return mergeSections(defaultSections, this.masterShape.sections, this);
        }

        // merge
        const sections = this._sections;
        const masterSections = this.masterShape.sections;

        const mergedDefaultAndMasterSections = mergeSections(defaultSections, masterSections, this);
        //TODO no need to clone again (inside mergeSections)
        const mergedSections = mergeSections(mergedDefaultAndMasterSections, sections, this);

        return mergedSections;
    }

    set sections(sections) {
        this._sections = sections
    }

    get shapes() {
        return this._shapes
    }

    set shapes(shapes) {
        this._shapes = shapes
    }

    get text() {
        // no content (null by calculateTextContent)
        if (this._cachedText === null)
            return undefined;

        if (!this._cachedText)
            this._cachedText = this.calculateTextContent();

        return this._cachedText;
    }

    getSubShapes() {
        return [...this._shapes.values()];
    }

    getAncestorShapes() {
        const ancestors = [];
        let parent = this.parent;
        while (parent) {
            ancestors.unshift(parent);
            parent = parent.parent;
        }
        return ancestors;
    }

    getSectionNames() {
        return [...this.sections.keys()];
    }

    getOwnSectionNames() {
        return [...this._sections.keys()];
    }

    // return own section
    getSection(name) {
        if (name === VisioSectionType.Geometry) {
            throw new Error('Use getGeometry instead.');
        }

        if (!VisioSectionType[name]) {
            throw new Error(`Wrong section name: ${name}`)
        }

        let sections = this._sections.get(name);
        if (!Array.isArray(sections) || sections.length === 0) return null;
        return sections[0];
    }

    // return merged section
    getComputedSection(name) {
        if (name === VisioSectionType.Geometry) {
            throw new Error('Use getGeometry instead.');
        }

        if (!VisioSectionType[name]) {
            throw new Error(`Wrong section name: ${name}`)
        }

        let sections = this.sections.get(name);
        if (!Array.isArray(sections) || sections.length === 0) return null
        return sections[0];
    }

    // return own geometry
    getGeometry() {
        const geometryArray = this._sections.get(VisioSectionType.Geometry);
        if (!geometryArray) return [];
        return geometryArray;
    }

    // return merged geometry
    getComputedGeometry() {
        const geometryArray = this.sections.get(VisioSectionType.Geometry);
        if (!geometryArray) return [];
        return geometryArray;
    }

    // add own section
    addSection(name) {
        const sectionStructureType = VisioSectionStructureType[name];

        if (sectionStructureType === undefined) {
            debug.log(`Unhandled section name: ${name}`);
            return null;
        }

        // own section exists, disallow duplicates and return existing section
        if (this.getSection(name) && sectionStructureType !== VisioSectionStructureType.Geometry) {
            debug.log(`Can not add a section "${name}" as it already exists.`);
            return this.getSection(name);
        }

        const sectionJxon = {
            [VisioJxonSectionKey.Name]: name,
            Row: []
        }

        const section = VisioSection.from({ type: name, jxon: sectionJxon, archive: this.archive });

        if (name === VisioSectionType.Geometry) {
            let geometryArray = this.getComputedGeometry();

            // ensure proper indexing
            let lastIndex = geometryArray.map(section => section.index).sort().pop();
            section.index = Number.isInteger(lastIndex) ? lastIndex + 1 : 0;

            this._sections.set(name, [...geometryArray, section]);

            sectionJxon[VisioJxonSectionKey.Id] = section.index.toString();
        } else {
            this._sections.set(name, [section]);
        }

        this.jxon.Section.push(sectionJxon);
        this.cacheSections();

        return section;
    }

    removeSection(name, index = 0) {
        const sectionStructureType = VisioSectionStructureType[name];

        if (sectionStructureType === undefined) {
            return;
        }

        if (sectionStructureType === VisioRowStructureType.Named) {
            // remove from struct
            this.sections.delete(name);

            // remove from jxon
            const toRemoveIndex = this.jxon.Section
                .findIndex(section => section[VisioJxonSectionKey.Name] === name);

            if (this.jxon.Section[toRemoveIndex]) {
                this.jxon.Section.splice(toRemoveIndex, 1);
            }
        } else {
            if (!Number.isInteger(index)) {
                throw new Error('Index has to be an integer.');
            }

            const sections = this.sections.get(name) || [];
            if (Array.isArray(sections) && !sections[index]) {
                throw new Error('Index out of range.');
            }

            // remove from struct
            sections.splice(index, 1);
            this.sections.set(name, sections);

            // remove from jxon
            const toRemoveIndex = this.jxon.Section.findIndex(section => {
                return section[VisioJxonSectionKey.Name] === name && section[VisioJxonSectionKey.Id] === index.toString();
            });

            if (this.jxon.Section[toRemoveIndex]) {
                this.jxon.Section.splice(toRemoveIndex, 1);
            }
        }
    }

    getText() {
        const { text } = this;
        if (!Array.isArray(text) || text.length === 0) return '';
        return text[0].content.trim();
    }

    // todo: very simplified way of doing it, enhance
    setText(text) {
        if (text && text.length > 0) {
            this.text = [{
                content: text
            }];

            this.jxon.Text = [{
                cp: { '@IX': '0' }
            }, text];
        }
    }

    calculateTextContent() {
        const sections = this.sections;

        // even empty text override master
        const shapeTextContent = getTextContent(this._text, sections);
        if (shapeTextContent)
            return shapeTextContent;

        const masterShape = this.masterShape;
        if (masterShape)
            return getTextContent(masterShape.text, sections);

        // no content
        return null;
    }

    getDefaultSections() {
        const textStyleSheetIndex = this.textStyle;

        const styleSheets = this.archive.document.styleSheets;
        const styleSheet = styleSheets.get(textStyleSheetIndex);

        if (styleSheet === undefined) {
            debug.log('styleSheet undefined');
        }

        const defaultSections = styleSheet.sections || new Map();
        if (textStyleSheetIndex === 0)
            return defaultSections;

        const superDefaultSections = styleSheets.get(0).sections;
        return mergeSections(superDefaultSections, defaultSections, this);
    }

    set text(text) {
        this._text = text;
    }

    get master() {
        if (this._master)
            return this._master;
        if (this._masterShape)
            return this._masterShape.master;

        return null;
    }

    getMaster() {
        return this.getRootShape().master;
    }

    get tooltip() {
        let string = `shapeId: ${this.id}` +
            `\nwidth: ${this.cells.width}` +
            `\nheight: ${this.cells.height}` +
            `\ntype: ${this.type}`;


        const masterShape = this.masterShape;
        if (masterShape) {
            string += `\nmasterShapeId: ${masterShape.id}`;
            if (masterShape.shapeId)
                string += ` (shapeId: ${masterShape.shapeId})`;
        }

        const master = this.master;
        if (master)
            string += `\nmasterXml: ${master.xmlPath.split('/').pop()}`;

        string += `\nshapeXml: ${this.pageContent.page.xmlPath.split('/').pop()}`;

        if (this.isOneDimensional())
            string += '\nisOneDimensional';


        return string;
    }

    set textStyle(textStyle) {
        this._textStyle = textStyle;
    }

    get textStyle() {
        if (this._textStyle !== undefined)
            return this._textStyle;

        if (this.masterShape && this.masterShape.textStyle !== undefined)
            return this.masterShape.textStyle;

        const defaultTextStyle = this.archive.document.documentSettings.defaultTextStyle

        if (defaultTextStyle === undefined) {
            debug.log('defaultTextStyle undefined');
        }

        return defaultTextStyle;
    }

    set fillStyle(fillStyle) {
        this._fillStyle = fillStyle;
    }

    get fillStyle() {
        if (this._fillStyle !== undefined)
            return this._fillStyle;

        if (this.masterShape && this.masterShape.fillStyle !== undefined)
            return this.masterShape.fillStyle;

        const defaultFillStyle = this.archive.document.documentSettings.defaultFillStyle;

        if (defaultFillStyle === undefined) {
            debug.log('defaultFillStyle undefined');
        }

        return defaultFillStyle;
    }

    set lineStyle(lineStyle) {
        this._lineStyle = lineStyle;
    }

    get lineStyle() {
        if (this._lineStyle !== undefined)
            return this._lineStyle;

        if (this.masterShape && this.masterShape.lineStyle !== undefined)
            return this.masterShape.lineStyle;

        const defaultLineStyle = this.archive.document.documentSettings.defaultLineStyle;

        if (defaultLineStyle === undefined) {
            debug.log('defaultLineStyle undefined');
        }

        return defaultLineStyle;
    }

    isOneDimensional() {
        return this.cells.hasEvery([
            VisioAttribute.beginX,
            VisioAttribute.beginY,
            VisioAttribute.endX,
            VisioAttribute.endY,
        ])
    }

    isPrintable() {
        return !this.cells.nonPrinting;
    }

    /**
     * @returns {Connect|null}
     */
    getConnect() {
        return this.pageContent.connects.get(this.id) || null;
    }

    toElementAttributes(opts) {
        const origin = this.getPageOrigin();
        let attributes;
        switch (this.type) {
            case VisioShapeType.Group: {
                attributes = convertVisioGroupToRappidAttributes(this, {
                    origin,
                    isRoot: true
                }, opts);
                break;
            }
            case VisioShapeType.Shape:
            case VisioShapeType.Foreign: {
                attributes = convertVisioShapeToRappidAttributes(this, {
                    origin
                }, opts);
                break;
            }
            default: {
                return null;
            }
        }
        attributes.z = this.getPageZIndex();
        return attributes;
    }

    toElement({
        importShape = defaultImportShape,
        ignoreNonPrinting = true,
        ignoreSubShapeConnects = true
    } = {}) {
        if (typeof importShape !== 'function') return null;
        // in case entire top level Visio shape is marked as nonPrinting, exit early
        if (ignoreNonPrinting && !this.isPrintable()) {
            return null;
        }
        return importShape(this, {
            ignoreNonPrinting,
            ignoreSubShapeConnects
        });
    }

    static async fromMaster(master, page) {

        const { archive } = master;

        const masterJXON = await archive.getJxonAsync(master.xmlPath);
        const shapeJXON = util.cloneDeep(masterJXON.Shapes.Shape);

        prepareStructure(shapeJXON, master);

        const parsedShape = await parseJxon.call(archive, shapeJXON, VisioJxonType.Master, []);
        const pageContent = await page.getContent({ overrideRels: true });

        // todo: jxon requires int index while parser requires a master object
        parsedShape.master = master;

        return new VisioShape({
            archive: archive,
            pageContent,
            ...parsedShape
        });
    }

    // TODO: To be implemented
    // static async fromJXON(jxon, page) {
    //     return { jxon };
    // }
}

function prepareStructure(shape, master) {
    if (!shape) return;

    // assign Master attribute to root element and MasterShape to children
    if (master) {
        shape[VisioJxonShapeKey.MasterId] = master.id.toString();
        shape[VisioJxonMasterKey.NameU] = master.nameU;
    } else {
        // nested shapes have to point to proper local master via MasterShape attribute
        shape[VisioJxonShapeKey.MasterShapeId] = shape[VisioJxonShapeKey.Id];
    }

    // assign a unique int ID
    shape[VisioJxonKey.Id] = util.uniqueId();

    // remove cells that contain references
    // In cloned cell, reference string stays the same, but context changes.
    shape.Cell = removeReferencedCells(shape.Cell);
    shape.Section = stripSections(shape.Section);

    // execute recurrently
    if (shape.Shapes) {
        if (Array.isArray(shape.Shapes.Shape)) {
            shape.Shapes.Shape.forEach(shape => prepareStructure(shape));
        } else {
            prepareStructure(shape.Shapes.Shape);
        }
    }
}

function stripSections(sections) {
    if (Array.isArray(sections)) {
        return sections.map(section => {
            section.Cell = removeReferencedCells(section.Cell);
            section.Row = stripRows(section.Row);

            return section;
        });
    } else if (sections !== undefined) {
        return [sections];
    } else {
        return [];
    }
}

function stripRows(rows) {
    if (Array.isArray(rows)) {
        return rows.map(row => {
            row.Cell = removeReferencedCells(row.Cell);

            return row;
        });
    } else if (rows !== undefined) {
        return [rows];
    } else {
        return [];
    }
}

function removeReferencedCells(cells) {
    if (Array.isArray(cells)) {
        return cells.filter(cell => cell[VisioJxonCellKey.Formula] && cell[VisioJxonCellKey.Formula].indexOf('!') === -1);
    } else if (cells !== undefined) {
        // todo: which single cell to keep?
        return [cells];
    } else {
        return [];
    }
}
