import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
const COUNT = 3;
export class VSMDataBox extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMDataBox', count: COUNT, size: {
                width: 120,
                height: COUNT * 40
            }, attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                },
                boxes: {
                    width: 'calc(w)',
                    fill: FILL_COLOR,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2
                },
                labels: {
                    text: '',
                    x: 'calc(0.5 * w)',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        ellipsis: true
                    },
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [];
    }
    initialize() {
        super.initialize(...arguments);
        this.on('change', (_, opt) => {
            if (!this.hasChanged('count'))
                return;
            this.buildMarkup(opt);
        });
        this.buildMarkup();
    }
    toJSON() {
        const json = super.toJSON();
        delete json.markup;
        return json;
    }
    getCleanedAttrs() {
        const count = this.get('count') || 0;
        const attrs = Object.assign({}, this.attr());
        Object.keys(attrs).forEach(key => {
            if (!key.startsWith('_'))
                return;
            const match = /_(\d+)$/.exec(key);
            if (!match)
                return;
            const index = parseInt(match[1]);
            if (index >= count) {
                delete attrs[key];
            }
        });
        return attrs;
    }
    buildMarkup(opt) {
        const flags = Object.assign({ dry: true }, opt);
        const count = this.get('count');
        const markup = [{
                tagName: 'rect',
                selector: 'body',
                groupSelector: ''
            }];
        const attrs = this.getCleanedAttrs();
        const ratio = 1 / count;
        for (let i = 0; i < count; i++) {
            const boxSelector = `_box_${i}`;
            const labelSelector = `_label_${i}`;
            markup.push({
                tagName: 'rect',
                selector: boxSelector,
                groupSelector: 'boxes',
            }, {
                tagName: 'text',
                selector: labelSelector,
                groupSelector: 'labels',
            });
            attrs[boxSelector] = Object.assign(Object.assign({}, attrs[boxSelector]), { y: `calc(${ratio * i}*h)`, height: `calc(${ratio}*h)` });
            attrs[labelSelector] = Object.assign(Object.assign({}, attrs[labelSelector]), { y: `calc(${ratio * (i + 0.5)}*h)`, textWrap: {
                    height: `${ratio * 100}%`
                } });
        }
        this.set('markup', markup, flags);
        this.set('attrs', attrs, flags);
    }
    setLabelAttr(index, attrs, opt) {
        this.attr([`_label_${index}`], attrs, opt);
    }
    setBoxAttr(index, attrs, opt) {
        this.attr([`_box_${index}`], attrs, opt);
    }
}
