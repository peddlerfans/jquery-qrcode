import { util, V } from 'jointjs';
import { getArrows } from './arrows.mjs';
import { enrichShapeTextAttributes } from './enrichShapeTextAttributes.mjs';
import { getLinePatternStrokeDasharray } from './line.mjs';
import { getFillGradient } from './gradient.mjs';
import { getFillPattern } from './pattern.mjs';
import { debug } from '../helpers/debug.mjs';
import { VisioSectionType } from '../types/enums.mjs';

export function convertVisioGroupToRappidAttributes(group, {
    origin = { x: 0, y: 0 },
    prefix = 'group',
    isRoot = false
} = {}, opts = {}) {

    // ignore flagged groups from printing
    if (opts.ignoreNonPrinting && !group.isPrintable()) return null;

    const { cells, shapes } = group;
    const {
        width,
        height,
        locPinX,
        locPinY,
        pinX,
        pinY,
        angle,
        flipX,
        flipY
    } = cells;

    const groupAttributes = convertVisioShapeToRappidAttributes(group, {
        origin: { x: 0, y: height },
        prefix,
        isRoot
    }, opts);

    if (!groupAttributes) return null;

    const geometryMarkup = groupAttributes.markup;
    const textMarkup = [];

    // TODO: rappid attributes should return geometry and text separately
    const textIndex = geometryMarkup.findIndex(markup => markup.text);
    if (textIndex > -1) {
        textMarkup.push(...geometryMarkup.splice(textIndex, 1));
    }

    const groupAttrs = groupAttributes.attrs;

    // TODO: look into group level transformations
    // this is unfortunate but for the group level we still have to calculate the group
    // position using the locPins. The reason is that we do not have an organizational
    // group element for locPin, rotation and flipping implemented. It is a bit problematic
    // to get that working as i.e. we can't scale a group if there's text inside.
    const groupPosition = {
        x: origin.x + pinX - locPinX,
        y: origin.y - pinY + locPinY - height
    };

    let groupMatrix = V.createSVGMatrix();
    if (angle) {
        groupMatrix = groupMatrix.translate(locPinX, locPinY).rotate(angle).translate(-locPinX, -locPinY)
    }
    if (flipX) {
        groupMatrix = groupMatrix.flipX().translate(-width, 0);
    }
    if (flipY) {
        groupMatrix = groupMatrix.flipY().translate(0, -height);
    }

    const groupSize = { width, height };

    shapes.forEach((shape, index) => {
        // TODO: shapes suppose to be filtered already
        if (!shape) return;
        if (opts.ignoreSubShapeConnects && shape.getConnect()) return;
        const groupSelector = `${prefix}${index}`;
        let attributes;
        if (shape.type === 'Group') {
            attributes = convertVisioGroupToRappidAttributes(shape, {
                origin: { x: 0, y: height },
                prefix: `${groupSelector}-`
            }, opts);
        } else {
            attributes = convertVisioShapeToRappidAttributes(shape, {
                origin: { x: 0, y: height },
                prefix: `${groupSelector}-`
            }, opts);
        }

        if (!attributes) return;

        const { markup, position, attrs } = attributes;

        geometryMarkup.push({
            tagName: 'g',
            selector: groupSelector,
            children: markup,
            attributes: {
                'transform': V.matrixToTransformString(groupMatrix.translate(position.x, position.y))
            }
        });
        if ('root' in attrs) {
            attrs[groupSelector] = attrs.root;
            delete attrs.root;
        }
        util.assign(groupAttrs, attrs);
    })

    return {
        markup: [...geometryMarkup, ...textMarkup],
        attrs: groupAttrs,
        position: groupPosition,
        size: groupSize
    };
}

