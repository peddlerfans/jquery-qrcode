import { g, V } from 'jointjs';
import { VisioCellName, VisioShapeType, VisioSectionType, XmlSchema } from '../types/enums.mjs';
import { pixelsToInches } from '../helpers/internalUnits.mjs';
import { debug } from '../helpers/debug.mjs';
import fetchImage from '../helpers/fetchImage.mjs';
import { normalizeColor, isColorTransparent } from '../helpers/color.mjs'
import pathToGeometryRows from './pathToGeometryRows.mjs';

const skipGeometry = {
    G: true,
    TITLE: true,
    TSPAN: true,
    TEXTPATH: true
};

export async function exportNode(vNode, jxon, cellView, transformation, pageRels) {

    const tagName = vNode.tagName();
    if (tagName === 'TEXT') {
        exportSVGText(vNode, jxon);
    } else if (tagName === 'IMAGE') {
        await exportSVGImage(vNode, jxon, pageRels);
    } else if (!(tagName in skipGeometry)) {
        // Visio Geometry section is created only for certain types of tags
        exportSVGGeometryElement(vNode, jxon, cellView, transformation);
    }

    // map element attributes to Visio style Cells
    enrichShapeJXONWithStyles(vNode, jxon);

    return jxon;
}

export function isNodeExportable(vNode) {
    const { width, height } = vNode.node.getBoundingClientRect();
    if (width === 0 && height === 0) {
        return false;
    }
    return true;
}

function exportSVGText(vNode, jxon) {

    const { node } = vNode;
    const text = Array.from(node.childNodes).map(node => node.textContent).join('\n');
    if (text.length === 0) return;

    jxon.Text = {
        cp: { '@IX': '0', '@textPlaceholder': text }
    }

    const character = {
        '@N': VisioSectionType.Character,
        Row: [{ '@IX': '0', Cell: [] }]
    }

    const cells = character.Row[0].Cell;

    // add text styling attributes
    const fontSize = vNode.attr('font-size');
    if (fontSize) {
        cells.push({ '@N': VisioCellName.Size, '@V': pixelsToInches(fontSize).toString() });
    }

    const fontFamily = vNode.attr('font-family');
    if (fontFamily) {
        cells.push({ '@N': VisioCellName.Font, '@V': fontFamily });
    }

    const fill = vNode.attr('fill');
    if (fill) {
        if (fill === 'transparent') {
            //
        } else {
            cells.push({ '@N': VisioCellName.Color, '@V': normalizeColor(fill) });
        }
    }

    jxon.Section.push(character);

    // zero out margins
    // TODO: candidate for default page settings
    jxon.Cell.push(
        { '@N': VisioCellName.LeftMargin, '@V': '0' },
        { '@N': VisioCellName.RightMargin, '@V': '0' },
        { '@N': VisioCellName.TopMargin, '@V': '0' },
        { '@N': VisioCellName.BottomMargin, '@V': '0' }
    );
}

