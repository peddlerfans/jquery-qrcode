/***
 * 2.2.5.3.3 Cell
 * A cell specifies a single property in a row, section, or sheet.
 *
 * Cells are specified by Cell_Type child elements of the Section_Type, Row_Type,
 * ShapeSheet_Type, PageSheet_Type, StyleSheet_Type, and DocumentSheet_Type elements.
 *
 * The N attribute of a Cell_Type element specifies the name of the cell that identifies
 * the property that it pertains to.
 *
 * The V attribute of a Cell_Type element specifies the value of the property of the cell.
 *
 * The F attribute of a Cell_Type element specifies the formula expression of the property
 * of the cell.
 * If the F attribute is present, the value of the property is used until it is replaced
 * by a value from the most recent formula evaluation that does not result in an error
 * value.
 */

import {
    VisioJxonCellKey,
    VisioCellName,
} from '../types/enums.mjs';
import { assertIsCellJxon } from './assert/jxon.mjs';
import { firstLetterLowercase } from '../helpers/firstLetterLowercase.mjs';
import { toArray } from '../helpers/toArray.mjs';
import { debug } from '../helpers/debug.mjs';

/**
 * @param {VisioCellJXON} cell
 * @returns {VisioCellName}
 */
export function getName(cell) {
    return cell[VisioJxonCellKey.Name];
}

/**
 * @param {VisioCellJXON} cell
 * @returns {VisioUnitType}
 */
export function getUnits(cell) {
    return cell[VisioJxonCellKey.Units];
}

/**
 * @param {VisioCellJXON} cell
 * @returns {string}
 */
export function getValueString(cell) {
    const key = VisioJxonCellKey.Value;
    if (key in cell) return cell[key];
    return cell.keyValue;
}

/**
 * @param {VisioCellJXON} cell
 * @returns {string}
 */
export function getFormulaString(cell) {
    return cell[VisioJxonCellKey.Formula];
}

/**
 * @this {Visio}
 * @param {VisioCellJXON|Array.<VisioCellJXON>} cellsJxonOrArrayOfJxons
 * @param {VisioStructurePath} structurePath
 * @returns {Object}
 */
export function parseCellsAttributes(cellsJxonOrArrayOfJxons, structurePath) {
    if (!structurePath) debug.log('path not defined');

    const cellsJxonArray = toArray(cellsJxonOrArrayOfJxons);

    return cellsJxonArray
        .reduce(
            (parsedCells, cellJxon) => {
                assertIsCellJxon(cellJxon);
                const parsedCell = parseCellAttribute.call(this, cellJxon, structurePath);

                parsedCells[parsedCell.name] = parsedCell;

                return parsedCells;
            },
            {}
        );

}

/**
 * Normalize a name
 * all magic done in Cells.getter
 *
 * @this {Visio}
 * @param {VisioCellJXON} cell
 * @param {VisioStructurePath} structurePath
 * @returns {VisioCell|null}
 */
export function parseCellAttribute(cell, structurePath) {
    const cellAttributeName = getName(cell);
    if (!VisioCellName.hasOwnProperty(cellAttributeName)) {
        debug.log('unknown cell attribute name', cellAttributeName)
    }

    return {
        name: visioAttributeNameToRappidConvention(cellAttributeName),
        value: getValueString(cell),
        formula: getFormulaString(cell) || null,
        units: getUnits(cell),
    };
}

/**
 *
 * @param {VisioCellName} visioAttributeName
 * @returns {string}
 */
export function visioAttributeNameToRappidConvention(visioAttributeName) {
    if (visioAttributeName === 'Case') return 'uppercase';

    return firstLetterLowercase(visioAttributeName);
}

