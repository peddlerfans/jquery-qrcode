// XML to JSON converter. The resulting JSON resembles the JXON format
// as described here: https://developer.mozilla.org/en-US/docs/JXON.
// However, this version works with prefixed tags (namespaced tags), preserves
// casing of attributes and tag names and does not do smart type conversion.

const CASE_SENSITIVE_NAMESPACES = {
    'http://schemas.iaresearch.com/JCVGantt': true
};

/** @enum {number} NodeType */
const NodeType = {
    ElementNode: 1,                // An Element node like <p> or <div>.
    TextNode: 3,                   // The actual Text inside an Element or Attr.
    CdataSectionNode: 4,          // A CDATASection, such as <!CDATA[[ … ]]>.
    ProcessingInstructionNode: 7, // A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>.
    CommentNode: 8,                // A Comment node, such as <!-- … -->.
    DocumentNode: 9,               // A Document node.
    DocumentTypeNode: 10,         // A DocumentType node, such as <!DOCTYPE html>.
    DocumentFragmentNode: 11,     // A DocumentFragment node.
};

function parseText(sValue, attribute) {

    const attributeName = attribute && attribute.name;
    const isCaseSensitive = CASE_SENSITIVE_NAMESPACES[attribute && attribute.namespaceURI];

    if (/^(?:true|false)$/i.test(sValue) && attributeName !== 'PlainText' && !isCaseSensitive) {
        return sValue.toLowerCase() === 'true';
    }
    return sValue;
}

function isHtmlElement(node) {
    return typeof HTMLHtmlElement !== 'undefined' /* unit tests */ &&
        node.constructor === HTMLHtmlElement
}

/**
 * @param {Node} node
 * @return {Array | *}
 */
function getAttributes(node) {
    //TODO miky deprecated
    // @see {https://developer.mozilla.org/en-US/docs/Web/API/Node#Obsolete_methods}

    if (node.hasAttributes && node.hasAttributes())
        return node.attributes;

    return [];
}

function isSimpleValueNode(node) {
    return node.nodeType === NodeType.TextNode ||
        node.nodeType === NodeType.CdataSectionNode;
}



/**
 * @constructor
 * @param {Node} parentNode
 * @param {Array.<string>} keepStructureNodeNames
 */
function JXONKeepStructureTree(parentNode, keepStructureNodeNames = []) {

    if (parentNode.hasChildNodes()) {
        this.orderedNodes = Array.from(parentNode.childNodes)
        // filter ignored nodes (eg. comments)
            .filter(node =>
                ([
                    NodeType.TextNode,
                    NodeType.CdataSectionNode,
                    NodeType.ElementNode,
                ].includes(node.nodeType))
            )
            .map(node => {
                if (isSimpleValueNode(node)) return node.nodeValue;
                {
                    // keep as is
                    if (isHtmlElement(node))
                        return node;

                    // keep structure JXONKeepStructureTree
                    if (keepStructureNodeNames.includes(node.nodeName))
                    // recursion
                        return new JXONKeepStructureTree(node);

                    // standard JXONTree
                    const JXON = new JXONTree(node);
                    JXON._tagName = node.tagName;

                    return JXON;
                }
            })
    }

    getAttributes(parentNode)
        .forEach(attribute =>
            this['@' + attribute.name] = parseText(attribute.value, attribute)
        );
}

/**
 *
 * @param {Node} oXMLParent
 * @param {Array.<string>} [keepStructureNodeNames]
 * @constructor
 */
