import joint from '../../node_modules/@clientio/rappid/rappid.js';
import * as dagre from 'dagre';
import { StencilService } from "./stencil";
import { ToolbarService } from "./Toolbar";
import { HaloService } from './haloService';
import { InspectorService } from './inspector'
import { KeyboardService } from "./keyboard"
import * as appShapes from '../composables/jointJs/app-shapes';
import { MBTShapeInterface } from './customElements/MBTShapeInterface';

class MbtServe {
    el !: any;

    graph!: joint.dia.Graph;
    paper!: joint.dia.Paper;
    paperScroller!: joint.ui.PaperScroller;

    commandManager!: joint.dia.CommandManager;
    snaplines!: joint.ui.Snaplines;
    clipboard!: joint.ui.Clipboard;
    selection!: joint.ui.Selection;
    navigator!: joint.ui.Navigator;

    stencilService !: StencilService;
    toolbarService !: ToolbarService;
    haloService !: HaloService;
    InspectorService !: InspectorService;
    keyboardService !: KeyboardService;

    constructor(
        el: HTMLElement,
        stencilService: StencilService,
        toolbarService: ToolbarService,
        haloService: HaloService,
        InspectorService: InspectorService,
        keyboardService: KeyboardService
    ) {
        this.el = el;
        // apply current joint js theme
        const view = new joint.mvc.View({ el });
        view.delegateEvents({
            'mouseup input[type="range"]': (evt) => evt.target.blur()
        });

        this.stencilService = stencilService;
        this.toolbarService = toolbarService;
        this.haloService = haloService;
        this.InspectorService = InspectorService
        this.keyboardService = keyboardService
    }
    startRappid() {

        joint.setTheme('material');
        // joint.setTheme('dark');
        // joint.setTheme('modern');

        this.initializePaper();
        this.initializeStencil();
        this.initializeToolbar();
        this.initializeTooltips();
        this.initializeSelection();
        this.initializeToolsAndInspector();
        this.initializeKeyboardShortcuts();
        this.initializeNavigator();

    }
    initializeSelection() {

        this.clipboard = new joint.ui.Clipboard();
        this.selection = new joint.ui.Selection({
            paper: this.paper,
            useModelGeometry: true,
            translateConnectedLinks: joint.ui.Selection.ConnectedLinksTranslation.SUBGRAPH,
        });
        this.selection.collection.on('reset add remove', this.onSelectionChange.bind(this));

        const keyboard = this.keyboardService.keyboard;

        // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
        // Otherwise, initiate paper pan.
        this.paper.on('blank:pointerdown', (evt: joint.dia.Event, x: number, y: number) => {

            if (keyboard.isActive('shift', evt)) {
                this.selection.startSelecting(evt);
            } else {
                this.selection.collection.reset([]);
                this.paperScroller.startPanning(evt);
                this.paper.removeTools();
            }
        });

        this.paper.on('element:pointerdown', (elementView: joint.dia.ElementView, evt: joint.dia.Event) => {

            // Select an element if CTRL/Meta key is pressed while the element is clicked.
            if (keyboard.isActive('ctrl meta', evt)) {
                this.selection.collection.add(elementView.model);
            }

        });

        this.graph.on('remove', (cell: joint.dia.Cell) => {

            // If element is removed from the graph, remove from the selection too.
            if (this.selection.collection.has(cell)) {
                this.selection.collection.reset(this.selection.collection.models.filter(c => c !== cell));
            }

        });

        this.selection.on('selection-box:pointerdown', (elementView: joint.dia.ElementView, evt: joint.dia.Event) => {

            // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
            if (keyboard.isActive('ctrl meta', evt)) {
                this.selection.collection.remove(elementView.model);
            }

        }, this);

        this.selection.on('selection-box:pointerup', (elementView: joint.dia.ElementView, evt: joint.dia.Event) => {

            if (evt.button === 2) {
                evt.stopPropagation();
                if (evt.clientX && evt.clientY) {
                    this.renderContextToolbar({ x: evt.clientX, y: evt.clientY }, this.selection.collection.toArray());
                }
            }

        }, this);
    }

