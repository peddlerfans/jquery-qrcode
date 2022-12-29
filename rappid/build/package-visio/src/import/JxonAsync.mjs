import { debug } from '../helpers/debug.mjs';
import { JXONTree } from '../jxon/jxon.mjs';
import { VisioJxonShapeKey } from '../types/enums.mjs';

export class JxonAsync {

    constructor(_zipApi) {
        /** @type {JSZip} */
        this._zipApi = _zipApi;
        /** @type {Map} - path -> xmlFileReference */
        this._index =
            Object.entries(this._zipApi.files)
                .reduce(
                    (index, [path, fileReference]) =>
                        index.set(path, fileReference),
                    new Map());
        /** @type {{
         *          jxons: Map.<string,VisioJxon>,
         *          images: Map.<string,VisioImage>,
         *     }} */
        this.cache = {
            jxons: new Map(),
            images: new Map(),
        }
    }

    getFileReference(absolutePath) {
        return this._index.get(absolutePath);
    }

    /**
     * @throws
     * @param {string} absolutePath
     * @returns {Promise<VisioJxon>}
     */
    async getJxonAsync(absolutePath) {
        const cachedValue = this.cache.jxons.get(absolutePath);
        if (cachedValue) {
            debug.log(
                'used cached copy of JXON: ' +
                `%c${absolutePath} `,
                'color: orange;'
            );

            return cachedValue;
        }

        const startTime = new Date().getTime();

        // extension
        assertSupportedFile(absolutePath);

        // // file exists on ZipApi
        // if (!this._index.has(absolutePath))
        //     logAndThrow('404 File not found.', { absolutePath });

        const fileReference = this.getFileReference(absolutePath);

        if (!fileReference) return null;

        const xmlString = await fileReference.async('string');
        const jxon = jxonFromXmlString(xmlString);

        this.cache.jxons.set(absolutePath, jxon);

        debug.log('read XML and parse to JXON took: ' +
            `${(new Date().getTime()) - startTime}ms %c${absolutePath} `, 'color: orange;');

        return jxon;
    }

    /**
     * @param {string} absolutePath
     * @returns {Promise<VisioImage>}
     */
    async getImageAsync(absolutePath) {
        const cachedValue = this.cache.images.get(absolutePath);
        if (cachedValue){
            debug.log(
                'used cached copy of image: ' +
                `%c${absolutePath} `,
                'color: orange;'
            );

            return cachedValue;
        }

        const startTime = new Date().getTime();

        const fileReference = this.getFileReference(absolutePath);

        if (!fileReference) return null;

        const base64 = await fileReference.async('base64');

        //TODO miky ignore some extensions from parsing?
        const imagePattern = /([^/]+\.(jpeg|png|[a-zA-Z]*))$/;
        const [, file, extension] = absolutePath.match(imagePattern);

        const dataBase64 = `data:image/${extension};base64,` + base64;

        const image = {
            absolutePath,
            file,
            extension,
            base64: dataBase64,
        };

        this.cache.images.set(absolutePath, image);

        debug.log(
            'read image and encode to base64 took: ' +
            `${(new Date().getTime()) - startTime}ms %c${absolutePath} `,
            'color: orange;'
        );

        return image;
    }

}


/**
 * @param {string} xmlString
 * @returns {JXONTree}
 */
export function jxonFromXmlString(xmlString) {
    const parser = new DOMParser();  // only available in some newer browsers
    const doc = parser.parseFromString(xmlString, 'application/xml');

    return new JXONTree(doc.documentElement,
        [VisioJxonShapeKey.Text]);
}

/**
 * @throws
 * @param {string} path
 * @returns {boolean}
 */
function assertSupportedFile(path) {
    const parsablePattern = /(\.xml|\.rels)$/;
    if (!path || !parsablePattern.test(path))
        debug.log(
            'Can\'t convert to JXON (file extension doesn\'t match)', path);
}

