import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint
import { i18n } from "@/locales";
import { MBTGroupBase } from "./MBTGroupBase";
const { t } = i18n.global
// import { MBTShapeInterface } from "./MBTShapeInterface";
// window.joint = joint

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
    if (!this.get('prop')?.custom?.description) {
      this.set('prop', { custom: { description: '', loopCount: '' } })
    }

    this.on('change', (evt: any) => {
      if (evt.changed && evt.changed.custom && evt.changed.custom) {
        // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
        // this.attr('label/text/0', "test")
        // this.setPropertiesData(evt.changed.attrs.label.text)
      }
    })

  }
  ifEmbedable(child?: any): boolean {
    return super.ifEmbedable()
    // return true;
  }
  ifDisallowLink(): boolean {
    //  return true;
    return super.ifDisallowLink()
  }
  setPropertiesData(value?: any) {
    if (value) {
      this.prop('prop/custom', { ...value })
      this.prop('attrs/label/text', value.description + value.loopCount)
      this.prop('attrs/label/fontSize', 16)
      // this.attributes.attrs!.lable!.text = value.groupName + value.loopCount
    }
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
      },
      schema: {
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

  }

  setInspectorData() {
  }

  getPropertiesData() {
    return this.attributes.prop.custom
  }

  updataLabel() {
    let attrs = this.get("attrs")
    this.prop('prop', { loop: attrs?.label?.text })
    this.attributes.attrs!.lable!.text = 'loopCount' + attrs
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


