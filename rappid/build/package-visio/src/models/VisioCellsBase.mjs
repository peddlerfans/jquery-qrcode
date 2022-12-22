/***
 * non generated part of cells
 */
import { VisioObject } from './VisioObject.mjs';
import {
    VisioAttribute,
    VisioConvertType,
    VisioXsdType,
    VisioUnitType,
    VisioCellName,
    VisioJxonCellKey,
    LocalToVisioCellKey,
} from '../types/enums.mjs';
import { getConvertType } from '../import/cell.value.mjs';
import { getAttributeValueFromStylesheet } from '../import/shape.stylesheet.mjs';
import {
    asBooleanStrict,
    asBooleanTristate,
    asNumber
} from '../helpers/convert.mjs';
import {
    stringToPixels,
    toDegrees
} from '../helpers/internalUnits.mjs';
import { debug } from '../helpers/debug.mjs';
import { config } from '../helpers/config.mjs';
import { themedResolver } from '../import/themedResolver.mjs';
import { sectionAndRowHappyCase } from '../import/structurePath.mjs';
import { resolveFormula } from '../formulas/formula.mjs';
import { VisioValueType } from '../types/enums.mjs';
import { firstLetterLowercase } from '../helpers/firstLetterLowercase.mjs';

/**
 * {
 *       'fillStyle': [
 *           'fillForegnd',
 *           'fillBkgnd',
 *           'fillPattern',
 *           'fillForegndTrans',
 *           'fillBkgndTrans'
 *       ],
 *       'lineStyle': [
 *           'lineColor',
 *           'lineWeight',
 *           'lineColorTrans',
 *           'linePattern'
 *       ],
 *       'textStyle': [
 *           'leftMargin',
 *           'rightMargin',
 *           'topMargin',
 *           'bottomMargin',
 *           'defaultTabStop',
 *           'textBkgnd',
 *           'textBkgndTrans',
 *           'verticalAlign'
 *       ]
 * }
 *
 *
 * @property {VisioStructurePath} structurePath
 */
export class VisioCellsBase extends VisioObject {

    /**
     * @param init
     */
    constructor(init = {}) {
        super(init, new Set([
            VisioAttribute.shape,
            VisioAttribute.masterShape,
        ]));
    }

    setAttributes(init) {
        this._attributesSet = new Set();

        //TODO miky is duplicity for specific setters
        // but necessary for "position0", "alignment0"...
        Object
            .keys(init)
            .filter(attributeName => !['archive', 'structurePath'].includes(attributeName))
            .forEach(attributeName => this.attributeSet(attributeName));

        super.setAttributes(init)
    }

    attributeSet(attributeName) {
        this._attributesSet.add(attributeName);
    }

    attributeUnset(attributeName) {
        this._attributesSet.delete(attributeName);
    }

    /**
     * @returns {Set<VisioCellName>}
     */
    get attributesSet() {
        return this._attributesSet;
    }

    has(attributeName) {
        return this.attributesSet.has(attributeName);
    }

    hasEvery(attributeNamesArray) {
        return attributeNamesArray.every(
            attributeName => this[attributeName] !== undefined
        );
    }

    /**
     * @returns {VisioRowType|null}
     */
    getRowType() {
        if (this._rowType)
            return this._rowType;

        const rowStructurePathFragment = this.structurePath.find(
            structurePathFragment =>
                structurePathFragment.xsdType === VisioXsdType.Row_Type
        );

        if (!rowStructurePathFragment) return null;

        return rowStructurePathFragment.type;
    }

    setRowType(rowType) {
        this._rowType = rowType;
    }

    /**
     * @param {Array.<VisioSectionType>} arrayOfSectionTypes
     * @returns {boolean}
     */
    isDescendantOfSectionType(arrayOfSectionTypes) {
        return this.structurePath.some(
            structurePathFragment =>
                structurePathFragment.xsdType === VisioXsdType.Section_Type &&
                arrayOfSectionTypes.includes(structurePathFragment.type)
        );
    }

