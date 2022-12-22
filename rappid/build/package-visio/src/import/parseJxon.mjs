import { debug } from '../helpers/debug.mjs';
import {
    VisioJxonType,
    VisioAttribute,
    VisioJxonKey,
    VisioJxonIconKey,
    VisioShapeType,
    VisioShapeDebugType
} from '../types/enums.mjs';
import { getParsedRel } from './rel.mjs';
import { getParsedText } from './shape.text.mjs';
import { parseCellsAttributes } from './cell.mjs';
import { getStructurePathFragment, } from './structurePath.mjs';
import { VisioJxonDocumentKey } from '../types/enums.mjs';
import { parseColors,
    parseDocumentSettings
} from './parseDocument.mjs';
import { VisioJxonShapeKey } from '../types/enums.mjs';
import { parseConnects } from './connect.mjs';
import { VisioJxonShapesKey } from '../types/enums.mjs';
import { VisioCells } from '../models/VisioCells.mjs';
import { VisioResult } from '../models/VisioResult.mjs';
import { instantiateConnects } from './connect.mjs';
import { emptyJxon } from '../jxon/jxon.mjs';
import { assertIsIcon,
    assertIsPageSheet
} from './assert/visio.mjs';
import { VisioRowStructureType } from '../types/enums.mjs';
import { toArray } from '../helpers/toArray.mjs';
import { VisioSection } from '../models/VisioSection.mjs';
import { assertIsGroupedShapeJxon,
    assertIsShapeJxon,
    assertIsSimpleShapeJxon
} from './assert/jxon.mjs';
import { getRootAttributes } from './parseJxon.utils.mjs';

/**
 * Parse any general VisioJXON
 *  * all root attributes
 *  * parse specific:
 *      * cells
 *      * rows
 *      * sections
 *      * text
 *      * pageSheet
 *      * icon
 *
 *      * foreignData - relation into another xml "rels"
 *      * _rel - relation into another xml "rels"
 *
 * @this {VisioArchive}
 * @throws
 *
 * @param {
 *      VisioShapeJxon|
 *      VisioMasterJXON|
 *      VisioPageSheetJXON|
 *      VisioIconJXON|
 *      VisioJxon
 *      } jxon
 * @param {VisioJxonType} jxonType
 * @param {VisioStructurePath} [structurePathBase]
 * @param {
 *      VisioSectionParsed|
 *      VisioStyleSheet|
 *      VisioDocumentSheetParsed|
 *      VisioPageParsed
 *      } [base]
 *
 * @returns {
 *      VisioSectionParsed|
 *      VisioStyleSheet|
 *      VisioDocumentSheetParsed|
 *      VisioPageParsed|
 *      VisioMaster
 *      }
 */
