import { g, dia, ui, shapes, layout } from '@clientio/rappid';
import './shapes';

export const init = () => {
    const canvas = document.getElementById('canvas');
    
    const graph = new dia.Graph();
    
    const paper = new dia.Paper({
        model: graph,
        width: 1000,
        height: 600,
        gridSize: 10,
        async: true,
        frozen: true,
        clickThreshold: 10,
        sorting: dia.Paper.sorting.APPROX,
        background: { color: '#F3F7F6' },
        defaultConnector: {
            name: 'rounded'
        },
        defaultAnchor: {
            name: 'modelCenter'
        },
        defaultConnectionPoint: {
            name: 'boundary'
        },
        defaultLink: () => new shapes.app.Link()
    });
    
    const scroller = new ui.PaperScroller({
        paper,
        autoResizePaper: true,
        cursor: 'grab',
        baseWidth: 1,
        baseHeight: 1,
        contentOptions: {
            allowNewOrigin: 'any',
            padding: 100,
            useModelGeometry: true
        }
    });
    
    const members = [
        member('Founder & Chairman', 'Pierre Omidyar', 'assets/images/1.png'),
        member('President & CEO', 'Margaret C. Whitman', 'assets/images/2.png'),
        member('President, PayPal', 'Mia Thompson', 'assets/images/3.png'),
        member('President, Ebay Global Marketplaces', 'Devin Wenig', 'assets/images/4.png'),
        member('Senior Vice President Human Resources', 'Olivia S. Skoll', 'assets/images/5.png'),
        member('Senior Vice President Controller', 'Sophia P. Westly', 'assets/images/6.png')
    ];
    
    const connections = [
        link(members[0], members[1]),
        link(members[1], members[2]),
        link(members[1], members[3]),
        link(members[1], members[4]),
        link(members[1], members[5])
    ];
    
    graph.addCells([...members, ...connections]);
    canvas.appendChild(scroller.el);
    
    const treeLayout = new layout.TreeLayout({
        graph: graph,
        direction: 'R',
        parentGap: 75,
        siblingGap: 41
    });
    
    new ui.TreeLayoutView({
        paper,
        model: treeLayout,
        className: 'tree-layout member-tree-layout',
        useModelGeometry: true,
        clone: (element) => {
            const clone = element.clone();
            clone.attr(['memberAddButtonBody', 'display'], 'none');
            clone.attr(['memberRemoveButtonBody', 'display'], 'none');
            clone.attr(['body', 'stroke'], 'none');
            return clone;
        },
        previewAttrs: {
            parent: {
                rx: 40,
                ry: 40
            }
        }
    });
    
    treeLayout.layout();
    
    scroller.render().centerContent({ useModelGeometry: true });
    
    paper.unfreeze();
    
    paper.on('element:pointermove', (elementView) => {
        paper.el.classList.add('hide-buttons');
        paper.el.classList.remove('show-buttons');
        elementView.model.attr(['body', 'strokeWidth'], 2);
        
    });
    
    paper.on('element:pointerup', (elementView) => {
        paper.el.classList.remove('hide-buttons');
        paper.el.classList.add('show-buttons');
        elementView.model.attr(['body', 'strokeWidth'], 1);
    });
    
    paper.on('blank:pointerdown', (evt) => scroller.startPanning(evt));
    
    paper.on('element:member:add', (elementView, evt) => {
        evt.stopPropagation();
        // Adding a new member
        const newMember = member('Employee', 'New Employee', 'assets/images/1.png');
        const newConnection = link(elementView.model, newMember);
        graph.addCells([newMember, newConnection]);
        treeLayout.layout();
    });
    
    paper.on('element:remove', (elementView, evt) => {
        evt.stopPropagation();
        const preventReconnection = evt.ctrlKey || evt.metaKey;
        // A member removal
        const element = elementView.model;
        const [parent] = graph.getNeighbors(element, { inbound: true });
        if (parent && !preventReconnection) {
            const siblingRank = element.get('siblingRank');
            const connectedLinks = graph.getConnectedLinks(element, {
                outbound: true
            });
            connectedLinks.forEach((link) => {
                link.source(parent);
                const child = link.getTargetCell();
                // Scale the children ranks between 0 and 1
                const scaledChildRank = g.scale.linear([0, connectedLinks.length], [0, 1], child.get('siblingRank'));
                child.set('siblingRank', siblingRank + scaledChildRank);
            });
        }
        element.remove();
        treeLayout.layout();
    });
    
    paper.on('element:edit', (elementView, evt) => {
        evt.stopPropagation();
        // A member edit
        const inspector = new ui.Inspector({
            cellView: elementView,
            live: false,
            className: 'joint-inspector joint-member-inspector',
            inputs: {
                'attrs/label/text': {
                    type: 'text',
                    label: 'Name',
                    index: 1
                },
                'attrs/description/text': {
                    type: 'text',
                    label: 'Rank',
                    index: 2
                },
                'attrs/icon/xlinkHref': {
                    type: 'select-button-group',
                    target: '.joint-dialog .fg',
                    label: 'Avatar',
                    index: 3,
                    options: avatarOptions(elementView)
                }
            }
        });
        
        const dialog = new ui.Dialog({
            type: 'inspector-dialog',
            width: 350,
            title: 'Edit Member',
            className: 'joint-dialog joint-member-dialog',
            closeButton: false,
            content: inspector.render().el,
            buttons: [{
                    content: 'Cancel',
                    action: 'cancel',
                }, {
                    content: 'Apply',
                    action: 'apply'
                }]
        });
        
        dialog.on({
            'action:cancel': () => {
                inspector.remove();
                dialog.close();
            },
            'action:apply': () => {
                inspector.updateCell();
                inspector.remove();
                dialog.close();
            }
        });
        dialog.open();
    });
    
    // Tree Layout Rank Selection
    const currentDirection = treeLayout.get('direction');
    const options = [
        { value: 'L', content: 'Right-Left' },
        { value: 'R', content: 'Left-Right' },
        { value: 'T', content: 'Bottom-Top' },
        { value: 'B', content: 'Top-Bottom' }
    ].map(option => Object.assign({}, option, { selected: option.value === currentDirection }));
    
    const directionPicker = new ui.SelectBox({
        width: 150,
        options
    });
    
    directionPicker.on('option:select', (option) => {
        graph.getCells().forEach(cell => cell.unset('direction'));
        treeLayout.set('direction', option.value);
        treeLayout.layout();
        if (!paper.hasScheduledUpdates()) {
            return;
        }
        paper.once('render:done', function () {
            scroller.scrollToContent({ useModelGeometry: true });
        });
    });
    
    directionPicker.render().$el.appendTo('#orgchart-direction');
    document.getElementById('orgchart-direction-container').style.visibility = 'visible';
};

const member = (rank, name, image) => {
    return new shapes.app.Member({
        attrs: {
            label: {
                text: name
            },
            description: {
                text: rank
            },
            icon: {
                xlinkHref: image
            }
        }
    });
};

const link = (source, target) => {
    return new shapes.app.Link({
        source: { id: source.id },
        target: { id: target.id },
    });
};

const avatarOptions = (elementView) => {
    const options = [];
    const ASSETS_LENGTH = 10;
    for (let i = 0; i++, i <= ASSETS_LENGTH;) {
        const asset = `assets/images/${i}.png`;
        const option = {
            icon: asset,
            value: asset,
            selected: elementView.model.attr(['icon', 'xlinkHref']) === asset
        };
        options.push(option);
    }
    return options;
};

