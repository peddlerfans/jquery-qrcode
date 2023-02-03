import joint from "../../../node_modules/@clientio/rappid/rappid.js"
import { i18n } from "@/locales";
import { MBTGroupBase } from "./MBTGroupBase";
const { t } = i18n.global
import { MbtData } from '@/stores/modules/mbt-data'

const store = MbtData()
export const name = 'MBTIfGroup';
export const namespace = 'itea.mbt.test.' + name;
export class MBTIfGroup extends MBTGroupBase {
    static shapeName = name;
    constructor(e: Element, o: any) {
        super(e, o)
        this.attr({
            'label': {
                refY: '10',
                text: this.reRender() ? this.reRender() : 'IfGroup'
            },
            'border': {
                borderStyle: 'dashed'
            },
            markers: {
                iconTypes: ['condition'],
            }
        })
        this.on('change', (evt: any) => {
            if (evt.changed && evt.changed.prop && evt.changed.prop.custom) {
                this.reRender();
            }
        })
    }
    reRender() {
        const custom = this.get('prop').custom
        const desc = custom?.description || ''
        const labelText = desc || 'If Group'
        this.attr({
            'label': {
                text: labelText
            }
        })
        return labelText
    }
    ifEmbedable(child?: any): boolean {
        return super.ifEmbedable(child)
    }
    ifDisallowLink(): boolean {
        return super.ifDisallowLink()
    }
    setPropertiesData(data: any) {
        const group = store.getGroupData
        if (!data.condition) data.condition = ''
        this.prop('prop/custom', data)
    }
    getInspectorSchema() {
        return {
            inputs: {
                attrs: {
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
                condition: {
                    title: 'If condition',
                    type: 'string',
                    readOnly: true
                }
            }
        }
    }

    setInspectorData() {
    }

    getPropertiesData() {
        return this.get('prop').custom
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
                    condition: '',
                    type: 'condition'
                }
            }
        }

    }
}


