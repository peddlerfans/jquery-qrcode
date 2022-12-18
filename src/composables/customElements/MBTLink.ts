import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint
import { i18n } from "@/locales";
import { MBTShapeInterface } from "./MBTShapeInterface"
const { t } = i18n.global

// window.joint = joint

export const name = 'link';
export const namespace = 'itea.mbt.test' + name;
export class MBTLink extends joint.shapes.bpmn2.Flow implements MBTShapeInterface {
  static shapeName = name;
  static connectionPoint(line: any, view: any, magnet: any, opt: any, type: any, linkView: any): joint.g.Point {

    const link = linkView.model;
    // const markerWidth = (link.get('type') === 'standard.Link') ? link.getMarkerWidth(type) : 0;
    opt = { offset: 1, stroke: true };
    // connection point for UML shapes lies on the root group containing all the shapes components
    const modelType = view.model.get('type');
    if (modelType.indexOf('standard') === 0) { opt.selector = 'root'; }
    // taking the border stroke-width into account
    if (modelType === 'standard.InscribedImage') { opt.selector = 'border'; }
    return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
  }
  constructor(e?: Element, o?: any) {
    super(e, o);

    this.attr({
      // 'background': { fill: '#454549' },
      // 'icon': { iconType: 'receive' },
      'label': { text: this.get('prop')?.custom?.condition ? this.get('prop').custom.condition : 'Link' },
      //   markers: {
      //     iconTypes: [ 'sub-process'],
      // }

    })
    this.prop('prop', { condition: '', rulesData: [] })
    this.on('change', (evt: any) => {
      if (evt.changed && evt.changed.custom && evt.changed.custom) {
        // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;

        this.attr('label/text/0', "test")
      }
      // this.prop()
    })


  }

