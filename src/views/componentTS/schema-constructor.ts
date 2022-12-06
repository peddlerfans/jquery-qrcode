export function data2schema (awSchema: any, tableColumns: any, customList: any) {
    // 可选参数名
    let enumList: Array<any> = []
    if (Array.isArray(tableColumns)) enumList = tableColumns.map((a: any) => {
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
            "anyOf": [
                {
                    "type":"string",
                    "title": "选项输入",
                    "enum": enumList.map((a: any) => a.value),
                    "enumNames": enumList.map((a: any) => a.title),
                    "custom": false
                }, {
                    "type":"string",
                    "title": "自定义输入",
                    "custom": true
                }
            ],
            "anyOfSelect": {
                'ui:widget': "RadioWidget",
                "ui:title": "输入设置",
                "ui:options": {},
            }
        }

        // if (!customList.includes(a) && !(a.hasOwnProperty('custom') || a.custom)) {
        //     prop[a] = {
        //         "type":"string",
        //         "title": a,
        //         "enum": enumList.map((a: any) => a.value),
        //         "enumNames": enumList.map((a: any) => a.title),
        //         "custom": false
        //     }
        // } else {
        //     prop[a] = {
        //         "type":"string",
        //         "title": a,
        //         "custom": true
        //     }
        // }
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