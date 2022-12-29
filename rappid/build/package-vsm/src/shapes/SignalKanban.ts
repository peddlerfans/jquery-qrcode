/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

export class VSMSignalKanban extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMSignalKanban',
            size: {
                width: 80,
                height: 80
            },
            attrs: {
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
            }
        }
    }

    preinitialize(): void {
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
