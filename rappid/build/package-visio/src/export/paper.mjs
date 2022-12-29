import { VisioCellName, VisioShapeType } from '../types/enums.mjs';
import { exportCellViewAsShape, exportLinkAsConnects, exportLinkViewAsConnectShape } from './cellView.mjs';

export async function convertPaperToVisioShapes(paper, jxon, page, pageRels, exportElement, exportLink) {

    const { model: graph } = paper;

    // ELEMENTS
    // convert joint Elements into Visio Shapes
    const elementShapesMap = new Map();
    const elements = graph.getElements();
    const isCustomElementExport = (typeof exportElement === 'function');

    const templates = {
        fromConnection: async(linkView) => defaultLinkExport(linkView, elementShapesMap),
        fromNodes: async(cellView) => defaultElementExport(cellView, pageRels)
    }

    for await (const element of elements) {
        const elementView = element.findView(paper);
        let shapeJXON;
        if (isCustomElementExport) {
            shapeJXON = await customElementExport(elementView, page, exportElement, templates);
        } else {
            shapeJXON = await defaultElementExport(elementView, pageRels);
        }
        if (!shapeJXON) continue;
        elementShapesMap.set(element.id, shapeJXON);
    }

    // LINKS
    // convert joint Links into Visio Shapes & Connects
    const linkShapes = [];
    const linkConnects = [];
    const links = graph.getLinks();
    const isCustomLinkExport = (typeof exportLink === 'function');

    for await (const link of links) {
        const linkView = link.findView(paper);
        let linkJXON;
        if (isCustomLinkExport) {
            linkJXON = await customLinkExport(linkView, page, exportLink, templates);
        } else {
            linkJXON = defaultLinkExport(linkView, elementShapesMap);
        }
        if (!linkJXON) continue;
        const connects = exportLinkAsConnects(link, linkJXON, elementShapesMap);
        linkConnects.push(...connects);
        linkShapes.push(linkJXON);
    }

    // JXON

    jxon.Shapes = {
        Shape: [
            ...elementShapesMap.values(),
            ...linkShapes
        ]
    };
    jxon.Connects = {
        Connect: [
            ...linkConnects
        ]
    };

    return jxon;
}

async function customElementExport(elementView, page, exportElement, templates) {
    const vsdShape = await exportElement(elementView, page, templates);
    if (!vsdShape) return null;
    return vsdShape.jxon;
}

async function defaultElementExport(elementView, pageRels) {
    return exportCellViewAsShape(elementView, pageRels);
}

async function customLinkExport(linkView, page, exportLink, templates) {
    const vsdShape = await exportLink(linkView, page, templates);
    if (!vsdShape) return null;
    const linkJXON = vsdShape.jxon;
    // override begin/end cells in case source or target is missing
    // in that case Visio will need a point to set for source/target of link
    const defaultConnectShape = exportLinkViewAsConnectShape(linkView);
    const overrideCells = ['BeginX', 'BeginY', 'EndX', 'EndY'];
    overrideCells.forEach(cellName => {
        const defaultCell = defaultConnectShape.Cell.find(cell => cell['@N'] === cellName);
        if (defaultCell) {
            const originalIndex = linkJXON.Cell.findIndex(cell => cell['@N'] === cellName);
            if (originalIndex > -1) {
                linkJXON.Cell.splice(originalIndex, 1, defaultCell);
            } else {
                linkJXON.Cell.push(defaultCell);
            }
        }
    });

    return linkJXON;
}

function defaultLinkExport(linkView, elementShapesMap) {
    const { model: link } = linkView;
    const linkJXON = exportLinkViewAsConnectShape(linkView);
    linkJXON['@Type'] = VisioShapeType.Shape;

    const source = link.source();
    const target = link.target();

    const sourceShape = elementShapesMap.get(source.id);
    const targetShape = elementShapesMap.get(target.id);

    const sourceRef = `${sourceShape ? 'Sheet' : 'Dynamic connector'}.${sourceShape ? sourceShape['@ID'] : linkJXON['@ID']}`;
    const targetRef = `${targetShape ? 'Sheet' : 'Dynamic connector'}.${targetShape ? targetShape['@ID'] : linkJXON['@ID']}`;

    linkJXON.Cell.push({
        '@N': VisioCellName.BegTrigger,
        '@V': sourceShape ? '2' : '1',
        '@F': `_XFTRIGGER(${sourceRef}!EventXFMod)`
    }, {
        '@N': VisioCellName.EndTrigger,
        '@V': targetShape ? '2' : '1',
        '@F': `_XFTRIGGER(${targetRef}!EventXFMod)`
    }, {
        '@N': VisioCellName.ObjType,
        '@V': '2'
    });

    return linkJXON;
}
