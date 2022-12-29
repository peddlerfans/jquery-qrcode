import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint
import { i18n } from "@/locales";
import { MBTGroupBase } from "./MBTGroupBase";
const { t } = i18n.global
import { MbtData } from '@/stores/modules/mbt-data'
// import { MBTShapeInterface } from "./MBTShapeInterface";
// window.joint = joint
const store = MbtData()
export const name = 'MBTGroup';
export const namespace = 'itea.mbt.test.' + name;
export class MBTGroup extends MBTGroupBase {
  // joint.shapes.bpmn2.Activity
  // implements MBTShapeInterface  {
  static shapeName = name;
  constructor(e: Element, o: any) {
    super(e, o);
    // debugger
    this.attr({
      'label': {
        refY: '10',
        text: this.get('prop')?.custom?.description ? this.get('prop').custom?.description : 'Group'
      },
      'border': {
        borderStyle: 'dashed'
      },
      markers: {
        iconTypes: ['loop'],
      }
    })
    this.on('change', (evt: any) => {


      if (evt.changed && evt.changed.prop && evt.changed.prop.custom) {
        this.reRender();
      }
    })
    this.reRender();

  }


  reRender() {
    const custom = this.get('prop').custom
    // const desc = custom.description
    const desc = custom?.description || ''
    const dataLoopCount = custom?.loopCount ? custom?.loopCount + '次' : ''
    // const _desc = dataDesc + dataLoopCount
    const labelText = desc ? desc : dataLoopCount
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
  setPropertiesData(data: any) {
    const group = store.getGroupData
    this.prop('prop/custom', data)
  }

  getInspectorSchema() {
    return {
      inputs: {
        attrs: {
          'label/text': {
            type: 'textarea',
            label: 'Loop Count',
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
        loopCount: {
          title: "Loop Count",
          type: "integer",
        }
      }
    }
  }

  setInspectorData() {
  }

  getPropertiesData() {
    return this.get('prop').custom
  }

  // updataLabel() {
  //   let attrs = this.get("attrs")
  //   this.prop('prop', { loop: attrs?.label?.text })
  //   this.attributes.attrs!.lable!.text = 'loopCount' + attrs
  // }

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
          loopCount: "1"
        }
      }
    }

  }
}


