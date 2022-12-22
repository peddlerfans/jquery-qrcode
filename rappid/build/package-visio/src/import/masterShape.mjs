/**
 *
 * @param {Map} masterShapesMap
 * @param {Map|Array} masterShapes - both has same API forEach
 */
export function fillMasterShapesMapRecursively(masterShapesMap, masterShapes) {

    masterShapes.forEach(
        masterShape => {
            // reference back
            if (masterShape.cells)
                masterShape.cells.masterShape = masterShape;

            masterShapesMap.set(
                masterShape.id,
                masterShape);

            // recursion
            const subShapes = masterShape.shapes;
            if (subShapes) fillMasterShapesMapRecursively(masterShapesMap, subShapes);
        }
    )


}


// /**
//  * @this {Visio}
//  * @param mastersMap
//  * @param mastersPaths
//  * @param jxonMap
//  * @returns {{}}
//  */
// export function getMasterShapesMap(mastersMap, mastersPaths, jxonMap) {
//
//     return Object.entries(mastersMap).reduce(
//         (masterShapesMap, [masterId, master]) => {
//             const relatedMasterJxon = getJxonById(
//                 master[VisioAttribute._rel], mastersPaths, jxonMap);
//             const relatedMasterShapesJXON = relatedMasterJxon.Shapes.Shape;
//
//             const relatedMasterShapesArray = parseShapes.call(this, relatedMasterShapesJXON);
//
//             relatedMasterShapesArray.forEach(masterShape => {
//                 masterShape.referencedByMaster = master;
//                 master.relMasterShape = masterShape;
//
//                 // first level
//                 masterShapesMap[masterShape.id] = masterShape;
//
//                 // children separately
//                 if (masterShape.hasOwnProperty(VisioAttribute.shapes)) {
//                     const subShapes = masterShape[VisioAttribute.shapes];
//
//                     subShapes
//                         .forEach(subShape => {
//                             if (!subShape) return;
//                             subShape.referencedByMasterShape = masterShape;
//                             masterShapesMap.set(subShape.id, subShape);
//                         })
//                 }
//             });
//
//             return masterShapesMap;
//         },
//         new Map()
//     );
// }

// function getJxonById(relationIdNumber, mastersPaths, jxonMap) {
//     assertIsInteger(relationIdNumber);
//
//     const relatedMasterJxonFilePath = mastersPaths
//         .Master[relationIdNumber].targetFile.absolutePath;
//
//     return jxonMap[relatedMasterJxonFilePath];
// }
