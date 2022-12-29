import { VisioSectionType } from '../types/enums.mjs';
import { debug } from './debug.mjs';
/**
 */
export function getTextContent(text, sections) {

    if (!text || !text.structure)
        return undefined;

    const parts = text.structure;

    const contentArray = parts.reduce((contentArray, part) => {
        const properties = {};

        [
            {
                parsedIndexName: 'characterPropertiesIndex',
                sectionType: VisioSectionType.Character,
                propertyName: 'characterProperties'
            },
            {
                parsedIndexName: 'paragraphPropertiesIndex',
                sectionType: VisioSectionType.Paragraph,
                propertyName: 'paragraphProperties'
            },
            {
                parsedIndexName: 'tabsPropertiesIndex',
                sectionType: VisioSectionType.Tabs,
                propertyName: 'tabsProperties'
            },
        ].forEach(
            ({ parsedIndexName, sectionType, propertyName }) => {
                const rowIndex = part[parsedIndexName];
                if (rowIndex === undefined) return;

                const propertiesCells = getPropertiesCells(
                    rowIndex,
                    sections.get(sectionType)[0]);

                if (propertiesCells !== undefined)
                    properties[propertyName] = {
                        cells: propertiesCells,
                        values: propertiesCells.directValues // no overriding so "direct"
                    };
            }
        )

        const content = part.content;
        const contentParts = content.map(contentPart => {
            if (typeof contentPart === 'string')
                return contentPart;

            const fieldIndex = contentPart.fieldIndex;
            const field = sections.get(VisioSectionType.Field)[0]

            const fieldCells = field.rows[fieldIndex].cells;

            if (fieldCells === undefined) {
                debug.log('fieldCells undefined');
            }

            return fieldCells.value;
        })

        contentParts
            .filter(contentPart => contentPart !== '')
            .forEach(contentPart => {
                contentArray.push({
                    content: contentPart,
                    ...properties
                })
            })

        return contentArray;
    }, []);

    if (contentArray.some(item => item.content === undefined)) {
        debug.log('contentArray some undefined');
    }

    return contentArray;
}


function getPropertiesCells(rowIndex, section) {
    const row = section.rows[rowIndex];

    // if (!row){
    //     console.warn('no row found', {rowIndex, section})
    //     return;
    // }

    return row.cells;
}
