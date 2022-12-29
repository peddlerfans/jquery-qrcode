/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

export class VSMMaterialPull extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMMaterialPull',
            size: {
                width: 60,
                height: 60
            },
            attrs: {
                body: {
                    stroke: 'none',
                    fill: 'transparent',
                    rx: 'calc(0.5 * w)',
                    ry: 'calc(0.5 * h)',
                    cx: 'calc(0.5 * w)',
                    cy: 'calc(0.5 * h)',
                },
                arrow: {
                    fill: 'none',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 4,
                    d: 'M calc(w) calc(0.5*h) A calc(0.5*w) calc(0.5*h) 0 1 0 calc(0.5*w) calc(h)',
                    targetMarker: {
                        'type': 'path',
                        'stroke': OUTLINE_COLOR,
                        'stroke-width': 2,
                        'd': 'M 0 -6 -10 0 0 6 Z'
                    }
                },
                label: {
                    text: 'Material Pull',
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
            tagName: 'ellipse',
            selector: 'body'
        }, {
            tagName: 'path',
            selector: 'arrow',
            attributes: {
                fill: 'none'
            }
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }

}



