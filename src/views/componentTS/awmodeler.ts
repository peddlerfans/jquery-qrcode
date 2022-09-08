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
export interface paramsobj {
    name: string,
    type: string;

}
export interface ModelState {
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




interface DataItem {
    key: string;
    name: string;
    description: string
}