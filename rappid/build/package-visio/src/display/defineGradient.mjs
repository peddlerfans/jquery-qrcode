import { V, util } from 'jointjs';
import { toArray } from '../helpers/toArray.mjs';
import { debug } from '../helpers/debug.mjs';

/**
 * @this {joint.dia.Paper}
 * @param {Object} gradient
 */
export function defineGradient(gradient) {

    if (!util.isObject(gradient)) {
        throw new TypeError('dia.Paper: defineGradient() requires 1. argument to be an object.');
    }

    // Generate a hash code from the stringified filter definition. This gives us
    // a unique filter ID for different definitions.
    const id = gradient.id ||
        gradient.type +
        this.svg.id +
        util.hashCode(JSON.stringify(gradient));

    // If the gradient already exists in the document,
    // we're done and we can just use it (reference it using `url()`).
    // If not, create one.
    if (this.isDefined(id))
        return id;

    // ----------------------------------------------- //

    const type = gradient.type;
    let gradientSVGString;
    let gradientAttrs;

    switch (gradient.type) {
        case 'linearGradient':
        case 'radialGradient':
            ({ gradientSVGString, gradientAttrs } = getGradient(gradient, id, type));
            break;
        default:
            debug.log('Unknown Gradient', gradient);
    }


    // "save" for this and later use
    V(gradientSVGString, gradientAttrs).appendTo(this.defs);

    return id;
}

function getGradient(gradient, id, tag) {
    const {
        stops,
        // x = 0,
        // y = 0,
        // gradientUnits = 'userSpaceOnUse',
        rotate = 0,
        scale = '1 1',
        viewBox,
    } = gradient;

    if (!stops) {
        throw new TypeError('dia.Paper: definePattern() requires "stops" attribute not empty.');
    }

    const gradientSVGString =
        `<${tag}>
                ${toArray(stops).map(({ offset, color, opacity }) => `
                    <stop
                    offset="${offset}"
                    stop-color="${color}"
                    stop-opacity="${opacity}"/>`).join('')}
                </${tag}>`;

    const gradientAttrs = {
        id,
        // gradientUnits,
        // x,
        // y,
        gradientTransform: `rotate(${rotate}) scale(${scale})`,
    }

    if (viewBox) {
        gradientAttrs.viewBox = viewBox;
    }

    return {
        gradientSVGString,
        gradientAttrs: util.assign(gradientAttrs, gradient.attrs)
    }
}
