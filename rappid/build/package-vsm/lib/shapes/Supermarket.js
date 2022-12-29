import { dia } from 'jointjs';
import { OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMSupermarket extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMSupermarket', size: {
                width: 80,
                height: 80
            }, count: 2, attrs: {
                body: {
                    strokeWidth: 4,
                    stroke: OUTLINE_COLOR,
                    strokeLinecap: 'round',
                    fill: 'transparent'
                },
                label: {
                    text: 'Supermarket',
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
    initialize() {
        super.initialize(...arguments);
        this.on('change', (_, opt) => {
            if (!this.hasChanged('count'))
                return;
            this.resetCount(opt);
        });
        this.resetCount();
    }
    resetCount(opt) {
        const count = this.get('count') || 0;
        let d = 'M 0 0 H calc(w) V calc(h) H 0';
        let step = 1 / (count + 1);
        let y = step;
        for (let i = 0; i < count; i++) {
            d += ` M calc(w) calc(${y}*h) H 0`;
            y += step;
        }
        this.attr(['body', 'd'], d, opt);
    }
}
