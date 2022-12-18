import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint
import { i18n } from "@/locales";

import { MBTShapeInterface } from "./MBTShapeInterface"
const { t } = i18n.global

// window.joint = joint

export const name = 'parallelgateway';
export const namespace = 'itea.mbt.test' + name;
export class MBTParallelGateway extends joint.shapes.bpmn2.Gateway implements MBTShapeInterface {
  static shapeName = name;
  constructor(e: Element, o: any) {
    super(e, o);

    this.attr({
      // 'background': { fill: '#454549' },
      'icon': { iconType: 'parallel' },
      'label': { text: 'Parallel' },
      //   markers: {
      //     iconTypes: [ 'sub-process'],
      // }


    })
    this.on('change', (evt: any) => {
      if (evt.changed && evt.changed.custom && evt.changed.custom) {
        // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
        this.updateRectangles();
        this.attr('label/text/0', "test")
      }

    })

    this.updateRectangles();
  }
  getOptions(icons: {}) {
    return Object.keys(icons).map(function (icon) {
      return { value: icon, content: icon }
    });
  }
  // static namespace = 'itea.mbt.test.Gateway';
  getInspectorSchema() {
    return {
      inputs: {
        attrs: {
          'icon/iconType': {
            type: 'select',
            options: this.getOptions(joint.shapes.bpmn2.Gateway.GATEWAY_ICONS),
            label: 'Type',
            group: 'general',
            index: 2
          },
          'icon/iconColor': {
            type: 'color',
            label: 'Icon Color',
            group: 'appearance',
            index: 3
          },
          'body/stroke': {
            type: 'color',
            label: 'Line Color',
            group: 'appearance',
            index: 2
          },
        }
      }
    }
  }

  setInspectorData() {

  }

  updateRectangles() {

    var attrs = this.get('attrs');
    var rects = [
      { type: 'step', text: this.prop('custom/step') || 'BBB' },
      { type: 'expectation', text: this.prop('custom/expectation') },
      // { type: 'methods', text: this.get('methods') }
    ];

    var offsetY = 0;

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
      type: 'itea.mbt.test'


    }
  }

}