export function JXONTree(oXMLParent, keepStructureNodeNames = []) {
    if (keepStructureNodeNames.includes(oXMLParent.nodeName)) {
        this[oXMLParent.nodeName] = new JXONKeepStructureTree(oXMLParent, keepStructureNodeNames);
    } else if (oXMLParent.hasChildNodes()) {
        var sCollectedTxt = '';
        for (var oNode, sProp, vContent, nItem = 0;
            nItem < oXMLParent.childNodes.length; nItem++) {
            oNode = oXMLParent.childNodes.item(nItem);
            if (oNode.nodeType === NodeType.TextNode)
                sCollectedTxt += oNode.nodeValue.trim();
            else if (oNode.nodeType === NodeType.CdataSectionNode)
                sCollectedTxt += oNode.nodeValue;
            else if (oNode.nodeType === NodeType.ElementNode) {
                sProp = oNode.nodeName;
                if (keepStructureNodeNames.includes(sProp)) {
                    // parse the node into array to keep structure
                    this[sProp] = new JXONKeepStructureTree(oNode, keepStructureNodeNames);
                } else if (typeof HTMLHtmlElement !== 'undefined' /* unit tests */ &&
                    oNode.constructor === HTMLHtmlElement) {
                    // use node as is = stop parsing to JXONTree
                    this[sProp] = oNode;
                } else {
                    vContent = new JXONTree(oNode, keepStructureNodeNames);
                    if (this.hasOwnProperty(sProp)) {
                        if (this[sProp].constructor !== Array) {
                            this[sProp] = [this[sProp]];
                        }
                        this[sProp].push(vContent);
                    } else {
                        this[sProp] = vContent;
                    }
                }
            }
        }
        if (sCollectedTxt) {
            this.keyValue = parseText(sCollectedTxt);
        }
    }
    if (oXMLParent.hasAttributes && oXMLParent.hasAttributes()) {
        var oAttrib;
        for (var nAttrib = 0; nAttrib < oXMLParent.attributes.length; nAttrib++) {
            oAttrib = oXMLParent.attributes.item(nAttrib);
            this['@' + oAttrib.name] = parseText(oAttrib.value, oAttrib);
        }
    }
}

// const coreSchema = {
//     //TODO visio one
// };

// const applicationSchema = {
//     //TODO visio one
// };

// function sortBySchemaSequence(container, siblings, schema) {
//     var sequence = schema[container.tagName];

//     return _.sortBy(siblings, (sibling) => {
//         // attribute - negative - must be resolved as soon as possible
//         // xmlns definition before its usage
//         if (sibling.substring(0, 7) === '@xmlns:') return -2;
//         if (sibling[0] === '@') return -1;

//         // child
//         if (!sequence) return 0;
//         const index = sequence.indexOf(sibling);
//         // unknown child on the end
//         if (index === -1) return sequence.length + 1;
//         // known child by forced sequence
//         return index;
//     });
// }

function setAttribute(
    {
        oParentEl,
        knownNameSpaces,
        slicedSName,
        vValue
    }) {

    // non IE solution
    // if (!mm.browser.isIE) {
    //     oParentEl.setAttribute(slicedSName, vValue);
    //     return;
    // }

    const sNameParts = slicedSName.split(':');

    // basic attribute - no special logic
    if (sNameParts.length < 2) {
        oParentEl.setAttribute(slicedSName, vValue);
        return;
    }
    // "else" attribute in format x:y

    // attribute with url value
    //  - do not use immediately
    //  - save between namespaces
    if (String(vValue).match(/^http/)) {
        saveToNameSpaces({
            knownNameSpaces,
            qualifiedName: slicedSName,
            namespaceURI: vValue
        });
    }


    // apply known napespaces
    const namespacePrefix = sNameParts[0];

    // search in xmlns space
    const prefixCandidates = Object.keys(knownNameSpaces)
    // first part is 'xmlns'
        .filter(key => key.split(':')[0] === 'xmlns')
        // use second part
        .map(key => key.split(':')[1]); // checked earlier

    if (namespacePrefix === 'xmlns') {
        oParentEl.setAttributeNS('http://www.w3.org/2000/xmlns/', slicedSName, vValue);
    } else if (prefixCandidates.includes(namespacePrefix)) {
        const namespaceURI = knownNameSpaces['xmlns:' + namespacePrefix];
        const qualifiedName = slicedSName;
        const value = vValue;
        oParentEl.setAttributeNS(namespaceURI, qualifiedName, value);
    } else if (slicedSName === 'r:id') {
        // todo: this is bad, figure out a way to handle these after a POC stage
        // special visio attribute
        oParentEl.setAttribute(slicedSName, vValue);
    } else {
        // mm.Logger.error(`Unknown namespace: "${slicedSName}"`);
    }
}

function createElementNS(
    {
        knownNameSpaces, element,
        qualifiedName, namespaceURI
    }) {
    // IE solution
    // if (mm.browser.isIE)
    saveToNameSpaces({ knownNameSpaces, qualifiedName, namespaceURI });

    return element.createElementNS(namespaceURI, qualifiedName);
}

