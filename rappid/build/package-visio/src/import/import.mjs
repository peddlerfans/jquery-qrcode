import {
    XmlSchemaKey,
} from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';
import { expectedSchema } from './assert/xmlSchema.mjs';

// /**
//  * @this {Visio}
//  * @param {{string: JXONTree}} JXONMap
//  * @returns {{width: *, height: *}}
//  */
// export function getPaperOpt(JXONMap) {
//     const pagesJXON = JXONMap['visio/pages/pages.xml'];
//     expectedSchema(pagesJXON, XmlSchemaKey.Main);
//
//     const pages = pagesJXON.Page;
//
//     //TODO miky work with more than first page
//     const page = Array.isArray(pages) ? pages[0] : pages;
//
//     assertIsPageJxon(page);
//
//     const pageSheets = page[VisioJxonPageKey.PageSheet];
//     const pageSheetsCells = pageSheets.Cell;
//
//     //TODO miky gather from visio structure
//
//     const parsedCells =
//         parseCellsAttributes.call(
//             this,
//             pageSheetsCells,
//             [getStructurePathFragment(VisioJxonType.PageSheet, pages, [])]);
//
//     return {
//         width: parsedCells.pageWidth,
//         height: parsedCells.pageHeight,
//     }
// }

/**
 * @param {VisioJXONMap} jxonMap
 * @param {number} [pageNumber]
 * @returns {VisioJxonType | string | VisioShapeType}
 */
export function getShapesJXON(jxonMap, pageNumber = 1) {
    //TODO miky use page rels
    const pageFileName = `visio/pages/page${pageNumber}.xml`;

    const page = jxonMap[pageFileName];
    expectedSchema(page, XmlSchemaKey.Main);

    return page.Shapes.Shape;
}

export function getConnectsJXON(JXONMap) {
    const page1 = JXONMap['visio/pages/page1.xml'];
    expectedSchema(page1, XmlSchemaKey.Main);

    if (!page1.Connects) {
        debug.log('import - no Connects found', { page1Jxon: page1 });
        return null;
    }

    return page1.Connects.Connect;
}


// function getGradient(type, fill, gradArray) {
//     var res = null;
//     gradArray.forEach(function(grad) {
//         if (grad.shapes.indexOf(type) !== -1) {
//             res = grad.fill;
//         }
//     });
//     return res || fill;
// }

// function getDefaultStyles(shape) {
//     var fill = null;
//     if (result.theme) {
//         var themeName = result.theme.name;
//         if (shape.opt.type !== 'Connector' && shape.opt.type !== 'Image' && shape.orType &&
//             (shape.cell.fill && !shape.cell.fill.type && shape.cell.fillFunc === 'Inh')) {
//             if (getAttribute(themes, 'name', themeName)[0]) {
//                 if (shape.cell.quickStyleFillColor && shape.cell.quickStyleLineMatrix) {
//                     getAttribute(themes, 'name', themeName)[0].styles.shapes.forEach(function(style) {
//                         if (style.line === shape.cell.quickStyleLineMatrix && style.col === shape.cell.quickStyleFillColor) {
//                             fill = style.fill;
//                         }
//                     });
//                 } else {
//                     var gradients = getAttribute(themes, 'name', themeName)[0].def.gradients;
//                     fill = getGradient(shape.orType, shape.cell.fill, gradients);
//                 }
//             }
//         }
//     }
//     return fill;
// }

// function getGeometry(filePath, item) {
//     var res = [];
//     if (filePath) {
//         result.masterContents.forEach(function(master) {
//             if (master.filePath === filePath) {
//                 var sections = getAttribute(master.elements.elements, 'name', 'Section') || [];
//                 sections.forEach(function(s) {
//                     if (s.attributes.N && s.attributes.N === 'Geometry') {
//                         res.push({ attributes: s.attributes, elements: s.elements });
//                     }
//                 });
//             }
//         });
//     } else {
//         var sections = getAttribute(item, 'name', 'Section') || [];
//         sections.forEach(function(s) {
//             if (s.attributes.N && s.attributes.N === 'Geometry') {
//                 res.push({ attributes: s.attributes, elements: s.elements });
//             }
//         });
//     }
//     return res;
// }

/*function getScratch(filePath) {
    var res = [];
    result.masterContents.forEach(function(master) {
        if (master.filePath === filePath) {
            var sections = getAttribute(master.elements.elements, 'name', 'Section') || [];
            sections.forEach(function(s) {
                if (s.attributes.N && s.attributes.N === 'Connection') {
                    res.push({ attributes: s.attributes, elements: s.elements });
                }
            });
        }
    });
    return res;
}*/

/*function getMasterContent(filePath) {
    var res = [];
    result.masterContents.forEach(function(master) {
        if (master.filePath === filePath) {
            res = master.elements.elements;
        }
    });
    return res;
}*/


// function getStyleForAnnotation(cells) {
//     var res = {};
//     cells.forEach(function(cell) {
//         switch (cell.attributes.N) {
//             case 'Font':
//                 res['font-family'] = cell.attributes.V;
//                 break;
//             case 'Color':
//                 res.fill = cell.attributes.V;
//                 break;
//             case 'Style':
//                 res.style = getAnnotationStyle(cell.attributes.V);
//                 break;
//             case 'Size':
//                 res['font-size'] = +cell.attributes.V * 100;
//                 break;
//             default:
//                 break;
//         }
//     });
//     return res;
// }


// find val by attribute


