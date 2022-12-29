import { util } from 'jointjs';
import { debug } from '../helpers/debug.mjs';
import { pixelsToInches } from '../helpers/internalUnits.mjs';
import { jxon2Xml } from '../jxon/jxon.mjs';
import { VisioCellName, XmlSchema } from '../types/enums.mjs';
import { convertPaperToVisioShapes } from './paper.mjs';

export const ArchiveEntityType = {
    XML: 'xml',
    IMAGE: 'image'
}

// Rappid paper is being converted into a map of entities that will be
// added to the Visio archive
export async function paperToArchiveEntries(paper, page, { exportElement, exportLink } = {}) {
    // [key:fileArchivePath]: { type: ArchiveEntityType, content: string | Blob }
    const map = {};
    const archive = page.archive;

    // pageRels hold raw relationship data for Rel elements as well as
    // data used to build a static file in the archive
    const pageRels = {
        data: [],
        jxon: { Relationship: [] }
    };

    map['docProps/custom.xml'] = {
        type: ArchiveEntityType.XML,
        content: await buildCustomPropsXML(archive)
    }

    const pageFileName = page.fileName;

    // pageXML - currently the only project page with all shapes
    map[`visio/pages/${pageFileName}.xml`] = {
        type: ArchiveEntityType.XML,
        content: await buildPageXML(paper, page, pageRels, exportElement, exportLink)
    }

    // pages.xml - general Visio pages configuration (i.e. size)
    map['visio/pages/pages.xml'] = {
        type: ArchiveEntityType.XML,
        content: await buildPagesXML(paper, page, archive)
    }

    // page[nr].xml.rels - media relationship file, has to be built last
    // as firstly all Rel tags on pages need to be identified
    map[`visio/pages/_rels/${pageFileName}.xml.rels`] = {
        type: ArchiveEntityType.XML,
        content: await buildPageRelsXML(pageRels.jxon)
    }

    // todo: this should be situational - only when images of certain type exist
    const contentTypes = await archive.getJxonAsync('[Content_Types].xml');
    map['[Content_Types].xml'] = {
        type: ArchiveEntityType.XML,
        content: buildContentTypesXML(contentTypes)
    }

    // convert all images into blobs and push them to the entity map
    const deferredImages = [];
    for (let entry of pageRels.data) {
        deferredImages.push(new Promise((resolve, reject) => {
            util.imageToDataUri(entry.url, (err, dataURI) => {
                if (err) {
                    // todo: what should be done if it failed?
                    reject();
                }

                let blob;
                try {
                    blob = util.dataUriToBlob(dataURI);
                } catch (e) {
                    debug.log(`Can not convert an image to blob: ${e}`);
                }

                if (blob) {
                    map[`visio/media/${entry.name}`] = {
                        type: ArchiveEntityType.IMAGE,
                        content: blob
                    }
                }

                resolve();
            });
        }));
    }

    return Promise.all(deferredImages).then(() => {
        return map;
    });
}

async function buildCustomPropsXML(archive) {
    const jxon = await archive.getJxonAsync('docProps/custom.xml');

    const pidMax = Math.max.apply(Math, jxon.property.map(prop => Number.parseInt(prop['@pid'])));

    // where does this ID come from?
    const recalcProp = {
        '@fmtid': '{D5CDD505-2E9C-101B-9397-08002B2CF9AE}',
        '@pid': (pidMax + 1).toString(),
        '@name': 'RecalcDocument',
        'vt:bool': {
            keyValue: 'true'
        }
    }

    jxon.property.push(recalcProp);

    const baseXML = document.implementation.createDocument(XmlSchema.CustomProperties, 'Properties', null);
    const xml = jxon2Xml(jxon, baseXML, { vt: XmlSchema.DocPropsVTypes });
    const docString = new XMLSerializer().serializeToString(xml);

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + docString;
}

