import { VisioAttribute } from '../types/enums.mjs';
import { VisioRelationType } from '../types/enums.mjs';
import { VisioRelObject } from './VisioRelObject.mjs';
import { VisioPageContent } from './VisioPageContent.mjs';
import { paperToArchiveEntries } from '../export/export.mjs';
import { VisioUnitType } from '../types/enums.mjs';
import { toPixels } from '../helpers/internalUnits.mjs';

export class VisioPage extends VisioRelObject {

    getDefaultAttributes() {
        return {
            // underscore prefixed (later)
            ...super.getDefaultAttributes(),
            /** @type {Map<number, Shape>} */
            shapes: new Map(),
            /** @type {Map<number, Connect>} */
            connects: new Map(),
            /** @type {Pages} */
            pages: null,
            /** @type {Map<number, Shape>} */
            foreignShapes: new Map(),
            /** @type {Map<number, Shape>} */
            allShapes: new Map(),
            /** @type {Map<string, Object>} */
            cache: new Map(),
        };
    }

    constructor(init = {}) {
        super(init, new Set([
            // underscore prefixed (later)
            VisioAttribute.pages, // parent
            VisioAttribute.shapes,
            VisioAttribute.connects,
            VisioAttribute.foreignShapes,
            VisioAttribute.background,
            VisioAttribute.backPage
        ]));
    }

    setAttributes({ pageSheet, ...attributes }) {
        super.setAttributes({ pageSheet, ...attributes });
        if (pageSheet) {
            this.referenceInCells();
        }
    }

    referenceInCells() {
        const { pageSheet, archive } = this;
        if (!pageSheet || !pageSheet.cells) return;
        pageSheet.cells.parent = archive.document.pageSheet;
    }

    // public API
    async getContent(opts = {}) {
        const pageContent = new VisioPageContent(this);
        await pageContent.loadAsync(opts);
        return pageContent;
    }

    /**
     * Parse all masters related to this page
     * @returns {Promise<*>}
     */
    async getMastersFromRelsAsync() {
        const archive = this.archive;
        const document = archive.document;
        const masters = document.masters;

        // this page has no relations
        if (!this.rels) return null;

        const mastersRelsMap = this.rels.get(VisioRelationType.Master);
        if (mastersRelsMap) {
            await masters.loadMasters(mastersRelsMap);
        }
    }

    get background() {
        return Boolean(this._background);
    }

    get backPage() {
        const { _backPage } = this;
        if (_backPage === undefined) return null;
        return _backPage;
    }

    get width() {
        return this.pageSheet.cells.pageWidth;
    }

    get height() {
        return this.pageSheet.cells.pageHeight;
    }

    get pages() {
        return this._pages;
    }

    get fileName() {
        const [, fileName] = /^visio\/pages\/(.*)\.xml$/gm.exec(this.xmlPath);
        return fileName;
    }

    async fromPaper(paper, {
        exportElement = null,
        exportLink = null,
    } = {}) {
        // build all required Visio file entities
        const files = await paperToArchiveEntries(paper, this, {
            exportElement,
            exportLink
        });
        // each entry is a file that has to be added to the final zip archive
        this.archive.addEntries(files);
    }

    get printerPaperSize() {
        const pageSheetCells = this.pageSheet.cells;
        const { paperKind, printPageOrientation } = pageSheetCells;
        const { width, height } = this.constructor.getPrinterPaperSize(paperKind);
        if (printPageOrientation === 2) {
            return {
                width: height,
                height: width
            }
        } else {
            return {
                width,
                height
            }
        }
    }

