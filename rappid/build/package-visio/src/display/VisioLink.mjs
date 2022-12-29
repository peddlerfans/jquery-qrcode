import { dia } from 'jointjs';

export const VisioLink = dia.Link.define(
    'visio.Link',
    //defaults
    {
        attrs: {
            line: {
                connection: true
            },
            wrapper: {
                connection: true
            }
        }
    },
    // protoProps
    {
        markup: [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'cursor': 'pointer',
                'stroke': 'transparent',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 10
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none',
                'pointer-events': 'none',
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round',
                'stroke': '#333333'
            }
        }]
    },
    // staticProps
    {}
);
