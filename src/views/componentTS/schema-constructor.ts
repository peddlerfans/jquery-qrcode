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
            "type": "object",
            "properties": {
                "inputType": {
                    "type": "string",
                    "enum": [
                        "1",
                        "2"
                    ],
                    "enumNames": [
                        "选项输入",
                        "自定义配置"
                    ],
                    "ui:width": "20%"
                },
                "value": {
                    "type": "string",
                    "enum": enumList.map((a: any) => a.value),
                    "enumNames": enumList.map((a: any) => a.title),
                    "ui:hidden": "{{parentFormData.inputType !== '1'}}",
                    "ui:width": "80%"
                },
                "value1": {
                    "type": "string",
                    "message": {
                        "pattern": "输入自定义参数"
                    },
                    "ui:hidden": "{{parentFormData.inputType !== '2'}}",
                    "ui:width": "80%"
                },
            }
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

export function string2Obj (schema: any, optionList: Array<any>) {
    console.log(schema)
    console.log(optionList)
    const prop = schema.properties
    for (let key in prop) {
        const tar = prop[key]
        if (tar.type === 'string') {
            prop[key] = {
                title: tar.title,
                type: 'string',
                enum: getEnumList(tar.title, optionList)
            }
        }
    }
    return schema
}

function getEnumList (title: string, optionList: Array<any>) {
    let res = optionList.filter((a: any) => a.description === title)[0]
    if (res) return res.enum
    else return []
}