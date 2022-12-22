import { assertIsObjectWithKeys } from './primitive.mjs';
import {
    VisioShapeDebugType,
    VisioShapeKey,
    VisioShapeType,
    VisioJxonThemeFontAttribute,
    VisioJxonThemeSubKeyA
} from '../../types/enums.mjs';
import {
    assertHasKeyValue,
    assertAttributesLength
} from './primitive.mjs';

/***
 * Asserts of parsed visio objects structure
 */

/**
 * @param {VisioIconJXON} icon
 * @returns {boolean}
 */
export function assertIsIcon(icon) {
    assertIsVisioObjectWithKeys(
        'Icon',
        icon,
        []
    );
}

/**
 * @param {VisioPageSheet} pageSheet
 * @returns {boolean}
 */
export function assertIsPageSheet(pageSheet) {
    // assertIsVisioObjectWithKeys(
    //     'PageSheet',
    //     pageSheet,
    //     []
    // );
}

export function assertIsShape(shape) {
    assertIsVisioObjectWithKeys(
        'Shape',
        shape,
        [
            VisioShapeKey.id
        ]
    );
}

export function assertIsSimpleShape(shape) {
    assertIsVisioObjectWithKeys(
        'SimpleShape',
        shape,
        [
            VisioShapeKey.Id
        ]
    );

    assertHasKeyValue(
        'SimpleShape',
        shape,
        {
            [VisioShapeKey.Type]: VisioShapeType.Shape,
            [VisioShapeKey.DebugType]: VisioShapeDebugType.ShapeSimple,
        }
    );
}

/**
 * @param {VisioMaster} master
 * @returns {boolean}
 */
export function assertIsMaster(master) {
    // assertIsShape();

    assertIsVisioObjectWithKeys(
        'Master',
        master,
        []
    );
}

/**
 * @param {VisioMasterShape} masterShape
 * @returns {boolean}
 */
export function assertIsMasterShape(masterShape) {
    assertIsShape();

    assertIsVisioObjectWithKeys(
        'MasterShape',
        masterShape,
        []
    );
}

export function assertIsThemeFontDefinition(fontDefinition) {
    assertAttributesLength(
        'ThemeFontDefinition',
        fontDefinition,
        2
    );

    assertIsVisioObjectWithKeys(
        'ThemeFontDefinition',
        fontDefinition,
        [
            VisioJxonThemeFontAttribute.script,
            VisioJxonThemeFontAttribute.typeface,
        ],
        []
    );
}

export function assertIsThemeValue(colorDefinition) {
    assertAttributesLength(
        'ThemeColorDefinition',
        colorDefinition,
        1
    );

    assertIsVisioObjectWithKeys(
        'ThemeColorDefinition',
        colorDefinition,
        [
            VisioJxonThemeSubKeyA.value,
        ],
        []
    );
}

export function assertIsSchemeColorDefinition(schemeDefinition) {
    assertAttributesLength(
        'SchemeColorDefinition',
        schemeDefinition,
        1
    );

    assertIsVisioObjectWithKeys(
        'SchemeColorDefinition',
        schemeDefinition,
        [
            VisioJxonThemeSubKeyA.schemeClr,
        ],
        []
    );
}

export function assertIsSchemeSrgbClr(schemeDefinition) {
    assertAttributesLength(
        'SchemeSrgbClr',
        schemeDefinition,
        1
    );

    assertIsVisioObjectWithKeys(
        'SchemeSrgbClr',
        schemeDefinition,
        [
            VisioJxonThemeSubKeyA.srgbClr,
        ],
        []
    );
}

/**
 * @throws
 * @param {string} name
 * @param {VisioJxon} visioObject
 * @param {Array.<VisioObjectKeys>} requiredVisioObjectKeys
 * * @param {Array.<VisioObjectKeys>} [blacklistedVisioObjectKeys]
 */
export function assertIsVisioObjectWithKeys(
    name,
    visioObject,
    requiredVisioObjectKeys,
    blacklistedVisioObjectKeys = []
) {
    // just typing params
    assertIsObjectWithKeys(
        name,
        visioObject,
        /** @type {Array.<string>} */requiredVisioObjectKeys,
        /** @type {Array.<string>} */blacklistedVisioObjectKeys
    );
}

