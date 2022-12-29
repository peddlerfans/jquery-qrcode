import { dia } from 'jointjs';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMSignalKanban extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMSignalKanban', size: {
                width: 80,
                height: 80
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    x: 0,
                    y: 0,
                    d: 'M 0 0 H calc(w) L calc(0.5*w) calc(h) Z',
                },
                icon: {
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: SECONDARY_FILL_COLOR,
                    x: 'calc(0.5 * w)',
                    y: 'calc(0.4 * h)',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                    text: 'S',
                    fontSize: 36,
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                },
                label: {
                    text: 'Signal Kanban',
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
                selector: 'icon'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
