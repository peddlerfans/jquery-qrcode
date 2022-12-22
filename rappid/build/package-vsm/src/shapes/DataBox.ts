/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia, attributes } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

interface VSMDataBoxAttributes extends dia.Element.Attributes {
    count?: number;
}

const COUNT = 3;

export class VSMDataBox extends dia.Element<VSMDataBoxAttributes> {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMDataBox',
            count: COUNT,
            size: {
                width: 120,
                height: COUNT * 40
            },
            attrs: {
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
            }
        }
    }

    preinitialize(): void {
        this.markup = [];
    }

    initialize(): void {
        super.initialize(...arguments);
        this.on('change', (_, opt) => {
            if (!this.hasChanged('count')) return;
            this.buildMarkup(opt);
        });
        this.buildMarkup();
    }

    toJSON() {
        const json = super.toJSON();
        delete json.markup;
        return json;
    }

    protected getCleanedAttrs(): dia.Cell.Selectors {
        const count = this.get('count') || 0;
        const attrs: dia.Cell.Selectors = { ...this.attr() };
        Object.keys(attrs).forEach(key => {
            if (!key.startsWith('_')) return;
            const match = /_(\d+)$/.exec(key);
            if (!match) return;
            const index = parseInt(match[1]);
            if (index >= count) {
                delete attrs[key];
            }
        });
        return attrs;
    }

    protected buildMarkup(opt?: dia.Cell.Options): void {
        const flags = { dry: true, ...opt };
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
            attrs[boxSelector] = {
                ...attrs[boxSelector],
                y: `calc(${ratio * i}*h)`,
                height: `calc(${ratio}*h)`
            };
            attrs[labelSelector] = {
                ...attrs[labelSelector],
                y: `calc(${ratio * (i + 0.5)}*h)`,
                textWrap: {
                    height: `${ratio * 100}%`
                },
            };
        }
        this.set('markup', markup, flags);
        this.set('attrs', attrs, flags);
    }

    setLabelAttr(index: number,  attrs: attributes.SVGTextAttributes, opt?: dia.Cell.Options) {
        this.attr([`_label_${index}`], attrs, opt);
    }

    setBoxAttr(index: number, attrs: attributes.SVGRectAttributes, opt?: dia.Cell.Options) {
        this.attr([`_box_${index}`], attrs, opt);
    }
}
