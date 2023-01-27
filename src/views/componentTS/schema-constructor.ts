import { MbtData } from "@/stores/modules/mbt-data";
import { MBTStore } from '@/stores/MBTModel'
import cloneDeep from "lodash-es/cloneDeep";
import schemaItem from "@/components/basic/itea-schema-item/input-select-item.vue";

const store = MbtData()
const mbtStore = MBTStore()

export function data2schema (awSchema: any, uiSchema?: any) {    
    // 可选参数名
    
    let enumList: Array<any> = []
    enumList = store.getDataPoolTableColumns.map((a: any) => {
        return {
            value: `{{${a.title}}}`,
            label: a.title
        }
    })
    let sutEnumList: Array<any> = []
    sutEnumList = store.getDataPoolResource.map((a: any) => {
        return {
            value: `{{${a.alias}}}`,
            label: a.alias
        }
    })
    // 获取属性里面可自定义的表单项
    let customInSchema = getCustomItems(awSchema)
    customInSchema.forEach((a: any) => {
        
        
        let prop = awSchema.properties
        const isSutType = a.type === 'SUT' || prop[a.title].AWType === 'SUT'
        prop[a.title] = {
            "title": a.title,
            "type": "string",
            "patternProperties": false,
            "AWType": isSutType ? 'SUT' : 'string'
        }
        if (uiSchema) {
         uiSchema[a.title] = {            
            "ui:widget": schemaItem,
            "ui:options": isSutType ? sutEnumList : enumList
        }}
    })
    return {
        schema: awSchema,
        uiSchema
    }
}

// 获取 schema.properties 里面自定义编辑的元素
function getCustomItems (awSchema: any) {
    let arr: any = []
    for (let key in awSchema.properties) {
        const tar = awSchema.properties[key]
        if (!tar.hasOwnProperty('ui:hidden') && !tar.hasOwnProperty('readOnly') && tar.title !== '返回变量名') {
            arr.push(tar)
        }
    }
    return arr
}

export function string2Obj (schema: any, uiSchema: any) {
    const prop = schema.properties
    let temp: Array<string> = []
    for (let key in prop) {
        const tar = prop[key]
        if (tar.type === 'string') {
            temp.push(key)
            prop[key] = {
                title: tar.title,
                type: 'string',
                "patternProperties": false,
            }
            uiSchema[key] = {
                "ui:widget": schemaItem,
                "ui:options": getEnumList(tar.title)
            }
        }
    }
    store.setMetaData(temp, 'customKeys')
    return {
        schema,
        uiSchema
    }
}

function getEnumList (title: string) {
    const res: Array<any> = []
    let options: Array<any>
    let tar: any
    // 添加枚举值
    options = store.getMetaData.detail || []
    tar  = options.filter((a: any) => a.description === title)[0]
    if (tar) {
        options = (tar.enum || []).map((a: any) => {
            return {
                label: a,
                value: a
            }
        })
    } else options = []
    res.push({
        label: '枚举',
        options
    })
    // 添加 Data Pool 数据
    options = mbtStore.getDataPoolColData.map((b: any) => {
        return {
            label: b.title,
            value: `{{${b.title}}`
        }
    })
    res.push({
        label: 'Data Pool数据',
        options
    })
    return res.filter((c: any) => c.options.length)
}

export function checkDataStructure(data: any) {
    let temp = cloneDeep(data)
    let customKeys = store.getMetaData.customKeys
    for (let a of customKeys) {
        if (!Array.isArray(temp[a]) || temp[a].length === 0) continue
        if (temp[a].length > 1) temp[a] = data[a].pop()
        const tar = temp[a][0]
        temp[a] = tar
        temp[a] = {
            type: store.checkMetaFormItemIsCustom(a, tar) ? 2 : 1,
            value: tar
        }
    }
    return temp
}