    getDefaultCellValue(valueType) {
        // https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-vsdx/47b8caad-1ea2-4119-84c7-4d9901100b03
        switch (valueType) {
            case VisioValueType.vFormatString:
            case VisioValueType.vLanguageString:
            case VisioValueType.PtgString: {
                return '';
            }
            case VisioValueType.PtgColorRGB:
            case VisioValueType.vColor: {
                return '#000000';
            }
            case VisioValueType.vFont: {
                return '0';
            }
            case VisioValueType.vLength:
            case VisioValueType.vAny:
            case VisioValueType.vAngle:
            case VisioValueType.PtgByte:
            case VisioValueType.PtgInt:
            case VisioValueType.PtgNum:
            case VisioValueType.PtgNumI:
            case VisioValueType.PtgShort:
            case VisioValueType.PtgUnsShort:
            case VisioValueType.PtgDate:
            case VisioValueType.PtgBool:
            case VisioValueType.vScalar: {
                return 0;
            }
        }
        debug.log(`No default Cell value for ${valueType} type.`);
        return undefined;
    }

    /**
     * One type of value - no need for decision
     *
     * @param {VisioCell} cell
     * @param {VisioValueType} valueType
     * @returns {number|string|boolean|undefined}
     */
    resolveCellValue(cell, valueType) {
        if (!cell) {
            return undefined;
        }

        // TODO: confirm, looks like Visio always sends values in default base unit
        // doesn't matter what is passed as `units` value, i.e. Visio defines position
        // as 2.27 and unit is CM, however what we get in `value` is actually 0.8937008
        // which is 2.27 cm converted to inches
        // it can be based on project settings
        let { value, formula } = cell;

        const convertType = getConvertType(valueType, cell);

        if (formula && config.evaluateFormulas) {
            value = resolveFormula(cell, this.shape);
        }

        if (value === 'Themed') {
            const result = themedResolver.call(this, cell, valueType);
            if (result !== null) return result;
        }

        switch (convertType) {
            case VisioConvertType.number:
            case VisioConvertType.byte:
                value = asNumber(value);
                break;
            case VisioConvertType.percentage:
                value = asNumber(value) * 100;
                break;
            case VisioConvertType.booleanStrict:
                // boolean strict (only '0' '1' allowed)
                value = asBooleanStrict(value);
                break;
            case VisioConvertType.booleanTriState:
                // boolean strict (only '0' '1' allowed)
                value = asBooleanTristate(value);
                break;
            case VisioConvertType.internalUnitsToPixels:
                if (asNumber(value) === 0)
                    value = 0;
                else
                    value = stringToPixels(value, VisioUnitType.IN);
                break;
            case VisioConvertType.internalUnitsToDegrees:
                // seems like even when explicit conversion to degrees happens in Visio
                // the resulting XML still gives value in radians, just labeled that the resulting
                // angle should be degrees. This means we can completely omit looking at the `units`
                // attribute and always evaluate the xml values as radians.
                // Leaving all the code in in case we learn something new.
                value = toDegrees(value, { units: VisioUnitType.RAD });
                break;
            case VisioConvertType.color:
                //TODO miky remove red on PROD
                if (value.includes('#')) {
                    // noop - it's hex
                } else if (value === 'Themed') {
                    // TODO kumilingus: deal with `Themed` value here or higher
                    value = 'red';
                } else {
                    const numericValue = asNumber(value);
                    const colorFromList = this.archive.document._colors.get(numericValue);
                    // if (colorFromList === undefined) debugger;
                    value = colorFromList;
                }
                break;
            case VisioConvertType.asIs:
                // noop
                break;
            default:
                debug.log('Unknown VisioConvertType',
                    { cell, convertType, valueType });
        }


        return value;
    }

    themedResolver() {
        return null;
    }

    getOwnNames() {
        if (!this.hasOwnProperty('_attributesSet')) return [];
        return [...this._attributesSet.values()];
    }

    get(cellName) {
        const cell = firstLetterLowercase(cellName);
        // non getter cell (alignment0, position0...)
        if (this.hasOwnProperty(cell)) {
            return this[cell];
        }

        return this[`_${cell}`];
    }