// todo: abstract and unify buildXML(jxon, schema, qualifiedName, doctype)
async function buildContentTypesXML(jxon) {
    const extensions = jxon.Default.map(type => type['@Extension']);

    // todo: how to properly attach svg?
    const defaultExtensions = [
        { name: 'emf', type: 'image/x-emf' },
        { name: 'png', type: 'image/png' },
        { name: 'gif', type: 'image/gif' },
        { name: 'jpeg', type: 'image/jpeg' },
        { name: 'svg', type: 'image/svg+xml' }
    ];

    defaultExtensions.forEach((defaultExtension) => {
        if (extensions.indexOf(defaultExtension.name) === -1) {
            jxon.Default.unshift({
                '@Extension': defaultExtension.name,
                '@ContentType': defaultExtension.type
            });
        }
    });

    const contentTypesXML = document.implementation.createDocument(XmlSchema.ContentTypes, 'Types', null);
    const xml = jxon2Xml(jxon, contentTypesXML, { xmlns: XmlSchema.ContentTypes });
    const docString = new XMLSerializer().serializeToString(xml);

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + docString
}

function buildPageRelsXML(jxon) {
    const pageRelsXML = document.implementation.createDocument(XmlSchema.Relationships, 'Relationships', null);
    const xml = jxon2Xml(jxon, pageRelsXML, { xmlns: XmlSchema.Relationships });
    const docString = new XMLSerializer().serializeToString(xml);

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + docString;
}

// todo: resize all pages to paper size
async function buildPagesXML(paper, page, archive) {

    const jxon = await archive.getJxonAsync('visio/pages/pages.xml');

    const realPaperSize = paper.getArea();

    if (!Array.isArray(jxon.Page)) {
        jxon.Page = [jxon.Page];
    }

    const pageJxon = jxon.Page.find((p) => p['@ID'] === page.id.toString());
    if (pageJxon) {
        const cells = pageJxon.PageSheet.Cell;
        const widthIndex = cells.findIndex(cell => cell['@N'] === VisioCellName.PageWidth);
        const heightIndex = cells.findIndex(cell => cell['@N'] === VisioCellName.PageHeight);

        const widthCell = { '@N': VisioCellName.PageWidth, '@V': pixelsToInches(realPaperSize.width).toString() };
        if (!Number.isNaN(widthIndex)) {
            cells[widthIndex] = widthCell;
        } else {
            cells.push(widthCell);
        }

        const heightCell = { '@N': VisioCellName.PageHeight, '@V': pixelsToInches(realPaperSize.height).toString() };
        if (!Number.isNaN(heightIndex)) {
            cells[heightIndex] = heightCell;
        } else {
            cells.push(heightCell);
        }
    } else {
        debug.log(`Page with id ${page.id} was not found.`);
    }

    const emptyXML = document.implementation.createDocument(XmlSchema.Main, 'Pages', null);

    const xml = jxon2Xml(jxon, emptyXML, { xmlns: XmlSchema.Main,  r: XmlSchema.DocumentRelationships });

    const serializer = new XMLSerializer();
    const docString = serializer.serializeToString(xml);

    return '<?xml version="1.0" encoding="utf-8"?>' + docString;
}

async function buildPageXML(paper, page, pageRels, exportElement, exportLink) {

    // setup
    const jxonBase = await page.archive.getJxonAsync(page.xmlPath);

    const jxon = await convertPaperToVisioShapes(paper, jxonBase, page, pageRels, exportElement, exportLink);

    const emptyXML = document.implementation.createDocument(XmlSchema.Main, 'PageContents', null);
    const xml = jxon2Xml(jxon, emptyXML, { xmlns: XmlSchema.Main, r: XmlSchema.DocumentRelationships });

    const serializer = new XMLSerializer();
    const docString = serializer
        .serializeToString(xml)
        .replace(/(<cp IX="0")(?: textPlaceholder="(.*?)")(\/>)/gm, function() {
            const [, cp, text, closeTag] = arguments;
            return cp + closeTag + text;
        });

    return '<?xml version="1.0" encoding="utf-8"?>' + docString;
}