export async function parseJxon(
    jxon,
    jxonType,
    structurePathBase,
    {
        base = {},
        structurePathEnrichObject = null,
    } = {}
) {

    if (!jxon || !jxonType || !structurePathBase)
        debug.log('Missing required param.');

    const structurePath = structurePathBase.slice();

    structurePath.push(
        getStructurePathFragment(
            jxonType, // import syntax
            jxon,
            structurePath,
            { structurePathEnrichObject }
        ));

    // common API `set` single attr, `setAttributes` object with multiple records
    const result = new VisioResult(/* jxonType */);
    result.set('jxon', jxon);

    result.setAttributes(getRootAttributes(jxon, jxonType, structurePath));

    //               ,--.,--.
    //   ,---. ,---. |  ||  | ,---.
    //  | .--'| .-. :|  ||  |(  .-'
    //  \ `--.\   --.|  ||  |.-'  `)
    //   `---' `----'`--'`--'`----'
    if (this) {
        const cellsArrayOfJXONs = jxon[VisioJxonKey.Cell] || [];
        result.set(VisioAttribute.cells,
            new VisioCells(
                {
                    archive: this,
                    structurePath,
                    ...parseCellsAttributes.call(
                        this,
                        cellsArrayOfJXONs,
                        structurePath)
                }
            ));
    }


    //
    //
    //  ,--.--. ,---. ,--.   ,--. ,---.
    //  |  .--'| .-. ||  |.'.|  |(  .-'
    //  |  |   ' '-' '|   .'.   |.-'  `)
    //  `--'    `---' '--'   '--'`----'
    //
    const rowsArrayOfJXONs = jxon[VisioJxonKey.Row];
    if (rowsArrayOfJXONs)
        result.set(VisioAttribute.rows,
            await parseRows.call(
                this,
                rowsArrayOfJXONs,
                structurePath));


    //
    //                        ,--.  ,--.
    //   ,---.  ,---.  ,---.,-'  '-.`--' ,---. ,--,--,  ,---.
    //  (  .-' | .-. :| .--''-.  .-',--.| .-. ||      \(  .-'
    //  .-'  `)\   --.\ `--.  |  |  |  |' '-' '|  ||  |.-'  `)
    //  `----'  `----' `---'  `--'  `--' `---' `--''--'`----'
    //
    const sectionJxon = jxon[VisioJxonKey.Section];
    if (sectionJxon)
        result.set(VisioAttribute.sections,
            await parseSection.call(
                this,
                sectionJxon,
                structurePath));


    //    ,--.                     ,--.
    //  ,-'  '-. ,---. ,--.  ,--.,-'  '-.
    //  '-.  .-'| .-. : \  `'  / '-.  .-'
    //    |  |  \   --. /  /.  \   |  |
    //    `--'   `----''--'  '--'  `--'
    const textJxon = jxon[VisioJxonKey.Text];
    if (textJxon)
        result.set(VisioAttribute.text,
            getParsedText.call(
                this,
                textJxon,
                structurePath));


    //                      ,--.
    //        ,--.--. ,---. |  |
    //        |  .--'| .-. :|  |
    //  ,----.|  |   \   --.|  |
    //  '----'`--'    `----'`--'
    const relJxon = jxon[VisioJxonKey.Rel];
    if (relJxon)
        result.set(VisioAttribute._rel,
            getParsedRel.call(
                this,
                relJxon,
                structurePath));


    //                                ,---.  ,--.                     ,--.
    //   ,---.  ,--,--. ,---.  ,---. '   .-' |  ,---.  ,---.  ,---. ,-'  '-.
    //  | .-. |' ,-.  || .-. || .-. :`.  `-. |  .-.  || .-. :| .-. :'-.  .-'
    //  | '-' '\ '-'  |' '-' '\   --..-'    ||  | |  |\   --.\   --.  |  |
    //  |  |-'  `--`--'.`-  /  `----'`-----' `--' `--' `----' `----'  `--'
    //  `--'           `---'
    const pageSheetJxon = jxon[VisioJxonKey.PageSheet];
    if (pageSheetJxon)
        result.set(VisioAttribute.pageSheet,
            await getParsedPageSheet.call(
                this,
                pageSheetJxon,
                structurePath));


    //  ,--.
    //  `--' ,---. ,---. ,--,--,
    //  ,--.| .--'| .-. ||      \
    //  |  |\ `--.' '-' '|  ||  |
    //  `--' `---' `---' `--''--'
    //
    const iconJxon = jxon[VisioJxonKey.Icon];
    if (iconJxon)
        result.set(VisioAttribute.icon,
            await getParsedIcon.call(
                this,
                iconJxon,
                structurePath));


    //   ,---.                     ,--.               ,------.            ,--.
    //  /  .-' ,---. ,--.--. ,---. `--' ,---. ,--,--, |  .-.  \  ,--,--.,-'  '-. ,--,--.
    //  |  `-,| .-. ||  .--'| .-. :,--.| .-. ||      \|  |  \  :' ,-.  |'-.  .-'' ,-.  |
    //  |  .-'' '-' '|  |   \   --.|  |' '-' '|  ||  ||  '--'  /\ '-'  |  |  |  \ '-'  |
    //  `--'   `---' `--'    `----'`--'.`-  / `--''--'`-------'  `--`--'  `--'   `--`--'
    //                                 `---'
    const foreignDataJxon = jxon[VisioJxonKey.ForeignData];
    if (foreignDataJxon)
        result.set(VisioAttribute.foreignData,
            await parseForeignDataJxon.call(
                this,
                foreignDataJxon,
                structurePath));


    //     ,--.                                                ,--.   ,---.           ,--.    ,--.  ,--.
    //   ,-|  | ,---.  ,---.,--.,--.,--,--,--. ,---. ,--,--, ,-'  '-.'   .-'  ,---. ,-'  '-.,-'  '-.`--',--,--,  ,---.  ,---.
    //  ' .-. || .-. || .--'|  ||  ||        || .-. :|      \'-.  .-'`.  `-. | .-. :'-.  .-''-.  .-',--.|      \| .-. |(  .-'
    //  \ `-' |' '-' '\ `--.'  ''  '|  |  |  |\   --.|  ||  |  |  |  .-'    |\   --.  |  |    |  |  |  ||  ||  |' '-' '.-'  `)
    //   `---'  `---'  `---' `----' `--`--`--' `----'`--''--'  `--'  `-----'  `----'  `--'    `--'  `--'`--''--'.`-  / `----'
    //                                                                                                          `---'
    const documentSettingsJxon = jxon[VisioJxonDocumentKey.DocumentSettings];
    if (documentSettingsJxon)
        result.set(VisioAttribute.documentSettings,
            parseDocumentSettings.call(
                this,
                documentSettingsJxon,
                structurePath));


    //               ,--.
    //   ,---. ,---. |  | ,---. ,--.--. ,---.
    //  | .--'| .-. ||  || .-. ||  .--'(  .-'
    //  \ `--.' '-' '|  |' '-' '|  |   .-'  `)
    //   `---' `---' `--' `---' `--'   `----'
    const colorsJxon = jxon[VisioJxonDocumentKey.Colors];
    if (colorsJxon)
        result.set(VisioAttribute.colors,
            parseColors.call(
                this,
                colorsJxon,
                structurePath));


    //   ,---.                     ,--.  ,--.
    //  /  .-' ,--,--. ,---. ,---. |  ,'.|  | ,--,--.,--,--,--. ,---.  ,---.
    //  |  `-,' ,-.  || .--'| .-. :|  |' '  |' ,-.  ||        || .-. :(  .-'
    //  |  .-'\ '-'  |\ `--.\   --.|  | `   |\ '-'  ||  |  |  |\   --..-'  `)
    //  `--'   `--`--' `---' `----'`--'  `--' `--`--'`--`--`--' `----'`----'
    const faceNamesJxon = jxon[VisioJxonDocumentKey.FaceNames];
    if (faceNamesJxon)
        result.set(VisioAttribute.faceNames,
            await parseFaceNames.call(
                this,
                faceNamesJxon,
                structurePath));

    //          ,--.           ,--.        ,---.  ,--.                     ,--.
    //   ,---.,-'  '-.,--. ,--.|  | ,---. '   .-' |  ,---.  ,---.  ,---. ,-'  '-. ,---.
    //  (  .-''-.  .-' \  '  / |  || .-. :`.  `-. |  .-.  || .-. :| .-. :'-.  .-'(  .-'
    //  .-'  `) |  |    \   '  |  |\   --..-'    ||  | |  |\   --.\   --.  |  |  .-'  `)
    //  `----'  `--'  .-'  /   `--' `----'`-----' `--' `--' `----' `----'  `--'  `----'
    //                `---'
    const styleSheetsJxon = jxon[VisioJxonDocumentKey.StyleSheets];
    if (styleSheetsJxon)
        result.set(VisioAttribute.styleSheets,
            await parseStyleSheets.call(
                this,
                styleSheetsJxon,
                structurePath));

    //     ,--.                                                ,--.   ,---.  ,--.                     ,--.
    //   ,-|  | ,---.  ,---.,--.,--.,--,--,--. ,---. ,--,--, ,-'  '-.'   .-' |  ,---.  ,---.  ,---. ,-'  '-.
    //  ' .-. || .-. || .--'|  ||  ||        || .-. :|      \'-.  .-'`.  `-. |  .-.  || .-. :| .-. :'-.  .-'
    //  \ `-' |' '-' '\ `--.'  ''  '|  |  |  |\   --.|  ||  |  |  |  .-'    ||  | |  |\   --.\   --.  |  |
    //   `---'  `---'  `---' `----' `--`--`--' `----'`--''--'  `--'  `-----' `--' `--' `----' `----'  `--'
    const documentSheetJxon = jxon[VisioJxonDocumentKey.DocumentSheet];
    if (documentSheetJxon)
        result.set(VisioAttribute.documentSheet,
            parseDocumentSheet.call(
                this,
                documentSheetJxon,
                structurePath));

    //         ,--.
    //   ,---. |  ,---.  ,--,--. ,---.  ,---.  ,---.
    //  (  .-' |  .-.  |' ,-.  || .-. || .-. :(  .-'
    //  .-'  `)|  | |  |\ '-'  || '-' '\   --..-'  `)
    //  `----' `--' `--' `--`--'|  |-'  `----'`----'
    //                          `--'
    const shapesJxon = jxon[VisioJxonShapeKey.Shapes];
    if (shapesJxon) {
        const parsedShapes = await parseShapes.call(
            this,
            shapesJxon,
            structurePath);

        // //TODO miky no nulls in PRODuction
        const nonNullParsedShapes = new Map();
        parsedShapes.forEach((value, key) => {
            if (value !== null)
                nonNullParsedShapes.set(key, value)
            else
                debug.log('Skipped shape === null', { shapesJxon })
        });
        result.set(VisioAttribute.shapes, nonNullParsedShapes);
    }

    //         ,--.
    //   ,---. |  ,---.  ,--,--. ,---.  ,---.
    //  (  .-' |  .-.  |' ,-.  || .-. || .-. :
    //  .-'  `)|  | |  |\ '-'  || '-' '\   --.
    //  `----' `--' `--' `--`--'|  |-'  `----'
    //                          `--'
    const shapeJxon = jxon[VisioJxonShapesKey.Shape];
    if (shapeJxon) {
        const parsedShapes = await parseShapes.call(this,
            shapeJxon,
            structurePath);

        // //TODO miky no nulls in PRODuction
        const nonNullParsedShapes = new Map();
        parsedShapes.forEach((value, key) => {
            if (value !== null)
                nonNullParsedShapes.set(key, value)
            else
                debug.log('Skipped shape === null', { shapeJxon })
        });
        result.set(VisioAttribute.shape, nonNullParsedShapes);
    }


    //                                              ,--.
    //   ,---. ,---. ,--,--, ,--,--,  ,---.  ,---.,-'  '-. ,---.
    //  | .--'| .-. ||      \|      \| .-. :| .--''-.  .-'(  .-'
    //  \ `--.' '-' '|  ||  ||  ||  |\   --.\ `--.  |  |  .-'  `)
    //   `---' `---' `--''--'`--''--' `----' `---'  `--'  `----'
    const connectsJxon = jxon[VisioJxonShapeKey.Connects];
    if (connectsJxon && !emptyJxon(connectsJxon))
        result.set(VisioAttribute.connects,
            instantiateConnects.call(
                this,
                parseConnects.call(
                    this,
                    connectsJxon,
                    structurePath)));

    // just attributes object
    if (result.isDummyResult)
        return result.attributes;

    // instance of object by result factory
    return result;
}