    set(cellName, attributes, sheetJXON) {
        if (!sheetJXON) return null;

        // ensure proper naming conventions for local and Visio use
        const name = cellName.charAt(0).toLowerCase() + cellName.slice(1);
        const vName = cellName.charAt(0).toUpperCase() + cellName.slice(1);

        if (VisioCellName[vName] === undefined) {
            debug.log(`Cell named "${vName}" is not supported.`);
        }

        if (typeof attributes !== 'object' || attributes === null) {
            debug.log('Attributes are required to set a cell.');
        }

        // update attributeSet
        this.attributeSet(name);

        // ensure name attribute is present
        attributes = { ...attributes, name: vName };

        // merge original attributes with provided
        let cell = { ...this[`_${name}`] };
        Object.keys(attributes).forEach(key => {
            if (attributes[key] === undefined) return;

            if (attributes[key] === null) {
                // remove nullified attributes
                delete cell[key];
            } else {
                cell[key] = attributes[key].toString();
            }
        });

        // update cell attribute in case SetCell has been called directly
        this[`_${name}`] = cell;

        // update jxon
        if (sheetJXON && typeof vName === 'string' ) {
            const jxonCells = sheetJXON.Cell;
            // test vs lower-cased names as plugin and Visio naming conventions vary
            const index = jxonCells.findIndex(jxonCell => {
                return jxonCell.hasOwnProperty(VisioJxonCellKey.Name) && jxonCell[VisioJxonCellKey.Name].toLowerCase() === name.toLowerCase()
            });

            // start empty or use existing cell values
            let jxon = {};
            if (index > -1) {
                jxon = jxonCells[index];
            }

            // assign attributes passed by user, no validation
            Object.keys(cell).forEach(key => {
                if (LocalToVisioCellKey[key]) {
                    if (attributes[key] === undefined) return;

                    // remove null'd value from jxon or assign new value
                    if (attributes[key] === null) {
                        delete jxon[LocalToVisioCellKey[key]];
                    } else {
                        jxon[LocalToVisioCellKey[key]] = cell[key];
                    }
                }
            });

            // add or replace modified cell
            if (index > -1) {
                jxonCells[index] = jxon;
            } else {
                jxonCells.push(jxon);
            }
        }

        return cell;
    }

    remove(name, sheetJXON) {
        // update attributeSet
        this.attributeUnset(name);

        // remove from struct
        delete this[`_${name}`];

        // remove from jxon
        if (sheetJXON && Array.isArray(sheetJXON.Cell)) {
            const jxonCells = sheetJXON.Cell;
            // test vs lower-cased names as plugin and Visio naming conventions vary
            const index = jxonCells.findIndex(jxonCell => {
                return jxonCell.hasOwnProperty(VisioJxonCellKey.Name) && jxonCell[VisioJxonCellKey.Name].toLowerCase() === name.toLowerCase()
            });

            if (index > -1) {
                jxonCells.splice(index, 1);
            }
        }
    }

    get shape() {
        return this._shape;
    }

    get jxon() {
        return this._jxon;
    }

    set jxon(jxon) {
        this._jxon = jxon;
    }

    set shape(shape) {
        this._shape = shape;
    }

    // get masterShape() {
    //     return this.archive.document.masters
    //         .getMasterShapeByStructurePath(this.structurePath);
    // }

    get masterShape() {
        return this._masterShape;
    }

    set masterShape(masterShape) {
        this._masterShape = masterShape;
    }

    /**
     * More types of values - need to decide
     *
     * @param {VisioCell} cell
     * @param {Array.<VisioValueType>} valueType
     * @returns {number|string|boolean|undefined}
     */
    resolveCellValueByType(cell, valueTypes) {
        // const specialLogic

        return cell.value;
    }


    /**
     * @param {string} attributeName
     * @returns {VisioCell|undefined}
     */
    getParentCell(attributeName) {
        const parent = this.parent;

        if (parent && parent.cells)
            return parent.cells.get(attributeName);

        return undefined;
    }


    /**
     * attribute names:
     *    fillForegnd
     *    fillBkgnd
     *    fillPattern
     *    fillForegndTrans
     *    fillBkgndTrans
     *
     * @param {string} attributeName
     * @returns {number|string|boolean|undefined|null}
     */
    getStylesheetFillStyleCell(attributeName) {
        return this.getStylesheetCell(attributeName, VisioAttribute.fillStyle)
    }

    /**
     * attribute names:
     *    lineColor
     *    lineColorTrans
     *    linePattern
     *    lineWeight
     *
     * @param {string} attributeName
     * @returns {number|string|boolean|undefined|null}
     */
    getStylesheetLineStyleCell(attributeName) {
        return this.getStylesheetCell(attributeName, VisioAttribute.lineStyle)
    }

