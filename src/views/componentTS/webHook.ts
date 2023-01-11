export interface ModelState {
    name: string,
    description: string,
    _id: string,
    tags: Array<string>,
    url: any,
    topics: Array<string>
}
// 定义数据双向绑定的数据

export interface tableSearch {
    search: string
    size: number
}
// 查询表单的数据
export interface FormState {
    search: string;
}

// 添加的表单tags
export interface statesTs {
    tags: Array<string>,
    topics: Array<string>
    inputVisible: Boolean
    inputValue: string
    topicsInputVisible: Boolean
    inputTopics: string
}

export interface webHookDetail {
    topicsObj: any
    topicsOpts: Array<string>
}

export const httpFnList = [
    {
        label: '请求数据',
        value: 'post'
    },
    {
        label: '修改数据',
        value: 'put'
    },
    {
        label: '删除数据',
        value: 'delete'
    }
]

export const testMod_httpFnList = [
    {
        label: '请求数据',
        value: 'post'
    },
    {
        label: '修改数据',
        value: 'put'
    },
    {
        label: '删除数据',
        value: 'delete'
    },
    {
        label: '发布',
        value: 'publish'
    }
]

// export const httpFnEnList = [
//     {
//         label: 'post',
//         value: 'post'
//     },
//     {
//         label: 'put',
//         value: 'put'
//     },
//     {
//         label: 'delete',
//         value: 'delete'
//     }
// ]

export const httpNameTrance: any = {
    post: "请求数据",
    delete: "删除数据",
    get: "获取数据",
    put: "修改数据"
}