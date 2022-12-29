import { debug } from '../../helpers/debug.mjs';
import { assertIsObjectWithKeys } from './primitive.mjs';
import {
    VisioJxonCellKey,
    VisioJxonConnectKey,
    VisioJxonPageKey,
    VisioJxonShapeKey,
    VisioJxonMasterKey,
    VisioShapeType,
    VisioJxonRelationKey,
    VisioJxonThemeKeyA,
    VisioJxonRelKey,
    XmlSchemaKey,
    VisioJxonKey,
} from '../../types/enums.mjs';
import { assertHasKeyValue } from './primitive.mjs';
import { expectedSchema } from './xmlSchema.mjs';
import { VisioJxonDocumentKey } from '../../types/enums.mjs';

/***
 * Asserts of JXONs structure
 */

/**
 * @throws
 * @param {string} name
 * @param {VisioJxon} jxonTree
 * @param {Array.<VisioJxonKeys>} requiredVisioObjectKeys
 * @param {Array.<VisioJxonKeys>} [blacklistedVisioObjectKeys]
 */
function assertIsJxonTreeWithKeys(
    name,
    jxonTree,
    requiredVisioObjectKeys,
    blacklistedVisioObjectKeys = []
) {
    // just typing params
    assertIsObjectWithKeys(
        name,
        jxonTree,
        /** @type {Array.<string>} */requiredVisioObjectKeys,
        /** @type {Array.<string>} */blacklistedVisioObjectKeys
    );
}

export function assertIsShapeJxon(shapeJxon) {
    assertIsJxonTreeWithKeys(
        'Shape',
        shapeJxon,
        [
            VisioJxonShapeKey.Id,
        ],
        [
            VisioJxonMasterKey.MasterType,
            VisioJxonMasterKey.Rel,
        ]
    );
}

/**
 * @param {VisioPageSheetJXON} pageSheetJxon
 */
export function assertIsPageSheetJxon(pageSheetJxon) {
    assertIsJxonTreeWithKeys(
        'PageSheet',
        pageSheetJxon,
        []
    );
}

/**
 * @param {VisioPageSheetJXON} pageSheetJxon
 */
export function assertIsDocumentJxon(pageSheetJxon) {
    assertIsJxonTreeWithKeys(
        'PageSheet',
        pageSheetJxon,
        [
            VisioJxonKey.DocumentSettings,
            VisioJxonKey.Colors,
            VisioJxonKey.FaceNames,
            VisioJxonKey.StyleSheets,
            VisioJxonKey.DocumentSheet,
        ]
    );
}


export function assertIsSimpleShapeJxon(shapeJxon) {
    assertIsShapeJxon(shapeJxon);

    assertIsJxonTreeWithKeys(
        'SimpleShape',
        shapeJxon,
        [],
        [
            VisioJxonShapeKey.Shapes, // not allowed in SimpleShape
        ]
    );

    assertHasKeyValue(
        'SimpleShape',
        shapeJxon,
        {
            [VisioJxonShapeKey.Type]: VisioShapeType.Shape
        }
    );
}

export function assertIsGroupedShapeJxon(groupedShapeJxon) {
    assertIsShapeJxon(groupedShapeJxon);

    assertIsJxonTreeWithKeys(
        'GroupedShape',
        groupedShapeJxon,
        [
            // objects
            VisioJxonShapeKey.Shapes, // required in GroupShape
        ],
        []
    );

    assertHasKeyValue(
        'GroupedShape',
        groupedShapeJxon,
        {
            [VisioJxonShapeKey.Type]: VisioShapeType.Group
        }
    );
}

/**
 * @see {http://localhost/MS-VSDX.pdf#page=119}
 * @param {VisioMasterJXON} master
 * @returns {boolean}
 */
export function assertIsMasterJxon(master) {
    if (typeof master !== 'object')
        debug.log('Master is not object.', master);

    const requiredKeys = [
        // objects
        // by docs required only "Rel"
        //VisioJxonMasterKey.PageSheet,
        VisioJxonMasterKey.Rel,
        // VisioJxonMasterKey.Icon,

        // properties
        // by docs required only "Id" ("@ID")
        VisioJxonMasterKey.Id,
        VisioJxonMasterKey.UniqueId,
        // VisioJxonMasterKey.MasterType,
        VisioJxonMasterKey.BaseId,
        // VisioJxonMasterKey.NameU,
        // VisioJxonMasterKey.IsCustomNameU,
        // VisioJxonMasterKey.Name,
        // VisioJxonMasterKey.IsCustomName,
        VisioJxonMasterKey.Prompt,
        // VisioJxonMasterKey.Hidden,
        VisioJxonMasterKey.IconSize,
        VisioJxonMasterKey.AlignName,
        VisioJxonMasterKey.MatchByName,
        VisioJxonMasterKey.IconUpdate,
        VisioJxonMasterKey.PatternFlags,
    ];
    requiredKeys.forEach(key => {
        if (!master.hasOwnProperty(key))
            debug.log(`Master required key "${key}" missing.`, master);
    });
}

/**
 * @param {VisioShapeTextJXON} textJxon
 * @returns {boolean}
 */
