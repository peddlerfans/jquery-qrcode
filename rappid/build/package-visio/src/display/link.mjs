import { g } from 'jointjs';
import { debug } from '../helpers/debug.mjs';
import { getArrows } from './arrows.mjs';
import { getLinePatternStrokeDasharray } from './line.mjs';
import { getShapePagePoints } from './getShapePagePoints.mjs';

/**
 *
 * @param {rappid.format.visio.Connect} [connect]
 * @returns {{attrs: {line: {targetMarker: null, sourceMarker: null}, root: {title: string}}}}
 */
export function convertVisioConnectToRappidAttributes(connect, sourceElement, targetElement) {

    const shape = connect.getShape();

    const pagePoints = getShapePagePoints(shape);
    if (!Array.isArray(pagePoints) || pagePoints.length < 2) {
        // always need points (for vertices)
        return null;
    }

    const attributes = {};

    // 'attrs'

    const {
        sourceMarker = null,
        targetMarker = null
    } = getArrows(shape.cells);

    const {
        lineWeight = 1,
        lineColor = '#000000',
        linePattern = 'none'
    } = shape.cells;

    const attrs = {
        line: {
            sourceMarker,
            targetMarker,
            stroke: lineColor,
            strokeWidth: Math.max(lineWeight, 1),
            strokeDasharray: getLinePatternStrokeDasharray(linePattern)
        }
    };

    const noShow = shape.getComputedGeometry().every(geom => geom.cells.noShow);
    if (noShow) {
        attrs.line.visibility = 'hidden';
    }

    if (debug.level & debug.TOOLTIPS) {
        attrs.root = { title: `${connect.tooltip}` };
    }

    attributes.attrs = attrs;

    // 'source'
    const startPagePoint = pagePoints.shift();
    if (sourceElement) {
        const { dx, dy } = calculateLinkOffset(sourceElement, startPagePoint);
        attributes.source = {
            id: sourceElement.id,
            anchor: { name: 'modelCenter', args: { dx, dy, rotate: true }}
        };
    } else {
        if (connect.getSource()) return null;
        attributes.source =  new g.Point(startPagePoint.x, startPagePoint.y).toJSON();
    }

    // 'target'
    const endPagePoint = pagePoints.pop();
    if (targetElement) {
        const { dx, dy } = calculateLinkOffset(targetElement, endPagePoint);
        attributes.target = {
            id: targetElement.id,
            anchor: { name: 'modelCenter', args: { dx, dy, rotate: true }}
        }
    } else {
        if (connect.getTarget()) return null;
        attributes.target = new g.Point(endPagePoint.x, endPagePoint.y).toJSON();
    }

    // 'vertices'
    attributes.vertices = pagePoints;

    return attributes;
}

/**
 *
 * @param {format.visio.Shape} [shape]
 * @param {Map<number,dia.Element>} [elementsMap]
 * @returns {dia.Element | undefined}
 */
export function getLinkConnectedShapeFromVisioConnect(shape, elementsMap) {
    const nearestElement = getNearestElementIdAndOffset(elementsMap, shape);
    if (!nearestElement) {
        debug.log('no nearestElement source');
        return null;
    }
    // TODO: investigate when the condition is not true
    // as this code could be possibly simplified.
    // shape.getRootShape() !== shape
    const { shapeId: groupShapeId } = nearestElement;
    return elementsMap.get(groupShapeId);
}

export function calculateLinkOffset(shape, absolutePoint = { x: 0, y: 0 }) {
    const position = shape.get('position');
    const { x: shapeX, y: shapeY } = position;
    const { width, height } = shape.get('size');

    return {
        dx: absolutePoint.x - shapeX - width / 2,
        dy: absolutePoint.y - shapeY - height / 2
    }
}

function getNearestElementIdAndOffset(elementsMap, shape, offsetX = 0, offsetY = 0) {
    const shapeId = shape.id;
    if (elementsMap.has(shapeId)) {
        return { shapeId, offsetX, offsetY };
    }

    // recursion
    if (shape.parent) {
        return getNearestElementIdAndOffset(elementsMap, shape.parent, offsetX, offsetY);
    }

    return null;
}
