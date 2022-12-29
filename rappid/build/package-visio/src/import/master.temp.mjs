
// /**
//  * @param {Array.<VisioMasterJXON>} mastersJXONArray
//  * @returns {{string: VisioMaster}}
//  */
// export function _getMastersMapByKey(mastersJXONArray) {
//
//     return /** @type {{string: VisioMaster}} */mastersJXONArray.reduce(
//         (mastersMapByKey, masterJXON) => {
//             const parsedMaster = getParsedMaster(masterJXON);
//             mastersMapByKey[parsedMaster.id] = parsedMaster;
//             return mastersMapByKey
//         },
//         {}
//     );
//
// }


// /**
//  * @param {VisioMasterJXON} masterJXON
//  * @returns {VisioMaster}
//  */
// function _getParsedMaster(masterJXON) {
//     assertIsMaster(masterJXON);

//     const master = getRootAttributes(masterJXON, VisioJxonType.Master);


//     // Rel: A Rel_Type element that specifies a relationship to the corresponding
//     // Master XML Part.
//     // @see {http://localhost/MS-VSDX.pdf#page=118}
//     master.relationshipToTheCorrespondingMasterXMLPart =
//         relationshipToNumber(masterJXON
//             [VisioJxonMasterKey.Rel]
//             [VisioJxonRelKey.RelId]
//         );

//     // optional by docs
//     const pageSheetJxon = masterJXON[VisioJxonMasterKey.PageSheet]
//     if (pageSheetJxon) master.pageSheet =
//         getParsedPageSheet(pageSheetJxon, VisioJxonType.Master);

//     // optional by docs
//     const iconJxon = masterJXON[VisioJxonMasterKey.Icon];
//     if (iconJxon) master.pageSheet =
//         getParsedIcon(iconJxon, VisioJxonType.Master);

//     return master;
// }
