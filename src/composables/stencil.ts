// import { optimizeDeps } from "vite";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import * as appShapes from '@/composables/JointJs/app-shapes';
import { i18n } from "@/locales";
const { t } = i18n.global
export class StencilService {

  stencil !: joint.ui.Stencil
  create(paperScroller: joint.ui.PaperScroller, snaplines: joint.ui.Snaplines) {
    this.stencil = new joint.ui.Stencil({
      paper: paperScroller,
      snaplines: snaplines,
      width: 200,
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
        marginX: 5,
        marginY: 5,
        columnGap: 8,
        columnWidth: 80,
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
                text: 'Put your expected results',
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
              text: 'Aw',
              fill: '#f6f6f6',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
              refY: 12
            }
          },
        },
        {
          type: 'standard.Polygon',
          size: { width: 50, height: 35 },
          attrs: {
            root: {
              dataTooltip: t('MBTStore.concurrency'),
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            body: {
              points: 'calc(0.5 * w),0 calc(w),calc(0.5 * h) calc(0.5 * w),calc(h) 0,calc(0.5 * h)',
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0'
            },
            label: {
              text: '+',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          }
        },
        {
          type: 'standard.Polygon',
          size: { width: 50, height: 35 },
          attrs: {
            root: {
              dataTooltip: t('MBTStore.branch'),
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            body: {
              points: 'calc(0.5 * w),0 calc(w),calc(0.5 * h) calc(0.5 * w),calc(h) 0,calc(0.5 * h)',
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0'
            },
            label: {
              text: 'x',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          }
        },
      ],
      fsa: [
        {
          type: 'fsa.StartState',
          size: { width: 30, height: 30 },
          preserveAspectRatio: true,
          attrs: {
            root: {
              dataTooltip: t('MBTStore.start'),
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil'
            },
            circle: {
              width: 30,
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
          size: { width: 30, height: 30 },
          preserveAspectRatio: true,
          attrs: {
            root: {
              dataTooltip: t('MBTStore.end'),
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
      ]
    };
  }

}


// Stencil().load(getStencilShapes())
// export  {getStencil , getStencilShapes}