  // static namespace = 'itea.mbt.test.Gateway';
  getInspectorSchema() {
    const options = {
      colorPalette: [
        { content: 'transparent', icon: '../assets/no-color-icon.svg' },
        { content: '#f6f6f6' },
        { content: '#dcd7d7' },
        { content: '#8f8f8f' },
        { content: '#c6c7e2' },
        { content: '#feb663' },
        { content: '#fe854f' },
        { content: '#b75d32' },
        { content: '#31d0c6' },
        { content: '#7c68fc' },
        { content: '#61549c' },
        { content: '#6a6c8a' },
        { content: '#4b4a67' },
        { content: '#3c4260' },
        { content: '#33334e' },
        { content: '#222138' }
      ],
      colorPaletteReset: [
        { content: <string><unknown>undefined, icon: 'y' },
        { content: '#f6f6f6' },
        { content: '#dcd7d7' },
        { content: '#8f8f8f' },
        { content: '#c6c7e2' },
        { content: '#feb663' },
        { content: '#fe854f' },
        { content: '#b75d32' },
        { content: '#31d0c6' },
        { content: '#7c68fc' },
        { content: '#61549c' },
        { content: '#6a6c8a' },
        { content: '#4b4a67' },
        { content: '#3c4260' },
        { content: '#33334e' },
        { content: '#222138' }
      ],
      strokeWidth: [
        { value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
        { value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
        { value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
        { value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
      ],
      strokeStyle: [
        { value: '0', content: 'Solid' },
        { value: '2,5', content: 'Dotted' },
        { value: '10,5', content: 'Dashed' }
      ],
      arrowheadSize: [
        { value: 'M 0 0 0 0', content: 'None' },
        { value: 'M 0 -3 -6 0 0 3 z', content: 'Small' },
        { value: 'M 0 -5 -10 0 0 5 z', content: 'Medium' },
        { value: 'M 0 -10 -15 0 0 10 z', content: 'Large' },
      ],
      router: [
        { value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
        { value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
        { value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
      ],

      connector: [
        { value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
        { value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
        { value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
      ],
      side: [
        { value: 'top', content: 'Top Side' },
        { value: 'right', content: 'Right Side' },
        { value: 'bottom', content: 'Bottom Side' },
        { value: 'left', content: 'Left Side' }
      ],
      labelPosition: [
        { value: 30, content: 'Close to source' },
        { value: 0.5, content: 'In the middle' },
        { value: -30, content: 'Close to target' },
      ],
    }
    return {
      inputs: {
        attrs: {
          line: {
            strokeWidth: {
              type: 'select-button-group',
              options: options.strokeWidth,
              group: 'connection',
              label: 'Link thickness',
              when: { ne: { 'attrs/line/stroke': 'transparent' } },
              index: 4
            },
            strokeDasharray: {
              type: 'select-box',
              options: options.strokeStyle,
              group: 'connection',
              label: 'Link style',
              when: { ne: { 'attrs/line/stroke': 'transparent' } },
              index: 5
            },
            stroke: {
              type: 'color-palette',
              options: options.colorPalette,
              group: 'connection',
              label: 'Color',
              index: 6
            },
            sourceMarker: {
              d: {
                type: 'select-box',
                options: options.arrowheadSize,
                group: 'marker-source',
                label: 'Source arrowhead',
                index: 1
              },
              fill: {
                type: 'color-palette',
                options: options.colorPaletteReset,
                group: 'marker-source',
                label: 'Color',
                when: { ne: { 'attrs/line/sourceMarker/d': 'M 0 0 0 0' } },
                index: 2
              }
            },
            targetMarker: {
              d: {
                type: 'select-box',
                options: options.arrowheadSize,
                group: 'marker-target',
                label: 'Target arrowhead',
                index: 1
              },
              fill: {
                type: 'color-palette',
                options: options.colorPaletteReset,
                group: 'marker-target',
                label: 'Color',
                when: { ne: { 'attrs/line/targetMarker/d': 'M 0 0 0 0' } },
                index: 2
              }
            }
          }
        },
        router: {
          name: {
            type: 'select-button-group',
            options: options.router,
            group: 'connection',
            label: 'Connection type',
            index: 1
          },
          args: {
            side: {
              type: 'select-box',
              options: options.side,
              placeholder: 'Pick a side',
              group: 'connection',
              label: 'Anchors side',
              when: { eq: { 'router/name': 'oneSide' }, otherwise: { unset: true } },
              index: 2
            }
          }
        },
        connector: {
          name: {
            type: 'select-button-group',
            options: options.connector,
            group: 'connection',
            label: 'Connection style',
            index: 3
          }
        },

        label: {
          type: 'list',
          group: 'labels',
          label: 'Labels',
          attrs: {
            label: {
              'data-tooltip': 'Set (possibly multiple) labels for the link',
              'data-tooltip-position': 'right',
              'data-tooltip-position-selector': '.joint-inspector'
            }
          },
          item: {
            type: 'object',
            properties: {
              attrs: {
                text: {
                  text: {
                    type: 'content-editable',
                    label: 'text',
                    defaultValue: 'label',
                    index: 1,
                    attrs: {
                      label: {
                        'data-tooltip': 'Set text of the label',
                        'data-tooltip-position': 'right',
                        'data-tooltip-position-selector': '.joint-inspector'
                      }
                    }
                  },
                  fill: {
                    type: 'color-palette',
                    options: options.colorPaletteReset,
                    label: 'Text Color',
                    index: 5
                  }
                },
                rect: {
                  fill: {
                    type: 'color-palette',
                    options: options.colorPaletteReset,
                    label: 'Fill',
                    index: 3
                  },
                  stroke: {
                    type: 'color-palette',
                    options: options.colorPaletteReset,
                    label: 'Outline',
                    index: 4
                  }
                }
              },
              position: {
                type: 'select-box',
                options: options.labelPosition || [],
                defaultValue: 0.5,
                label: 'Position',
                placeholder: 'Custom',
                index: 2,
                attrs: {
                  label: {
                    'data-tooltip': 'Position the label relative to the source of the link',
                    'data-tooltip-position': 'right',
                    'data-tooltip-position-selector': '.joint-inspector'
                  }
                }
              }
            }
          }
        }

      },
      groups: {
        connection: {
          label: 'Connection',
          index: 1
        },
        'marker-source': {
          label: 'Source marker',
          index: 2
        },
        'marker-target': {
          label: 'Target marker',
          index: 3
        },
        labels: {
          label: 'Labels',
          index: 4
        }
      }
    }

  }

  setInspectorData() {

  }
  setPropertiesData(value?: any, ruleData?: any) {
    this.prop('prop/custom/condition', value)
    this.prop('prop/custom/ruleData', ruleData)
    this.prop('attrs/text/text', value.label)
  }

  setSizeFromContent() {
    // delete this.cache.layout;
    const {
      width,
      height
    } = this.layout();
    this.resize(width, height);
  }
  defaults() {
    return {
      ...super.defaults,
      type: namespace
    }
  }

}



