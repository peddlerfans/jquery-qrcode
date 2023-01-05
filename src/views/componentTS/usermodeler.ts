// 定义数据双向绑定的数据

import { AnyARecord } from "dns";

export interface tableSearch {
    total?: any;
    search: string
    page: number
    perPage: number
    q: string
}
// 查询表单的数据
export interface FormState {
    search: string;
    q: string
}
// 模态窗表单
export interface paramsobj {
    inputVisible: boolean
    name: string,
    type: string;
    required: boolean
    editing: boolean
    inputValue: any
}
export interface ModelState {
    key?: number
    name: string;

    _id: string;
    validationError?: string

}
// 添加的表单tags
export interface statesTs {
    tags: Array<string>
    inputVisible: Boolean;
    inputValue: string
}

export interface clickobj {
    path: string;
    dataRef: any;
}