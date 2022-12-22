import { dia } from 'jointjs';
export class VSMPullArrow extends dia.Link {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMPullArrow', attrs: {
                line: {
                    connection: true,
                    stroke: '#333333',
                    strokeWidth: 2,
                    strokeDasharray: '10,3',
                    strokeLinejoin: 'round',
                    targetMarker: {
                        'type': 'path',
                        'd': 'M 10 -5 0 0 10 5 z'
                    }
                },
                wrapper: {
                    connection: true,
                    strokeWidth: 10,
                    strokeLinejoin: 'round'
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'path',
                selector: 'wrapper',
                attributes: {
                    'fill': 'none',
                    'cursor': 'pointer',
                    'stroke': 'transparent',
                    'stroke-linecap': 'round'
                }
            }, {
                tagName: 'path',
                selector: 'line',
                attributes: {
                    'fill': 'none',
                    'pointer-events': 'none'
                }
            }];
    }
}
