import { expectedSchema } from './assert/xmlSchema.mjs';
import { XmlSchemaKey } from '../types/enums.mjs';
import { VisioRelationType } from '../types/enums.mjs';
import { toArray } from '../helpers/toArray.mjs';
import { VisioDocument } from '../models/VisioDocument.mjs';
import { getSingleRecordPath } from './relation.mjs';
import { VisioPages } from '../models/VisioPages.mjs';
import { pageFactoryFromJxonAsync } from './page.mjs';
import { parseJxon } from './parseJxon.mjs';
import { VisioJxonType } from '../types/enums.mjs';
import { VisioJxonDocumentKey } from '../types/enums.mjs';
import { parseColors } from './parseDocument.mjs';
import { getStructurePathFragment } from './structurePath.mjs';
import { VisioAttribute } from '../types/enums.mjs';
import { VisioMasters } from '../models/VisioMasters.mjs';


/**
 * @this {VisioArchive}
 * @param [topRelationsMap]
 * @param [documentRelationsMap]
 * @param getJxonAsync
 * @returns {Promise<Document>}
 */
export async function documentFactory({
    topRelationsMap = this.topRelationsMap,
    documentRelationsMap = this.documentRelationsMap,
    getJxonAsync = (...args) => this.getJxonAsync(...args),
} = {}) {
    const documentJxon = await getJxonAsync(
        getSingleRecordPath(topRelationsMap, VisioRelationType.document)
    );
    expectedSchema(documentJxon, XmlSchemaKey.Main);

    const structurePath = [
        getStructurePathFragment(
            VisioJxonType.Document,
            documentJxon,
            []
        )
    ];

    //     ,--.                                                ,--.
    //   ,-|  | ,---.  ,---.,--.,--.,--,--,--. ,---. ,--,--, ,-'  '-.
    //  ' .-. || .-. || .--'|  ||  ||        || .-. :|      \'-.  .-'
    //  \ `-' |' '-' '\ `--.'  ''  '|  |  |  |\   --.|  ||  |  |  |
    //   `---'  `---'  `---' `----' `--`--`--' `----'`--''--'  `--'
    this.document = new VisioDocument({ archive: this });

    // colors separately - needed as dependency when parseJxon(styleSheets)
    const colorsJxon = documentJxon[VisioJxonDocumentKey.Colors];
    if (colorsJxon)
        this.document.setAttributes(
            {
                colors: parseColors(colorsJxon, structurePath)
            },
            new Set([
                VisioAttribute.colors
            ])
        );

    const initNonColors = await parseJxon.call(
        this,
        documentJxon,
        VisioJxonType.Document,
        []
    );

    // delete initNonColors.colors;
    this.document.setAttributes(initNonColors);

    this.document.pageSheet = {
        debug: 'dummyPageSheet',
        cells: this.document.styleSheets.get(0).cells,
    }

    // TODO parse windows
    // const windows = await this.getJxonAsync(
    //     getSingleRecordPath(documentRelationsMap, VisioRelationType.Windows)
    // );


    //   ,---.  ,--,--. ,---.  ,---.  ,---.
    //  | .-. |' ,-.  || .-. || .-. :(  .-'
    //  | '-' '\ '-'  |' '-' '\   --..-'  `)
    //  |  |-'  `--`--'.`-  /  `----'`----'
    //  `--'           `---'
    const pagesXmlPath = getSingleRecordPath(documentRelationsMap, VisioRelationType.Pages);

    this.document.pages = new VisioPages({
        archive: this,
        xmlPath: pagesXmlPath,
    });

    // pages must have _rels by design
    // prepare immediately
    await this.document.pages.getRelsMapCachedAsync();

    const pagesJxon = await getJxonAsync(pagesXmlPath);
    const pagesJxonsArray = toArray(pagesJxon.Page);

    for (const pageJxon of pagesJxonsArray) {
        const page = await pageFactoryFromJxonAsync.call(
            this,
            pageJxon,
            this.document.pages
        );
        this.document.pages.add(page);
    }

    //                            ,--.
    //  ,--,--,--. ,--,--. ,---.,-'  '-. ,---. ,--.--. ,---.
    //  |        |' ,-.  |(  .-''-.  .-'| .-. :|  .--'(  .-'
    //  |  |  |  |\ '-'  |.-'  `) |  |  \   --.|  |   .-'  `)
    //  `--`--`--' `--`--'`----'  `--'   `----'`--'   `----'
    // masters.xml
    // (master{n}.xml parsed when reading exact page)
    const mastersXmlPath = getSingleRecordPath(documentRelationsMap, VisioRelationType.Masters);

    if (mastersXmlPath) {

        const masters =
            this.document.masters =
                new VisioMasters({
                    archive: this,
                    xmlPath: mastersXmlPath,
                });

        // masters.xml has rels by design
        await this.document.masters.getRelsMapCachedAsync();

        const mastersJxon = await getJxonAsync(mastersXmlPath);
        const mastersJxonsArray = toArray(mastersJxon.Master);

        for (const masterJxon of mastersJxonsArray) {
            const master = await parseJxon.call(
                this,
                masterJxon,
                VisioJxonType.Master,
                // empty structure path (master is not real part of document)
                []
            );

            masters.add(master);
        }
    }

    return this.document;
}