/**
 * @this {Visio}
 * @param {VisioPageSheetJXON} pageSheetJXON
 * @returns {VisioPageSheet}
 */
async function getParsedPageSheet(pageSheetJXON, structurePath) {
    assertIsPageSheet(pageSheetJXON);

    return parseJxon.call(this, pageSheetJXON, VisioJxonType.PageSheet, structurePath);
}

/**
 * @param {VisioIconJXON} iconJXON
 * @param {VisioStructurePath} structurePath
 * @returns {}
 */
export async function getParsedIcon(iconJXON, structurePath) {
    assertIsIcon(iconJXON);

    // base - probably empty
    const icon = await parseJxon.call(this, iconJXON, VisioJxonType.Icon, structurePath);

    if (iconJXON.hasOwnProperty(VisioJxonIconKey.Content))
        icon[VisioAttribute.base64] = iconJXON[VisioJxonIconKey.Content];

    return icon;
}

/**
 * @this {Visio}
 * @param {VisioJxon} foreignDataJxon
 * @returns {VisioStructurePathFragment}
 */
async function parseForeignDataJxon(foreignDataJxon, structurePath) {
    const foreignData = await parseJxon(
        foreignDataJxon,
        VisioJxonType.ForeignData,
        structurePath);

    let allRels;
    const { jxonType } = structurePath[0];
    if (jxonType === VisioJxonType.Page) {
        // shape (root is a page)
        const page = this.document.pages.get(structurePath[0].pageId);
        allRels = await page.getRelsMapCachedAsync();
    } else if (jxonType === VisioJxonType.Master) {
        // master (root is master)
        const masterId = structurePath[0].masterId;
        const master = this.document.masters.get(masterId);
        allRels = await master.getRelsMapCachedAsync();
    } else {
        debug.log('Unhandled ForeignData Type', foreignDataJxon);
    }

    if (!allRels.has(VisioJxonType.Image)) {
        debug.log('missing foreign object relation');
        return null;
    }

    const imageRels = allRels.get(VisioJxonType.Image);

    if (!imageRels.has(foreignData._rel)) {
        debug.log('missing foreign object relation');
        return null;
    }

    const rel = imageRels.get(foreignData._rel);

    // image requested asynchronously during rendering in Shape.getImage()
    // const image = this.getImageAsync(rel.targetFile.absolutePath);

    return rel;
}

