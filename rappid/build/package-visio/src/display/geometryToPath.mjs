import { convertToSvg } from './convertToSvg.mjs';
import { toArray } from '../helpers/toArray.mjs';

/**
 *
 * @param {VisioItem|Array.<VisioItem>} geometryItemOrArray
 * @param {number} width
 * @param {number} height
 * @returns {*}
 */
export function geometrySingleShapeArrayToPath(geometryItemOrArray, { width, height }) {
    /** @type {Array.<VisioItem>} */
    const geometryItemArray = toArray(geometryItemOrArray);

    return geometryItemArray.map(geometryItem =>
        geometryItemToPath(geometryItem, { width, height })
    ).join(' ');
}

/**
 * Single shape (part of final shape)
 * @param geometryItem
 * @param {number} width
 * @param {number} height
 * @returns {string}
 */
function geometryItemToPath(geometryItem, { width, height }) {
    const rows = geometryItem.rows;

    // shape parts together
    const oldWayDataset = rows.map(row => ({
        name: row.type,
        cells: row.cells
    }));

    return convertToSvg(oldWayDataset, { width, height });
}