/**
 * Example record:
 *  {
 *       "@N": "PageWidth",
 *       "@V": "8.5",
 *       "@U": "IN"
 *   }
 *
 *
 * @param {Array.<JXONTree>} arrayJxonTree
 * @param {string} searchVal
 *
 * @param {string} [searchAttributeKey]
 * @param {string} [returnAttributeKey]
 * @param {VisioAttributeType} [type]
 * @param {*} defaultValue
 * @returns {string|number|boolean}
 */
// function getAttribute(
//     {
//         arrayJxonTree,
//         searchVal,

//         searchAttributeKey = VisioJxonCellKey.Name,
//         returnAttributeKey = VisioJxonCellKey.Value,
//         type = VisioAttributeType.string,
//         defaultValue = '',
//     } = {}) {
//     const record = arrayJxonTree
//         .filter(jxonTree => jxonTree[searchAttributeKey] === searchVal);

//     // shouldn't happen
//     if (record.length > 1) throw 'too many matches';
//     // no match
//     if (record.length === 0) return defaultValue;


//     // exact match
//     let value = record[0][returnAttributeKey];

//     // type conversions
//     if (type === VisioAttributeType.string) value = String(value);
//     if (type === VisioAttributeType.number) value = Number(value);
//     if (type === VisioAttributeType.boolean) value = value === '1';

//     return value;
// }

// // getting a text position
// function getTextPosition(val, breakText) {
//     var res = {
//         text: breakText,
//         textVerticalAnchor: 'bottom',
//         textAnchor: 'end',
//         refX: '99%',
//         refY: '99%'
//     };
//     switch ((val.toString())) {
//         case '0,0':
//             res.textVerticalAnchor = 'top';
//             res.textAnchor = 'start';
//             res.refX = '5';
//             res.refY = '5';
//             break;
//         case '1,0':
//             res.textVerticalAnchor = 'top';
//             res.textAnchor = 'middle';
//             res.refX = '50%';
//             res.refY = '5';
//             break;
//         case '2,0':
//             res.textVerticalAnchor = 'top';
//             res.textAnchor = 'end';
//             res.refX = '99%';
//             res.refY = '5';
//             break;
//         case '0,1':
//             res.textVerticalAnchor = 'middle';
//             res.textAnchor = 'start';
//             res.refX = '5';
//             res.refY = '50%';
//             break;
//         case '1,1':
//             res.textVerticalAnchor = 'middle';
//             res.textAnchor = 'middle';
//             res.refX = '50%';
//             res.refY = '50%';
//             break;
//         case '2,1':
//             res.textVerticalAnchor = 'middle';
//             res.textAnchor = 'end';
//             res.refX = '99%';
//             res.refY = '50%';
//             break;
//         case '0,2':
//             res.textVerticalAnchor = 'bottom';
//             res.textAnchor = 'start';
//             res.refX = '5';
//             res.refY = '99%';
//             break;
//         case '1,2':
//             res.textVerticalAnchor = 'bottom';
//             res.textAnchor = 'middle';
//             res.refX = '50%';
//             res.refY = '99%';
//             break;
//         case '2,2':
//             res.textVerticalAnchor = 'bottom';
//             res.textAnchor = 'end';
//             res.refX = '99%';
//             res.refY = '99%';
//             break;
//         default:
//             res.textVerticalAnchor = 'middle';
//             res.textAnchor = 'middle';
//             res.refX = '50%';
//             res.refY = '50%';
//     }
//     return res;
// }

// // getting breakText width
// function getBreakTextWidth(w) {
//     var width = w ? w : 100;
//     var res;
//     if (width > 600) {
//         res = width - width / 1.32;
//     } else if (width > 300 && width < 600) {
//         res = width - width / 2;
//     } else if (width > 180 && width < 300) {
//         res = width - width / 3;
//     } else if (width < 180) {
//         res = width;
//     }
//     return res;
// }

// // getting fontStyle
// function getFontStyle(val, label) {
//     switch (val) {
//         case '17':
//             label.fontWeight = 'bold';
//             break;
//         case '4':
//             label.textDecoration = 'underline';
//             break;
//         case '34':
//             label.fontStyle = 'italic';
//             break;
//         case '51':
//             label.fontWeight = 'bold';
//             label.fontStyle = 'italic';
//             break;
//         case '21':
//             label.fontWeight = 'bold';
//             label.textDecoration = 'underline';
//             break;
//         case '38':
//             label.fontStyle = 'italic';
//             label.textDecoration = 'underline';
//             break;
//         case '55':
//             label.fontWeight = 'bold';
//             label.fontStyle = 'italic';
//             label.textDecoration = 'underline';
//             break;
//         default:
//             label.fontWeight = 'normal';
//     }
//     return label;
// }

// function getAnnotationStyle(val) {
//     var res = '';
//     switch (val) {
//         case '17':
//             res = 'font-weight: bold';
//             break;
//         case '4':
//             res = 'text-decoration: underline';
//             break;
//         case '34':
//             res = 'font-style: italic';
//             break;
//         case '51':
//             res = 'font-weight: bold; font-style: italic';
//             break;
//         case '21':
//             res = 'font-weight: bold; text-decoration: underline';
//             break;
//         case '38':
//             res = 'font-style: italic; text-decoration: underline';
//             break;
//         case '55':
//             res = 'font-weight: bold; font-style: italic; text-decoration: underline';
//             break;
//         default:
//             res = '';
//     }
//     return res;
// }