export function convertVisioShapeToRappidAttributes(shape, {
    origin = { x: 0, y: 0 },
    prefix = '',
    isRoot = false
} = {}, opts = {}) {

    // ignore flagged shapes from printing
    if (opts.ignoreNonPrinting && !shape.isPrintable()) return null;

    const {
        text,
        cells = /** @type {VisioCells} */{},
        foreignData,
    } = shape;

    const {
        angle = 0,
        locPinX = 0,
        locPinY = 0,
        pinX,
        pinY,
        width,
        height,
        flipX,
        flipY,
        // fillForegnd = fillStyle === 0 ? 'transparent' : 'white',
        // lineColor = lineStyle === 0 ? 'transparent' : 'black',
        fillForegnd = 'white',
        fillBkgnd = '#ff0000',
        lineColor = 'black',
        lineWeight,
        lineColorTrans = 0,
        fillForegndTrans = 0,
        linePattern = 1,
        fillPattern = 1,
        //txtWidth = width - leftMargin - rightMargin

        fillGradientDir = 0,
        fillGradientAngle,
        fillGradientEnabled = false,
        //useGroupGradient
    } = cells;

    const markup = [];
    const attrs = {};
    if (debug.level & debug.TOOLTIPS) {
        attrs.root = { title: `${shape.tooltip}`  }
    }

    // position should always point to top-left corner of shape in JointJS coordinate system
    const position = {
        x: origin.x + pinX,
        y: origin.y - height - pinY
    };

    const size = { width, height };

    let sx = flipX ? -1 : 1,
        sy = flipY ? -1 : 1,
        tx = -locPinX,
        ty = flipY ? -2 * height + locPinY : locPinY,
        ra = sx * sy * angle,
        rx = locPinX,
        ry = height - locPinY;

    // it's a simplified workaround for group level flipping (rotations are not included here)
    // this is something we should think through - how to organize grouped shapes as Visio allows for
    // groups to be organizational level "thing" that does not contain geometry by itself, but has
    // attributes like pins, rotations etc.
    if (isRoot) {
        tx += flipX ? -width + locPinX : locPinX;
        ty -= flipY ? -height + locPinY: locPinY;
    }

    // leaving transformations in a form of variables and joined array as handling the group level
    // transforms described above might require mixing transforms any way
    const scaling = `scale(${sx}, ${sy})`;
    const translation = `translate(${tx}, ${ty})`;
    const rotation = `rotate(${ra}, ${rx}, ${ry})`;

    const transform = [
        scaling,
        translation,
        rotation
    ].join(' ');

    const geometries = opts.noGeometry ? [] : shape.getComputedGeometry();
    if (geometries.length > 0) {
        const foregroundSelector = `${prefix}foreground`;
        markup.push({
            tagName: 'g',
            selector: foregroundSelector,
            children: getMarkupFromGeometry(geometries, { width, height, prefix }),
            attributes: {
                'transform': transform,
                'stroke-width': Math.max(lineWeight, 1)
            }
        });

        const foregroundAttrs = attrs[foregroundSelector] = {};

        if (fillPattern === 0) {
            foregroundAttrs.fill = 'none';
        } else if (fillPattern === 1) {
            foregroundAttrs.fill = fillForegnd;
            foregroundAttrs.fillOpacity = 1 - fillForegndTrans;
        } else {
            foregroundAttrs.fill = getFillPattern(fillPattern, fillForegnd, fillBkgnd);
            foregroundAttrs.fillOpacity = 1 - fillForegndTrans;
        }

        if (fillGradientEnabled) {
            foregroundAttrs.fillOpacity = 1 - fillForegndTrans;
            const fillGradientSection = shape.getComputedSection(VisioSectionType.FillGradient);
            if (fillGradientSection) {
                foregroundAttrs.fill = getFillGradient({
                    fillGradientAngle,
                    fillGradientDir,
                    fillGradientSection,
                    fillBkgnd
                });
            }
        }

        if (linePattern > 0) {
            foregroundAttrs.stroke = lineColor;
            foregroundAttrs.strokeOpacity = 1 - lineColorTrans;
            foregroundAttrs.strokeDasharray = getLinePatternStrokeDasharray(linePattern);
        } else {
            foregroundAttrs.stroke = 'none';
        }

        if (shape.isOneDimensional())
            util.assign(foregroundAttrs, getArrows(cells));

        const {
            shapeShdwType,
            shapeShdwOffsetX,
            shapeShdwOffsetY,
            shapeShdwBlur = 0,
            shdwForegnd = '#000',
            shdwForegndTrans = 0
        } = cells;
        if (shapeShdwType) {
            foregroundAttrs.filter = {
                name: 'dropShadow',
                args: {
                    dx: shapeShdwOffsetX,
                    dy: -shapeShdwOffsetY,
                    color: shdwForegnd,
                    opacity: 1 - shdwForegndTrans,
                    blur: shapeShdwBlur
                }
            }
        }
    }

    if (foreignData) {
        const imageSelector = `${prefix}image`;
        const imageGroupSelector = `image${foreignData.id}`;
        const imageMarkup = {
            tagName: 'image',
            selector: imageSelector,
            groupSelector: imageGroupSelector,
            attributes: {
                x: -width/2,
                y: height/2,
                'width': width,
                'height': height
            }
        };
        markup.push(imageMarkup);
    }

    if (text && text.length)
        enrichShapeTextAttributes(
            shape,
            {
                // read write
                markup,
                attrs,
                // read only
                prefix,
                isRootGroupText: isRoot
            });

    const result = { markup, attrs, position, size };

    // links
    if (shape.cells.objType === 2) {
        util.setByPath(result, ['attrs', 'foreground', 'fill'], 'none');
    }

    return result;
}

function getMarkupFromGeometry(geometries, { width, height, prefix = '' }) {

    // geometry != Visio shape. Single Visio shape may consist of multiple geometries (i.e. line with arrow-heads)
    return geometries
        // considered a JointJS shape
        .map((geometry, index) => {

            // single geometry
            const attributes = {
                'd': geometry.toPath(width, height).toString(),
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
            };

            const { cells = {}} = geometry;
            if (cells.noFill) {
                attributes.fill = 'none';
            }
            if (cells.noLine) {
                attributes.stroke = 'none';
            }
            if (cells.noShow) {
                attributes.visibility = 'hidden';
            }
            return {
                tagName: 'path',
                selector: `${prefix}geometry-${index}`,
                attributes
            };
        });
}