/***
 * @see 2.2.5.3.2 Row {http://localhost/MS-VSDX.pdf#page=38&zoom=100,92,450}
 *
 * A row specifies a subset of the properties in a section. A row contains cells.
 * Rows are specified by Row_Type child elements of the Section_Type child elements
 * of the ShapeSheet_Type, PageSheet_Type, StyleSheet_Type, and DocumentSheet_Type
 * elements.
 *
 * The N attribute of a Row_Type element specifies the name of the row that
 * identifies the subset of properties that it pertains to. The properties specified by
 * a row are specified by the Cell_Type child elements of the Row_Type element.
 *
 *
 * The following W3C XML Schema ([XMLSCHEMA1] section 2.1) fragment specifies the
 * contents of this complex type.
 *  <xsd:complexType name="SectionDef_Type">
 *      <xsd:sequence>
 *          <xsd:element name="CellDef" type="CellDef_Type" minOccurs="0"
 *              maxOccurs="unbounded"/>
 *          <xsd:element name="RowDef" type="RowDef_Type" minOccurs="0" maxOccurs="1"/>
 *      </xsd:sequence>
 *      <xsd:attribute name="N" type="xsd:string" use="required"/>
 *      <xsd:attribute name="T" type="xsd:string"/>
 *      <xsd:attribute name="S" type="xsd:unsignedByte"/>
 *  </xsd:complexType>
 *
 *
 * Attributes:
 * N: An xsd:string ([XMLSCHEMA2] section 3.2.1) attribute that specifies the
 * language-independent name of a collection of properties. It MUST be unique amongst all
 * the FunctionDef_Type, CellDef_Type, and SectionDef_Type elements in the Web drawing.
 * It MUST NOT be equal to the name of a function token listed in the Function Token
 * Definitions section of this specification. It MUST NOT be equal to the name of
 * a section listed in the Sections section of this specification. It MUST NOT be
 * equal to the name of a cell listed in the Cells section of this specification.
 *
 * T: An xsd:string ([XMLSCHEMA2] section 3.2.1) attribute that specifies the type of
 * rows contained by the SectionDef_Type element.
 * It MUST be equal to a value from following table:
 * /------------------------------------------------------------------------------\
 * |  Value    |  Description                                                     |
 * |------------------------------------------------------------------------------|
 * |  Indexed  |  Specifies the Row_Type elements in the SectionDef_Type element  |
 * |           |  MUST have an IX attribute and no N attribute.                   |
 * |------------------------------------------------------------------------------|
 * |  Named    |  Specifies the Row_Type elements in the SectionDef_Type element  |
 * |           |  MUST have an N attribute and no IX attribute.                   |
 * \------------------------------------------------------------------------------/
 *
 * S: An xsd:unsignedByte ([XMLSCHEMA2] section 3.3.24) attribute that is unused and
 * MUST be ignored.
 *
 */

