import { V, g } from 'jointjs';

export function getArrows(cells) {
    const { endArrow, endArrowSize, beginArrow, beginArrowSize, lineWeight } = cells;
    const arrows = {};
    if (beginArrow) {
        arrows.sourceMarker = getArrow(beginArrow, beginArrowSize, lineWeight);
    } else {
        arrows.sourceMarker = null;
    }
    if (endArrow) {
        arrows.targetMarker = getArrow(endArrow, endArrowSize, lineWeight);
    } else {
        arrows.targetMarker = null;
    }

    return arrows;
}

function getArrow(_arrowType, size = 0, lineWeight) {
    // defaults
    let fill = '#000000';
    let stroke = '#000000';

    const arrowDefinition = arrowPath(_arrowType);
    if (!arrowDefinition)
        return null;

    let { d, type } = arrowDefinition;
    if (d.includes('A') || d.includes('a'))
        d = V.normalizePathData(d);

    const path = new g.Path(d); //TODO miky
    const scale = getScale(size); //TODO miky
    path.scale(scale, scale);

    if (type === 'stroke') {
        fill = 'none';
    }
    if (type === 'fill') {
        stroke = 'none';
    }
    if (type === 'stroke-empty') {
        fill = '#ffffff';
    }
    return {
        'type': 'path',
        'd': path.serialize(),
        'stroke-width': lineWeight,
        fill,
        stroke,
    }
}

function getScale(size) {
    switch (size) {
        case 0:
            return 3.253333333333325;
        case 1:
            return 3.7333333333333236;
        case 2:
            return 4.693333333333321;
        case 3:
            return 5.653333333333319;
        case 4:
            return 6.613333333333316;
        case 5:
            return 13.3333333333333;
        case 6:
            return 25.333333333333268;
        default:
            return 4.693333333333321;
    }
}

