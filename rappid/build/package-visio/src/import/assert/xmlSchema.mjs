import { debug } from '../../helpers/debug.mjs';
import {
    XmlSchema,
    XmlSchemaKey
} from '../../types/enums.mjs';

export function expectedSchema(jxonTree, xmlSchemaKey) {
    //TODO miky even the "@xmlns:r"

    if (!XmlSchema.hasOwnProperty(xmlSchemaKey))
        debug.log(
            `Unknown xmlSchemaKey "${xmlSchemaKey}"`,
            { jxonTree });

    // special case
    if (xmlSchemaKey === XmlSchemaKey.DrawingML &&
        jxonTree['@xmlns:a'] === XmlSchema.DrawingML)
        return; // ok

    // special case
    if (xmlSchemaKey === XmlSchemaKey.Theme &&
        jxonTree['@xmlns:vt'] === XmlSchema.Theme)
        return; // ok

    // universal
    if (!jxonTree.hasOwnProperty('@xmlns') || !jxonTree['@xmlns'])
        debug.log('"@xmlns" attribute not found', { jxonTree });
    if (jxonTree['@xmlns'] !== XmlSchema[xmlSchemaKey])
        debug.log(`Unexpected schema actual: "${jxonTree['@xmlns']}" `+
            `(expected "${XmlSchema[xmlSchemaKey]}")`);
}
