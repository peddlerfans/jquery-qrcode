/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { getMaterialPattern } from '../pattern';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

const HEADER_HEIGHT = 30;

export class VSMDedicatedProcess extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMDedicatedProcess',
            size: {
                width: 120,
                height: 120
            },
            attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR
                },
                header: {
                    width: 'calc(w)',
                    height: HEADER_HEIGHT,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR,
                },
                label: {
                    text: 'Dedicated Process',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        maxLineCount: 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: HEADER_HEIGHT / 2,
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
            tagName: 'rect',
            selector: 'header'
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }
}

export class VSMSharedProcess extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMSharedProcess',
            size: {
                width: 120,
                height: 120
            },
            attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR),
                },
                header: {
                    width: 'calc(w)',
                    height: HEADER_HEIGHT,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR,
                },
                label: {
                    text: 'Shared Process',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        maxLineCount: 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: HEADER_HEIGHT / 2,
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
            tagName: 'rect',
            selector: 'header'
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }
}

interface VSMSubprocessAttributes extends dia.Element.Attributes {
    thickness: number;
}

export class VSMSubprocess extends dia.Element<VSMSubprocessAttributes> {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMSubprocess',
            size: {
                width: 120,
                height: 80
            },
            thickness: 10,
            attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR,
                },
                stripes: {
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: SECONDARY_FILL_COLOR,
                },
                label: {
                    text: 'Subprocess',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        // width
                        height: -TEXT_MARGIN * 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: 'calc(0.5 * h)',
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
            selector: 'stripes'
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
        this.attr({
            stripes: {
                d: `M 0 0 V calc(h) h ${thickness} V 0 Z M calc(w) 0 V calc(h) h -${thickness} V 0 Z`
            },
            label: {
                textWrap: {
                    width: -(TEXT_MARGIN + thickness) * 2,
                }
            }
        }, opt);
    }
}
