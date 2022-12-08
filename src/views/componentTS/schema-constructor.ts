import { MbtData } from "@/stores/modules/mbt-data";
import cloneDeep from "lodash-es/cloneDeep";

const store = MbtData()

export function data2schema (awSchema: any, selectList: any) {
    // 可选参数名
    let enumList: Array<any> = []
    if (Array.isArray(selectList)) enumList = selectList.map((a: any) => {
        return {
            value: `{{${a.title}}}`,
            title: a.title
        }
    })
    // 获取属性里面可自定义的表单项
    let customInSchema = getCustomItems(awSchema)
    customInSchema.forEach((a: any) => {
        let prop = awSchema.properties
        prop[a] = {
            "title": a,
            "type": "string",
            "patternProperties": false,
            "enum": enumList.map((a: any) => a.value),
            "enumNames": enumList.map((a: any) => a.title),
            "ui:options": {
                mode: 'tags'
            },
        }
    })
    return awSchema
}

// 获取 schema.properties 里面自定义编辑的元素
function getCustomItems (awSchema: any) {
    let arr: any = []
    for (let key in awSchema.properties) {
        const tar = awSchema.properties[key]
        if (!(tar.hasOwnProperty('readOnly') && tar.readOnly) && !tar['ui:hidden']) {
            arr.push(key)
        }
    }
    return arr
}

// 获取对象中已被设置为自定义的属性
export function getCustomProp (obj: any) {
    let temp: Array<string> = []
    Object.keys(obj).map((a: any) => {
        if (obj[a].custom) {
            temp.push(a)
        }
    })
    return Array.from(new Set(temp))
}

export function getCustomOpts (awSchema: any) {
    let customList = []
    for (let key in awSchema.properties) {
        const tar = awSchema.properties[key]
        if (!(tar.hasOwnProperty('readOnly') && tar.readOnly) && !tar['ui:hidden']) {
            customList.push({
                value: key
            })
        }
    }
    return customList
}

export function getSchemaData (schema: any) {
    let data = schema.data
    let customInSchema = getCustomItems(schema.schema)
    if (customInSchema.length) {
        customInSchema.forEach((a: any) => {
            if (typeof data[a] === 'string') {
                data[a] = {
                    inputType: '1',
                    value: data[a],
                    value1: data[a]
                }
            }
        })
    }
    return data
}

export function string2Obj (schema: any) {
    const prop = schema.properties
    const optionList: Array<any> = store.getMetaData.detail
    let temp: Array<string> = []
    for (let key in prop) {
        const tar = prop[key]
        if (tar.type === 'string') {
            temp.push(key)
            prop[key] = {
                title: tar.title,
                type: 'string',
                "patternProperties": false,
                "enum": getEnumList(tar.title, optionList),
                "ui:options": {
                    mode: 'tags'
                },
            }
        }
    }
    store.setMetaData(temp, 'customKeys')
    return schema
}

function getEnumList (title: string, optionList: Array<any>) {
    let res = optionList.filter((a: any) => a.description === title)[0]
    if (res) return res.enum
    else return []
}

export function checkDataStructure(data: any) {
    let temp = cloneDeep(data)
    let customKeys = store.getMetaData.customKeys
    for (let a of customKeys) {
        if (!Array.isArray(temp[a]) || temp[a].length === 0) continue
        if (temp[a].length > 1) temp[a] = data[a].pop()
        const tar = temp[a][0]
        temp[a] = {
            type: store.checkMetaFormItemIsCustom(a, tar) ? 2 : 1,
            value: tar
        }
    }
    return temp
}