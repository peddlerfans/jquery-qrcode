// 定义数据双向绑定的数据

export interface tableSearch {
    search: string
    size: number
}
// 查询表单的数据
export interface FormState {
    search: string;
}
// 模态窗表单
// export interface paramsobj {
//     name: string,
//     type: string;

// }
export interface ModelState {
    name: string;
    description: string;
    _id: string;
    tags: Array<string>;

}
// 添加的表单tags
export interface statesTs {
    tags: Array<string>
    inputVisible: Boolean;
    inputValue: string
}

// {
//     name: "multimedia",
//     description: "Play multimedia files locally",
//     tags: ["Multimedia", "OS"],
//     // keep modelData open right now
//     modelDefinition: {  },
//     dataDefinition: {
//         resources: [
//             {
//                 name: "phone1",
//                 type: "sut"
//             },
//             {
//                 name: "phone2",
//                 type: "sut"
//             }
//         ],
//         // static or dynamic(Pairwise), default is static
//         dataType: "number",

//         // either use dataUrl or data
//         dataUrl: "http://localhost",


//         data: [],
//         // meta 
//         metaTemplate: "template{}",
//         meta: []
//     }
// }

interface DataItem {
    key: string;
    name: string;
    description: string
}