    // keyboard初始化
    initializeKeyboardShortcuts() {

        this.keyboardService.create(
            this.graph, this.clipboard, this.selection, this.paperScroller, this.commandManager);
    }

    // 初始化缩略图
    initializeNavigator() {

        const navigator = this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: false,
            paperOptions: {
                async: true,
                sorting: joint.dia.Paper.sorting.NONE,
                elementView: appShapes.NavigatorElementView,
                linkView: appShapes.NavigatorLinkView,
                cellViewNamespace: { /* no other views are accessible in the navigator */ }
            }
        });

        this.renderPlugin('.navigator-container', navigator);
    }

    onSelectionChange() {
        const { paper, selection } = this;
        const { collection } = selection;
        paper.removeTools();
        joint.ui.Halo.clear(paper);
        joint.ui.FreeTransform.clear(paper);
        joint.ui.Inspector.close();
        if (collection.length === 1) {
            const primaryCell: joint.dia.Cell = collection.first();
            const primaryCellView = paper.findViewByModel(primaryCell);
            selection.destroySelectionBox(primaryCell);
            this.selectPrimaryCell(primaryCellView);
        } else if (collection.length === 2) {
            collection.each(function (cell: joint.dia.Cell) {
                selection.createSelectionBox(cell);
            });
        }
    }
    // 获取选择元素内容的函数
    selectPrimaryCell(cellView: joint.dia.CellView) {
        let cell: any
        cell = cellView.model;
        if (cell.isElement()) {


            this.selectPrimaryElement(<joint.dia.ElementView>cellView);
        } else {
            this.selectPrimaryLink(<joint.dia.LinkView>cellView);
        }
        this.InspectorService.create(cell);
    }

    selectPrimaryElement(elementView: joint.dia.ElementView) {
        let element: any
        element = elementView.model;
        new joint.ui.FreeTransform({
            cellView: elementView,
            allowRotation: false,
            preserveAspectRatio: !!element.get('preserveAspectRatio'),
            allowOrthogonalResize: element.get('allowOrthogonalResize') !== false
        }).render();

        this.haloService.create(elementView);
    }

    selectPrimaryLink(linkView: joint.dia.LinkView) {

        const ns = joint.linkTools;
        const toolsView = new joint.dia.ToolsView({
            name: 'link-pointerdown',
            tools: [
                new ns.Vertices(),
                new ns.SourceAnchor(),
                new ns.TargetAnchor(),
                new ns.SourceArrowhead(),
                new ns.TargetArrowhead(),
                new ns.Segments,
                new ns.Boundary({ padding: 15 }),
                new ns.Remove({ offset: -20, distance: 40 })
            ]
        });

        linkView.addTools(toolsView);
    }

    initializePaper() {
        console.log(joint);
        
        const graph = this.graph = new joint.dia.Graph({}, {
            cellNamespace: appShapes
        });

        this.commandManager = new joint.dia.CommandManager({ graph: graph });

        const paper = this.paper = new joint.dia.Paper({
            width: 1100,
            height: 1000,
            gridSize: 10,
            drawGrid: true,
            model: graph,
            cellViewNamespace: appShapes,
            defaultLink: <joint.dia.Link>new appShapes.app.Link(),
            defaultConnectionPoint: appShapes.app.Link.connectionPoint,
            interactive: { linkMove: false },
            async: true,
            sorting: joint.dia.Paper.sorting.APPROX,
            embeddingMode:true,
            validateEmbedding:(cv,pv) => {
                if (pv.model?.ifEmbedable) {
                    return pv.model.ifEmbedable(cv.model)
                }
                return false
            },
            validateConnection: function(cellViewS, _magnetS, cellViewT, _magnetT, end, _linkView) {

                const shape = <MBTShapeInterface><unknown>cellViewT.model;
                if(shape.ifDisallowLink && shape.ifDisallowLink() ){
                    return false;
                        
                    
                }           
             

                return (end === 'target' ? cellViewT : cellViewS) instanceof joint.dia.ElementView;
            }
        });

        paper.on('blank:contextmenu', (evt) => {
            if (evt.clientX && evt.clientY) {
                this.renderContextToolbar({ x: evt.clientX, y: evt.clientY });
            }
        });

        paper.on('cell:contextmenu', (cellView, evt) => {
            if (evt.clientX && evt.clientY && cellView.model) {
                this.renderContextToolbar({ x: evt.clientX, y: evt.clientY }, [cellView.model]);
            }
        });

        this.snaplines = new joint.ui.Snaplines({ paper: paper });

        const paperScroller = this.paperScroller = new joint.ui.PaperScroller({
            paper,
            autoResizePaper: true,
            scrollWhileDragging: true,
            cursor: 'grab'
        });

        this.renderPlugin('.paper-container', paperScroller);
        paperScroller.render().center();

        paper.on('paper:pan', (evt, tx, ty) => {
            evt.preventDefault();
            paperScroller.el.scrollLeft += tx;
            paperScroller.el.scrollTop += ty;
        });

        paper.on('paper:pinch', (_evt, ox, oy, scale) => {
            // the default is already prevented
            const zoom = paperScroller.zoom();
            paperScroller.zoom(zoom * scale, { min: 0.2, max: 5, ox, oy, absolute: true });
        });

    }
    initializeStencil() {

        const { stencilService, paperScroller, snaplines } = this;
        stencilService.create(paperScroller, snaplines);

        this.renderPlugin('.stencil-container', stencilService.stencil);
        stencilService.setShapes();

        stencilService.stencil.on('element:drop', (elementView: joint.dia.ElementView) => {
            
            this.selection.collection.reset([elementView.model]);
        });
    }
    initializeToolbar() {

        this.toolbarService.create(this.commandManager, this.paperScroller);
        console.log(this.toolbarService);

        this.toolbarService.toolbar.on({
            'svg:pointerclick': this.openAsSVG.bind(this),
            'png:pointerclick': this.openAsPNG.bind(this),
            'to-front:pointerclick': this.applyOnSelection.bind(this, 'toFront'),
            'to-back:pointerclick': this.applyOnSelection.bind(this, 'toBack'),
            'layout:pointerclick': this.layoutDirectedGraph.bind(this),
            // 'snapline:change': this.changeSnapLines.bind(this),
            'clear:pointerclick': this.graph.clear.bind(this.graph),
            'print:pointerclick': this.paper.print.bind(this.paper),
            // 'grid-size:change': this.paper.setGridSize.bind(this.paper)
        });

        this.renderPlugin('.toolbar-container', this.toolbarService.toolbar);
    }
    applyOnSelection(method: string) {
        this.graph.startBatch('selection');
        this.selection.collection.models.forEach(function (model: joint.dia.Cell) { model[method](); });
        this.graph.stopBatch('selection');
    }

    changeSnapLines(checked: boolean) {

        if (checked) {
            this.snaplines.enable();
        } else {
            this.snaplines.disable();
        }
    }

    // 右键事件的触发
    renderContextToolbar(point: joint.dia.Point, cellsToCopy: joint.dia.Cell[] = []) {
        this.selection.collection.reset(cellsToCopy);
        const contextToolbar = new joint.ui.ContextToolbar({
            target: point,
            root: this.paper.el,
            padding: 0,
            vertical: true,
            anchor: 'top-left',
            tools: [
                {
                    action: 'copy',
                    content: 'Copy',
                    attrs: {
                        'disabled': cellsToCopy.length === 0
                    }
                },
                {
                    action: 'paste',
                    content: 'Paste',
                    attrs: {
                        'disabled': this.clipboard.isEmpty()
                    }
                }]
        });

        contextToolbar.on('action:copy', () => {
            contextToolbar.remove();

            this.clipboard.copyElements(cellsToCopy, this.graph);
        });

        contextToolbar.on('action:paste', () => {
            contextToolbar.remove();
            const pastedCells = this.clipboard.pasteCellsAtPoint(this.graph, this.paper.clientToLocalPoint(point));

            const elements = pastedCells.filter(cell => cell.isElement());

            // Make sure pasted elements get selected immediately. This makes the UX better as
            // the user can immediately manipulate the pasted elements.
            this.selection.collection.reset(elements);
        });
        contextToolbar.render();
    }

    // 初始化目标paper上的事件
    initializeToolsAndInspector() {
        this.paper.on('cell:pointerup', (cellView: joint.dia.CellView) => {
            const cell = cellView.model;
            const { collection } = this.selection;
            if (collection.includes(cell)) { return; }
            collection.reset([cell]);
        });

        this.paper.on('link:mouseenter', (linkView: joint.dia.LinkView) => {

            // Open tool only if there is none yet
            if (linkView.hasTools()) { return; }

            const ns = joint.linkTools;
            const toolsView = new joint.dia.ToolsView({
                name: 'link-hover',
                tools: [
                    new ns.Vertices({ vertexAdding: false }),
                    new ns.SourceArrowhead(),
                    new ns.TargetArrowhead()
                ]
            });

            linkView.addTools(toolsView);
        });

        this.paper.on('link:mouseleave', (linkView: joint.dia.LinkView) => {

            // Remove only the hover tool, not the pointerdown tool
            if (linkView.hasTools('link-hover')) {
                linkView.removeTools();
            }
        });

        this.graph.on('change', (cell: joint.dia.Cell, opt: any) => {

            if (!cell.isLink() || !opt.inspector) { return; }

            const ns = joint.linkTools;
            const toolsView = new joint.dia.ToolsView({
                name: 'link-inspected',
                tools: [
                    new ns.Boundary({ padding: 15 }),
                ]
            });

            cell.findView(this.paper).addTools(toolsView);
        });
    }


    // 初始化Tooltip
    initializeTooltips(): joint.ui.Tooltip {
        return new joint.ui.Tooltip({
            rootTarget: document.body,
            target: '[data-tooltip]',
            direction: joint.ui.Tooltip.TooltipArrowPosition.Auto,
            padding: 10
        });
    }
    exportStylesheet = '.scalable * { vector-effect: non-scaling-stroke }';
    openAsSVG() {

        this.paper.hideTools().toSVG((svg: string) => {
            new joint.ui.Lightbox({
                image: 'data:image/svg+xml,' + encodeURIComponent(svg),
                downloadable: true,
                fileName: 'Rappid'
            }).open();
            this.paper.showTools();
        }, {
            preserveDimensions: true,
            convertImagesToDataUris: true,
            useComputedStyles: false,
            stylesheet: this.exportStylesheet
        });
    }

    openAsPNG() {

        this.paper.hideTools().toPNG((dataURL: string) => {
            new joint.ui.Lightbox({
                image: dataURL,
                downloadable: true,
                fileName: 'Rappid'
            }).open();
            this.paper.showTools();
        }, {
            padding: 10,
            useComputedStyles: false,
            stylesheet: this.exportStylesheet
        });
    }

    layoutDirectedGraph() {

        joint.layout.DirectedGraph.layout(this.graph, {
            graphlib: dagre.graphlib,
            dagre: dagre,
            setVertices: true,
            rankDir: 'TB',
            marginX: 100,
            marginY: 100
        });

        this.paperScroller.centerContent({ useModelGeometry: true });
    }

    renderPlugin(selector: string, plugin: any): void {


        this.el.querySelector(selector).appendChild(plugin.el);
        plugin.render();
    }

}

export default MbtServe

