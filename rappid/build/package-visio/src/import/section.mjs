/***
 * 2.2.5.3.1 Section
 * A section specifies a collection of related properties of a sheet. A section contains
 * cells and rows.
 * Sections are specified by Section_Type child elements of the ShapeSheet_Type,
 * PageSheet_Type, StyleSheet_Type, and DocumentSheet_Type elements.
 *
 * The N attribute of a Section_Type element specifies the name of the section that
 * identifies the collection of properties that it pertains to. The properties specified
 * by a section are specified by the Cell_Type and Row_Type child elements of the
 * Section_Type element.
 */

import { VisioSectionType } from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';
import { VisioRowStructureType } from '../types/enums.mjs';

export function mergeSections(masterSections, sections, shape) {
    // clone
    //TODO miky clone deep
    const mergedSections = sectionsDeepClone(masterSections);

    // merge
    // {VisioSectionType} type - (Geometry, Paragraph, Character etc)
    sections.forEach((sectionsOfType, type) => {
        // not contained in master, just set and return
        if (!mergedSections.get(type))
            return mergedSections.set(type, sectionsOfType);

        const masterSectionsOfType = mergedSections.get(type);
        mergedSections.set(
            type,
            mergeSectionsOfType(masterSectionsOfType, sectionsOfType, {
                _type: type,
                shape
            })
        )
    });

    return mergedSections;
}

function mergeSectionsOfType(masterSections, sections = [], { _type, shape }) {

    sections.forEach(section => {
        const { index, deleted } = section;
        // index of same row
        const masterSectionIndex =
            masterSections.findIndex(section => section.index === index);

        if (deleted) {
            masterSections.splice(masterSectionIndex, 1);
        }
        else if (masterSectionIndex === -1)
            masterSections.push(section);
        else
            mergeSectionOfType(masterSections[masterSectionIndex], section, {
                _type,
                shape
            });
    });

    return masterSections;

}

export function mergeSectionOfType(masterSection, section, { _type, shape } = {}) {
    if (
        assertIsSimpleSection(masterSection) !==
        assertIsSimpleSection(section)
    ) {
        debug.log();
        debug.log('' +
            'Indexes are not same');
    }

    const masterRows = masterSection.rows;
    const rows = section.rows;

    assertIsArrayIfDefined(masterRows);
    assertIsArrayIfDefined(rows);

    const result = {
        type: section.type,
        rows: mergeRows(masterRows, rows, { _type, shape })
    };

    if (masterSection.cells || section.cells)
        result.cells = mergeCells(masterSection.cells, section.cells, { _type, shape });

    return result;
}

function assertIsArrayIfDefined(array) {
    if (!Array.isArray(array) && array !== undefined)
        debug.log('Is not array');
}

function assertIsSimpleSection({ type, rows, index, cells, jxon, _prefixList, _archive, ...rest }) {
    if (!VisioSectionType.hasOwnProperty(type))
        debug.log('Unknown type', type);

    if (!Array.isArray(rows) && rows !== undefined)
        debug.log('Unexpected row type');

    if (Object.keys(rest).length)
        debug.log('Unexpected attribute');

    return index;
}

function mergeRows(masterRows, rows = [], { _type, shape }) {

    rows.forEach(row => {
        const { index, name, debugType, deleted } = row;
        // index of same row
        const masterRowArrayIndex = masterRows.findIndex(row =>
            debugType === VisioRowStructureType.Indexed ?
                row.index === index :
                row.name === name
        );

        const masterRowExists = Boolean(masterRows[masterRowArrayIndex]);

        if (deleted) {
            if (masterRowExists)
                masterRows.splice(masterRowArrayIndex, 1);
        } else if (masterRowArrayIndex === -1)
            masterRows.push(row);
        else
            masterRows[masterRowArrayIndex] = mergeRow(masterRows[masterRowArrayIndex], row);
    });

    return masterRows;
}

function mergeRow(masterRow, row) {
    assertRowsAreSame(masterRow, row);

    const cells = mergeCells(masterRow.cells, row.cells);

    // override structurePath source of truth (directly set has higher priority)
    cells.setRowType(row.type);

    let jxon;
    if (row.jxon) {
        // keep reference
        jxon = row.jxon;
    } else if (masterRow.jxon) {
        // todo: check if need to clone and sever reference
    } else {
        // todo: check if need to create and create reference
    }

    const result = {
        type: row.type,
        debugType: row.debugType,
        jxon,
        cells
    }

    // one or both
    if (row.name) result.name = masterRow.name;
    if (row.index !== undefined) result.index = masterRow.index;

    return result;
}

function assertRowsAreSame(
    {
        type: typeMaster, index: indexMaster, name: nameMaster, cells: cellsMaster,
        deleted: deletedMaster, debugType: debugTypeMaster, jxon: jxonMaster, ...restMaster
    },
    { type, index, name, cells, debugType, jxon, _prefixList, _archive, ...rest }) {

    //TODO miky strange deletedMaster, but present in FIGS

    // allowing rewrite EllipticalArcTo to LineTo - strange, but why not...
    // if (typeMaster !== type)
    //     logAndThrow('Rows are different');

    if (debugTypeMaster !== debugType)
        debug.log('Rows are different');

    if (Object.keys(restMaster).length)
        debug.log('Unexpected attribute');
    if (Object.keys(rest).length)
        debug.log('Unexpected attribute');


    if (indexMaster !== index)
        debug.log('Rows are different');
    if (nameMaster !== name)
        debug.log('Rows are different');

    if (indexMaster !== undefined && nameMaster !== undefined) {
        debug.log();
        debug.log('Row name and index can\'t be present together.',
            { indexMaster, nameMaster });
    }
    if (indexMaster === undefined && nameMaster === undefined)
        debug.log('A missing index and name of the row. One is required.');

}

function mergeCells(parentCells, childCells) {
    if (!parentCells)
        return childCells.clone();
    if (!childCells)
        return parentCells;

    const childAttributes = childCells.attributesSet;

    childAttributes.forEach(
        attributeName =>
            parentCells[attributeName] =
                childCells.get(attributeName));

    return parentCells;
}

export function sectionsDeepClone(sectionsMap) {
    const clone = new Map();

    sectionsMap.forEach((sectionsArray, sectionType) =>
        clone.set(sectionType, sectionsArray.map(cloneSection))
    );

    return clone;
}

/**
 * @param {string} type
 * @param {Array<VisioRow>} rows
 * @param {number} index
 * @param {VisioCells} cells
 */
export function cloneSection({ type, rows, index, cells }) {
    const clone = {};

    // primitives
    if (type) clone.type = type;
    if (index !== undefined) clone.index = index;

    // deep clone
    if (rows) clone.rows = rows.map(cloneRow);

    // deep clone
    if (cells) clone.cells = cells.clone();

    return clone;
}

/**
 * @param {VisioRowType} [type] - string enum
 * @param {string} [name]
 * @param {VisioRowStructureType} debugType - string enum
 * @param {number} [index]
 * @param {VisioCells} cells
 */
function cloneRow({ type, index, name, cells, debugType }) {
    const clone = {};

    // primitives
    if (type) clone.type = type;
    if (name) clone.name = name;
    if (index !== undefined) clone.index = index;
    if (debugType) clone.debugType = debugType;

    // deep clone
    if (cells) clone.cells = cells.clone();

    return clone;
}
