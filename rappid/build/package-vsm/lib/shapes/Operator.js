import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
const GAP = 5;
export class VSMOperator extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMOperator', size: {
                width: 40,
                height: 40
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    rx: 'calc(0.5 * w)',
                    ry: 'calc(0.5 * h)',
                    cx: 'calc(0.5 * w)',
                    cy: 'calc(0.5 * h)',
                },
                cap: {
                    fill: 'none',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    d: `M ${-GAP} calc(0.5 * h) A calc(0.5 * w + 5) calc(0.5 * h + 5) 0 1 1 calc(w+${GAP}) calc(0.5 * h)`,
                },
                label: {
                    text: 'Operator',
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
                selector: 'cap',
                attributes: {
                    fill: 'none'
                }
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
