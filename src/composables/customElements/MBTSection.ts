import joint from "../../../node_modules/@clientio/rappid/rappid.js"

import { i18n } from "@/locales";
import { MbtData } from "@/stores/modules/mbt-data";

import { MBTShapeInterface } from "./MBTShapeInterface"

const { t } = i18n.global
const store = MbtData()

import { MBTGroupBase } from "./MBTGroupBase";
window.joint = joint

const typeList = ['beforeAll', 'beforeEach', 'afterAll', 'afterEach']

export const name = 'MBTSection';
export const namespace = 'itea.mbt.test.' + name;
export class MBTSection extends MBTGroupBase {
  static shapeName = name;
  constructor(e: Element, o: any) {
    super(e, o);

    this.attr({
      // 'background': { fill: '#454549' },
      // 'icon': { iconType: 'receive' },
      'label': { refY: '10', text: this.get('prop')?.custom?.description ? this.get('prop').custom?.description : 'Section' },
      markers: {
        iconTypes: ['ad-hoc'],
      }

    })
    // if (!this.get('prop')?.custom?.description) {
    //   this.set('prop', { custom: { description: '' , type : "before_all"} })
    // }

    this.on('change', (evt: any) => {
      const custom = evt.changed?.prop?.custom
      this.reRender()
    })
  }

  reRender() {
    const custom = this.get('prop').custom
    // const desc = custom.description
    const desc = custom?.description || ''
    const dataLoopCount = custom?.type
    // const _desc = dataDesc + dataLoopCount
    const labelText = desc ? desc : dataLoopCount
    console.log(labelText);

    this.attr({
      'label': {
        text: labelText
      }
    })
  }

  ifEmbedable(child?: any): boolean {
    return super.ifEmbedable(child)
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
      }
    }
  }

  getPropertiesSchema() {
    return {
      type: "object",
      description: '',
      properties: {
        description: {
          title: "Description",
          type: "string",
        },
        type: {
          title: "type",
          type: "string",
          enum: typeList
        },
      }
    }
  }

  setPropertiesData(data?: any) {
    console.log(store.getSectionData.section)
    this.prop('prop/custom', data)
    console.log("++ddsfsdfs", this.get('prop'))
  }

  setInspectorData() {
    super.setInspectorData()

  }
  getPropertiesData() {
    console.log("====", this.get('prop').custom)
    // return一个type属性（enum）作为下拉列表
    return this.get('prop').custom
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
      ... super.defaults(),
      prop: {
        custom: {
          description: "",
          type: "beforeAll"
        }
      }
    }
  }

}



