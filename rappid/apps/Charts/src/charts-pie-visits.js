/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


(function() {

    var graph = new joint.dia.Graph;

    new joint.dia.Paper({ el: $('#paper-pie-visits'), width: 400, height: 200, gridSize: 1, model: graph });

    var chart = new joint.shapes.chart.Pie({
        position: { x: 120, y: 30 },
        size: { width: 150, height: 150 },
        series: [ { data: [
            { value: 40, label: 'Organic', fill: {
                type: 'linearGradient', stops: [ { offset: '0%', color: '#b4f200' }, { offset: '80%', color: '#759d00' } ],
                attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
            }},
            { value: 20, label: 'Email', fill: {
                type: 'linearGradient', stops: [ { offset: '0%', color: '#E67E22' }, { offset: '80%', color: '#D35400' } ],
                attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
            }},
            { value: 20, label: 'Social', fill: {
                type: 'linearGradient', stops: [ { offset: '0%', color: '#ff3019' }, { offset: '80%', color: '#cf0404' } ],
                attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
            }},
            { value: 20, label: 'Referral', fill: {
                type: 'linearGradient', stops: [ { offset: '0%', color: '#b2e1ff' }, { offset: '80%', color: '#66b6fc' } ],
                attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }

            }}
        ] }],
        attrs: {
            '.data': {
                filter: { name: 'dropShadow', args: { dx: 0, dy: 0, blur: 3, color: 'black' }}
            },
            '.slice-inner-label': { style: { 'text-shadow': '0 0 1px black' }, 'font-weight': 'bold' }
        }
    });

    graph.addCell(chart);

})();
