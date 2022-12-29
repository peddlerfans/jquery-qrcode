import {
    VisioJxonShapeKey,
    VisioJxonShapesKey
} from '../types/enums.mjs';
import { assertIsGroupedShapeJxon } from './assert/jxon.mjs';
import { assertIsSimpleShape } from './assert/visio.mjs';
import { toArray } from '../helpers/toArray.mjs';


import { parseShapeJxon } from './shape.mjs';
import { VisioJxonType } from '../types/enums.mjs';
import { getStructurePathFragment } from './structurePath.mjs';

/**
 * @this {Visio}
 * @param {VisioShape} parentShape
 * @param {VisioShapeGroupJXON} parentShapeJXON
 * @param {VisioStructurePath} structurePath
 * @returns {Promise<*[]>}
 */
export async function getGroupedShapeOrArray({ parentShape, parentShapeJXON, structurePath }) {
    //TODO miky single level only for now! (is there multilevel possible?)

    assertIsGroupedShapeJxon(parentShapeJXON);
    // if (!parentShapeJXON[VisioJxonShapeKey.Shapes]) return [];
    const subShapesArrayOfJXONs =
        parentShapeJXON[VisioJxonShapeKey.Shapes][VisioJxonShapesKey.Shape];

    const subShapes = await getNormalisedChildShapes.call(
        this,
        subShapesArrayOfJXONs,
        structurePath);

    subShapes.forEach(assertIsSimpleShape);

    return subShapes;
}

/**
 * @this {Visio}
 * @param {VisioJxon} subShapeOrArrayOfJXONs
 * @param {VisioStructurePath} structurePathBase
 * @returns {Promise<[]>}
 */
async function getNormalisedChildShapes(subShapeOrArrayOfJXONs, structurePathBase) {
    const subShapesArrayOfJXONs = toArray(subShapeOrArrayOfJXONs);

    const subShapes = [];
    for (const subShapeJxon of subShapesArrayOfJXONs) {
        const structurePath = structurePathBase.slice();
        structurePath.push(
            getStructurePathFragment(
                VisioJxonType.Shape, // import syntax
                subShapeJxon,
                structurePathBase));

        subShapes.concat(
            await parseShapeJxon.call(
                this,
                subShapeJxon,
                structurePath))

    }

    return subShapes;
}
