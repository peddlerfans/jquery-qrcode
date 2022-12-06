// import { optimizeDeps } from "vite";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import * as appShapes from '../composables/JointJs/app-shapes';
const graph = new joint.dia.Graph({}, { cellNamespace: joint.shapes });
const paper = new joint.dia.Paper({
  model: graph,
  background: {
    color: '#F8F9FA',
  },
  frozen: true,
  async: true,
  sorting: joint.dia.Paper.sorting.APPROX,
  cellViewNamespace: joint.shapes,

});




const getStencilGroups = () => {
  return {
    standard: { index: 1, label: 'Standard shapes', closed: true },
    fsa: { index: 2, label: 'State machine' },
    uml: { index: 3, label: 'UML' }
  };
}
paper.unfreeze();
export class StencilService {

  stencil !: joint.ui.Stencil
  create(paperScroller: joint.ui.PaperScroller, snaplines: joint.ui.Snaplines) {
    this.stencil = new joint.ui.Stencil({
      paper: paperScroller,
      snaplines: snaplines,
      width: 240,
      groups: this.getStencilGroups(),
      dropAnimation: true,
      groupsToggleButtons: true,
      paperOptions: function () {
        return {
          model: new joint.dia.Graph({}, {
            cellNamespace: appShapes
          }),
          cellViewNamespace: appShapes
        };
      },
      search: {
        '*': ['type', 'attrs/text/text', 'attrs/root/dataTooltip', 'attrs/label/text'],
        'org.Member': ['attrs/.rank/text', 'attrs/root/dataTooltip', 'attrs/.name/text']
      },
      layout: {
        columns: 2,
        marginX: 10,
        marginY: 10,
        columnGap: 10,
        columnWidth: 100,
        // reset defaults
        resizeToFit: false,
        dx: 0,
        dy: 0
      },
      // Remove tooltip definition from clone
      dragStartClone: (cell: joint.dia.Cell) => cell.clone().removeAttr('root/dataTooltip')
    })
  }
  setShapes() {
    this.stencil.load(this.getStencilShapes());
  }

  getStencilGroups() {
    return <{ [key: string]: joint.ui.Stencil.Group }>{
      standard: { index: 1, label: 'Standard shapes' },
      fsa: { index: 2, label: 'State machine' }
    };
  }
  getStencilShapes() {
    return {
      standard: [
        {
          type: 'standard.Rectangle',
          size: { width: 50, height: 35 },
          attrs: {
            root: {
              dataTooltip: 'Rectangle',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            body: {
              rx: 2,
              ry: 2,
              width: 40,
              height: 20,
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0'
            },
            label: {
              text: 'rect',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          }
        },
        {
          type: 'standard.Ellipse',
          size: { width: 50, height: 35 },
          attrs: {
            root: {
              dataTooltip: 'Ellipse',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            body: {
              width: 40,
              height: 20,
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0'
            },
            label: {
              text: 'ellipse',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          }
        },
        {
          type: 'app.RectangularModel',
          size: { width: 50, height: 40 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'Rectangle with ports',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            body: {
              fill: 'transparent',
              rx: 2,
              ry: 2,
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0'
            },
            label: {
              text: 'rect',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          },
          ports: {
            items: [
              { group: 'in' },
              { group: 'in' },
              { group: 'out' }
            ]
          }
        },
        {
          type: 'app.CircularModel',
          size: { width: 50, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'Ellipse with ports',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            body: {
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'ellipse',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          },
          ports: {
            items: [
              { group: 'in' },
              { group: 'in' },
              { group: 'out' }
            ]
          }
        },
        {
          type: 'standard.HeaderedRectangle',
          size: { width: 50, height: 35 },
          attrs: {
            root: {
              dataTooltip: 'Rectangle with header',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            body: {
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0'
            },
            header: {
              stroke: '#31d0c6',
              fill: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
              height: 20
            },
            bodyText: {
              textWrap: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie.',
                width: -10,
                height: -20,
                ellipsis: true
              },
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
              refY2: 12,
            },
            headerText: {
              text: 'header',
              fill: '#f6f6f6',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
              refY: 12
            }
          }
        }
      ],
      fsa: [
        {
          type: 'fsa.StartState',
          size: { width: 60, height: 60 },
          preserveAspectRatio: true,
          attrs: {
            root: {
              dataTooltip: 'Start State',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            circle: {
              width: 50,
              height: 30,
              fill: '#61549c',
              'stroke-width': 0
            },
            text: {
              text: 'startState',
              fill: '#c6c7e2',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'font-size': 11,
              'stroke-width': 0
            }
          }
        },
        {
          type: 'fsa.EndState',
          size: { width: 60, height: 60 },
          preserveAspectRatio: true,
          attrs: {
            root: {
              dataTooltip: 'End State',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            '.inner': {
              fill: '#6a6c8a',
              stroke: 'transparent'
            },
            '.outer': {
              fill: 'transparent',
              stroke: '#61549c',
              'stroke-width': 2,
              'stroke-dasharray': '0'
            },
            text: {
              text: 'endState',
              fill: '#c6c7e2',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'font-size': 11,
              'stroke-width': 0
            }
          }
        },
        {
          type: 'fsa.State',
          size: { width: 60, height: 60 },
          preserveAspectRatio: true,
          attrs: {
            root: {
              dataTooltip: 'State',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            circle: {
              fill: '#6a6c8a',
              stroke: '#61549c',
              'stroke-width': 2,
              'stroke-dasharray': '0'
            },
            text: {
              text: 'state',
              fill: '#c6c7e2',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'font-size': 11,
              'stroke-width': 0
            }
          }
        }
      ]
    };
  }

}


  let getStencil:joint.ui.Stencil = new joint.ui.Stencil({
    paper: paper,
    // paper: new joint.ui.PaperScroller({paper : new joint.dia.Paper({width:100,height:100})}),
    snaplines: new joint.ui.Snaplines({paper : paper}),
    width: 100,
    dropAnimation: true,
    groupsToggleButtons: true,
      paperOptions: function () {
        return {
            model: new joint.dia.Graph({}, {
                cellNamespace: joint.shapes
            }),
            cellViewNamespace: joint.shapes
        };
    },
    layout: {
      columns: 2,
      marginX: 10,
      marginY: 10,
      columnGap: 10,
      columnWidth: 100,
      // reset defaults
      resizeToFit: false,
      dx: 0,
      dy: 0
  },
    search: {
      '*': ['type', 'attrs/text/text', 'attrs/root/dataTooltip', 'attrs/label/text'],
      'org.Member': ['attrs/.rank/text', 'attrs/root/dataTooltip', 'attrs/.name/text']
  },
  dragStartClone:(cell: joint.dia.Cell<joint.dia.Cell.Attributes, joint.dia.ModelSetOptions>) => {
    let nc = cell.clone();
    nc.attr('label/text',"I'm here")
 //    this.graph.addCell(nc)
     return  nc;
 },
 groups:getStencilGroups()
  })

// Stencil().load(getStencilShapes())
// export  {getStencil , getStencilShapes}