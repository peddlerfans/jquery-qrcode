/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

export class VSMTimelineWaiting extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMTimelineWaiting',
            size: {
                width: 120,
                height: 40
            },
            attrs: {
                line: {
                    strokeWidth: 3,
                    stroke: OUTLINE_COLOR,
                    strokeLinecap: 'round',
                    fill: 'transparent',
                    d: 'M 0 0 H calc(w) V calc(h)',
                },
                label: {
                    text: 'Timeline Waiting',
                    textVerticalAnchor: 'bottom',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        maxLineCount: 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: -TEXT_MARGIN,
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
            selector: 'line'
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }
}

export class VSMTimelineProcessing extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMTimelineProcessing',
            size: {
                width: 120,
                height: 40
            },
            attrs: {
                line: {
                    strokeWidth: 3,
                    stroke: OUTLINE_COLOR,
                    strokeLinecap: 'round',
                    fill: 'transparent',
                    d: 'M 0 calc(h) H calc(w) V 0',
                },
                label: {
                    text: 'Timeline Processing',
                    textVerticalAnchor: 'bottom',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -10,
                        maxLineCount: 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5*w)',
                    y: `calc(h-${TEXT_MARGIN})`,
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
            selector: 'line'
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }
}

export class VSMTimelineTotal extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMTimelineTotal',
            size: {
                width: 120,
                height: 80
            },
            length: 80,
            attrs: {
                body: {
                    fill: FILL_COLOR,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    width: 'calc(w)',
                    height: 'calc(h)',
                },
                line: {
                    strokeWidth: 3,
                    stroke: OUTLINE_COLOR,
                    strokeLinecap: 'round',
                    fill: 'transparent',
                    d: `M -${length} calc(0.5 * h) H calc(w)`,
                },
                label: {
                    text: 'Timeline Processing',
                    textVerticalAnchor: 'bottom',
                    textAnchor: 'middle',
                    textWrap: {
                        height: null
                    },
                    y: `calc(0.5*h-${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                },
                labelTotalWaiting: {
                    text: 'Total Waiting',
                    textVerticalAnchor: 'bottom',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        height: `calc(h/2-${2*TEXT_MARGIN})`,
                        ellipsis: true
                    },
                    x: 'calc(0.5*w)',
                    y: `calc(0.5*h-${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                },
                labelTotalProcessing: {
                    text: 'Total Processing',
                    textVerticalAnchor: 'bottom',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        height: `calc(h/2-${2*TEXT_MARGIN})`,
                        ellipsis: true
                    },
                    x: 'calc(0.5*w)',
                    y: `calc(h - ${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            }
        }
    }

    preinitialize(): void {
        this.markup = [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'path',
            selector: 'line'
        }, {
            tagName: 'text',
            selector: 'label'
        }, {
            tagName: 'text',
            selector: 'labelTotalWaiting'
        }, {
            tagName: 'text',
            selector: 'labelTotalProcessing'
        }];
    }

    initialize(): void {
        super.initialize(...arguments);
        this.on('change', (_, opt) => {
            if (!this.hasChanged('length')) return;
            this.resetLength(opt);
        });
        this.resetLength();
    }

    protected resetLength(opt?: dia.Cell.Options) {
        const length = this.get('length') || 0;
        this.attr({
            line: {
                d: `M -${length} calc(0.5 * h) H calc(w)`
            },
            label: {
                x: -length / 2,
                textWrap: {
                    width: length - 10
                }
            }
        }, opt);
    }
}