/**
 * @this {Visio}
 * @param {Array.<JXONTree>|JXONTree} rowJXONOrArrayOfJXONs
 * @param {VisioStructurePath} structurePath
 * @return {Array}
 */
export async function parseRows(rowJXONOrArrayOfJXONs, structurePath) {
    const rowArrayOfJXONs = toArray(rowJXONOrArrayOfJXONs);

    const parsedRows = [];

    for (const rowJxon of rowArrayOfJXONs) {
        const parsedRow = await parseRow.call(this, rowJxon, structurePath)

        // null for unexpected behavior - no break later
        if (parsedRow !== null)
            parsedRows.push(parsedRow);
    }

    return parsedRows;
}

/**
 * @this {Visio}
 * @param {VisioRowJXON} rowJxon
 * @param {VisioStructurePath} structurePathBase
 * @returns {VisioRow}
 */
async function parseRow(rowJxon, structurePathBase) {
    const row = await parseJxon.call(
        this,
        rowJxon,
        VisioJxonType.Row,
        structurePathBase,
        { type: name }
    );

    if (row.index === undefined && row.name === undefined) {
        debug.log('row skipped - invalid XML (no required field)',
            {
                parsedRow: row,
                rowJxon,
                cellsDebug: row.cells ? row.cells.debug : 'no cells'
            });
        return null;
    }


    //TODO miky differentiate VisioRowStructureType.Indexed VS VisioRowStructureType.Named
    row.debugType = row.index !== undefined ?
        VisioRowStructureType.Indexed :
        VisioRowStructureType.Named;

    return row;
}


