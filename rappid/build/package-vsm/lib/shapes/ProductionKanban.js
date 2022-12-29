import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
const CORNER = 20;
const OFFSET = 4;
export class VSMProductionKanban extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMProductionKanban', size: {
                width: 120,
                height: 80
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    x: 0,
                    y: 0,
                    d: `M 0 0 H calc(w - ${CORNER}) l ${CORNER} ${CORNER} V calc(h) H 0 Z`,
                },
                label: {
                    text: 'Production Kanban',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        height: -TEXT_MARGIN * 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: 'calc(0.5 * h)',
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'path',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
export class VSMProductionBatchKanban extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMProductionKanban', size: {
                width: 120,
                height: 80
            }, attrs: {
                bodies: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    x: 0,
                    y: 0,
                    d: `M 0 0 H calc(w - ${CORNER}) l ${CORNER} ${CORNER} V calc(h) H 0 Z`,
                },
                bodyMiddle: {
                    transform: `translate(${OFFSET}, -${OFFSET})`,
                },
                bodyBottom: {
                    transform: `translate(${2 * OFFSET}, -${2 * OFFSET})`,
                },
                label: {
                    text: 'Production Batch Kanban',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        height: -TEXT_MARGIN * 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: 'calc(0.5 * h)',
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'path',
                selector: 'bodyBottom',
                groupSelector: 'bodies'
            }, {
                tagName: 'path',
                selector: 'bodyMiddle',
                groupSelector: 'bodies'
            }, {
                tagName: 'path',
                selector: 'body',
                groupSelector: 'bodies'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
