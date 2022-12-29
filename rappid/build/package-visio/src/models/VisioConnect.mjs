import { VisioObject } from './VisioObject.mjs';
import { VisioAttribute } from '../types/enums.mjs';
import { convertVisioConnectToRappidAttributes, getLinkConnectedShapeFromVisioConnect } from '../display/link.mjs';
import { defaultImportLabels, defaultImportConnect } from '../display/factory.mjs';

/*
parsed item
{
    "fromSheet": 379,
    "fromCell": "EndX",
    "fromPart": 12,
    "toSheet": 347,
    "toCell": "Connections.Float.X",
    "toPart": 104
}*/

export class VisioConnect extends VisioObject {

    constructor(init) {
        super(init, new Set([
            VisioAttribute.source,
            VisioAttribute.target,
        ]));
    }

    referencePageContent(pageContent) {
        this.pageContent = pageContent;
    }

    getShape() {
        return this.pageContent.getShape(this.shapeId);
    }

    /**
     * @returns {Shape|null}
     */
    getSource() {
        const source = this._source;
        if (!source) {
            // Is it a sub-shape which has a connect associated with it
            // If so, the root shape is the source.
            const shape = this.getShape();
            if (shape.isRootShape()) return null;
            return shape.getRootShape();
        }
        return this.pageContent.getShape(source.shapeId);
    }

    /**
     * @returns {Shape|null}
     */
    getTarget() {
        const target = this._target;
        if (!target) return null;
        return this.pageContent.getShape(target.shapeId);
    }

    // getPoint(connect) {
    //     const { cell, part } = connect;

    //     if ((cell === 'PinX' || cell === 'PinY') && part === 3) {
    //         return {
    //             type: 'automatic'
    //         }
    //     }

    //     if (part >= 100) {
    //         const zeroBasedRowId = part - 100;
    //         const oneBasedRowId = zeroBasedRowId + 1;
    //         const checkCellString = `Connections.X${oneBasedRowId}`;

    //         if (cell !== checkCellString) {
    //             logAndThrow('implement connection point');
    //         }

    //         const shape = this.getShape(connect.shapeId);
    //         const partValues = this.getPartFromRow(shape, zeroBasedRowId);
    //         return {
    //             type: 'exact',
    //             x: partValues.x,
    //             y: partValues.y
    //         }
    //     }

    //     logAndThrow('implement connection point');
    // }

    // getPartFromRow(shape, rowIndex) {
    //     const connections = shape.sections.get(VisioSectionType.Connection);
    //     if (!connections || !connections[0]) return { x: 0, y: 0 };
    //     const connectRows = connections.rows;
    //     const row = connectRows.find(row => row.index === rowIndex);
    //     const cells = row.cells;

    //     /*
    //         row cells:
    //             x          // relevant
    //             y          // relevant
    //             dirX       // used during formula evaluation only
    //             dirY       // used during formula evaluation only
    //             type       // used during formula evaluation only
    //             autoGen    // used during formula evaluation only
    //             prompt     // used during formula evaluation only
    //      */

    //     return cells.directValues;
    // }

    get tooltip() {
        const shape = this.getShape()

        let string = `connectId: ${shape.id} (shapeId)\n` +
            `type: ${shape.type}`;

        const masterAndXmlInfo = false;
        if (masterAndXmlInfo) {
            const masterShape = shape.masterShape;
            if (masterShape) {
                string += `\nmasterShapeId: ${masterShape.id}`;
                if (masterShape.shapeId)
                    string += ` (shapeId: ${masterShape.shapeId})`;
            }
            const master = shape.master;
            if (master)
                string += `\nmasterXml: ${master.xmlPath.split('/').pop()}`;

            string += `\nshapeXml: ${this.page.xmlPath.split('/').pop()}`;
        }

        return string;

    }

    toLinkAttributes(sourceElement, targetElement) {
        const attributes = convertVisioConnectToRappidAttributes(this, sourceElement, targetElement);
        if (!attributes) return null;
        const shape = this.getShape();
        attributes.z = shape.getPageZIndex();
        return attributes;
    }

