import { VisioElement } from './VisioElement.mjs';
import { VisioLink } from './VisioLink.mjs';

// Elements

export function defaultImportShape(vsdShape, opts) {
    const attributes = vsdShape.toElementAttributes(opts);
    if (!attributes) {
        return null;
    }
    return new VisioElement(attributes);
}

// Links

export function defaultImportConnect(vsdConnect, source, target, opts) {
    const attributes = vsdConnect.toLinkAttributes(source, target);
    if (!attributes) {
        // Fallback
        return defaultImportShape(vsdConnect.getShape(), opts);
    }
    return new VisioLink(attributes);
}

// Labels

export function defaultImportLabels(vsdShape, _link) {
    const attributes = vsdShape.toElementAttributes({ noGeometry: true });
    return [new VisioElement(attributes)];
}

// Images

const placeholderBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0qwcAAREAx9X+/mIAAAAASUVORK5CYII=';
const unsupportedExtensions = ['emf'];

export function defaultImportImage(_vsdShape, element, image) {
    const { extension, base64, selector } = image;
    const imageAttributes = {};
    let href;
    if (!base64 || unsupportedExtensions.includes(extension)) {
        href = placeholderBase64;
        imageAttributes.preserveAspectRatio = 'none';
    } else {
        href = base64;
    }
    imageAttributes.xlinkHref = href;
    element.attr([selector], imageAttributes);
    return href;
}
