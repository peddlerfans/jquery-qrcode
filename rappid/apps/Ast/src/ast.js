/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


(function(CodeMirror, esprima, joint) {

    joint.dia.Element.define('ast.Node', {
        attrs: {
            rect: {
                width: 'calc(w)',
                height: 'calc(h)',
                rx: 5,
                ry: 5,
                stroke: 'none'
            },
            text: {
                textWrap: { width: -30 },
                x: 'calc(0.5 * w)',
                y: 'calc(0.5 * h)',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
                fill: 'white',
                fontSize: 10,
                fontFamily: '\'Helvetica Neue Light\',\'Helvetica Neue\',\'Source Sans Pro\',sans-serif',
                letterSpacing: '1px'
            },
            path: {
                x: 'calc(0.5 * w)',
                y: 'calc(h)',
                stroke: '#666',
                d: 'M 0 0 0 10 M -5 10 5 10',
                visibility: 'hidden',
                pointerEvents: 'none'
            }
        }
    }, {
        markup: '<rect/><text/><path/>',
        toggleCollapseState: function(collapsed) {
            this.attr('path/visibility', collapsed ? 'visible' : 'hidden');
        }
    });

    joint.dia.Link.define('ast.Link', {
        attrs: {
            path: {
                fill: 'none',
                stroke: '#666',
                pointerEvents: 'none',
                targetMarker: {
                    type: 'path',
                    fill: '#666',
                    stroke: '#666',
                    d: 'M 4 -4 0 0 4 4 z'
                }
            }
        }
    }, {
        markup: '<path class="connection"/>'
    });

    var graph = new joint.dia.Graph;

    var treeLayout = new joint.layout.TreeLayout({
        graph: graph,
        direction: 'BR'
    });

    var paper = new joint.dia.Paper({
        width: 1000,
        height: 1000,
        model: graph,
        clickThreshold: 5,
        interactive: false
    });

    var paperScroller = new joint.ui.PaperScroller({
        paper: paper,
        baseWidth: 1,
        baseHeight: 1,
        contentOptions: { padding: 10 },
        padding: 20
    });

    paperScroller.$el.appendTo('#paper');

    paper.on({
        'blank:pointerdown': function(evt, x, y) {
            // Enable panning.
            paperScroller.startPanning(evt, x, y);
        },
        'blank:mousewheel': function(evt, x, y, delta) {
            // Enable zooming
            mousewheelZoom(evt, delta);
        },
        'cell:mousewheel': function(cellView, evt, x, y, delta) {
            // Enable zooming
            mousewheelZoom(evt, delta);
        }
    });

    function mousewheelZoom(evt, delta) {
        evt.preventDefault();
        var origin = paperScroller.getVisibleArea().center();
        paperScroller.zoom(delta * .15, { ox: origin.x, oy: origin.y, max: 5, min: .2 });
    }

    // Construct the JointJS elements and links out of the AST.
    // --------------------------------------------------------

    // TODO: ForStatement, ForOfStatement

    function getChildren(node) {

        switch (node.type) {

            case 'Program':
                return node.body;

            case 'VariableDeclaration':
                return node.declarations;

            case 'VariableDeclarator':
                return node.init ? [node.id, node.init] : [node.id];

            case 'ExpressionStatement':
                return [node.expression];

            case 'BinaryExpression':
                return [node.left, node.right];

            case 'AssignmentExpression':
                return [node.left, node.right];

            case 'CallExpression':
                return [node.callee, { type: 'arguments', arguments: node.arguments }];

            case 'arguments':
                return node.arguments;

            case 'MemberExpression':
                return [node.object, node.property];

            case 'NewExpression':
                return node.arguments;

            case 'ObjectExpression':
                return node.properties;

            case 'Property':
                return [node.key, node.value];

            case 'FunctionDeclaration':
                return [node.body];

            case 'FunctionExpression':
                return [node.body];

            case 'BlockStatement':
                return node.body;

            case 'ReturnStatement':
                return node.argument ? [node.argument] : [];

            case 'UnaryExpression':
                return [node.argument];

            case 'IfStatement':
                return [node.test, node.consequent];

            case 'ConditionalExpression':
                return [node.test, node.consequent, node.alternate];

            default:
                return [];
        }
    }

    function getLabel(node) {

        switch (node.type) {

            case 'Identifier':
                return node.name;

            case 'Literal':
                return node.raw;

            case 'UnaryExpression':
                return node.operator;

            case 'BinaryExpression':
                return node.operator;

            case 'AssignmentExpression':
                return node.operator;

            case 'FunctionDeclaration':
                var params1 = _.map(node.params, 'name').join(',');
                return 'function ' + (node.id && node.id.name || '') + '(' + params1 + ')';

            case 'FunctionExpression':
                var params2 = _.map(node.params, 'name').join(',');
                return 'function ' + (node.id && node.id.name || '') + '(' + params2 + ')';

            default:
                return node.type;
        }
    }

    function getElementColor(node) {

        var color = ({

            'Program': 'black',
            'VariableDeclarator': '#414141',
            'arguments': '#63c1f1',
            'BinaryExpression': '#fcbc2a',
            'UnaryExpression': '#fcbc2a',
            'AssignmentExpression': '#fcbc2a',
            'Identifier': '#ff5246',
            'Literal': '#77c63d'

        })[node.type];

        return color || '#232323';
    }

    var program;

    function displayTree() {

        program = $('#program').val();

        var syntax = esprima.parse(program, {
            loc: true,
            range: true,
            raw: true,
            tokens: true,
            comment: true
        });

        var cells = joint.graphUtils.constructTree(syntax, {
            children: getChildren,
            makeElement: function(node) {
                return new joint.shapes.ast.Node({
                    size: { width: 120, height: 30 },
                    attrs: {
                        text: { textWrap: { text: getLabel(node) }},
                        rect: { fill: getElementColor(node) }
                    },
                    node: node
                });
            },
            makeLink: function(parentElement, childElement) {
                return new joint.shapes.ast.Link({
                    source: { id: parentElement.id, selector: 'rect' },
                    target: { id: childElement.id, selector: 'rect' }
                });
            }
        });

        paperScroller.zoom(4, { absolute: true });
        graph.resetCells(cells);
        treeLayout.layout();
        paperScroller.adjustPaper();
        paperScroller.transitionToRect(graph.getBBox(), { visibility: .9 });

        $('#stats .stats-n-nodes').text(graph.getElements().length);
        $('#stats .stats-n-tokens').text(syntax.tokens.length);
        $('#stats .stats-tokens').empty();

        syntax.tokens.forEach(function(token) {
            var $li = $('<li/>', {
                text: token.type + '(',
                'data-range': JSON.stringify(token.range)
            });
            $li.append($('<span/>', { text: token.value }));
            $li.append(')');
            $('#stats .stats-tokens').append($li);
        });
    }

    // Show/hide subtree on cell click.
    // --------------------------------

    var subtrees = {};

    paper.on('cell:pointerclick', function(cellView) {
        var cell = cellView.model;
        if (subtrees[cell.id]) {
            // expand
            graph.addCells(subtrees[cell.id]);
            delete subtrees[cell.id];
            cell.toggleCollapseState(false);
        } else {
            // collapse
            var successors = graph.getSuccessors(cell);
            if (successors.length > 0) {
                subtrees[cell.id] = [].concat(
                    graph.getSubgraph(successors),
                    graph.getConnectedLinks(cell, { outbound: true })
                );
                successors.forEach(function(successor) {
                    successor.remove();
                });
                cell.toggleCollapseState(true);
            }
        }
        treeLayout.layout();
        paperScroller.adjustPaper();
    });

    // UI
    // --

    var codeEditor = CodeMirror.fromTextArea(document.getElementById('program'), {
        lineNumbers: true,
        mode: 'javascript'
    });

    codeEditor.on('change', function() {
        $('#program').val(codeEditor.getValue());
    });

    function loadProgram(programName) {
        var code = $('#program-' + programName).text();
        $('#program').val(code);
        codeEditor.setValue(code);
        displayTree();
    }

    function clearProgram() {
        $('#program').val('');
        $('.stats-tokens').empty();
        codeEditor.setValue('');
        graph.clear();
    }

    $('#select-program').on('change', function() {
        loadProgram($(this).val());
    });
    $('#btn-clear').on('click', function() {
        clearProgram();
    });
    $('#btn-visualize').on('click', function() {
        displayTree();
    });
    $('#btn-export-svg').on('click', function() {
        paper.openAsSVG({ useComputedStyles: false });
    });
    $('#btn-export-png').on('click', function() {
        paper.openAsPNG({ useComputedStyles: false });
    });

    // tooltips

    new joint.ui.Tooltip({
        rootTarget: paper.cells,
        target: '.joint-element',
        content: function(element) {
            var cell = paper.findView(element).model;
            var node = cell.get('node');
            var snippet = '';
            if (node.range) {
                snippet = program.substring(node.range[0], node.range[1]);
                snippet = snippet.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
            }
            return '<b>' + node.type + '</b>' + snippet;
        },
        direction: 'left',
        padding: 20,
        animation: { delay: '200ms' }
    });

    // highlight tokens

    var tokenMarker;

    function unhighlightRange() {
        if (tokenMarker) tokenMarker.clear();
    }

    function highlightRange(range) {
        if (!range) return null;
        var fromIndex = codeEditor.posFromIndex(range[0]);
        var toIndex = codeEditor.posFromIndex(range[1]);
        return codeEditor.markText(fromIndex, toIndex, {
            className: 'syntax-token'
        });
    }

    $('.stats-tokens').on('mouseenter', 'li', function(evt) {
        var $li = $(evt.currentTarget);
        var range = $li.data('range');
        unhighlightRange();
        tokenMarker = highlightRange(range);
    });
    $('.stats-tokens').on('mouseleave', 'li', function() {
        unhighlightRange();
    });

    paper.on({
        'element:mouseenter': function(elementView) {
            var range = elementView.model.get('node').range;
            unhighlightRange();
            tokenMarker = highlightRange(range);
        },
        'element:mouseleave': function() {
            unhighlightRange();
        }
    });

    // Load Example
    // ------------

    loadProgram('function');

})(window.CodeMirror, window.esprima, joint);