    /**
     * attribute names:
     *     bottomMargin
     *     defaultTabStop
     *     leftMargin
     *     rightMargin
     *     textBkgnd
     *     textBkgndTrans
     *     topMargin
     *     verticalAlign
     *
     * @param {string} attributeName
     * @returns {number|string|boolean|undefined|null}
     */
    getStylesheetTextStyleCell(attributeName) {
        return this.getStylesheetCell(attributeName, VisioAttribute.textStyle)
    }

    /**
     * @param attributeName
     * @param {
     *     VisioAttribute.fillStyle|
     *     VisioAttribute.lineStyle|
     *     VisioAttribute.textStyle
     * } styleType
     */
    getStylesheetCell(attributeName, styleType) {
        const shape = this.shape;
        const masterShape = this.masterShape;
        if (!shape && !masterShape)
            // cells are used even outside shapes structures
            // where only non-stylesheet attributes make sense
            return undefined;

        let styleSheetIndex;
        if (shape) {
            styleSheetIndex = shape[styleType];
            if (styleSheetIndex === undefined) {
                const shapeMasterShape = this.shape.masterShape;
                if (shapeMasterShape)
                    styleSheetIndex = shapeMasterShape[styleType];
            }
        } else {
            styleSheetIndex = masterShape[styleType];
        }

        if (styleSheetIndex === undefined) {
            debug.log('styleSheetIndex undefined');
            //this.archive.document.documentSettings.defaultStylesheet
            return undefined;
        }

        const styleSheets = this.archive.document.styleSheets;

        return getAttributeValueFromStylesheet(
            styleSheets, styleSheetIndex, styleType, attributeName);

    }

    getSetValues() {
        const cellsObject = {};
        this.attributesSet.forEach(attributeName =>
            cellsObject[attributeName] = this[attributeName]);

        return cellsObject;
    }

    getSetValuesMaster() {
        const masterShape = this.shape.masterShape;
        if (!masterShape)
            return null;

        const path = sectionAndRowHappyCase(this.structurePath);

        if (!path.section || !path.row)
            return null;

        const rows =
            masterShape
                .sections.get(path.section.type)[path.section.index]
                .rows;

        const row = rows.find(row => row.index === path.row.index);
        if (!row)
            return null;

        const cells = row.cells;

        if (!cells)
            return null;

        if (cells === this)
            return 'exactly same';

        return cells.getSetValues();

    }

    get directValues() {
        return this.debugGatherValues([
            ...this.attributesSet]);
    }

    /**
     * @returns {VisioCells}
     */
    clone() {
        const structurePath = this.structurePath.slice();
        structurePath.unshift({ jxonType: 'clone' });

        const clone = new this.constructor({
            archive: this.archive,
            structurePath
        });

        this.attributesSet.forEach(attributeName => {
            const cell = this.get(attributeName);
            clone[attributeName] = { ...cell };
            clone.attributeSet(attributeName);
        })

        if (this.shape)
            clone.shape = this.shape;
        if (this.masterShape)
            clone.masterShape = this.masterShape;

        return clone;
    }

    get debug() {
        const result = {
            owner: this.owner,
            parent: this.parent,
            directValues: this.debugGatherValues([
                ...this.attributesSet])
        };

        if (this.shape) {
            result.ownerShape = this.shape;
        }

        if (this.parent) {

            result.extendedValues = this.debugGatherValues([
                ...this.attributesSet,
                ...this.parent.cells.attributesSet]);

        }

        if (this.masterShape) {
            result.ownerMasterShape = this.masterShape;
        }

        result.stylesheetFill = this.debugGatherValues(['fillForegnd', 'fillBkgnd', 'fillPattern',
            'fillForegndTrans', 'fillBkgndTrans',]);
        result.stylesheetLine = this.debugGatherValues(['lineColor', 'lineColorTrans', 'linePattern',
            'lineWeight']);
        result.stylesheetText = this.debugGatherValues(['bottomMargin', 'defaultTabStop', 'leftMargin',
            'rightMargin', 'textBkgnd', 'textBkgndTrans', 'topMargin', 'verticalAlign']);

        result.structurePath = this.structurePath;

        return result
    }

    debugGatherValues(attributeNamesArray) {
        return attributeNamesArray.reduce(
            (values, attributeName) => {
                values[attributeName] = this[attributeName];
                return values;
            }, {});
    }

}

