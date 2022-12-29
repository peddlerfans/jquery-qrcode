import { debug } from '../helpers/debug.mjs';
import { normalizeRootKey } from './parseJxon.utils.mjs';
import { parseRootValue } from './parseRootValue.mjs';

export function getKeyValuesFromJxon(visioJxon, base = {}, jxonType = null) {

    return Object.entries(visioJxon)
    // only non attributes (not starting with @)
        .filter(([key, _value]) => key[0] !== '@')
        // convert to key: value structure
        .reduce(
            (result, [attributeName, value]) => {
                let normalizedAttributeName =
                    normalizeRootKey(attributeName, jxonType);

                if (result.hasOwnProperty(normalizedAttributeName))
                    debug.log(`keys collision ${normalizedAttributeName}`, visioJxon);

                const keyValue = value.hasOwnProperty('keyValue') ?
                    value['keyValue'] :
                    null;


                result[normalizedAttributeName] =
                    parseRootValue(normalizedAttributeName, keyValue, jxonType);

                return result;
            }, base
        )


}
