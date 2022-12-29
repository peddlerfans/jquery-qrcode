// import { VisioAttribute } from '../types/enums.mjs';
// import { util } from 'jointjs';
// import {
//     LineVisioCellAttributeName,
//     TextVisioCellAttributeName,
//     FillVisioCellAttributeName
// } from '../types/enums.mjs';
// import { firstLetterLowercase } from '../helpers/firstLetterLowercase.mjs';


// const styleAttributes = {
//     [VisioAttribute.fillStyle]: Object.values(FillVisioCellAttributeName).map(firstLetterLowercase),
//     [VisioAttribute.lineStyle]: Object.values(LineVisioCellAttributeName).map(firstLetterLowercase),
//     [VisioAttribute.textStyle]: Object.values(TextVisioCellAttributeName).map(firstLetterLowercase)
// };

// export function enrichShapeWithStyleSheet(shapes, styleSheets) {
//     if (!styleSheets) return shapes;
//     util.toArray(shapes).forEach(shape => {
//         if (!shape) return;
//         Object.keys(styleAttributes).forEach((style) => {
//             const attributes = styleAttributes[style];
//             if (style in shape) {
//                 attributes.forEach(attribute => {
//                     const { cells } = shape;
//                     // ? should we create cells if they don't exists
//                     if (!cells || attribute in cells) return;
//                     const val = getAttributeValueFromStylesheet(
//                         styleSheets,
//                         shape[style],
//                         style,
//                         attribute
//                     );
//                     if (val !== null) {
//                         cells[attribute] = val;
//                     }
//                 });
//             }
//         });
//         if (VisioAttribute.shapes in shape) {
//             enrichShapeWithStyleSheet(shape[VisioAttribute.shapes], styleSheets);
//         }
//     });
//
//     return shapes;
// }

/**
 *
 * @param {Map.<number,VisioStylesheet>} styleSheets
 * @param {number} index
 * @param {
 *         VisioAttribute.fillStyle|
 *         VisioAttribute.lineStyle|
 *         VisioAttribute.textStyle
 *      } type
 * @param {VisioCellName} attributeName
 * @returns {VisioCell|null}
 */
export function getAttributeValueFromStylesheet(
    styleSheets,
    index,
    type,
    attributeName
) {
    const styleSheet = styleSheets.get(index);

    if (!styleSheet) return null;

    const { cells } = styleSheet;

    if (cells.has(attributeName))
        return cells.get(attributeName);

    else if (type in styleSheet)
        return getAttributeValueFromStylesheet(
            styleSheets, styleSheet[type], type, attributeName);

    return null;
}