/**
 * @param {Object.<qualifiedName, namespaceURI>} knownNameSpaces
 * @param {'xmlns:cor'|string} qualifiedName
 * @param {'http://schemas.mindjet.com/MindManager/Core/2003'|string} namespaceURI
 */
function saveToNameSpaces({ knownNameSpaces, qualifiedName, namespaceURI }) {
    knownNameSpaces[qualifiedName] = namespaceURI;
}

/**
 * Validate and remove parts which shouldn't be exported
 * @param {JXON} oObjTree
 * @return {JXON}
 */
function validate(oObjTree) {
    return oObjTree;
}

export function jxon2Xml(oObjTree, oNewDoc, ns) {
    oObjTree = validate(oObjTree);

    // default (by spec) XML namespaces
    // todo: add r namespace, figure out others
    const knownNameSpaces = {
        'xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
    };

    function loadObjTree(oParentEl, oParentObj) {
        var vValue, oChild;
        if (oParentObj.constructor === String || oParentObj.constructor === Number || oParentObj.constructor === Boolean) {
            oParentEl.appendChild(oNewDoc.createTextNode(oParentObj.toString())); /* verbosity level is 0 or 1 */
            if (oParentObj === oParentObj.valueOf()) {
                return;
            }
        } else if (oParentObj.constructor === Date) {
            oParentEl.appendChild(oNewDoc.createTextNode(oParentObj.toGMTString()));
        }
        // var oParentObjKeys = sortBySchemaSequence(oParentEl, Object.keys(oParentObj), applicationSchema);
        var oParentObjKeys = Object.keys(oParentObj);
        if (oParentObjKeys.indexOf('@N') > 0) {
            oParentObjKeys.splice(oParentObjKeys.indexOf('@N'),1);
            oParentObjKeys.unshift('@N');
        }
        for (var i = 0, n = oParentObjKeys.length; i < n; i++) {
            var sName = oParentObjKeys[i];
            if (isFinite(sName)) {
                continue;
            } /* verbosity level is 0 */
            vValue = oParentObj[sName];
            if (sName === 'keyValue') {
                if (vValue !== null && vValue !== true) {
                    oParentEl.appendChild(oNewDoc.createTextNode(vValue.constructor === Date ? vValue.toGMTString() : String(vValue)));
                }
            } else if (sName === 'keyAttributes') { /* verbosity level is 3 */
                for (var sAttrib in vValue) {
                    oParentEl.setAttribute(sAttrib, vValue[sAttrib]);
                }
            } else if (sName.charAt(0) === '@') {
                // prevent namespace declaration duplicates
                if (oParentEl.namespaceURI !== vValue) {
                    setAttribute({
                        oParentEl,
                        knownNameSpaces,
                        slicedSName: sName.slice(1), // without '@'
                        vValue
                    });
                }
            } else if (vValue.constructor === HTMLHtmlElement) {
                oParentEl.appendChild(vValue);
            } else if (vValue.constructor === Array) {
                for (let nItem = 0; nItem < vValue.length; nItem++) {
                    let namespaceURI = ns[sName.split(':')[0]];
                    if (!namespaceURI) {
                        namespaceURI = oParentEl.namespaceURI;
                    }

                    oChild = createElementNS({
                        knownNameSpaces,
                        element: oNewDoc,
                        namespaceURI,
                        qualifiedName: sName
                    });

                    loadObjTree(oChild, vValue[nItem]);
                    oParentEl.appendChild(oChild);
                }
            } else {
                let namespaceURI = ns[sName.split(':')[0]];
                if (!namespaceURI) {
                    namespaceURI = oParentEl.namespaceURI;
                }

                oChild = createElementNS({
                    knownNameSpaces,
                    element: oNewDoc,
                    namespaceURI,
                    qualifiedName: sName
                });
                if (vValue instanceof Object) {
                    loadObjTree(oChild, vValue);
                } else if (vValue !== null && vValue !== true) {
                    oChild.appendChild(oNewDoc.createTextNode(vValue.toString()));
                }
                oParentEl.appendChild(oChild);
            }
        }
    }

    //var frag = oNewDoc.createDocumentFragment();
    loadObjTree(oNewDoc.documentElement, oObjTree);
    return oNewDoc;
}

export function emptyJxon(jxon) {
    return Object.keys(jxon).length === 0;
}
