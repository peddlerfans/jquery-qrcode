// 定义数据双向绑定的数据

export interface tableSearch {
    search: string
    page: number
    perPage: number
    q:string
}
// 查询表单的数据
export interface FormState {
    search: string;
}
// 模态窗表单
export interface paramsobj {
    inputVisible:boolean
    name: string,
    type: string;
    enum:Array<any>
    editing:boolean
    inputValue:string
}
export interface ModelState {
    key?:number
    name: string;
    description: string;
    template: string;
    template_en: string
    _id: string;
    tags: Array<string>;
    params: Array<paramsobj>
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