/**
 *
 * @param {string} relativePath
 * @param {string} referencePath
 * @param {number} [levelUp]
 * @returns {string}
 */
export function getTargetAbsolutePath(relativePath, referencePath, levelUp = 0) {
    const toLastSlashPattern = /^(.*\/)[^/]?/;
    const oneLevelUp = /^(.*\/)(.*\/)[^/]+$/;
    const twoLevelsUp = /^(.*\/)(.*\/)(.*\/)[^/]+$/;

    const pattern = {
        0: toLastSlashPattern,
        1: oneLevelUp,
        2: twoLevelsUp,
    }[levelUp];

    const candidate = referencePath === '/'
        ? relativePath :
        referencePath.match(pattern)[1] + relativePath
    ;
    // path normalizer
    const normalized = normalizePath(candidate);

    return normalized;

}

/**
 * example:
 * from: visio/pages/../media/image1.jpeg
 * to: visio/media/image1.jpeg
 * @param {string} path
 * @returns {string}
 */
function normalizePath(path) {
    const parts = path.split('/');

    for (let i = parts.length - 1; i >= 0; i--) {
        const actual = parts[i];

        if (actual === '..') {
            // remove two items and continue
            parts.splice(i - 1, 2);
            i--;
        }
    }

    return parts.join('/');
}