/**
 * @this {Visio}
 * @param faceNamesJxon
 * @param structurePath
 */
export async function parseFaceNames(faceNamesJxon, structurePath) {
    const faceNameJxonArray = toArray(faceNamesJxon.FaceName);

    const faceNames = [];
    for (const faceNameJxon of faceNameJxonArray) {
        const faceName = await parseJxon.call(
            this,
            faceNameJxon,
            VisioJxonType.FaceName,
            structurePath
        );
        faceNames.push(faceName);
    }

    return faceNames;
}

/**
 * @this {Visio}
 * @param {VisioJxon} styleSheetsJxon
 * @param structurePath
 * @returns {*}
 */
export async function parseStyleSheets(styleSheetsJxon, structurePath) {
    const styleSheetJxonsArray = toArray(styleSheetsJxon.StyleSheet);

    const styleSheetsMap = new Map();
    for (const styleSheetJxon of styleSheetJxonsArray) {
        const styleSheet = await parseJxon.call(this,
            styleSheetJxon,
            VisioJxonType.StyleSheet,
            structurePath);

        styleSheetsMap.set(styleSheet.id, styleSheet);
    }

    return styleSheetsMap;
}

export async function parseDocumentSheet(documentSheetJxon, structurePath) {
    return parseJxon.call(this, documentSheetJxon, VisioJxonType.DocumentSheet, structurePath);
}

/**
 * @param {VisioSectionJXON|Array.<VisioSectionJXON>} sectionJXONOrArrayOfJXONs
 * @param {VisioStructurePath} structurePath
 * @returns {VisioSectionParsed}
 */
export async function parseSection(sectionJXONOrArrayOfJXONs, structurePath) {
    if (!sectionJXONOrArrayOfJXONs) {
        debug.log('Empty section');
    }

    const sectionArrayOfJxons = toArray(sectionJXONOrArrayOfJXONs);

    const sectionsArray = [];
    for (const sectionJxon of sectionArrayOfJxons) {
        const section = await parseJxon.call(
            this,
            sectionJxon,
            VisioJxonType.Section,
            structurePath);

        sectionsArray.push(section);
    }

    const sectionsArrayNonNull = sectionsArray
        //TODO miky debug only - no null values when solution done
        // clean empty items
        .filter(sectionsItem => sectionsItem !== null);

    return groupByType.call(this, sectionsArrayNonNull);
}

