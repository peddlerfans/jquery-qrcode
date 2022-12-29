import { VisioAttribute } from '../types/enums.mjs';
import { VisioRelObject } from './VisioRelObject.mjs';

/**
 * @property {Map} _colors
 * @property {Promise<VisioRelations>} _relations
 * @property {Pages} _pages
 * @property {VisioDocumentSettings} documentSettings
 * @property {VisioFaceNames} faceNames
 * @property {VisioStyleSheets} styleSheets
 * @property {VisioDocumentSheet} documentSheet
 * @property {boolean} languageDependent
 */
export class VisioDocument extends VisioRelObject {

    getDefaultAttributes() {
        return {
            ...super.getDefaultAttributes(),
            _colors: null,
            _relations: null,
            _pages: null,
            documentSettings: null,
            faceNames: null,
            styleSheets: null,
            documentSheet: null,
            languageDependent: true,
            masterShapesMap: new Map(),
        };
    }

    constructor(init = {}) {
        super(init, new Set([
            VisioAttribute.colors,
            VisioAttribute.relations,
            VisioAttribute.pages,
        ]));
    }

    // Methods

    getMasters() {
        return [...this.masters.map.values()];
    }

    getMastersIdMap() {
        return Object.fromEntries(this.masters.map);
    }

    getMastersNameMap() {
        const masters = this.getMasters();
        return masters.reduce((acc, master) => {
            acc[master.name] = master;
            return acc;
        }, {});
    }

    getPages() {
        return this.pages.toArray();
    }

    getPage(pageId) {
        return this.pages.get(pageId);
    }

    // Properties

    get name() {
        const { documentSheet, languageDependent } = this;
        return languageDependent ?
            documentSheet.name : // language-dependent name
            documentSheet.nameU; // language-independent name
    }

    get colors() {
        return this._colors;
    }

    set colors(colors) {
        this._colors = colors;
    }

    set pages(pages) {
        this._pages = pages;
    }

    get pages() {
        return this._pages;
    }

    set documentSettings(documentSettings) {
        this._documentSettings = documentSettings;
    }

    get documentSettings() {
        return this._documentSettings;
    }

    set faceNames(faceNames) {
        this._faceNames = faceNames;
    }

    set styleSheets(styleSheets) {
        this._styleSheets = styleSheets;
    }

    get styleSheets() {
        return this._styleSheets;
    }

    set documentSheet(documentSheet) {
        this._documentSheet = documentSheet;
    }

    get documentSheet() {
        return this._documentSheet;
    }

}