    static getPrinterPaperSize(vsdPaperKind) {

        const mm = (mm) => toPixels(mm, VisioUnitType.MM);
        const inches = (inches) => toPixels(inches, VisioUnitType.IN);

        switch (vsdPaperKind) {
            default:
            case 0: /* DMPAPER_FIRST */
            case 1 : /* Letter 8 1/2 x 11 in               (DMPAPER_LETTER) */
                return { width: inches(8.5), height: inches(11) };
            case 2 : /* Letter Small 8 1/2 x 11 in         (DMPAPER_LETTERSMALL) */
                return { width: inches(8.5), height: inches(11) };
            case 3 : /* Tabloid 11 x 17 in                 (DMPAPER_TABLOID) */
                return { width: inches(11), height: inches(17) };
            case 4 : /* Ledger 17 x 11 in                  (DMPAPER_LEDGER) */
                return { width: inches(17), height: inches(11) };
            case 5 : /* Legal 8 1/2 x 14 in                (DMPAPER_LEGAL) */
                return { width: inches(8.5), height: inches(14) };
            case 6 : /* Statement 5 1/2 x 8 1/2 in         (DMPAPER_STATEMENT) */
                return { width: inches(5.5), height: inches(8.5) };
            case 7 : /* Executive 7 1/4 x 10 1/2 in        (DMPAPER_EXECUTIVE) */
                return { width: inches(7.25), height: inches(10.5) };
            case 8 : /* A3 297 x 420 mm                    (DMPAPER_A3) */
                return { width: mm(297), height: mm(420) };
            case 9 : /* A4 210 x 297 mm                    (DMPAPER_A4) */
                return { width: mm(210), height: mm(297) };
            case 10:  /* A4 Small 210 x 297 mm              (DMPAPER_A4SMALL) */
                return { width: mm(210), height: mm(297) };
            case 11:  /* A5 148 x 210 mm                    (DMPAPER_A5) */
                return { width: mm(148), height: mm(210) };
            case 12:  /* B4 (JIS) 250 x 354                 (DMPAPER_B4) */
                return { width: mm(250), height: mm(354) };
            case 13:  /* B5 (JIS) 182 x 257 mm              (DMPAPER_B5) */
                return { width: mm(182), height: mm(257) };
            case 14:  /* Folio 8 1/2 x 13 in                (DMPAPER_FOLIO) */
                return { width: inches(8.5), height: inches(13) };
            case 15:  /* Quarto 215 x 275 mm                (DMPAPER_QUARTO) */
                return { width: mm(215), height: mm(275) };
            case 16:  /* 10x14 in                           (DMPAPER_10X14) */
                return { width: inches(10), height: inches(14) };
            case 17:  /* 11x17 in                           (DMPAPER_11X17) */
                return { width: inches(11), height: inches(17) };
            case 18:  /* Note 8 1/2 x 11 in                 (DMPAPER_NOTE) */
                return { width: inches(2), height: inches(11) };
            case 19:  /* Envelope #9 3 7/8 x 8 7/8          (DMPAPER_ENV_9) */
                return { width: inches(3.875), height: inches(8.875) };
            case 20:  /* Envelope #10 4 1/8 x 9 1/2         (DMPAPER_ENV_10) */
                return { width: inches(4.125), height: inches(9.5) };
            case 21:  /* Envelope #11 4 1/2 x 10 3/8        (DMPAPER_ENV_11) */
                return { width: inches(4.5), height: inches(10.375) };
            case 22:  /* Envelope #12 4.75 x 11           (DMPAPER_ENV_12) */
                //TODO check value
                return { width: inches(4), height: inches(11) };
            case 23:  /* Envelope #14 5 x 11 1/2            (DMPAPER_ENV_14) */
                return { width: inches(5), height: inches(11.5) };
            case 24:  /* C size sheet                       (DMPAPER_CSHEET) */
                //TODO C0?
                return { width: mm(917), height: mm(1297) };
            case 25:  /* D size sheet                       (DMPAPER_DSHEET) */
                //TODO D0?
                return { width: mm(771), height: mm(1090) };
            case 26:  /* E size sheet                       (DMPAPER_ESHEET) */
                //TODO E0?
                return { width: mm(878), height: mm(1242) };
            case 27:  /* Envelope DL 110 x 220mm            (DMPAPER_ENV_DL) */
                return { width: mm(110), height: mm(220) };
            case 28:  /* Envelope C5 162 x 229 mm           (DMPAPER_ENV_C5) */
                return { width: mm(162), height: mm(229) };
            case 29:  /* Envelope C3  324 x 458 mm          (DMPAPER_ENV_C3) */
                return { width: mm(324), height: mm(458) };
            case 30:  /* Envelope C4  229 x 324 mm          (DMPAPER_ENV_C4) */
                return { width: mm(229), height: mm(324) };
            case 31:  /* Envelope C6  114 x 162 mm          (DMPAPER_ENV_C6) */
                return { width: mm(114), height: mm(162) };
            case 32:  /* Envelope C65 114 x 229 mm          (DMPAPER_ENV_C65) */
                return { width: mm(114), height: mm(229) };
            case 33:  /* Envelope B4  250 x 353 mm          (DMPAPER_ENV_B4) */
                return { width: mm(250), height: mm(353) };
            case 34:  /* Envelope B5  176 x 250 mm          (DMPAPER_ENV_B5) */
                return { width: mm(176), height: mm(250) };
            case 35:  /* Envelope B6  176 x 125 mm          (DMPAPER_ENV_B6) */
                return { width: mm(176), height: mm(125) };
            case 36:  /* Envelope 110 x 230 mm              (DMPAPER_ENV_ITALY) */
                return { width: mm(110), height: mm(230) };
            case 37:  /* Envelope Monarch 3.875 x 7.5 in    (DMPAPER_ENV_MONARCH) */
                return { width: inches(3.875), height: inches(7.5) };
            case 38:  /* 6 3/4 Envelope 3 5/8 x 6 1/2 in    (DMPAPER_ENV_PERSONAL) */
                return { width: inches(3.625), height: inches(6.5) };
            case 39:  /* US Std Fanfold 14 7/8 x 11 in      (DMPAPER_FANFOLD_US) */
                return { width: inches(14.875), height: inches(11) };
            case 40:  /* German Std Fanfold 8 1/2 x 12 in   (DMPAPER_FANFOLD_STD_GERMAN) */
                return { width: inches(8.5), height: inches(12) };
            case 41:  /* German Legal Fanfold 8 1/2 x 13 in (DMPAPER_FANFOLD_LGL_GERMAN) */
                return { width: inches(8.5), height: inches(13) };
            case 42:  /* B4 (ISO) 250 x 353 mm              (DMPAPER_ISO_B4) */
                return { width: mm(250), height: mm(353) };
            case 43:  /* Japanese Postcard 100 x 148 mm     (DMPAPER_JAPANESE_POSTCARD) */
                return { width: mm(100), height: mm(148) };
            case 44:  /* 9 x 11 in                          (DMPAPER_9X11) */
                return { width: inches(9), height: inches(11) };
            case 45:  /* 10 x 11 in                         (DMPAPER_10X11) */
                return { width: inches(10), height: inches(11) };
            case 46:  /* 15 x 11 in                         (DMPAPER_15X11) */
                return { width: inches(15), height: inches(11) };
            case 47:  /* Envelope Invite 220 x 220 mm       (DMPAPER_ENV_INVITE) */
                return { width: inches(220), height: inches(220) };
                // 48:  /* RESERVED--DO NOT USE               (DMPAPER_RESERVED_48) */
                // 49:  /* RESERVED--DO NOT USE               (DMPAPER_RESERVED_49) */
            case 50:  /* Letter Extra 9.5 x 12 in        (DMPAPER_LETTER_EXTRA) */
                return { width: inches(9), height: inches(12) };
            case 51:  /* Legal Extra 9.5 x 15 in         (DMPAPER_LEGAL_EXTRA) */
                return { width: inches(9), height: inches(15) };
            case 52:  /* Tabloid Extra 11.69 x 18 in        (DMPAPER_TABLOID_EXTRA) */
                return { width: inches(11.69), height: inches(18) };
            case 53:  /* A4 Extra 9.27 x 12.69 in           (DMPAPER_A4_EXTRA) */
                return { width: inches(9.27), height: inches(12.69) };
            case 54:  /* Letter Transverse 8 x 11 in   (DMPAPER_LETTER_TRANSVERSE) */
                //TODO check value
                return { width: inches(8), height: inches(11) };
            case 55:  /* A4 Transverse 210 x 297 mm         (DMPAPER_A4_TRANSVERSE) */
                return { width: mm(210), height: mm(297) };
            case 56: /* Letter Extra Transverse 9 x 12 in (DMPAPER_LETTER_EXTRA_TRANSVERSE) */
                return { width: inches(9), height: inches(12) }; //TODO miky check value
            case 57:  /* SuperA/SuperA/A4 227 x 356 mm      (DMPAPER_A_PLUS) */
                return { width: mm(227), height: mm(356) };
            case 58:  /* SuperB/SuperB/A3 305 x 487 mm      (DMPAPER_B_PLUS) */
                return { width: mm(305), height: mm(487) };
            case 59:  /* Letter Plus 8.5 x 12.69 in         (DMPAPER_LETTER_PLUS) */
                return { width: inches(8.5), height: inches(12.69) };
            case 60:  /* A4 Plus 210 x 330 mm               (DMPAPER_A4_PLUS) */
                return { width: mm(210), height: mm(330) };
            case 61:  /* A5 Transverse 148 x 210 mm         (DMPAPER_A5_TRANSVERSE) */
                return { width: mm(148), height: mm(210) };
            case 62:  /* B5 (JIS) Transverse 182 x 257 mm   (DMPAPER_B5_TRANSVERSE) */
                return { width: mm(182), height: mm(257) };
            case 63:  /* A3 Extra 322 x 445 mm              (DMPAPER_A3_EXTRA) */
                return { width: mm(322), height: mm(445) };
            case 64:  /* A5 Extra 174 x 235 mm              (DMPAPER_A5_EXTRA) */
                return { width: mm(174), height: mm(235) };
            case 65:  /* B5 (ISO) Extra 201 x 276 mm        (DMPAPER_B5_EXTRA) */
                return { width: mm(201), height: mm(276) };
            case 66:  /* A2 420 x 594 mm                    (DMPAPER_A2) */
                return { width: mm(420), height: mm(594) };
            case 67:  /* A3 Transverse 297 x 420 mm         (DMPAPER_A3_TRANSVERSE) */
                return { width: mm(297), height: mm(420) };
            case 68:  /* A3 Extra Transverse 322 x 445 mm   (DMPAPER_A3_EXTRA_TRANSVERSE) */
                return { width: mm(322), height: mm(445) };
        }
    }
}
