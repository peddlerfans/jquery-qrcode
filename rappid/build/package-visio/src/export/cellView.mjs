import { util, g, V } from 'jointjs';
import { VisioCellName, VisioShapeType, VisioSectionType } from '../types/enums.mjs';
import { pixelsToInches } from '../helpers/internalUnits.mjs';
import { isNodeExportable, exportNode } from './node.mjs';
import forEachDescendant from '../helpers/forEachDescendant.mjs';
import pathToGeometryRows from './pathToGeometryRows.mjs';

export async function exportCellViewAsShape(cellView, pageRels) {
    if (!isNodeExportable(cellView.vel)) {
        return null;
    }
    const isLink = cellView.model.isLink();
    if (isLink) {
        return await exportLinkViewAsShape(cellView, pageRels);
    } else {
        return await exportElementViewAsShape(cellView, pageRels);
    }
}

async function exportElementViewAsShape(elementView, pageRels) {
    const { model } = elementView;
    const bbox = model.getBBox();
    const origin = bbox.center();
    const angle = (elementView.rotatableNode) ? 0 : model.angle();
    const matrix = V.createSVGMatrix().rotate(angle)
    return exportCellViewNodes(elementView, pageRels, bbox, matrix, origin);
}


async function exportLinkViewAsShape(linkView, pageRels) {
    const bbox = linkView.getConnection().bbox();
    const matrix = V.createSVGMatrix().translate(-bbox.x, -bbox.y);
    return exportCellViewNodes(linkView, pageRels, bbox, matrix);
}

async function exportCellViewNodes(cellView, pageRels, bbox, matrix, origin) {

    const { paper, vel: vRoot } = cellView;

    const paperBBox = paper.getArea();
    const transformation = V.decomposeMatrix(matrix);
    const baseShapeJXON = getBaseShapeFromNode(vRoot, bbox, paperBBox, {
        transformation,
        origin
    });

    // enrich rootNode
    const rootShapeJXON = await exportNode(vRoot, baseShapeJXON, cellView, transformation, pageRels);

    // cache
    const rootId = vRoot.id;
    const JXONCache = { [rootId]: rootShapeJXON };
    const bboxCache = { [rootId]: bbox };
    const matrixCache = { };

    // create grouped Shapes for each root Child
    await forEachDescendant(vRoot, async(vChild) => {

        if (!isNodeExportable(vChild)) {
            return false;
        }

        const childNode = vChild.node;
        const childId = V.ensureId(vChild);

        const parentNode = childNode.parentNode;
        const parentId = parentNode.id;
        const parentBBox = bboxCache[parentId];
        const parentJXON = JXONCache[parentId];
        const parentMatrix = matrixCache[parentId];

        let childMatrix = vChild.getTransformToElement(parentNode);
        if (parentMatrix) {
            childMatrix = parentMatrix.multiply(childMatrix);
        }

        const isEmpty = vChild.children().length === 0;
        const tagName = vChild.tagName();
        if (tagName === 'G') {
            if (isEmpty) return false;
            bboxCache[childId] = parentBBox;
            JXONCache[childId] = parentJXON;
            matrixCache[childId] = childMatrix;
            return true;
        }

        const childBBox = bboxCache[childNode.id] = cellView.getNodeBoundingRect(childNode);

        // create Visio Shape from a node
        const childTransformation = V.decomposeMatrix(childMatrix);
        const childShapeJXON = getBaseShapeFromNode(vChild, childBBox, parentBBox, {
            transformation: childTransformation
        });

        await exportNode(vChild, childShapeJXON, cellView, childTransformation, pageRels);
        // add Visio Shape to it's immediate parent
        parentJXON.Shapes.Shape.push(childShapeJXON);
        // this Visio Shape can become parent shape of others
        if (!isEmpty) {
            JXONCache[childId] = childShapeJXON;
        }
        // execute recursively if there are more children nested
        return isEmpty;
    });

    return rootShapeJXON;
}

export function exportLinkViewAsConnectShape(linkView) {

    const { model, paper } = linkView;

    if (!model.isLink()) {
        throw new Error('Can not export dia.Element as a connection.');
    }

    if (!isNodeExportable(linkView.vel)) {
        return null;
    }

    const path = linkView.getConnection();
    if (!path) return null;

    const paperBBox = paper.getArea();
    const bbox = path.bbox();
    const jxon = getBaseShapeFromConnection(linkView, bbox, paperBBox);
    const matrix = V.createSVGMatrix().translate(0, bbox.height).flipY().translate(-bbox.x, -bbox.y);

    // todo: loads of duplicates
    const geometryJXON = {
        '@IX': '0',
        '@N': VisioSectionType.Geometry,
        Cell: [
            { '@N': VisioCellName.NoFill, '@V': '1' },
            { '@N': VisioCellName.NoLine, '@V': '0' },
            { '@N': VisioCellName.NoShow, '@V': '0' },
            { '@N': VisioCellName.NoSnap, '@V': '0' },
            { '@N': VisioCellName.NoQuickDrag, '@V': '0' }
        ],
        Row: pathToGeometryRows(path, matrix)
    };

    // todo: what to do with this?
    // add Geometry section specific styles
    // enrichGeometryJXONWithStyles(vNode, geometryJXON);

    jxon.Section.push(geometryJXON);
    return jxon;
}

