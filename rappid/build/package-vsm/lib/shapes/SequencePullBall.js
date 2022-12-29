import { dia } from 'jointjs';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
const ratio = 0.6;
export class VSMSequencePullBall extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMSequencePullBall', size: {
                width: 60,
                height: 60
            }, attrs: {
                inner: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: SECONDARY_FILL_COLOR,
                    rx: `calc(${ratio / 2} * w)`,
                    ry: `calc(${ratio / 2} * h)`,
                    cx: 'calc(0.5 * w)',
                    cy: 'calc(0.5 * h)',
                },
                outer: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    rx: 'calc(0.5 * w)',
                    ry: 'calc(0.5 * h)',
                    cx: 'calc(0.5 * w)',
                    cy: 'calc(0.5 * h)',
                },
                label: {
                    text: 'Sequence Pull Ball',
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
                selector: 'outer'
            }, {
                tagName: 'ellipse',
                selector: 'inner'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
