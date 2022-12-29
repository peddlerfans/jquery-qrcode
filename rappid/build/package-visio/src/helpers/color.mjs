export function normalizeColor(color) {
    if (color === 'none' || color === 'transparent') return color;
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    return ctx.fillStyle;
}

const ALPHA_REGEX = /^rgba\(.*,(.+)\)/;

export function isColorTransparent(color) {
    if (typeof color !== 'string') return false;
    if (color === 'transparent') return true;
    const match = ALPHA_REGEX.exec(color);
    if (!match) return false;
    const [,alpha] = match;
    if (parseFloat(alpha) === 0) return true;
    return false;
}
