/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

interface VSMWorkcellAttributes extends dia.Element.Attributes {
    thickness: number;
}

export class VSMWorkcell extends dia.Element<VSMWorkcellAttributes> {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMCustomerSupplier',
            size: {
                width: 120,
                height: 80
            },
            thickness: 15,
            attrs: {
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
            }
        }
    }

    preinitialize(): void {
        this.markup = [{
            tagName: 'path',
            selector: 'body'
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }

    initialize(): void {
        super.initialize(...arguments);
        this.on('change', (_, opt) => {
            if (!this.hasChanged('thickness')) return;
            this.resetThickness(opt);
        });
        this.resetThickness();
    }

    protected resetThickness(opt?: dia.Cell.Options) {
        const thickness = this.get('thickness') || 0;
        const d = `M 0 0 H calc(w) V calc(h) h ${-thickness} V ${thickness} H ${thickness} V calc(h) H 0 z`;
        this.attr(['body', 'd'], d, opt);
    }
}