export function assertIsShapeTextJxon(textJxon) {
    assertIsJxonTreeWithKeys(
        'ShapeText',
        textJxon,
        []
    );
}


/**
 * @param {VisioCellJXON} cell
 * @returns {boolean}
 */
export function assertIsCellJxon(cell) {
    if (typeof cell !== 'object')
        debug.log('Cell is not object.', cell);

    const requiredKeys = [
        VisioJxonCellKey.Name,
        //TODO miky FIGS.vsdx has cell with formula only!!!
        // VisioJxonCellKey.Value,
    ];
    requiredKeys.forEach(key => {
        if (!cell.hasOwnProperty(key))
            debug.log('Cell required key "${key}" missing.', cell);
    });

}

/**
 * @param {*} connect
 * @returns {boolean}
 */
export function assertIsConnect(connect) {
    if (typeof connect !== 'object')
        debug.log('Connect is not object.', connect);

    const requiredKeys = [
        VisioJxonConnectKey.FromSheet,
        VisioJxonConnectKey.FromCell,
        VisioJxonConnectKey.FromPart,
        VisioJxonConnectKey.ToSheet,
        VisioJxonConnectKey.ToCell,
        VisioJxonConnectKey.ToPart,
    ];
    requiredKeys.forEach(key => {
        if (!connect.hasOwnProperty(key))
            debug.log('Connect required key "${key}" missing.', connect);
    });
}

/**
 * @param {VisioPageJXON} page
 * @returns {boolean}
 */
export function assertIsPageJxon(page) {
    assertIsJxonTreeWithKeys(
        'Page',
        page,
        [
            VisioJxonPageKey.Name,
            VisioJxonPageKey.NameUnique,
            VisioJxonPageKey.Id,
            VisioJxonPageKey.PageSheet,
            VisioJxonPageKey.Rel,
        ]
    );

}

export function assertIsRelationshipJxon(relationshipJxon/*, { type = null }*/) {
    assertIsJxonTreeWithKeys(
        'Relationship',
        relationshipJxon,
        [
            VisioJxonRelationKey.Id,
            VisioJxonRelationKey.Type,
            VisioJxonRelationKey.Target,
        ],
        []
    );
    // if (type) {
    //     const keyValues = {
    //         [VisioRelationType.Master]: {
    //             [VisioJxonRelationKey.Type]: VisioRelationTypeSchema.Master
    //         },
    //     }[type] || {};
    //
    //     assertHasKeyValue(
    //         'Relationship',
    //         relationshipJxon,
    //         keyValues
    //     );
    // }
}


export function assertIsRelJxon(relJxon) {
    assertIsJxonTreeWithKeys(
        'Rel',
        relJxon,
        [
            VisioJxonRelKey.RelId,
        ],
    );

    const attributesCount = Object.keys(relJxon).length;
    if (attributesCount !== 1) debug.log('Rel should have one attribute', relJxon)
}

export function assertIsDocumentColorJxon(documentColorJxon) {
    assertIsJxonTreeWithKeys(
        'DocumentColor',
        documentColorJxon,
        [
            VisioJxonDocumentKey.ColorEntry,
        ],
    );

    const attributesCount = Object.keys(documentColorJxon).length;
    if (attributesCount !== 1)
        debug.log('DocumentColor should have one attribute', { documentColorJxon })
}

export function assertIsDocumentColorEntryRgbJxon(documentColorEntryRgbJxon) {
    assertIsJxonTreeWithKeys(
        'DocumentColorEntryRgb',
        documentColorEntryRgbJxon,
        [
            VisioJxonDocumentKey.Ix,
            VisioJxonDocumentKey.Rgb,
        ],
    );

    const attributesCount = Object.keys(documentColorEntryRgbJxon).length;
    if (attributesCount !== 2)
        debug.log('documentColorEntryRgbJxon should have two attributes', { documentColorEntryRgbJxon })
}


/**
 * @param {VisioDrawingMLJxon} themeJxon
 */
export function assertIsDrawingMLJxon(themeJxon) {
    expectedSchema(themeJxon, XmlSchemaKey.DrawingML);

    assertIsJxonTreeWithKeys(
        'Theme',
        themeJxon,
        [
            VisioJxonThemeKeyA.ThemeElements,
            VisioJxonThemeKeyA.ObjectDefaults,
            VisioJxonThemeKeyA.ExtraClrSchemeLst,
            VisioJxonThemeKeyA.Name,
        ],
        []
    );

}

/**
 * @throws
 * @param {VisioThemeJXON} themePartJxon
 */
export function assertIsThemeJxon(themePartJxon) {
    expectedSchema(themePartJxon, XmlSchemaKey.Theme);

    // assertIsJxonTreeWithKeys(
    //     'Theme',
    //     themePartJxon,
    //     [],
    //     []
    // );

}


// // template
// export function assertIsXxxJxon(xxx) {
//     assertIsJxonTreeWithKeys(
//         'xxx',
//         xxx,
//         [
//         ],
//         [
//         ]
//     );
//
//     assertHasKeyValue(
//         'xxx',
//         xxx,
//         {
//         }
//     );
// }