// todo: new Connect();
// todo: implement values: https://docs.microsoft.com/en-us/office/vba/api/visio.connect.topart
// todo: add connect points to source and target at beginning and end of link and use part 100 for it
// what's path absolute point vs source/target position ??
export function exportLinkAsConnects(link, visioShapeJXON, elementShapesMap) {

    const sheetId = visioShapeJXON['@ID'].toString();

    const source = link.source();
    const sourceShape = elementShapesMap.get(source.id);

    const target = link.target();
    const targetShape = elementShapesMap.get(target.id);

    return [{
        '@FromSheet': sheetId,
        '@FromCell': VisioCellName.BeginX,
        '@FromPart': '3',
        '@ToSheet': sourceShape ? sourceShape['@ID'].toString() : sheetId,
        '@ToCell': sourceShape ? VisioCellName.PinX : VisioCellName.EndX,
        '@ToPart': sourceShape ? '3' : '9'
    }, {
        '@FromSheet': sheetId,
        '@FromCell': VisioCellName.EndX,
        '@FromPart': '3',
        '@ToSheet': targetShape ? targetShape['@ID'].toString() : sheetId,
        '@ToCell': targetShape ? VisioCellName.PinX : VisioCellName.BeginX,
        '@ToPart': targetShape ? '3' : '9'
    }];
}

function getBaseShape(vel) {

    const type = (vel.tagName() === 'G') ? VisioShapeType.Group : VisioShapeType.Shape;

    // defaults
    const shape = {
        '@ID': util.uniqueId(),
        '@LineStyle': '3',
        '@Type': type,
        Cell: [
            { '@N': VisioCellName.ResizeMode, '@V': '0' }
        ],
        Section: [],
        Shapes: { Shape: [] }
    }

    return shape;
}

function getBaseShapeFromConnection(linkView, bbox) {

    const {
        vel,
        sourcePoint,
        targetPoint,
        paper
    } = linkView;

    const shape = getBaseShape(vel);
    const { height } = paper.getArea();

    // adjust to Visio coordinate space
    const begin = new g.Point(sourcePoint);
    begin.y = height - begin.y;
    const end = new g.Point(targetPoint);
    end.y = height - end.y;

    // add 1-D specific Visio Cells
    shape.Cell.unshift(
        { '@N': VisioCellName.BeginX, '@V': `${pixelsToInches(begin.x)}`, '@F': '_WALKGLUE(BegTrigger,EndTrigger,WalkPreference)' },
        { '@N': VisioCellName.BeginY, '@V': `${pixelsToInches(begin.y)}`, '@F': '_WALKGLUE(BegTrigger,EndTrigger,WalkPreference)' },
        { '@N': VisioCellName.EndX, '@V': `${pixelsToInches(end.x)}`, '@F': '_WALKGLUE(EndTrigger,BegTrigger,WalkPreference)' },
        { '@N': VisioCellName.EndY, '@V': `${pixelsToInches(end.y)}`, '@F': '_WALKGLUE(EndTrigger,BegTrigger,WalkPreference)' },
        { '@N': VisioCellName.Width, '@V': `${pixelsToInches(end.x - begin.x)}`, '@F': 'GUARD(EndX-BeginX)' },
        { '@N': VisioCellName.Height, '@V': `${pixelsToInches(bbox.height)}`, '@F': `GUARD(${pixelsToInches(bbox.height)})` },
        { '@N': VisioCellName.Angle, '@V': '0', '@F': 'GUARD(0 deg)' },
        { '@N': VisioCellName.PinX, '@V': `${pixelsToInches((begin.x + end.x) / 2)}`, '@F': 'GUARD((BeginX+EndX)/2))' },
        { '@N': VisioCellName.PinY, '@V': `${pixelsToInches((begin.y + end.y) / 2)}`, '@F': 'GUARD((BeginY+EndY)/2)' },
        { '@N': VisioCellName.LocPinX, '@V': `${pixelsToInches((end.x - begin.x) / 2)}`, '@F': 'GUARD(Width*0.5)' },
        { '@N': VisioCellName.LocPinY, '@V': `${pixelsToInches(bbox.height / 2)}`, '@F': 'GUARD(Height*0.5)' },
        { '@N': VisioCellName.FlipX, '@V': '0', '@F': 'GUARD(FALSE)' },
        { '@N': VisioCellName.FlipY, '@V': '0', '@F': 'GUARD(FALSE)' }
    );

    return shape;
}

function getBaseShapeFromNode(vel, bbox, parentBBox, {
    transformation = {},
    origin = new g.Point(0, 0)
}) {

    const {
        translateX = 0,
        translateY = 0,
        rotation = 0,
        scaleX = 1,
        scaleY = 1

    } = transformation;

    let { width, height } = bbox;

    const center = bbox.center();
    if (scaleX !== 1 || scaleY !== 1) {
        center.scale(scaleX, scaleY);
        width *= scaleX;
        height *= scaleY;
    }
    if (rotation !== 0) {
        center.rotate(origin, -rotation);
    }

    const locPin = new g.Point(width / 2, height / 2);
    const pin = new g.Point(translateX + center.x, parentBBox.height - (center.y + translateY));
    const shape = getBaseShape(vel);

    shape.Cell.unshift(
        { '@N': VisioCellName.PinX, '@V': `${pixelsToInches(pin.x)}` },
        { '@N': VisioCellName.PinY, '@V': `${pixelsToInches(pin.y)}` },
        { '@N': VisioCellName.Width, '@V': `${pixelsToInches(width)}` },
        { '@N': VisioCellName.Height, '@V': `${pixelsToInches(height)}` },
        { '@N': VisioCellName.LocPinX, '@V': `${pixelsToInches(locPin.x)}` },
        { '@N': VisioCellName.LocPinY, '@V': `${pixelsToInches(locPin.y)}` },
        { '@N': VisioCellName.Angle, '@V': `${g.toRad(-rotation)}` },
    );

    return shape;
}
