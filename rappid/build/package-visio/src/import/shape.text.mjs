import { VisioJxonType } from '../types/enums.mjs';
import { getRootAttributes } from './parseJxon.utils.mjs';
import { debug } from '../helpers/debug.mjs';
import { asNumber } from '../helpers/convert.mjs';

/**
 * @param {VisioShapeTextJXON} textJxon
 * @param {VisioStructurePath} structurePath
 * @returns {VisioShapeText}
 */
export function getParsedText(textJxon, structurePath) {
    // assertIsShapeTextJxon(textJxon);

    const text = getRootAttributes(
        textJxon, VisioJxonType.ShapeText, structurePath);

    const { orderedNodes = [] } = textJxon;

    // full structure (format, dynamic parts)
    const structure = [];

    let characterPropertiesIndex = null;
    let paragraphPropertiesIndex = null;
    let tabsPropertiesIndex = null;

    let structureNode = newNode(structure, {
        characterPropertiesIndex,
        paragraphPropertiesIndex,
        tabsPropertiesIndex
    });

    for (const node of orderedNodes) {

        // static string content
        if (typeof node === 'string') {
            pushContent(structureNode, node)
            continue;
        }

        const tagName = /** @type {'cp'|'pp'|'tp'} */node._tagName;
        const index = asNumber(node['@IX']);

        // Properties
        if (['cp', 'pp', 'tp'].includes(tagName)) {
            // new content part
            if (hasContent(structureNode))
                structureNode = newNode(structure, {
                    characterPropertiesIndex,
                    paragraphPropertiesIndex,
                    tabsPropertiesIndex
                });

            if (tagName === 'cp') {
                characterPropertiesIndex = index;
                structureNode.characterPropertiesIndex = index;
            }
            if (tagName === 'pp') {
                paragraphPropertiesIndex = index;
                structureNode.paragraphPropertiesIndex = index;
            }
            if (tagName === 'tp') {
                tabsPropertiesIndex = index;
                structureNode.tabsPropertiesIndex = index;
            }

        } else if (tagName === 'fld') {
            pushContent(structureNode, {
                fieldIndex: index,
                defaultValue: node.keyValue
            })
        } else
            debug.log('Unknown text tag.', { tagName, textJxon })

    }


    // remove last if empty
    const lastStructureItem = structure[structure.length - 1];
    if (lastStructureItem.content === undefined)
        structure.pop();

    text.structure = structure;

    return text;
}


function pushContent(structureNode, content) {
    if (!hasContent(structureNode))
        structureNode.content = [];

    structureNode.content.push(content);
}

function hasContent(structureNode) {
    return Array.isArray(structureNode.content);
}

function newNode(structure, {
    characterPropertiesIndex,
    paragraphPropertiesIndex,
    tabsPropertiesIndex
}) {
    const node = {};

    if (characterPropertiesIndex !== null)
        node.characterPropertiesIndex = characterPropertiesIndex;
    if (paragraphPropertiesIndex !== null)
        node.paragraphPropertiesIndex = paragraphPropertiesIndex;
    if (tabsPropertiesIndex !== null)
        node.tabsPropertiesIndex = tabsPropertiesIndex;

    structure.push(node);

    return node;
}
