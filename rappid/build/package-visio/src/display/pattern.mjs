import { debug } from '../helpers/debug.mjs';

export function getFillPattern(patternId, color, backgroundColor) {

    const patternDefinition = getFillPatternDefinition(patternId);

    //TODO miky no missing patterns
    if (!patternDefinition)
        return color;

    // defaults
    const {
        d,
        strokeWidth = 1,
        x = 0,
        y = 0,
        width = 10,
        height = 10,
        patternUnits = 'userSpaceOnUse',
        strokeOpacity = 1,
        fillOpacity = 1,
        rotate = 0,
        viewBox = undefined,
        // scale = '.5 .5'
        scale = '1 1',
    } = patternDefinition;

    // output format
    const pattern = {
        type: 'pattern',
        color,
        backgroundColor,
        strokeWidth,
        d,
        x,
        y,
        width,
        height,
        patternUnits,
        strokeOpacity,
        fillOpacity,
        rotate,
        scale,
        viewBox,
    }

    // optional
    if (viewBox)
        pattern.viewBox = viewBox;

    return pattern;
}

/**
 *
 * @param {number} patternId - visio enum
 * @returns {Object}
 */
export function getFillPatternDefinition(patternId) {
    switch (patternId) {
        case 2:
            return {
                d: 'M 2 0 L 2 2',
                rotate: 315,
                width: 4,
                height: 2,
                scale: '1 1',
            };
        case 3:
            // fillPattDef-0-7
            return {
                d: 'M 0 5 L 10 5 M 5 0 L 5 10',
            };
        case 4:
            // fillPattDef-0-8
            return {
                d: 'M 0 0 L 10 10 M 0 10 L 10 0',
            };
        case 5:
            return {
                d: 'M 2 0 L 2 2',
                rotate: 45,
                width: 4,
                height: 2,
                scale: '1 1',
            };
        case 6:
            // fillPattDef-0-10
            return {
                d: 'M 0 5 L 10 5',
            };
        case 7:
            // fillPattDef-0-11
            return {
                d: 'M 5 0 L 5 10',
            };
        case 8:
            //
            return getDefaultFillPatternDefinition(patternId);
        case 9:
            return getDefaultFillPatternDefinition(patternId);
        case 10:
            return getDefaultFillPatternDefinition(patternId);
        case 11:
            // fillPattDef-0-15
            return {
                d: 'M 0 1 L 2 1 M 2 3 L 4 3',
                width: 3,
                height: 3,
                viewBox: '0 0 4 4'
            };
        case 12:
            return getDefaultFillPatternDefinition(patternId);
        case 13:
            // fillPattDef-0-17
            return {
                d: 'M 0 2.5 L 1 2.5',
                width: 1,
                height: 3,
            };
        case 14:
            // fillPattDef-0-18
            return {
                d: 'M 2.5 0 L 2.5 1',
                width: 5,
                height: 1,
            };
        case 15:
            // fillPattDef-0-19
            return {
                d: 'M 2.5 0 L 2.5 1',
                rotate: 45,
                width: 5,
                height: 1,
            };
        case 16:
            // fillPattDef-0-20
            return {
                d: 'M 2.5 0 L 2.5 1',
                rotate: 315,
                width: 5,
                height: 1,
            };
        case 17:
            return getDefaultFillPatternDefinition(patternId);
        case 18:
            return getDefaultFillPatternDefinition(patternId);
        case 19:
            // fillPattDef-0-23
            return {
                d: 'M 0 2.5 L 1 2.5',
                width: 1,
                height: 5,
            };
        case 20:
            // fillPattDef-0-24
            return {
                d: 'M 2.5 0 L 2.5 1',
                width: 5,
                height: 1,
            };
        case 21:
            // fillPattDef-0-25
            return {
                d: 'M 2 0 L 2 2',
                rotate: 45,
                width: 4,
                height: 2,
            };
        case 22:
            // fillPattDef-0-26
            return {
                d: 'M 2 0 L 2 2',
                rotate: 315,
                width: 4,
                height: 2,
            };
        case 23:
            // fillPattDef-0-27
            return {
                d: 'M 0 2.5 L 5 2.5 M 2.5 0 L 2.5 5',
                width: 5,
                height: 5,
            };
        case 24:
            return getDefaultFillPatternDefinition(patternId);
    }
}

function getDefaultFillPatternDefinition(patternId) {
    //TODO miky implement all the patterns (non trivial MS server generated)

    const defaultId = 2;

    debug.log(`unimplemented fill pattern ${patternId}, ` +
        `using pattern ${defaultId} instead`);
    return getFillPatternDefinition(defaultId);
}
