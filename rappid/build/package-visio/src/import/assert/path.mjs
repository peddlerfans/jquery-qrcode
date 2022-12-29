import { debug } from '../../helpers/debug.mjs';

/**
 * @throws
 * @param {VisioStructurePath} structurePath
 * @param {Array} expectedStructure
 */
export function assertPathStructure(structurePath, expectedStructure) {
    let lastFoundIndex = -1;

    expectedStructure.forEach(
        expectedFragment => {
            const fragmentIndex = getFragmentIndex(
                structurePath, expectedFragment.xsdType);

            if (fragmentIndex <= lastFoundIndex)
                debug.log('Wrong nesting structure');

            lastFoundIndex = fragmentIndex;

            if (expectedFragment.type) {
                const fragment = structurePath[fragmentIndex];
                if (!expectedFragment.type.includes(fragment.type))
                    debug.log('Wrong structure path fragment type');
            }
        }
    );
}

/**
 * Get FIRST fragment index
 * @param {VisioStructurePath} structurePath
 * @param {VisioXsdType} xsdType
 * @returns {number}
 */
function getFragmentIndex(structurePath, xsdType) {
    return structurePath.findIndex(pathFragment =>
        pathFragment.xsdType === xsdType
    );
}
