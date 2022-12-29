import { parseJxon } from '../import/parseJxon.mjs';
import { VisioCellName, VisioJxonType as VisioJXONType, VisioSectionType } from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';
import { VisioShape } from './VisioShape.mjs';
import { defaultImportShape, defaultImportConnect, defaultImportLabels, defaultImportImage } from '../display/factory.mjs';
import { isFontAvailable } from '../helpers/isFontAvailable.mjs';

export class VisioPageContent {

    constructor(page) {
        if (!page) {
            debug.log('VisioPageContent can only be created using an instance of a Page.', { page });
        }

        this.page = page;

        // only root level shapes
        this.rootShapes = new Map();

        // all shapes flattened (includes root and child shapes)
        this.shapes = new Map();

        // connect objects (not shapes)
        this.connects = new Map();

        // foreign shapes, i.e. images
        this.foreignShapes = new Map();

        // shapes with connect object rel in this.connects
        this.linkShapes = new Map();

        // element shapes (shapes that are not connects)
        this.elementShapes = new Map();
    }

    // private API
    async loadAsync(opts) {
        const page = this.page;
        const pageJxon = await page.archive.getJxonAsync(page.xmlPath);

        const parsedPage = await parseJxon.call(
            page.archive,
            pageJxon,
            VisioJXONType.Page,
            [],
            {
                structurePathEnrichObject: {
                    pageId: page.id
                }
            }
        );
        const { shapes: parsedShapes = [], connects = [] } = parsedPage;

        // relations (if any) to masters, foreignObjects, backgroundPage
        await page.getRelsMapCachedAsync(opts);

        // prepare (only masters for start) from rels
        await page.getMastersFromRelsAsync();

        connects.forEach(connect => {
            connect.referencePageContent(this);
            this.connects.set(connect.shapeId, connect);
        });

        const shapes = [...parsedShapes.values()];
        shapes.forEach((parsedShape, index) => {

            const shape = new VisioShape({
                archive: page.archive,
                masters: page.archive.document.masters,
                pageContent: this,
                xmlOrder: index,
                ...parsedShape
            });

            this.rootShapes.set(parsedShape.id, shape);

            if (!shape.getConnect()) {
                this.elementShapes.set(parsedShape.id, shape);
            }
        });

        this.connects.forEach(connect => {
            const shape = connect.getShape();
            if (!shape) return; // observed in draw.io/hr.vsdx
            this.linkShapes.set(shape.id, shape);
        });
    }

    referenceShape(shape) {
        // reference in all shapes map
        this.shapes.set(shape.id, shape);

        // reference foreign shape
        if (shape.foreignData) {
            this.setForeignShape(shape.foreignData, shape);
        }

        // reference master foreign data
        if (shape.masterShape && shape.masterShape.foreignData) {
            const master = shape.masterShape;

            this.setForeignShape(master.foreignData, shape, master);
        }

        // reference shape inside cells deep
        this.referenceShapeInsideCellsDeep(shape);
    }

    setForeignShape(foreignData, shape, master) {
        const absolutePath = foreignData.targetFile.absolutePath;
        if (!this.foreignShapes.has(absolutePath)) {
            this.foreignShapes.set(absolutePath, []);
        }

        const foreignShapes = this.foreignShapes.get(absolutePath);

        foreignShapes.push({ foreignData, shape, master });
    }

    referenceShapeInsideCellsDeep(shape) {
        this.referenceShapeInsideCells(shape._cells, shape);

        shape._sections.forEach(sectionsArray => {
            sectionsArray.forEach(section => {
                if (!section || !section.rows) {
                    return;
                }

                section.rows.forEach(row => {
                    this.referenceShapeInsideCells(row.cells, shape);
                })
            })
        })
    }

    referenceShapeInsideCells(cells, shape) {
        if (!cells) return;
        if (!(shape instanceof VisioShape)) {
            debug.log('shape must be instance of Shape');
        }

        cells.shape = shape;

        if (shape.masterShape) {
            cells.parent = shape.masterShape;
        }
    }

    // public API
    toGraphCells(
        {
            importShape = defaultImportShape,
            importConnect = defaultImportConnect,
            importLabels = defaultImportLabels,
            importImage = defaultImportImage,
            ignoreNonPrinting = true,
            ignoreSubShapeConnects = true,
            onImagesLoad = null
        } = {}
    ) {

        const elementsMap = new Map();
        const linksMap = new Map();
        const labelsMap = new Map();

        // ELEMENTS / NON-CONNECTS
        // create a map of Rappid Elements from Visio shapes that are not Connects
        this.getElementShapes().forEach((shape) => {
            const element = shape.toElement({
                importShape,
                ignoreNonPrinting,
                ignoreSubShapeConnects
            });
            if (element) {
                elementsMap.set(shape.id, element);
            }
        });

        // LINKS / CONNECTS
        // elementsMap is used to properly set source and target on links
        this.getLinkShapes().forEach((shape) => {
            const link = shape.getConnect().toLink(elementsMap, {
                importShape,
                importConnect,
                ignoreNonPrinting
            });
            if (link) {
                linksMap.set(shape.id, link);
                if (link.isLink()) {
                    // Link Labels
                    const labels = shape.getConnect().toLinkLabels(link, {
                        importLabels
                    });
                    if (labels) {
                        labelsMap.set(shape.id, labels);
                    }
                }
            }
        });

        // IMAGES
        // elements map is used to load foreign objects as well,
        // images are loaded async
        const vImages = this.getForeignShapes()
            .map(image => image.map(usedImage => usedImage.shape))
            .flat();

        const imagesAsync = vImages.map(vsdShape => {
            return async() => {
                const element = elementsMap.get(vsdShape.getRootShape().id);
                // todo: implement nested images
                if (!element) return null;
                const vsdImage = await vsdShape.getImage();
                if (!vsdImage) return null;
                return importImage(vsdShape, element, vsdImage);
            }
        });

        Promise.all(imagesAsync.map(fn => fn())).then((images) => {
            if (typeof onImagesLoad !== 'function') return;
            onImagesLoad(images.filter(image => image !== null));
        });

        return [...elementsMap.values(), ...linksMap.values(), ...labelsMap.values()].flat();
    }

    getRootShapes() {
        return [...this.rootShapes.values()];
    }

    getRootShape(id) {
        return this.rootShapes.get(id) || null;
    }

    getShapes() {
        return [...this.shapes.values()];
    }

    getShape(id) {
        return this.shapes.get(id) || null;
    }

    getConnects() {
        return [...this.connects.values()];
    }

    getConnect(shapeId) {
        return this.connects.get(shapeId) || null;
    }

    getForeignShapes() {
        return [...this.foreignShapes.values()];
    }

    getForeignShape(path) {
        return this.foreignShapes.get(path) || null;
    }

    getLinkShapes() {
        return [...this.linkShapes.values()];
    }

    getElementShapes() {
        return [...this.elementShapes.values()];
    }

    getFonts() {
        const fonts = new Set();
        this.shapes.forEach(shape => {
            const char = shape.getComputedSection(VisioSectionType.Character);
            if (!char) return;

            const row = char.getRow(0);
            if (!row) return;

            const { value } = row.getCell(VisioCellName.Font);

            if (value !== undefined && value !== 'Themed' && !fonts.has(value)) {
                fonts.add(value)
            }
        });

        return [...fonts.values()];
    }

    getUnsupportedFonts() {
        return this.getFonts().filter(font => !isFontAvailable(font));
    }
}
