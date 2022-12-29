import { JxonAsync } from '../import/JxonAsync.mjs';
import { getDocumentRelationsMap, getTopRelationsMap } from '../import/getTopRelationsMap.mjs';
import { documentFactory } from '../import/documentFactory.mjs';
import { debug } from '../helpers/debug.mjs';
import jszip from 'jszip';

const VSDX_MIME_TYPE = 'application/vnd-ms-visio.drawing;charset=utf-8';

const ExportType = {
    array: 'array',
    arraybuffer: 'arraybuffer',
    base64: 'base64',
    binarystring: 'binarystring',
    blob: 'blob',
    uint8array: 'uint8array'
}

export class VisioArchive {

    constructor() {
        this.document = null;
        this.source = null;
        this.zip = null;
        this.jxonAsync = null;
        this.topRelationsMap = null;
        this.documentRelationsMap = null;
    }

    async load(arrayBuffer) {
        if (arrayBuffer instanceof ArrayBuffer) {
            const jsZip = new jszip();
            const zip = await jsZip.loadAsync(arrayBuffer);

            this.source = arrayBuffer;
            this.zip = zip;
            this.jxonAsync = new JxonAsync(zip);

            this.topRelationsMap = await getTopRelationsMap.call(this);
            this.documentRelationsMap = await getDocumentRelationsMap.call(this);

            // createDocument dependencies (optionally override):
            //  * visio.topRelationsMap,
            //  * visio.documentRelationsMap,
            //  * visio.getJxonAsync
            await documentFactory.call(this);
        } else {
            throw new Error('Not an instance of ArrayBuffer.');
        }
    }

    async getJxonAsync(path) {
        return this.jxonAsync.getJxonAsync(path);
    }

    async getImageAsync(path) {
        return this.jxonAsync.getImageAsync(path);
    }

    async toVSDX(options = {}) {
        const {
            type = 'blob',
        } = options;
        let exportType = type;
        if (type && ExportType[type]) {
            // some features of certain export types might not be supported by user browser
            const { support } = jszip;
            const modernType = support.hasOwnProperty(type);
            if ((modernType && support[type]) || !modernType) {
                exportType = ExportType[type];
            } else {
                debug.log(`Browser does not support export type: "${type}", using Blob as fallback.`);
            }
        }
        return this.zip.generateAsync({ ...options, type: exportType });
    }

    static async fromURL(url) {
        if (typeof url !== 'string' || url === '') {
            throw new Error('Missing parameter');
        }

        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.setRequestHeader('Content-Type', VSDX_MIME_TYPE);

            request.responseType = 'blob';

            request.onerror = () => {
                reject(new Error(`Failed to load file ${url}, status: ${request.status} (${request.statusText})`));
            }

            request.onload = () => {
                if (request.status === 200) {
                    const reader = new FileReader();

                    reader.onload = (evt) => {
                        const buffer = evt.target.result;
                        resolve(this.fromArrayBuffer(buffer));
                    }

                    reader.onerror = () => {
                        reject(new Error(`Error occurred reading file: ${url}`));
                    }

                    reader.readAsArrayBuffer(request.response);
                } else {
                    reject(new Error(`Failed to load file ${url}, status: ${request.status} (${request.statusText})`));
                }
            };

            request.send();
        });
    }

    static async fromArrayBuffer(arrayBuffer) {
        const archive = new this();
        await archive.load(arrayBuffer);
        return archive;
    }

    static async fromBase64(base64) {
        return this.fromArrayBuffer(base64toArrayBuffer(base64));
    }

    addEntries(files) {
        for (let path in files) {
            if (files.hasOwnProperty(path)) {
                this.zip.file(path, files[path].content);
            }
        }
    }
}

function base64toArrayBuffer(source) {
    return new Uint8Array(([...atob(source)].map(char => char.charCodeAt(0))));
}
