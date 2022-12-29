/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

interface VSMSupermarketAttributes extends dia.Element.Attributes {
    count: number;
}

export class VSMSupermarket extends dia.Element<VSMSupermarketAttributes> {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMSupermarket',
            size: {
                width: 80,
                height: 80
            },
            count: 2,
            attrs: {
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
            if (!this.hasChanged('count')) return;
            this.resetCount(opt);
        });
        this.resetCount();
    }

    protected resetCount(opt?: dia.Cell.Options) {
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
