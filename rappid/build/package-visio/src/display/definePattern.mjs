import { util, V } from 'jointjs';

/**
 * @this {joint.dia.Paper}
 * @param {Object} pattern
 */
export function definePattern(pattern) {

    if (!util.isObject(pattern)) {
        throw new TypeError('dia.Paper: definePattern() requires 1. argument to be an object.');
    }

    // Generate a hash code from the stringified filter definition. This gives us
    // a unique filter ID for different definitions.
    const id = pattern.id ||
        pattern.type +
        this.svg.id +
        util.hashCode(JSON.stringify(pattern));

    // If the pattern already exists in the document,
    // we're done and we can just use it (reference it using `url()`).
    // If not, create one.
    if (this.isDefined(id))
        return id;

    // ----------------------------------------------- //

    const {
        d,
        backgroundColor = '#ffffff',
        color = '#000000',
        strokeWidth = 1,
        x = 0,
        y = 0,
        width = 10,
        height = 10,
        patternUnits = 'userSpaceOnUse',
        strokeOpacity = 1,
        fillOpacity = 1,
        rotate = 0,
        scale = '1 1',
        viewBox = '0 0 10 10',
    } = pattern;

    if (!d)
        throw new TypeError('dia.Paper: definePattern() requires "d" attribute not empty.');

    const patternSVGString =
        `<pattern>
             <rect
                width="100%"
                height="100%"
                fill-opacity="1"
                fill="${backgroundColor}"
                ></rect>
            <path
                d="${d}"
                stroke="${color}"
                stroke-width="${strokeWidth}"
                stroke-opacity="${strokeOpacity}"
                fill="${color}"
                fill-opacity="${fillOpacity}"
                ></path>
                </pattern>`;

    const patternAttrs = util.assign({
        id,
        patternUnits,
        x,
        y,
        width,
        height,
        patternTransform: `rotate(${rotate}) scale(${scale})`,
        viewBox,
    }, pattern.attrs);

    // "save" for this and later use
    V(patternSVGString, patternAttrs)
        .appendTo(this.defs);

    return id;
}
