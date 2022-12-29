import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMWorkcell extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMCustomerSupplier', size: {
                width: 120,
                height: 80
            }, thickness: 15, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                },
                label: {
                    text: 'Workcell',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -20
                    },
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
            if (!this.hasChanged('thickness'))
                return;
            this.resetThickness(opt);
        });
        this.resetThickness();
    }
    resetThickness(opt) {
        const thickness = this.get('thickness') || 0;
        const d = `M 0 0 H calc(w) V calc(h) h ${-thickness} V ${thickness} H ${thickness} V calc(h) H 0 z`;
        this.attr(['body', 'd'], d, opt);
    }
}
