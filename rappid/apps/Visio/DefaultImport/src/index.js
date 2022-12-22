/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


document.body.classList.add('loading');

joint.format.Visio.VisioArchive.fromURL('network.vsdx').then(function(archive) {

    var page = archive.document.getPages()[0];

    var graph = new joint.dia.Graph();

    var paper = new joint.dia.Paper({
        el: document.getElementById('paper'),
        model: graph,
        interactive: false,
        width: page.width,
        height: page.height,
        sorting: joint.dia.Paper.sorting.APPROX,
        async: true,
        frozen: true
    });

    page.getContent().then(function(content) {
        var cells = content.toGraphCells();
        graph.resetCells(cells);
        paper.unfreeze();
        document.body.classList.remove('loading');
    });
});
