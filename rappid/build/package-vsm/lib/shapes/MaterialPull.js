import { dia } from 'jointjs';
import { OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMMaterialPull extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMMaterialPull', size: {
                width: 60,
                height: 60
            }, attrs: {
                body: {
                    stroke: 'none',
                    fill: 'transparent',
                    rx: 'calc(0.5 * w)',
                    ry: 'calc(0.5 * h)',
                    cx: 'calc(0.5 * w)',
                    cy: 'calc(0.5 * h)',
                },
                arrow: {
                    fill: 'none',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 4,
                    d: 'M calc(w) calc(0.5*h) A calc(0.5*w) calc(0.5*h) 0 1 0 calc(0.5*w) calc(h)',
                    targetMarker: {
                        'type': 'path',
                        'stroke': OUTLINE_COLOR,
                        'stroke-width': 2,
                        'd': 'M 0 -6 -10 0 0 6 Z'
                    }
                },
                label: {
                    text: 'Material Pull',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    x: 'calc(0.5 * w)',
                    y: `calc(h + ${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'ellipse',
                selector: 'body'
            }, {
                tagName: 'path',
                selector: 'arrow',
                attributes: {
                    fill: 'none'
                }
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