    toLink(elementsMap, {
        importConnect = defaultImportConnect,
        ignoreNonPrinting = true
    } = {}) {

        if (typeof importConnect !== 'function') return null;

        const shape = this.getShape();

        // in case entire top level Visio shape is marked as nonPrinting, exit early
        if (ignoreNonPrinting && !shape.isPrintable()) {
            return null;
        }

        const opts = { ignoreNonPrinting };
        const vsdSource = this.getSource();
        const vsdTarget = this.getTarget();
        const source = vsdSource ? getLinkConnectedShapeFromVisioConnect(vsdSource, elementsMap) : null;
        const target = vsdTarget ? getLinkConnectedShapeFromVisioConnect(vsdTarget, elementsMap) : null;

        return importConnect(this, source, target, opts);
    }

    toLinkLabels(link, {
        importLabels = defaultImportLabels
    } = {}) {
        return importLabels(this.getShape(), link);
    }

    // getSourcePart() {
    //     const source = this._source;
    //     if (!source)
    //         return null;
    //
    //     return this.getPart(source);
    // }

    // getTargetPart() {
    //     const target = this._target;
    //     if (!target)
    //         return null;
    //
    //     return this.getPart(target);
    // }

    // /**
    //  * @param {VisioConnect} connect (target or source definition)
    //  * @returns {VisioShapePart|null}
    //  */
    // getPart(connect) {
    //     const code = connect.part;
    //
    //     if (code === -1)
    //         return null;
    //
    //     const shape = this.getShape(connect.shapeId);
    //
    //     if (code >= 100) {
    //         const rowIndex = code - 100;
    //         return this.getPartFromRow(shape, rowIndex);
    //     }
    //
    //     const shapePartEnum = {
    //         0: VisioShapePart.fromNone,
    //         1: VisioShapePart.leftEdge,
    //         2: VisioShapePart.centerEdge,
    //         3: VisioShapePart.rightEdge,
    //         4: VisioShapePart.bottomEdge,
    //         5: VisioShapePart.middleEdge,
    //         6: VisioShapePart.topEdge,
    //         7: VisioShapePart.beginX,
    //         8: VisioShapePart.beginY,
    //         9: VisioShapePart.begin,
    //         10: VisioShapePart.endX,
    //         11: VisioShapePart.endY,
    //         12: VisioShapePart.end,
    //         13: VisioShapePart.fromPin,
    //         14: VisioShapePart.fromAngle,
    //     }[code];
    //
    //     if (!shapePartEnum) {
    //         debugger;
    //         return null;
    //     }
    //
    //     return this.resolvePartEnum(shape, shapePartEnum);
    // }

    // /**
    //  *
    //  * @param {Shape} shape
    //  * @param {VisioShapePart} partEnum
    //  */
    // resolvePartEnum(shape, shapePartEnum) {
    //
    //     switch (shapePartEnum) {
    //         case [VisioShapePart.rightEdge]: // to part
    //
    //         case [VisioShapePart.begin]: // from part
    //
    //         case [VisioShapePart.end]: // from part
    //             debugger;
    //
    //
    //         // not present in fixture vsdx
    //         case [VisioShapePart.fromNone]:
    //         case [VisioShapePart.leftEdge]:
    //         case [VisioShapePart.centerEdge]:
    //         case [VisioShapePart.bottomEdge]:
    //         case [VisioShapePart.middleEdge]:
    //         case [VisioShapePart.topEdge]:
    //         case [VisioShapePart.beginX]:
    //         case [VisioShapePart.beginY]:
    //         case [VisioShapePart.endX]:
    //         case [VisioShapePart.endY]:
    //         case [VisioShapePart.fromPin]:
    //         case [VisioShapePart.fromAngle]:
    //             debugger;
    //             //TODO miky implement
    //             logAndThrow('implement shape part');
    //             return null;
    //     }
    //
    // }

}

// PART
/*
Constant                Value
visConnectFromError     -1
visFromNone             0
visLeftEdge             1
visCenterEdge           2
visRightEdge            3
visBottomEdge           4
visMiddleEdge           5
visTopEdge              6
visBeginX               7
visBeginY               8
visBegin                9
visEndX                 10
visEndY                 11
visEnd                  12
visFromPin              13
visFromAngle            14
visControlPoint         100 + zero-based row index (for example, visControlPoint = 100 if the control point is in row 0; visControlPoint = 101 if the control point is in row 1)
 */
