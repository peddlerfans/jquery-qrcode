import { VisioPage } from '../models/VisioPage.mjs';
import { parseJxon } from './parseJxon.mjs';
import { VisioJxonType } from '../types/enums.mjs';
import { getStructurePathFragment } from './structurePath.mjs';


// Corresponding XML files.
// const references = jxonMap['visio/pages/_rels/pages.xml.rels'];
// const pagesJXON = jxonMap['visio/pages/pages.xml'];
// const pageJXON = jxonMap['visio/pages/page1.xml'];

export async function pageFactoryFromJxonAsync(
    pageJxon,
    pages,
    structurePathBase = []
) {
    const jxonType = VisioJxonType.Page;
    const structurePath = structurePathBase.concat(getStructurePathFragment(jxonType, pageJxon, structurePathBase));

    let parsedPageJxon = await parseJxon.call(
        this,
        pageJxon,
        jxonType,
        structurePath,
    );

    const rels = pages.rels.get(VisioJxonType.Page);
    const relId = parsedPageJxon._rel;

    // if (rels && rels.has(relId))
    const pageAbsolutePath = rels.get(relId).targetFile.absolutePath;

    const page = new VisioPage({
        archive: this,
        pages,
        xmlPath: pageAbsolutePath,
        ...parsedPageJxon
    });

    return page;
}
