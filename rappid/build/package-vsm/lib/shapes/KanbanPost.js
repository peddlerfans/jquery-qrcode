import { dia } from 'jointjs';
import { OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
const ratio = 0.6;
export class VSMKanbanPost extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMKanbanPost', size: {
                width: 80,
                height: 80
            }, attrs: {
                body: {
                    strokeWidth: 4,
                    stroke: OUTLINE_COLOR,
                    strokeLinecap: 'round',
                    fill: 'transparent',
                    d: `M 0 0 V calc(${ratio} * h) H calc(w) V 0 M calc(0.5*w) calc(${ratio} * h) V calc(h) M calc(0.25*w) calc(h) H calc(0.75*w)`,
                },
                label: {
                    text: 'Kanban Post',
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
                tagName: 'path',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
