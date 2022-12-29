import { dia } from 'jointjs';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMFIFOLane extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMFIFOLane', size: {
                width: 120,
                height: 60
            }, attrs: {
                body: {
                    fill: FILL_COLOR,
                    width: 'calc(w)',
                    height: 'calc(h)',
                },
                outline: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    d: 'M 0 0 H calc(w) M calc(w) calc(h) H 0',
                },
                rectIcon: {
                    x: 'calc(0.15*w - calc(0.15 * s))',
                    y: 'calc(0.5*h - calc(0.15 * s))',
                    width: 'calc(0.3 * s)',
                    height: 'calc(0.3 * s)',
                },
                ellipseIcon: {
                    cx: 'calc(0.85 * w)',
                    cy: 'calc(0.5 * h)',
                    rx: 'calc(0.15 * s)',
                    ry: 'calc(0.15 * s)',
                },
                triangleIcon: {
                    d: 'M calc(0.5*w) calc(0.5*h - calc(0.15 * s)) l -calc(0.15 * s) calc(0.3 * s) h calc(0.3 * s) z',
                },
                icons: {
                    stroke: OUTLINE_COLOR,
                    fill: SECONDARY_FILL_COLOR,
                    strokeWidth: 2,
                },
                label: {
                    text: 'FIFO Line',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    x: 'calc(0.5*w)',
                    y: `calc(h + ${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'rect',
                selector: 'body'
            }, {
                tagName: 'path',
                selector: 'outline'
            }, {
                tagName: 'rect',
                selector: 'rectIcon',
                groupSelector: 'icons'
            }, {
                tagName: 'path',
                selector: 'triangleIcon',
                groupSelector: 'icons'
            }, {
                tagName: 'ellipse',
                selector: 'ellipseIcon',
                groupSelector: 'icons'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
