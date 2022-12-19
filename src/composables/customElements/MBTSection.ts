import joint from "../../../node_modules/@clientio/rappid/rappid.js"

import { i18n } from "@/locales";

import { MBTShapeInterface } from "./MBTShapeInterface"
const { t } = i18n.global
import { MBTGroupBase } from "./MBTGroupBase";
window.joint = joint

export const name = 'section';
export const namespace = 'itea.mbt.test' + name;
export class MBTSection extends MBTGroupBase {
  static shapeName = name;
  constructor(e: Element, o: any) {
    super(e, o);

    this.attr({
      // 'background': { fill: '#454549' },
      // 'icon': { iconType: 'receive' },
      'label': { refY: '10', text: this.get('prop')?.custom?.sectionName ? this.get('prop').custom?.sectionName : 'Section' },
      markers: {
        iconTypes: ['ad-hoc'],
      }

    })
    if(!this.get('prop')?.custom?.sectionName){
      this.set('prop', { custom:{sectionName: ''} })
    }
    
    this.on('change', (evt: any) => {
      if (evt.changed && evt.changed.attrs && evt.changed.attrs.label) {
        // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
        this.updateRectangles();
        this.setPropertiesData(evt.changed.attrs.label.text)
        // this.attr('label/text/0', "test")
      }

    })

    this.updateRectangles();
  }
  ifEmbedable(child?: any): boolean {
    return super.ifEmbedable()
    // return true;
  }
  ifDisallowLink(): boolean {
    //  return true;
    return super.ifDisallowLink()
  }

  getInspectorSchema() {
    return {
      inputs: {
        attrs: {
          'label/text': {
            type: 'textarea',
            label: 'Section Name',
            group: 'general',
            index: 1
          },
          'body/stroke': {
            type: 'color',
            label: 'Line Color',
            group: 'appearance',
            index: 1
          }
        }
      },
      schema: {
        type: "object",
        description: '',
        properties: {
          description: {
            title: "Description",
            type: "string",
          },
        }
      }
    }

  }
  setPropertiesData(value?: any) {    
    if(value.description){
      this.prop('prop/custom', { sectionName: value.description })
      this.prop('attrs/label/text', value.description)
      this.prop('attrs/label/fontSize', 16)
    }
    
  }

  setInspectorData() {
    super.setInspectorData()

  }
  getPropertiesData() {    
    return this.attributes.prop.custom
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
    return super.defaults()
  }

}