function arrowPath(type) {
    switch (type) {
        case 0:
            return null;
        case 1:
            return {
                d: 'M 1 -1 L 0 0 L 1 1',
                type: 'stroke'
            };
        case 2:
            return {
                d: 'M 1 1 L 0 0 L 1 -1 L 1 1',
                type: 'fill'
            };
        case 3:
            return {
                d: 'M 2 -1 0 0 2 1',
                type: 'stroke'
            };
        case 4:
            return {
                d: 'M 2 -1 0 0 2 1 Z',
                type: 'fill'
            };
        case 5:
            return {
                d: 'M 2 1 L 0 0 L 1.98117 -0.993387 C 1.67173 -0.364515 1.67301 0.372641 1.98465 1.00043',
                type: 'fill'
            };
        case 6:
            return {
                d: 'M 2 1 L 0 0 L 2.01237 -1.00641 C 2.32921 -0.372874 2.32921 0.37287 2.01238 1.0064',
                type: 'fill'
            };
        case 7:
            return {
                d: 'M 1.84309 -0.959455 C 1.43792 -0.3808 0.784502 -0.0260248 0.0785258 -0.00137083 L 0.0785228 0.00137063 C 0.784499 0.0260235 1.43791 0.380798 1.84309 0.959452',
                type: 'stroke'
            };
        case 8:
            return {
                d: 'M 1.84309 -0.959455 C 1.43792 -0.3808 0.784502 -0.0260248 0.0785258 -0.00137083 L 0.0785228 0.00137063 C 0.784499 0.0260235 1.43791 0.380798 1.84309 0.959452 C 1.67173 0.364515 1.67301 -0.372641 1.84309 -0.959455',
                type: 'fill'
            };
        case 9:
            return {
                d: 'M -1 -1 0 0 1 1',
                type: 'stroke'
            };
        case 10:
            return {
                d: 'M -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0',
                type: 'fill'
            };

        case 11:
            return {
                d: 'M -1 -1 1 -1 1 1 -1 1 z',
                type: 'fill'
            };
        case 12:
            return {
                d: 'M 2 -1 0 0 2 1',
                type: 'stroke'
            };
        case 13:
            return {
                d: 'M 3 -1 0 0 3 1 Z',
                type: 'fill'
            };
        case 14:
            return {
                d: 'M 3 -1 0 0 3 1 Z',
                type: 'stroke-empty'
            };
        case 15:
            return {
                d: 'M 1 -1 0 0 1 1 Z',
                type: 'stroke-empty'
            };
        case 16:
            return {
                d: 'M 2 -1 0 0 2 1 Z',
                type: 'stroke-empty'
            };
        case 17:
            return {
                d: 'M 2 1 L 0 0 L 1.98117 -0.993387 C 1.67051 -0.362037 1.67309 0.378293 1.98815 1.00746',
                type: 'stroke-empty'
            };
        case 18:
            return {
                d: 'M 2 1 L 0 0 L 2.01237 -1.00641 C 2.32921 -0.372874 2.32921 0.37287 2.01238 1.0064',
                type: 'stroke-empty'
            };
        case 19:
            return {
                d: 'M 1.95144 1.125 C 1.55653 0.440984 1.54919 -0.400016 1.93211 -1.09082 L 1.92863 -1.09117 C 1.52903 -0.42613 0.815004 -0.013884 0.0392696 -0.000342899 L 0.0392671 0.000342659 C 0.815002 0.0138829 1.52903 0.426128 1.92863 1.09116',
                type: 'stroke-empty'
            };
        case 20:
            return {
                d: 'M -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0',
                type: 'stroke-empty'
            };
        case 21:
            return {
                d: 'M -1 -1 1 -1 1 1 -1 1 z',
                type: 'stroke-empty'
            };
        case 22:
            return {
                d: 'M 0 0 2 -1 4 0 2 1 z',
                type: 'stroke-empty'
            };
        case 23:
            return {
                d: 'M 2.5 -1 1.5 1',
                type: 'stroke'
            };
        case 24:
            return {
                d: 'M 1.5 -0.75 L 1.5 0.75',
                type: 'stroke'
            };
        case 25:
            return {
                d: 'M 1.5 -0.75 1.5 0.75 M 2.25 -0.75 2.25 0.75',
                type: 'stroke'
            };

        case 26:
            return {
                d: 'M 1.5 -0.75 L 1.5 0.75 M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75',
                type: 'stroke'
            };

        case 27:
            return {
                d: 'M 0 -0.75 L 1.5 0 L 0 0.75',
                type: 'stroke'
            };
        case 28:
            return {
                d: 'M 0 -0.75 L 1.5 0 L 0 0.75 M 2 -0.75 L 2 0.75',
                type: 'stroke'
            };

        case 29:
            return {
                d: 'M 2.25 0.75 C 1.83579 0.75 1.5 0.414214 1.5 0 1.5 -0.414214 1.83579 -0.75 2.25 -0.75 2.66421 -0.75 3 -0.414214 3 0 3 0.414214 2.66421 0.75 2.25 0.75 Z M 0 -0.75 L 1.5 0 L 0 0.75 M 1.5 0 L 0 0',
                type: 'stroke-empty'
            };
        case 30:
            return {
                d: 'M 2.25 0.75 C 1.83579 0.75 1.5 0.414214 1.5 0 1.5 -0.414214 1.83579 -0.75 2.25 -0.75 2.66421 -0.75 3 -0.414214 3 0 3 0.414214 2.66421 0.75 2.25 0.75 Z M 0.75 -0.75 L 0.75 0.75 M 1.5 0 L 0 0',
                type: 'stroke-empty'
            };
        case 31:
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 2.25 -0.75 L 2.25 0.75',
                type: 'stroke-empty'
            };
        case 32:
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75',
                type: 'stroke-empty'
            };
        case 33:
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75 M 3.75 -0.75 L 3.75 0.75',
                type: 'stroke-empty'
            };
        case 34:
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 1.5 0 L 3.75 -1.15 L 6 0 L 3.75 1.15 L 1.5 0',
                type: 'stroke-empty'
            };
        case 35:
            // <path
            //      d="M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z"
            //      stroke="none"
            // ></path>
            // <path
            //      d="M 2.25 -0.75 L 2.25 0.75"
            //      stroke-linecap="round"
            //      stroke-linejoin="round"
            //      fill="none"
            //  ></path>
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z' +
                    ' M 2.25 -0.75 L 2.25 0.75',
                type: 'stroke'
            };
        case 36:
            //  <path d="M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75"
            //                   stroke="none"></path>
            //             <path d="M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75" stroke-linecap="round"
            //                   stroke-linejoin="round" fill="none"></path>
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75' +
                    'M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75',
                type: 'fill'
            };
        case 37:
            // <path d="M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 2.25 -0.75 L 2.25 0.75"
            //                   stroke="none"></path>
            //             <path d="M 3 -0.75 L 3 0.75 M 3.75 -0.75 L 3.75 0.75" stroke-linecap="round"
            //                   stroke-linejoin="round" fill="none"></path>
            return {
                d: '',
                type: 'fill'
            };
        case 38:
            //  <path d="M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z"
            //                   stroke="none"></path>
            //             <path d="M 1.5 0 L 3.75 -1.15 L 6 0 L 3.75 1.15 L 1.5 0"
            //                   stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z ' +
                    'M 1.5 0 L 3.75 -1.15 ' +
                    'M 3.75 -1.15 L 6 0 ' +
                    'M 6 0 L 3.75 1.15 ' +
                    'M 3.75 1.15 L 1.5 0',
                // type: 'stroke'
                // type: 'fill'
                type: 'stroke-empty'
            };
        case 39:
            return {
                d: 'M 0 0 L 2 -1 L 2 1 L 0 0 M 2 0 L 4 -1 L 4 1 L 2 0',
                type: 'fill'
            };
        case 40:
            return {
                d: 'M 0 0 L 2 -1 L 2 1 L 0 0 M 2 0 L 4 -1 L 4 1 L 2 0',
                type: 'stroke-empty'
            };
        case 41:
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z',
                type: 'stroke-empty'
            };
        case 42:
            return {
                d: 'M 0.75 0.75 C 0.335786 0.75 0 0.414214 0 0 0 -0.414214 0.335786 -0.75 0.75 -0.75 1.16421 -0.75 1.5 -0.414214 1.5 0 1.5 0.414214 1.16421 0.75 0.75 0.75 Z M 2.25 -0.75 L 2.25 0.75 M 3 -0.75 L 3 0.75',
                type: 'fill'
            };
        case 43:
            return {
                d: 'M 2 -1 L 0 0 L 2 1 M 4 -1 L 2 0 L 4 1',
                type: 'stroke'
            };
        case 44:
            return {
                d: 'M 2 -1 L 0 0 L 2 1 M 3 0.75 L 3 -0.75',
                type: 'stroke'
            };
        case 45:
            return {
                d: 'M 2 -1 L 0 0 L 2 1 M 4 -1 L 2 0 L 4 1 M 5 0.75 L 5 -0.75',
                type: 'stroke'
            };

        case 254:
        //TODO miky
        // Use the master that is specified by the formula associated with this cell for the Arrowhead.


    }


}