async function exportSVGImage(vNode, jxon, pageRels) {

    const url = vNode.attr('xlink:href') || vNode.attr('href');
    if (!url) return;

    let dataUrl = url;
    let extension = 'png';

    // todo: make it work async
    const img = await fetchImage(url);

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    try {
        dataUrl = canvas.toDataURL('image/png');
    } catch (e) {
        // e.g. Tainted Image
        debug.log(`Can not convert an image (${url}) to data URI:`, e);
        const isDataURL = /^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/.test(url);
        if (!isDataURL) return jxon;
        const mimeType = url.split(',')[0].split(':')[1].split(';')[0];
        if (mimeType === 'image/svg+xml') {
            extension = 'svg';
        }
    }

    const id = pageRels.jxon.Relationship.length + 1;
    const name = `image${id}.${extension}`;

    // Visio images are inserted on Page as ForeignData element with a relationship ID
    jxon.ForeignData = {
        '@ForeignType': 'Bitmap',
        '@CompressionType': extension.toUpperCase(),
        Rel: {
            '@r:id': `rId${id.toString()}`
        }
    }

    // todo: find better place for this
    // override Shape type to foreign
    jxon['@Type'] = VisioShapeType.Foreign;

    // todo: handle image size as it's not necessarily same as container size
    // add image specific cells

    let bbox = vNode.getBBox();
    if (vNode.attr('preserveAspectRatio') !== 'none') {
        // todo: handle other preserveAspectRatio values
        // for now assuming anything other then explicit `none` is xMidYMid

        const widthRatio = bbox.width / img.width;
        const heightRatio = bbox.height / img.height;
        const aspectRatio = widthRatio <= heightRatio ? widthRatio : heightRatio;
        const width = img.width * aspectRatio;
        const height = img.height * aspectRatio;

        bbox = new g.Rect({
            x: (bbox.width - width) / 2,
            y: (bbox.height - height) / 2,
            width,
            height
        });
    }

    jxon.Cell.push(
        { '@N': VisioCellName.ImgOffsetX, '@V': pixelsToInches(bbox.x).toString() },
        { '@N': VisioCellName.ImgOffsetY, '@V': pixelsToInches(bbox.y).toString() },
        { '@N': VisioCellName.ImgWidth, '@V': pixelsToInches(bbox.width).toString() },
        { '@N': VisioCellName.ImgHeight, '@V': pixelsToInches(bbox.height).toString() }
    );

    // page relationship XML file contains info about all relationships
    // these are referenced by ID and point to a relationship by Type and Target
    pageRels.jxon.Relationship.push({
        '@Id': `rId${id}`,
        '@Type': XmlSchema.DocumentImageRelationships,
        '@Target': `../media/${name}`
    });

    // data collection holds information about image urls
    // for later conversion to dataURI
    pageRels.data.push({ name, url: dataUrl });
}

function exportSVGGeometryElement(vNode, jxon, view, transformation) {

    const { model } = view;
    const { node } = vNode;

    const isElementRootNode = model.isElement() && view.el === node;
    const bbox = isElementRootNode
        ? new g.Rect(model.attributes.size)
        : view.getNodeBoundingRect(node);

    const { scaleX, scaleY } = transformation;
    let pathMatrix = V.createSVGMatrix().scale(scaleX, scaleY).translate(0, bbox.height).flipY();
    if (!isElementRootNode) {
        pathMatrix = pathMatrix.translate(-bbox.x, -bbox.y);
    }

    const d = V.normalizePathData(vNode.convertToPathData());
    const path = new g.Path(d);

    // TODO: what is the correct ID here?
    let geometryIX = 1;
    const geometryJXON = {
        '@IX': geometryIX.toString(),
        '@N': VisioSectionType.Geometry,
        'Cell': [],
        'Row': pathToGeometryRows(path, pathMatrix)
    };
    geometryIX++;

    // add Geometry section specific styles
    enrichGeometryJXONWithStyles(vNode, geometryJXON);

    jxon.Section.push(geometryJXON);
}

function enrichShapeJXONWithStyles(vNode, jxon) {

    const { stroke, fill, strokeWidth } = window.getComputedStyle(vNode.node)
    const cells = jxon.Cell;

    // Support `fill-opacity`, `stroke-opacity`, rgba color with alpha

    // FillForegnd
    if (fill === 'none' || fill === isColorTransparent(fill)) {
        cells.push({ '@N': 'FillForegndTrans', '@V': '1' });
    } else {
        cells.push({ '@N': 'FillForegnd', '@V': normalizeColor(fill) });
    }

    // LineColor
    if (stroke === 'none' ||  isColorTransparent(stroke)) {
        cells.push({ '@N': 'LineColorTrans', '@V': '1' });
    } else {
        cells.push({ '@N': 'LineColor', '@V': normalizeColor(stroke) });
    }

    // LineWeight
    if (strokeWidth) {
        cells.push({ '@N': 'LineWeight', '@V': String(pixelsToInches(parseFloat(strokeWidth))) });
    }
}

function enrichGeometryJXONWithStyles(vNode, jxon) {

    const { stroke, fill } = window.getComputedStyle(vNode.node);
    const cells = jxon.Cell;

    if (fill) {
        cells.push({ '@N': 'NoFill', '@V': fill === 'none' ? '1' : '0' });
    }

    if (stroke) {
        cells.push({ '@N': 'NoLine', '@V': '0' });
    }
}