/**
 * sections [{geometry: item1}, {geometry: item1}]
 * ==>
 * sections {geometry: [item1, item2]}
 *
 * @param {Array.<VisioSectionParsed>} arrayOfParsedSections
 * @return {VisioSectionParsed}
 */
function groupByType(arrayOfParsedSections) {
    return arrayOfParsedSections.reduce(
        (groupedSections, section) => {
            const vsdSection = VisioSection.from({ ...section, archive: this });
            const type = vsdSection.type;

            // first occurrence
            if (!groupedSections.has(type)) groupedSections.set(type, []);
            // add item
            groupedSections.get(type).push(vsdSection);

            return groupedSections;
        },
        new Map()
    );
}

let parseShapeJxonAutoincrement = 0;

/**
 * @this {Visio}
 * @param {VisioShapeJxon|Array.<VisioShapeJxon>} shapesJxon
 * @param {VisioStructurePath} structurePath
 * @returns {Map.<number, VisioParsedShape>}
 */
export async function parseShapes(
    shapesJxon,
    structurePath,
) {
    if (!shapesJxon || !structurePath) debug.log('Missing required parameter.');

    //TODO miky remove null defaults (deprecated)
    const shapesJxonArray = toArray(shapesJxon[VisioJxonShapesKey.Shape]);

    const parsedShapesMap = new Map();
    for (const shapeJxon of shapesJxonArray) {

        const parsedShape = await parseShapeJxon.call(this, shapeJxon, structurePath);

        parsedShapesMap.set(
            parsedShape.id,
            {
                structurePath,
                ...parsedShape
            }
        )
    }

    return parsedShapesMap;
}

/**
 * @this {Visio}
 * @param {VisioShapeJxon} shapeJxon
 * @param {VisioStructurePath} structurePath
 * @returns {VisioShape | null}
 */
export async function parseShapeJxon(shapeJxon, structurePath) {
    assertIsShapeJxon(shapeJxon);

    const shape = /** @type {VisioShape} */
        await parseJxon.call(
            this,
            shapeJxon,
            VisioJxonType.Shape,
            structurePath);

    // 4294967295 - highest int32
    // used for del items
    if (shape.id === 4294967295)
        shape.id = 'deleted-' + parseShapeJxonAutoincrement++;

    shape.structurePath = structurePath;

    const type = shape[VisioAttribute.type];

    // simple shape
    if (type === VisioShapeType.Shape) {
        assertIsSimpleShapeJxon(shapeJxon);
        shape.debugType = VisioShapeDebugType.ShapeSimple;
    } else

    // group
    if (type === VisioShapeType.Group) {
        assertIsGroupedShapeJxon(shapeJxon);
        shape.debugType = VisioShapeDebugType.ShapeGroup;

        if (!shape.shapes) {
            debug.log('property shapes undefined');
        }

        // recursion done inside parse jxon

    } else

    // foreign shape
    if (type === VisioShapeType.Foreign) {
        shape.debugType = VisioShapeDebugType.ShapeForeign;
        // all set during parseJxon
    } else

    // foreign shape
    if (type === VisioShapeType.Guide) {
        shape.debugType = VisioShapeDebugType.ShapeGuide;
        debug.log('VisioShapeType.Guide investigate')
        //TODO miky investigate
    } else

    // del shape (master override to not be used)
    if (type === undefined && shape.hasOwnProperty(VisioAttribute.deleted)) {
        //assertIsSimpleShapeJxon(shapeJXON);
        shape.debugType = VisioShapeDebugType.ShapeDeleteOverride;
    } else

    // unknown type
    {
        debug.log(
            `Implement VisioShapeType "${type}"`,
            { shape: shapeJxon }
        );
        return null;
    }

    // if (shape.cells)
    //     // reference for later calculations
    //     shape.cells.shape = shape;

    return shape;
}
