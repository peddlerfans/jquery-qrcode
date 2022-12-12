
// import { optimizeDeps } from "vite";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import * as appShapes from '@/composables/JointJs/app-shapes';
import {MBTGroup,MBTAW,MBTSection,MBTStartEvent,MBTEndEvent,MBTParallelGateway,MBTExclusiveGateway} from '@/composables/customElements/';
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
          // background: { color: '#2B2C30' },
          model: new joint.dia.Graph({}, {
            cellNamespace: {...appShapes,...{itea: {mbt:{test:{...{MBTAW},...{MBTGroup},...{MBTSection},...{MBTStartEvent},...{MBTEndEvent},...{MBTParallelGateway},...{MBTExclusiveGateway}}}}}}
          }),
          cellViewNamespace:  {...appShapes,...{itea: {mbt:{test:{...{MBTAW},...{MBTGroup},...{MBTSection},...{MBTStartEvent},...{MBTEndEvent},...{MBTParallelGateway},...{MBTExclusiveGateway}}}}}}
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
      // uml: { index: 2, label: 'State machine' }
    };
  }
  getStencilShapes() {
    return {
      standard: [
        {
          type: 'itea.mbt.test.MBTAW',
          size: { width: 50, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'AW',
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
              text: 'AW',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          }
        },
        {
          type: 'itea.mbt.test.MBTGroup',
          size: { width: 50, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'Group',
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
              text: 'Group',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          },
          // ports: {
          //   items: [
          //     { group: 'in' },
          //     { group: 'in' },
          //     { group: 'out' }
          //   ]
          // }
        },
        
        {
          type: 'itea.mbt.test.MBTSection',
          size: { width: 50, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'Section',
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
              text: 'Section',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          },

        },
        {
          type: 'itea.mbt.test.MBTStartEvent',
          size: { width: 35, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'StartEvent',
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
              text: 'StartEvent',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          },

        },
        {
          type: 'itea.mbt.test.MBTEndEvent',
          size: { width: 35, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'EndEvent',
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
              text: 'EndEvent',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            },
            border: {
                      borderType: 'double'
            }
          },
        //   attrs: {
        //     // background: {
        //     //     fill: '#ffc2a7',
        //     // },
        //     border: {
        //         borderType: 'double',
        //         // borderStyle: 'thick',
        //         fill: '#ffc2a7',
        //         // stroke: '#fe854f'
        //     },


        // }

        },
        {
          type: 'itea.mbt.test.MBTParallelGateway',
          size: { width: 50, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'ParallelGateway',
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
              text: 'ParallelGateway',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          },

        },
        {
          type: 'itea.mbt.test.MBTExclusiveGateway',
          size: { width: 50, height: 35 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'ExclusiveGateway',
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
              text: 'ExclusiveGateway',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0
            }
          },

        },
       
      ]
    };
  }

}


// Stencil().load(getStencilShapes())
// export  {getStencil , getStencilShapes}