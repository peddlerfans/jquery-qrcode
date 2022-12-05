export function data2schema (data: any, key: string) {
    let enumList: Array<any> = []
    if (Array.isArray(data)) enumList = data.map((a: any) => a[key])
    return  {
        "title":"AW",
        "description":"Configuration for the AW",
        "type":"object",
        "properties":{
            "_id":{
                "type":"string",
                "ui:hidden":true,
                "required":true
            },
            "name":{
                "title":"AW Name",
                "type":"string",
                "readOnly":true
            },
            "description":{
                "title":"Description",
                "type":"string",
                "readOnly":true,
                "ui:widget":"TextAreaWidget"
            },
            "template":{
                "title":"Template",
                "type":"string",
                "readOnly":true
            },
            "tags":{
                "title":"Tags",
                "type":"string",
                "readOnly":true
            },
            file: {
                "type":"string",
                "title":"file",
                "enum": enumList
            }
        }
        // "type": "object",
        // "required": [
        //     "age"
        // ],
        // "properties": {
        //     "items": {
        //         "title": "测试OneOf Array Items",
        //         "type": "array",
        //         "items": {
        //             "type": "object",
        //             "oneOf": [
        //                 {
        //                     "title": "value",
        //                     "properties": {
        //                         "foo": {
        //                             "type": "string"
        //                         }
        //                     }
        //                 },
        //                 {
        //                     "title": "reference",
        //                     "properties": {
        //                         "bar": {
        //                             "type": "string",
        //                             "enum": [
        //                                 "{{field1}}",
        //                                 "{{field2}}"
        //                             ]
        //                         }
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        // }
    }
}